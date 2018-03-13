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
const CUESERVER_IP = '169.254.148.59';
const CUESERVER_PORT = 52737;

// ASCII messages based
// on CueServer's protocol.
const CUE_1 = 'Cue 1 Go'; // Or 'Q1G'
const CUE_2 = 'Cue 2 Go'; // Or 'Q2G'

// Begin listening
io.listen(SOCKETIO_PORT);
console.log('socket.io listening on port ', SOCKETIO_PORT);

// Send messages to CueServer over
// ethernet. The CueServer should
// already be programmed to do
// something with these messages.
function toCueServer(message) {

  console.log('toCueServer[ ' + message + ' ]');

  // Convert to CueServer expected format.
  message = lookupCue(message);

  socket.send(message, 0, message.length, CUESERVER_PORT, CUESERVER_IP, (err) => {

    // CueServer callback
    if (err) {

      console.log(err);

    }

  });

}

function lookupCue(message) {

  let msgOut = message;

  if (CUE_ID_LOOKUP.hasOwnProperty(message)) {

    msgOut = CUE_ID_LOOKUP[message];

  } else {

    console.log('WARNING! cueMessageLookup[ ' + message + ' ] NOT FOUND');

  }

  return msgOut;

}

const CUE_ID_LOOKUP = {

  PRE_SHOW:             'CUE 0 Go',
  VISTAS_ENTER_POPPER:  'CUE 1 Go',
  VISTAS_EXIT_POPPER:   'CUE 2 Go',
  VISTAS_EXIT_SCREEN:   'CUE 3 Go',
  VISTAS_EXIT_SCREEN:   'CUE 4 Go',
  VISTAS_EXIT_SCREEN:   'CUE 5 Go',
  POST_SHOW:            'CUE 6 Go',

};

