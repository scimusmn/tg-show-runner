
import React from 'react';

// Import dgram package.
import dgram from 'dgram';

export default {

  loadCueByIndex(slideIndex) {

    // Tell CueServer which
    // slide we're on
    console.log('loadCueByIndex:', slideIndex);
    // Example
    if (slideIndex == 4) {
      console.log('Turn on light cue server');
    }

  },

};
