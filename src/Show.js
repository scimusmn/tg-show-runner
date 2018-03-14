// Import React
import React from 'react';

// Import Spectacle Core tags
import Cue from './components/Cue';
import Deck from './components/deck';
import Slide from './components/slide';
import Screen from './components/Screen';

import SoundCue from './components/SoundCue';
import CueServerOut from './components/CueServerOut';
import CSL from './api/CueServerLookup';

import {images, sounds, videos} from './assets/assets';

// Import theme
import createTheme from './themes/default';

// Require CSS
require('normalize.css');
require('./assets/css/show.css');

const theme = createTheme(
  {
    primary: '#ededed',
    secondary: '#074358',
    tertiary: '#677562',
    quartenary: '#A55C55',
    correct:'#458985',
  },
  {
    primary: 'Verdana',
    secondary: 'Helvetica',
  }
);

export default class Show extends React.Component {

  render() {
    return (

      <Deck theme={theme} progress='number' >

        {/* TEMP */}
        <Cue notes='Cue'>

          <h1>TEMP no cue</h1>

        </Cue>

        {/* TEMP */}
        <Cue notes='Cue'>

          <h1>TEMP Cue 2 Go</h1>

          <CueServerOut cueId={CSL.LOCKDOWN_RELEASE} />

        </Cue>

        {/* TEMP */}
        <Cue notes='Cue'>

          <h1>TEMP Cue 3 Go</h1>

          <CueServerOut cueId='Cue 3 Go' />

        </Cue>

        {/* TEMP */}
        <Cue notes='Cue'>

          <h1>TEMP Cue 2 Go</h1>

          <CueServerOut cueId='Cue 2 Go' />

        </Cue>

        {/* TEMP */}
        <Cue notes='Cue'>

          <h1>TEMP Cue 1 Go</h1>

          <CueServerOut cueId='Cue 1 Go' />

        </Cue>

        {/* CUE 1 */}
        <Cue notes='Cue 0. Pre-show.'>

          <h1>Cue 1 Pre-show</h1>

          <CueServerOut cueId='pre-show' />

        </Cue>

        {/* CUE 2 */}
        <Cue notes='Cue 1'>

          <Screen output='primary'>
            <h1>Cue 1. Primary screen.</h1>
          </Screen>

          <Screen output='secondary'>
            <h1>Cue 1. Secondary screen.</h1>
          </Screen>

          <SoundCue src={sounds.VO_001} />

        </Cue>

        {/* CUE 3 */}
        <Cue notes='Cue 2'>

          <Screen output='primary'>
            <h1>Cue 2. Primary screen.</h1>
            <h2>Alex Makes It Amazing Youtube Intro</h2>
          </Screen>

          <Screen output='secondary'>
            <h1>Cue 2. Secondary screen.</h1>
          </Screen>

          <SoundCue src={sounds.alex_intro} />
          <CueServerOut cueId={CSL.SHOW_START} />

        </Cue>

        {/* CUE 4 */}
        <Cue notes='Cue 3.'>

          <Screen output='primary'>
            <h1>Cue 3. Primary screen.</h1>
          </Screen>

          <Screen output='secondary'>
            <h1>Cue 3. Secondary screen.</h1>
          </Screen>

        </Cue>

        {/* CUE 5 */}
        <Cue notes='What Does the Fox Say?!'>

          <SoundCue src={sounds.whatthefoxsay} />
          <CueServerOut cueId='VISTAS_EXIT_POPPER' />

        </Cue>

        {/* CUE 6 */}
        <Cue notes='Cue 5'>

          <h1>Cue 5</h1>

        </Cue>

        <Cue notes='Cue 6. That is what those noises from your bedroom were.'>

          <h1>Cue 6</h1>

          <SoundCue src={sounds.vista_friendly_1}/>
          <SoundCue src={sounds.vista_friendly_2}/>

        </Cue>

        {/* CUE 7 */}
        <Cue notes='Cue 7. Tribble Pygmy family tree.'>

          <h1>Cue 7</h1>
          <img src={images.tribble} width='400px'/>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* CUE 8 */}
        <Cue notes='Cue 8. After putting VISTA back in cage.'>

          <h1>Cue 8</h1>

          <SoundCue src={sounds.cages_lock} />

          <CueServerOut cueId='vistas-exit-popper' />

        </Cue>

        {/* CUE 9 */}
        <Cue notes='Alex triggers THEORY OF EVOLUTION'>

          <h1>Cue 9</h1>
          <img src={images.evolution} width='400px'/>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* CUE 10 */}
        <Cue notes='Alex triggers Sequence 1'>

