import { alertRef, alertType } from 'components/Alert';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

var socket = null;
var setLocalUser = null;
var setUsersList = null;

export function setSocketEvents(socketObj, setLocalUserFunc, setUsersListFunc) {
    socket = socketObj;
    setLocalUser = setLocalUserFunc;
    setUsersList = setUsersListFunc;

    onLoginResponse();
    onError();
}

function onLoginResponse() {
    socket.on('loginResponse', data => {
        if (data?.isLogged) {
            setLocalUser(data.user);
            cookies.set('session-info', data.loginInfo, { maxAge: 4320 });
            onTchatJoined(data.user);
        }
        else {
            console.error(`Connexion avec ${data.service} échouée !`);
        }
    });
}

function onTchatJoined(user) {
    socket.on('tchatJoined', tchatCode => {
        setLocalUser({
            ...user,
            tchatCode
        });

        socket.removeAllListeners('tchatJoined');
        onTchatLeft(user);
        onUsersListUpdate();
    });
}

function onTchatLeft(user) {
    socket.on('tchatLeft', () => {
        setLocalUser({
            ...user,
            tchatCode: undefined
        });

        setUsersList([]);

        socket.removeAllListeners('tchatLeft');
        socket.removeAllListeners('receiveMessage');
        socket.removeAllListeners('usersListUpdate');

        onTchatJoined(user);
    });
}

function onUsersListUpdate() {
    socket.on('usersListUpdate', data => {
        setUsersList(data.users);

        var msg = data.targetUser.name + ' a ';
        msg += data.joining ? 'rejoint le tchat' : ' quitté(e) le tchat';

        alertRef.current.showAlert(msg, alertType.INFO);
    });
}

export function onReceiveMessage(callback) {
    socket.on('receiveMessage', (data) => {
        callback(data);
    });
}

function onError() {
    socket.on('error', msg => {
        alertRef.current.showAlert(msg, alertType.ERROR);
    })
}