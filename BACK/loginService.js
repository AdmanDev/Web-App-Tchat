const axios = require('axios').default;
const { OAuth2Client } = require('google-auth-library');
const { setupTchatEvents } = require('./Tchat');

/**
 *  Socket.io object
 */
var io = null;
/**
 * Google authentication API
 */
const googleClient = new OAuth2Client(process.env.GOOGLE_LOGIN_CLIENT_API_KEY);

/**
 * Setup socket events
 * @param {*} ioObj Socket.io object 
 * @param {*} socket Socket of a client
 */
function setupLoginEvents(ioObj, socket) {
    io = ioObj;
    // On login request
    socket.on('login', ({ token, service }) => {
        // Choose login service
        switch (service) {
            case 'Google':
                googleLogin(socket, token);
                break;

            case 'Facebook':
                facebookLogin(socket, token);
                break;

            case 'Github':
                githubLogin(socket, token);
                break

            case 'Github_token':
                loginWithGithubToken(socket, token);
                break;

            default:
                socket.emit('error', "Erreur d'identification !");
                break;
        }
    });
}

/**
 * Login with Google
 * @param {*} socket Socket of a client
 * @param {string} token Google token to login
 */
function googleLogin(socket, token) {
    // Verify token
    async function verify() {
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_LOGIN_CLIENT_API_KEY
        });

        const payload = ticket.getPayload();
        return payload;
    }
    verify()
        .then(response => {
            // After verifying...
            onLoginSuccess(socket, token, response.given_name, response.picture, 'Google');
        })
        .catch(console.error);
}

/**
 * Login with Facebook
 * @param {*} socket Socket of a client
 * @param {string} token Facebook token to login
 */
async function facebookLogin(socket, token) {
    try {
        // Verify token
        const { data } = await axios.get(`https://graph.facebook.com/me?fields=name,picture&access_token=${token}`);
        const name = data.name.split(' ')[0];
        onLoginSuccess(socket, token, name, data.picture.data.url, 'Facebook')
    } catch (error) {
        console.log(error);
    }
}

/**
 * Login with GitHub
 * @param {*} socket Socket of a client
 * @param {string} code GitHub code to gey access token
 */
function githubLogin(socket, code) {
    // Prepare request to verify code
    const tokenUrl = `https://github.com/login/oauth/access_token`;
    var opts = { headers: { accept: 'application/json' } };
    axios.post(tokenUrl, {
        client_id: process.env.GITHUB_LOGIN_CLIENT_API_KEY,
        client_secret: process.env.GITHUB_LOGIN_SECRET_KEY,
        code
    }, opts)
        .then(({ data }) => {
            // after verifying...
            loginWithGithubToken(socket, data.access_token);
        })
        .catch(error => {
            console.log(error)
        })
}

/**
 * Get GitHub user infos by access token and login user
 * @param {*} socket Soket of client
 * @param {string} access_token GitHub token
 */
function loginWithGithubToken(socket, access_token) {
    // Get user info by GET request with access token
    const opts = { headers: { authorization: `token ${access_token}` } };
    const userUrl = 'https://api.github.com/user';
    axios.get(userUrl, opts)
        .then(({ data }) => {
            // After getting infos, we validate identification
            onLoginSuccess(socket, access_token, data.name, data.avatar_url, 'Github_token');
        })
        .catch(error => {
            console.log(error);
        });
}

/**
 * Validate identification
 * @param {*} socket Socket of a client
 * @param {string} token Token of login service
 * @param {string} name Username
 * @param {string} picture User picture
 * @param {string} service Used service to login
 */
function onLoginSuccess(socket, token, name, picture, service) {
    // if tchat socket events are not setuped
    if (!socket.tchatEventsSetuped) {
        const user = {
            name,
            picture
        };

        const data = {
            isLogged: true,
            loginInfo: {
                service,
                token,
            },
            user
        };

        // Send response to the client
        socket.emit('loginResponse', data);

        socket.tchatEventsSetuped = true;
        socket.user = user;

        // Setup tchat listeners like "on send message" or "on receive message"
        setupTchatEvents(io, socket);
    }
}

exports.setupLoginEvents = setupLoginEvents;