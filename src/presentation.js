// Import React
import React from 'react';

// Import Spectacle Core tags
import Deck from './components/deck';
import Slide from './components/slide';
import Cue from './components/Cue';

import SoundCue from './components/SoundCue';
import CueServerOut from './components/CueServerOut';

// Import theme
import createTheme from './themes/default';

// Require CSS
require('normalize.css');

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

const images = {

  moths: require('./assets/images/moths.gif'),
  alex1: require('./assets/images/alex1.png'),
  alex2: require('./assets/images/alex2.png'),
  tribble: require('./assets/images/tribble.png'),
  sequence1: require('./assets/images/sequence1.png'),
  sequence2: require('./assets/images/sequence2.png'),
  sequence3: require('./assets/images/sequence3.png'),
  evolution: require('./assets/images/evolution.png'),

};

const sounds = {

  boink: require('./assets/sounds/boink.mp3'),
  bagpipe: require('./assets/sounds/bagpipe.mp3'),
  VO_001: require('./assets/sounds/VO_001.mp3'),
  VO_003: require('./assets/sounds/VO_003.mp3'),
  VO_034: require('./assets/sounds/VO_034.mp3'),
  VO_060: require('./assets/sounds/VO_060.mp3'),
  VO_061: require('./assets/sounds/VO_061.mp3'),
  VO_073: require('./assets/sounds/VO_073.mp3'),
  VO_074: require('./assets/sounds/VO_074.mp3'),
  VO_083: require('./assets/sounds/VO_083.mp3'),
  VO_084: require('./assets/sounds/VO_084.mp3'),
  VO_115: require('./assets/sounds/VO_115.mp3'),
  VO_116: require('./assets/sounds/VO_116.mp3'),
  VO_127: require('./assets/sounds/VO_127.mp3'),
  VO_128: require('./assets/sounds/VO_128.mp3'),
  VO_142: require('./assets/sounds/VO_142.mp3'),
  VO_144: require('./assets/sounds/VO_144.mp3'),
  VO_146: require('./assets/sounds/VO_146.mp3'),
  VO_148: require('./assets/sounds/VO_148.mp3'),
  VO_150: require('./assets/sounds/VO_150.mp3'),
  VO_152: require('./assets/sounds/VO_152.mp3'),
  VO_157: require('./assets/sounds/VO_157.mp3'),
  VO_159: require('./assets/sounds/VO_159.mp3'),
  VO_161: require('./assets/sounds/VO_161.mp3'),
  vista_friendly_1: require('./assets/sounds/vista_friendly_1.mp3'),
  vista_friendly_2: require('./assets/sounds/vista_friendly_2.mp3'),
  vista_friendly_3: require('./assets/sounds/vista_friendly_2.mp3'),
  vista_friendly_4: require('./assets/sounds/vista_friendly_2.mp3'),
  vista_unfriendly_1: require('./assets/sounds/vista_unfriendly_1.mp3'),
  vista_unfriendly_2: require('./assets/sounds/vista_unfriendly_2.mp3'),
  vista_unfriendly_3: require('./assets/sounds/vista_unfriendly_2.mp3'),
  vista_unfriendly_4: require('./assets/sounds/vista_unfriendly_2.mp3'),
  vista_gobble: require('./assets/sounds/vista_gobble.mp3'),
  vista_burp: require('./assets/sounds/vista_burp.mp3'),
  alex_intro: require('./assets/sounds/alex_intro.mp3'),
  whatthefoxsay: require('./assets/sounds/whatthefoxsay.mp3'),
  upload: require('./assets/sounds/upload.mp3'),
  fanfare: require('./assets/sounds/fanfare.mp3'),
  unlock: require('./assets/sounds/unlock.mp3'),
  lockdown: require('./assets/sounds/lockdown.mp3'),
  alarm: require('./assets/sounds/alarm.mp3'),
  power_down: require('./assets/sounds/power_down.mp3'),
  cages_lock: require('./assets/sounds/cages_lock.mp3'),
  train_swoosh: require('./assets/sounds/train_swoosh.mp3'),
  power_increasing: require('./assets/sounds/power_increasing.mp3'),
  generation_ding: require('./assets/sounds/generation_ding.mp3'),

};

/*
const videos = {

  explanation: require('./videos/explanation.mp4'),
  video1: require('./assets/videos/video1.mp4'),
  video2: require('./assets/videos/video2.mp4'),
  video3: require('./assets/videos/video3.mp4'),

};*/

export default class Presentation extends React.Component {

