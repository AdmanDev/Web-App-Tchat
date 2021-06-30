import { io } from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_SERVER_URL;

export default class SocketService {
    socket = {};

    constructor() {
        this.socket = io(ENDPOINT, { transports: ["websocket"] });
    }

    connect = () => {
        this.socket.connect();
    }

    // disconnect from the server
    disconnect() {
        this.socket.disconnect();
    }

    on = (message, action) => {
        this.socket.on(message, action);
    }

    removeAllListeners = (message) => {
        this.socket.removeAllListeners(message);
    }

    emit = (message, data) => {
        this.socket.emit(message, data);
    }
}