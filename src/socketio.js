import openSocket from 'socket.io-client';
const socket = openSocket('http://127.0.0.1:5000');

export const receiveMessages = (callback) => {
    socket.on('message', message => callback(null, message));
}

export const sendMessage = (message) => {
    socket.emit('message', message);
}

