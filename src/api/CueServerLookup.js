// ASCII messages based
// on CueServer's protocol.
const CueServerLookup = {

  PRE_SHOW:             'CUE 1 Go',
  SHOW_START:           'CUE 2 Go',
  HIGHLIGHT_EASEL:      'CUE 3 Go',
  HIGHLIGHT_CAGES:      'CUE 4 Go',
  HIGHLIGHT_POPPER:     'CUE 5 Go',
  HIGHLIGHT_CHUTE:      'CUE 6 Go',
  VISTAS_ENTER_POPPER:  'CUE 7 Go',
  VISTAS_EXIT_POPPER:   'CUE 8 Go',
  VISTAS_EXIT_SCREEN:   'CUE 9 Go',
  UNPLUG_BLACKOUT:      'CUE 10 Go',
  PLUG_IN_LOCKDOWN:     'CUE 11 Go',
  LOCKDOWN_RELEASE:     'CUE 13 Go',
  POST_SHOW:            'CUE 18 Go',

};

// Uncomment for testing with
// simplified CueServer
/*const CueServerLookup = {

  PRE_SHOW:             'CUE 1 Go',
  SHOW_START:           'CUE 2 Go',
  HIGHLIGHT_EASEL:      'CUE 3 Go',
  HIGHLIGHT_CAGES:      'CUE 2 Go',
  HIGHLIGHT_POPPER:     'CUE 1 Go',
  HIGHLIGHT_CHUTE:      'CUE 2 Go',
  VISTAS_ENTER_POPPER:  'CUE 3 Go',
  VISTAS_EXIT_POPPER:   'CUE 2 Go',
  VISTAS_EXIT_SCREEN:   'CUE 1 Go',
  UNPLUG_BLACKOUT:      'CUE 2 Go',
  PLUG_IN_LOCKDOWN:     'CUE 3 Go',
  LOCKDOWN_RELEASE:     'CUE 2 Go',
  POST_SHOW:            'CUE 1 Go',

};*/

export default CueServerLookup;