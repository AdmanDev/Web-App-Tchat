
export function login(socket, token, service) {
    const data = { token, service }
    socket.emit('login', data);
}

export function createTchat(socket) {
    socket.emit('createTchat', null);
}

export function joinTchat(socket, tchatCode) {
    socket.emit('joinTchat', tchatCode);
}

export function leaveTchat(socket) {
    socket.emit('leaveTchat');
}

export function sendMessage(socket, msg) {
    socket.emit('sendMessage', msg);
}