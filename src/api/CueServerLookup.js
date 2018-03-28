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
  VISTA_TRAIN_ENTER:    'CUE 8 Go',
  VISTAS_EXIT_POPPER:   'CUE 9 Go',
  VISTA_TRAIN_EXIT:     'CUE 20 Go',
  VISTA_TRAIN_EXIT_OFF: 'CUE 21 Go',
  UNPLUG_BLACKOUT:      'CUE 10 Go',
  PLUG_IN_LOCKDOWN:     'CUE 11 Go',
  LOCKDOWN_RELEASE:     'CUE 13 Go',
  POST_SHOW:            'CUE 18 Go',

};

export default CueServerLookup;