          <h1>Cue 10</h1>
          <img src={images.sequence1} width='400px'/>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* CUE 11 */}
        <Cue notes='Cue 11'>

          <h1>Cue 11. Empty</h1>

        </Cue>

        {/* CUE 12 */}
        <Cue notes='Alex triggers sequence 2'>

          <h1>Cue 12</h1>
          <img src={images.sequence2} width='400px'/>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* CUE 13 */}
        <Cue notes='Cue 13'>

          <h1>Cue 13. Empty</h1>

        </Cue>

        {/* CUE 14 */}
        <Cue notes='Cue 14. Single cute VISTA sound.'>

          <h1>Cue 14</h1>

          <SoundCue src={sounds.vista_friendly_3} />

        </Cue>

        {/* CUE 15 */}
        <Cue notes='Cue 15. VISTA bites sandwhich.'>

          <h1>Cue 15</h1>

          <SoundCue src={sounds.gobble} />

        </Cue>

        {/* CUE 16 */}
        <Cue notes='Cue 16. Burp interruption.'>

          <h1>Cue 16. Burp interruption.</h1>

          <SoundCue src={sounds.vista_burp} />

        </Cue>

        {/* CUE 17 */}
        <Cue notes='Evaluation part ONE'>

          <h1>Cue 18. Evaluation part ONE.</h1>

          <SoundCue src={sounds.VO_060} />

        </Cue>

        {/* CUE 18 */}
        <Cue notes='Answer part ONE (V)'>

          <h1>Cue 19. Correct. You earned a V.</h1>

          <SoundCue src={sounds.VO_061} />

        </Cue>

        {/* CUE 19 */}
        <Cue notes='Cue 20. Alex triggers Sequence 3'>

          <h1>Cue 20. Alex Sequence 3</h1>

          <img src={images.sequence3} width='400px'/>

        </Cue>

        {/* CUE 20 */}
        <Cue notes='Cue 21'>

          <h1>Cue 21. Evaluation part TWO.</h1>

          <SoundCue src={sounds.VO_073} />

        </Cue>

        {/* CUE 21 */}
        <Cue notes='Cue 22'>

          <h1>Cue 22. Correct. You earned an I.</h1>

          <SoundCue src={sounds.VO_074} />

        </Cue>

        {/* CUE 22 */}
        <Cue notes='Cue 23. Alex triggers sequence 4.'>

          <h1>Cue 23. Alex sequence 4. </h1>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* CUE 23 */}
        <Cue notes='Cue 24. Evaluation part THREE.'>

          <h1>Cue 24. Evaluation part THREE.</h1>

          <SoundCue src={sounds.VO_078} />

        </Cue>

        <Cue notes='Cue 25. Correct answer. You earned an S.'>

          <h1>Cue 25. Correct. You earned an S.</h1>
          <h3>Script ref 83</h3>

          <SoundCue src={sounds.VO_083} />

        </Cue>

        <Cue notes='Cue 26'>

          <h1></h1>
          <h2>Audience member selects VISTAs, places in popper.</h2>

        </Cue>

        <Cue notes='Vistas in popper.'>

          <h1>Vistas in popper.</h1>
          <h3>Script ref 90</h3>

          <CueServerOut cueId='vistas-enter-popper'/>

        </Cue>

        <Cue notes='Vistas exit popper.'>

          <h1>Vistas exit popper and enter screen.</h1>
          <h3>Script ref 93</h3>

          <SoundCue src={sounds.train_swoosh} />
          <CueServerOut cueId='vistas-exit-popper'/>

        </Cue>

        <Cue notes='Vistas exit screen.'>

          <h1>Vistas return from screen to cages.</h1>
          <h3>Script ref 96</h3>

          <SoundCue src={sounds.train_swoosh} />
          <CueServerOut cueId='vistas-exit-screen'/>

        </Cue>

        <Cue notes='Vista growls at Alex.'>

          <h1>Vista growls at Alex.</h1>
          <h3>Script ref 96</h3>

          <SoundCue src={sounds.vista_unfriendly_4} />

        </Cue>

        <Cue notes='Alex triggers sequence 4.'>

          <h1>Alex sequence 4.</h1>
          <h3>Script ref 99</h3>

          <SoundCue src={sounds.upload} />

        </Cue>

        <Cue notes=''>

          <h1>Empty.</h1>

        </Cue>

        <Cue notes='Generation speed ramps up.'>

          <h1>Generation speed ramps up.</h1>
          <h2>...SIX generations pass...</h2>
          <h3>Script ref 106</h3>

          <SoundCue src={sounds.power_increasing} />

          <SoundCue src={sounds.generation_ding} delay={1.0}/>
          <SoundCue src={sounds.generation_ding} delay={3.0}/>
          <SoundCue src={sounds.generation_ding} delay={4.5}/>
          <SoundCue src={sounds.generation_ding} delay={5.5}/>
          <SoundCue src={sounds.generation_ding} delay={6.1}/>
          <SoundCue src={sounds.generation_ding} delay={6.4}/>
          <SoundCue src={sounds.generation_ding} delay={6.7}/>
          <SoundCue src={sounds.generation_ding} delay={6.9}/>
          <SoundCue src={sounds.generation_ding} delay={7.1}/>
          <SoundCue src={sounds.generation_ding} delay={7.3}/>

        </Cue>

        <Cue notes='Vistas exit screen.'>

          <h1>Vistas return from screen to cages.</h1>
          <h3>Script ref 106.5</h3>

          <SoundCue src={sounds.train_swoosh} />
          <CueServerOut cueId='vistas-exit-screen'/>

        </Cue>

        <Cue notes=''>

          <h1></h1>
          <h2>Audience member selects VISTAs, places in popper.</h2>
          <h3>Script ref 106.6-9</h3>

        </Cue>

        <Cue notes='Vistas in popper.'>

          <h1>Vistas in popper.</h1>
          <h3>Script ref 106.9</h3>

          <CueServerOut cueId='vistas-enter-popper'/>

        </Cue>

        <Cue notes=''>

          <h1>Vistas exit popper and enter screen.</h1>
          <h3>Script ref 107</h3>
          <h2>THREE generations pass in visualization</h2>

          <SoundCue src={sounds.train_swoosh} />
          <CueServerOut cueId='vistas-exit-popper'/>

        </Cue>

        <Cue notes=''>

          <h1>Vistas exit screen.</h1>
          <h3>Script ref 108.5</h3>

          <SoundCue src={sounds.train_swoosh} />
          <CueServerOut cueId='vistas-exit-screen'/>

        </Cue>

        <Cue notes=''>

          <h1>Audience selects vistas, places in popper.</h1>
          <h3>Script ref 108.6-7</h3>

        </Cue>

        <Cue notes='Vistas in popper.'>

          <h1>Vistas in popper.</h1>
          <h3>Script ref 108.9</h3>

          <CueServerOut cueId='vistas-enter-popper'/>

        </Cue>

        <Cue notes=''>

          <h1>Vistas exit popper and enter screen.</h1>
          <h3>Script ref 109</h3>
          <h2>TEN generations pass in visualization</h2>

          <SoundCue src={sounds.train_swoosh} />
          <CueServerOut cueId='vistas-exit-popper'/>

        </Cue>

        <Cue notes=''>

          <h1>Vistas exit screen.</h1>
          <h3>Script ref 110.5</h3>

          <SoundCue src={sounds.train_swoosh} />
          <CueServerOut cueId='vistas-exit-screen'/>

        </Cue>

        <Cue notes=''>

          <h1>Audience selects vistas, places in popper.</h1>
          <h3>Script ref 110.6-7</h3>

          <CueServerOut cueId='vistas-enter-popper'/>

        </Cue>

        <Cue notes=''>

          <h1>Vistas exit popper and enter screen.</h1>
          <h3>Script ref 112</h3>
          <h2>TEN generations pass in visualization</h2>

          <SoundCue src={sounds.train_swoosh} />
          <CueServerOut cueId='vistas-exit-popper'/>

        </Cue>

        <Cue notes='Evaluation part FOUR'>

          <h1>Evaluation part FOUR.</h1>
          <h3>Script ref 115.</h3>

          <SoundCue src={sounds.VO_115} />

        </Cue>

        <Cue notes='Answer part FOUR (T)'>

          <h1>Correct. You earned a T.</h1>
          <h3>Script ref 116.</h3>

          <SoundCue src={sounds.VO_116} />

        </Cue>

        <Cue notes='Alex triggers sequence 5'>

          <h1>Alex sequence 5</h1>
          <h3>Script ref 121.</h3>

        </Cue>

        <Cue notes='Evaluation part FIVE'>

          <h1>Evaluation part FIVE.</h1>
          <h3>Script ref 127.</h3>

          <SoundCue src={sounds.VO_127} />

        </Cue>

        <Cue notes='Answer part FIVE (A)'>

          <h1>Correct. You earned a T.</h1>
          <h3>Script ref 128.</h3>

          <SoundCue src={sounds.fanfare} />
          <SoundCue src={sounds.VO_128} delay={2.5}/>

        </Cue>

        <Cue notes='Blackout. Cages open.'>

          <h1>Blackout.</h1>
          <h3>Script ref 133.</h3>

          <SoundCue src={sounds.power_down} />
          <SoundCue src={sounds.unlock} delay={1.0} />

          <CueServerOut cueId='unplug-blackout'/>

        </Cue>

        <Cue notes='Lockdown when plugged back into outlet.'>

          <h1>Blackout.</h1>
          <h3>Script ref 141.</h3>

          <SoundCue src={sounds.lockdown} />
          <SoundCue src={sounds.alarm} delay={0.5} />
          <SoundCue src={sounds.VO_142} delay={3.0} />

          <CueServerOut cueId='plug-in-lockdown' />

        </Cue>

        <Cue notes='And whose fault is that?'>

          <h1>And who's fault is that?</h1>
          <h3>Script ref 144.</h3>

          <SoundCue src={sounds.VO_144} />

        </Cue>

        <Cue notes='Isolation mode engaged.'>

          <h1>Isolation mode engaged.</h1>
          <h3>Script ref 146.</h3>

          <SoundCue src={sounds.VO_146} />

        </Cue>

        <Cue notes='Isolation mode[interrupted]'>

          <h1>Isolation mode[interrupted]</h1>
          <h3>Script ref 148.</h3>

          <SoundCue src={sounds.VO_148} />

        </Cue>

        <Cue notes='You dont. To ensure...'>

          <h1>You dont. To ensure...</h1>
          <h3>Script ref 150.</h3>

          <SoundCue src={sounds.VO_150} />

        </Cue>

        <Cue notes='Yes. I understand your problem. '>

          <h1>Yes. I understand your problem. </h1>
          <h3>Script ref 152.</h3>

          <SoundCue src={sounds.VO_152} />

        </Cue>

        <Cue notes='Override codes are changed daily'>

          <h1>Override codes are changed daily</h1>
          <h3>Script ref 157.</h3>

          <SoundCue src={sounds.VO_157} />

        </Cue>

        <Cue notes='No. I was simply communicating...'>

          <h1>No. I was simply communicating...</h1>
          <h3>Script ref 159.</h3>

          <SoundCue src={sounds.VO_159} />

        </Cue>

        <Cue notes='Puzzle solved. Lockdown releases.'>

          <h1>Puzzle Solved. Lockdown releases.</h1>
          <h3>Script ref 161.</h3>

          <SoundCue src={sounds.unlock} />
          <SoundCue src={sounds.VO_161} delay={1.5} />

          <CueServerOut cueId='lockdown-release' />

        </Cue>

        <Cue notes='Post show. Audience exiting.'>

          <h1>Post show. Audience exiting.</h1>
          <h3>Script ref 166.</h3>

          <CueServerOut cueId='post-show' />

        </Cue>

      </Deck>
    );
  }

}