  render() {
    return (

      <Deck theme={theme} progress='number' >

        <Cue notes='Cue 0. Pre-show.'>

          <h1>Cue 1 Pre-show</h1>

          <CueServerOut cueId='pre-show' />

        </Cue>

        <Cue notes='Cue 1'>

          <h1>Cue 1</h1>

          <SoundCue src={sounds.VO_001} />

        </Cue>

        <Cue notes='Cue 2'>

          <h1>Cue 2</h1>
          <h2>Alex Makes It Amazing Youtube Intro</h2>

          <SoundCue src={sounds.alex_intro} />
          <CueServerOut cueId='vistas-exit-popper' />

        </Cue>

        <Cue notes='Cue 3'>

          <h1>Cue 3.</h1>

        </Cue>

        <Cue notes='What Does the Fox Say?!'>

          <h1>Cue 4. What does the fox say?!</h1>

          <SoundCue src={sounds.whatthefoxsay} />
          <CueServerOut cueId='whatthefoxsay' />

        </Cue>

        <Cue notes='Cue 5'>

          <h1>Cue 5</h1>

        </Cue>

        <Cue notes='Cue 6. That is what those noises from your bedroom were.'>

          <h1>Cue 6</h1>

          <SoundCue src={sounds.vista_friendly_1} />
          <SoundCue src={sounds.vista_friendly_2} />

        </Cue>

        <Cue notes='Cue 7. Tribble Pygmy family tree.'>

          <h1>Cue 7</h1>
          <img src={images.tribble} width='400px'/>

          <SoundCue src={sounds.upload} />

        </Cue>

        <Cue notes='Cue 8. After putting VISTA back in cage.'>

          <h1>Cue 8</h1>

          <SoundCue src={sounds.cages_lock} />

          <CueServerOut cueId='vistas-exit-popper' />

        </Cue>

        <Cue notes='Alex triggers THEORY OF EVOLUTION'>

          <h1>Cue 9</h1>
          <img src={images.evolution} width='400px'/>

          <SoundCue src={sounds.upload} />

        </Cue>

        <Cue notes='Alex triggers Sequence 1'>

          <h1>Cue 10</h1>
          <img src={images.sequence1} width='400px'/>

          <SoundCue src={sounds.upload} />

        </Cue>

        <Cue notes='Cue 11'>

          <h1>Cue 11. Empty</h1>

        </Cue>

        <Cue notes='Alex triggers sequence 2'>

          <h1>Cue 12</h1>
          <img src={images.sequence2} width='400px'/>

          <SoundCue src={sounds.upload} />

        </Cue>

        <Cue notes='Cue 13'>

          <h1>Cue 13. Empty</h1>

        </Cue>

        <Cue notes='Cue 14. Single cute VISTA sound.'>

          <h1>Cue 14</h1>

          <SoundCue src={sounds.vista_friendly_3} />

        </Cue>

        <Cue notes='Cue 15. VISTA bites sandwhich.'>

          <h1>Cue 15</h1>

          <SoundCue src={sounds.gobble} />

        </Cue>

        <Cue notes='Cue 16'>

          <h1>Cue 16. Burp interruption. “...some are not so friendly, and some are (BURP) lacking in manners.</h1>

          <SoundCue src={sounds.vista_burp} />

        </Cue>

        <Cue notes='Evaluation part ONE'>

          <h1>Cue 18. Evaluation part ONE.</h1>

          <SoundCue src={sounds.VO_060} />

        </Cue>

        <Cue notes='Answer part ONE (V)'>

          <h1>Cue 19. Correct. You earned a V.</h1>

          <SoundCue src={sounds.VO_061} />

        </Cue>

        <Cue notes='Cue 20. Alex triggers Sequence 3'>

          <h1>Cue 20. Alex Sequence 3</h1>

          <img src={images.sequence3} width='400px'/>

        </Cue>

        <Cue notes='Cue 21'>

          <h1>Cue 21. Evaluation part TWO.</h1>

          <SoundCue src={sounds.VO_073} />

        </Cue>

        <Cue notes='Cue 22'>

          <h1>Cue 22. Correct. You earned an I.</h1>

          <SoundCue src={sounds.VO_074} />

        </Cue>

        <Cue notes='Cue 23. Alex triggers sequence 4.'>

          <h1>Cue 23. Alex sequence 4. </h1>

          <SoundCue src={sounds.upload} />

        </Cue>

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

        <Cue notes='Puzzle solved. Lockdown releases.'>

          <h1>Puzzle Solved. Lockdown releases.</h1>
          <h3>Script ref 166.</h3>

          <CueServerOut cueId='post-show' />

        </Cue>

      </Deck>
    );
  }

  /*render() {
    return (

      <Deck theme={theme} progress="number" >

        <Slide>
          <h1>slide ONE.</h1>
          <img src={images.moths}/>
        </Slide>

        <Slide>
          <SoundCue src={sounds.vista_friendly_2}/>
          <img src={images.alex1} width="400px"/>
        </Slide>

        <Slide>
          <img src={images.tribble} width="400px"/>
        </Slide>

        <Cue notes='Black' bgColor='#ffa'>
          <h1>CUE. I am slide FOUR</h1>
          <img src={images.evolution} width="400px"/>
          <CueServerOut cueId='vistas-exit-popper' delay={3.3}/>
        </Cue>

        <Cue notes='CUE WHOAH' bgColor='#4f7'>
          <h2>CUE whowah</h2>
          <h1>I am slide FIVE</h1>
          <img src={images.moths} width="400px"/>
          <SoundCue src={sounds.boink} delay={1.5}/>
        </Cue>

        <Cue notes='Slide notes here.'>
          <h1>Ain't no chore, I am slide SIX</h1>
          <img src={images.sequence2} width="400px"/>
          <SoundCue src={sounds.bagpipe}/>
        </Cue>

      </Deck>
    );
  }*/
}
