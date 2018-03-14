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
const CUESERVER_IP = '169.254.148.59';
const CUESERVER_PORT = 52737;

// ASCII messages based
// on CueServer's protocol.

/*
const CueServerLookup = {

  PRE_SHOW:             'CUE 0 Go',
  SHOW_START:           'CUE 0 Go',
  HIGHLIGHT_EASEL:      'CUE 0 Go',
  HIGHLIGHT_CAGES:      'CUE 0 Go',
  HIGHLIGHT_POPPER:     'CUE 0 Go',
  HIGHLIGHT_CHUTE:      'CUE 0 Go',
  VISTAS_ENTER_POPPER:  'CUE 1 Go',
  VISTAS_EXIT_POPPER:   'CUE 2 Go',
  VISTAS_EXIT_SCREEN:   'CUE 3 Go',
  UNPLUG_BLACKOUT:      'CUE 4 Go',
  PLUG_IN_LOCKDOWN:     'CUE 5 Go',
  LOCKDOWN_RELEASE:     'CUE 6 Go',
  POST_SHOW:            'CUE 7 Go',

};
*/

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

/*function lookup(message) {

  let msgOut = message;

  if (CueServerLookup.hasOwnProperty(message)) {

    msgOut = CueServerLookup[message];

  } else {

    console.log('WARNING! cueMessageLookup[ ' + message + ' ] NOT FOUND');

  }

  return msgOut;

}*/

