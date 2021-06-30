const { makeCode, getRandomColor, isDarkColor } = require("./Utils/utils");

// Socket.io object
var io = null;

/**
 * Setup socket tchat events
 * @param {*} ioObj Socket.io object
 * @param {*} socket Socket of a client
 */
function setupTchatEvents(ioObj, socket) {
    // On disconnect
    socket.on('disconnect', () => {
        if (socket.user && socket.tchatCode) {
            updateUsersList(socket.tchatCode, socket.user, false);
        }
    });

    // On create tchat
    socket.on('createTchat', () => {
        io = ioObj;
        onCreateTchat(socket)
    });

    // On join tchat
    socket.on('joinTchat', (tchatCode) => {
        onJoinTchat(socket, tchatCode, false);
    });
}

/**
 * Create new tchat
 * @param {*} socket Socket of a client
 */
function onCreateTchat(socket) {
    // if user is logged...
    if (socket.user) {
        // Generate unique tchat code.
        var tchatCode;
        do {
            tchatCode = makeCode(8);
        } while (io.sockets.adapter.rooms.get(tchatCode))

        // Join this tchat
        onJoinTchat(socket, tchatCode, true);
    }
}

/**
 * On client joins tchat
 * @param {*} socket Socket of a client
 * @param {string} tchatCode Code of tchat to join
 * @param {boolean} create If true and tchat doesn't exist, create a new Socket.io room
 */
function onJoinTchat(socket, tchatCode, create) {
    // if user is logged and if tchat exists (if not we create one)
    if (socket.user && (create || io.sockets.adapter.rooms.get(tchatCode))) {
        // Generate random light color
        var color;
        do {
            color = getRandomColor();
        } while (isDarkColor(color))

        socket.user.color = color;
        socket.tchatCode = tchatCode;

        // Join room
        socket.join(tchatCode);
        socket.emit('tchatJoined', tchatCode);

        // Setup events
        setupOnLeaveTchat(socket);
        setupOnSendMessage(socket);

        // Send new users list to tchat members
        updateUsersList(tchatCode, socket.user, true);
    }
    else {
        socket.emit('error', `Le code ${tchatCode} n'existe pas !`);
    }
}

/**
 * Add "On user leaves tchat" listener to the socket
 * @param {*} socket Socket of a client
 */
function setupOnLeaveTchat(socket) {
    socket.on('leaveTchat', () => {
        // Leave room
        socket.leave(socket.tchatCode);
        // Send new users list to tchat members
        updateUsersList(socket.tchatCode, socket.user, false);

        socket.tchatCode = undefined;

        // Remove tchat listeners
        socket.removeAllListeners('tchatJoined');
        socket.removeAllListeners('sendMessage');

        // Send leaving validation
        socket.emit('tchatLeft');
    });
}

/**
 * Add "On user sends message" listener to the socket
 * @param {*} socket Socket of a client
 */
function setupOnSendMessage(socket) {
    socket.on('sendMessage', (msg) => {
        // If message content is not empty and user is member of a tchat...
        if ((msg?.content || msg?.file) && socket.tchatCode) {
            // Send message to all tchat members
            io.to(socket.tchatCode).emit('receiveMessage', {
                user: socket.user, // user that sent message
                msg // the sent message
            });
        }
    });
}

/**
 * Update users list of a tchat and send it to members
 * @param {string} tchatCode Code of tchat to updatz
 * @param {*} targetUser User who caused this update 
 * @param {boolean} joining true if this update is caused by a user who joined the tchat otherwise false if user left the tchat
 */
function updateUsersList(tchatCode, targetUser, joining) {
    // Get members of a tchat
    const users = [];
    foreachUsers(tchatCode, socket => {
        users.push(socket.user);
    });

    // Data to send
    const data = {
        users, // tchat users
        targetUser, // last user that joined or left tchat
        joining // true if we update because a user joined tchat, else false because he left it
    }

    // Send data to tchat members
    io.to(tchatCode).emit('usersListUpdate', data);
}

/**
 * 
 * @param {string} tchatCode Code of tchat of users whose to do action
 * @param {Function} action 
 * @returns {boolean} True if this function has been processed successfully
 */
function foreachUsers(tchatCode, action) {
    // Get clients of tchat room
    const clients = io.sockets.adapter.rooms.get(tchatCode);
    // If clients list contains items...
    if (clients) {
        // For each clients...
        for (const clientId of clients) {
            // Get its socket
            const clientSocket = io.sockets.sockets.get(clientId);
            // Call the callback function
            action(clientSocket);
        }

        return true;
    }

    return false;
}

exports.setupTchatEvents = setupTchatEvents;