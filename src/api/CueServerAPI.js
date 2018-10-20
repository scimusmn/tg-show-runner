import openSocket from 'socket.io-client';

// TODO: port should come from config file...
const socket = openSocket('http://localhost:8751');

function emitCueMessageToNode(message) {
  socket.emit('cueServerMessageOut', message);
}

export { emitCueMessageToNode };
