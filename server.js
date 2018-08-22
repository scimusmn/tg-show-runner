/**
 *
 * Socket.io communication with client
 *
 */

// Import Socket.io to recieve signals
// from React Front-end
const io = require('socket.io')();

const SOCKETIO_PORT = 8751;

// Handle new connections from clients.
io.on('connection', (client) => {

  console.log('server.js socket.io connection', client.id);

  client.on('cueServerMessageOut', (message) => {
    console.log('cueServerMessageOut:', message);
    toCueServer(message);
  });

  client.on('disconnect', () => {
    console.log('Client disconnected.', client.id);
  });

});

// Begin listening for client socket action
io.listen(SOCKETIO_PORT);
console.log('socket.io listening on port ', SOCKETIO_PORT);

/**
 *
 * CueServer communication
 *
 */

// Import dgram package for
// communication with CueServer.
const dgram = require('dgram');

// Create socket to send messages through.
const socket = dgram.createSocket('udp4');

// CueServer Info
// Read from CueServer menu.
const CUESERVER_IP = '169.254.80.104';
const CUESERVER_PORT = 52737;

console.log('CUESERVER_IP:', CUESERVER_IP);
console.log('CUESERVER_PORT:', CUESERVER_PORT);

// Send messages to CueServer over
// ethernet. The CueServer should
// already be programmed to do
// something with these messages.
function toCueServer(message) {

  console.log('toCueServer[ ' + message + ' ]');

  // Convert to CueServer expected format.
  // message = lookup(message);

  socket.send(message, 0, message.length, CUESERVER_PORT, CUESERVER_IP, (err) => {

    // CueServer callback
    if (err) {

      console.log(err);

    }

  });

}

/* HACK - Windows 10 + Socket.io delays incoming messages */
/* A simple setInterval anywhere on server prevents this inconsistent delay. */
setInterval(() => {}, 50);

