// Import React
import React from 'react';

// Import Spectacle Core tags
import Cue from './components/Cue';
import Deck from './components/deck';
import Slide from './components/slide';
import Screen from './components/Screen';

import SoundCue from './components/SoundCue';
import VideoCue from './components/VideoCue';
import Visualization from './components/Visualization';
import CueServerOut from './components/CueServerOut';
import Lookup from './api/CueServerLookup';

import {images, sounds, videos} from './assets/assets';

// Import theme
import createTheme from './themes/default';

// Require CSS
require('normalize.css');
require('./assets/css/show.css');

const theme = createTheme(
  {
    primary: '#000000',
    secondary: '#F74358',
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

        {/* Empty first cue */}
        <Cue notes='Empty first cue'>

          <CueServerOut cueId={Lookup.PRE_SHOW} />

        </Cue>

        {/* Pre show */}
        <Cue notes='Pre-show lighting. Audience entering.'>

          <CueServerOut cueId={Lookup.PRE_SHOW} />

        </Cue>

        {/* Show Start. VO Intro. */}
        <Cue notes='Stage lights. Presentation begins. VO.'>

          <SoundCue src={sounds.VO_001} />

          <CueServerOut cueId={Lookup.SHOW_START} />

        </Cue>

        {/* It wasn't that funny. */}
        <Cue notes='VO: It wasnt that funny'>

          <SoundCue src={sounds.VO_003} />

        </Cue>

        {/* Alex Intro */}
        <Cue notes='Alex Intro'>

          <Screen output='primary'>
            <img src={images.alex1}/>
          </Screen>

          <SoundCue src={sounds.alex_intro} />

        </Cue>

        {/* Stop intro music */}
        <Cue notes='Stop music'>

          <Screen output='primary'>
            <img src={images.alex1}/>
          </Screen>

        </Cue>

        {/* Highlight Easel */}
        <Cue notes='Highlight Easel'>

          <h2 className='debug'>HIGHLIGHT_EASEL</h2>
          <CueServerOut cueId={Lookup.HIGHLIGHT_EASEL} />

        </Cue>

        {/* What does the Fox Say!? */}
        <Cue notes='What Does the Fox Say?!'>

          <Screen output='primary'>
            <img src={images.whatthefoxsay} width='1920px'/>
          </Screen>

          <SoundCue src={sounds.whatthefoxsay} />

        </Cue>

        {/* Empty */}
        <Cue notes='Empty'>

        </Cue>

        {/* Highlight Cages */}
        <Cue notes='Highlight Cages'>

          <CueServerOut cueId={Lookup.HIGHLIGHT_CAGES} />
          <h2 className='debug'>HIGHLIGHT_CAGES</h2>

        </Cue>

        {/* Vista Cooing */}
        <Cue notes='Vistas cooing'>

          <SoundCue src={sounds.vista_friendly_1}/>
          <SoundCue src={sounds.vista_friendly_2}/>

        </Cue>

        {/* Family Tree */}
        <Cue notes='Tribble/Pygmy family tree.'>

          <Screen output='primary' lifepan={10.0}>
            <img src={images.tribble} width='1920px'/>
          </Screen>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* VO: Should any cage open... */}
        <Cue notes='VO: Should any cage open...'>

          <SoundCue src={sounds.VO_034}/>

        </Cue>


        {/* Empty */}
        <Cue notes='Empty'>

        </Cue>

        {/* Theory of Evolution */}
        <Cue notes='Theory of Evolution'>

          <Screen output='primary' lifespan={10.0}>
            <img src={images.evolution} width='1920px'/>
          </Screen>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* Empty */}
        <Cue notes='Empty'>

        </Cue>

        {/* Alex Sequence 1 */}
        <Cue notes='Alex shows sequence 1'>

          <Screen output='primary'>
            <VideoCue src={videos.sequence1} />
          </Screen>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* Empty */}
        <Cue notes='Empty'>

        </Cue>

        {/* Single Vista friendly sound. */}
        <Cue notes='Single Vista friendly sound.'>

          <SoundCue src={sounds.vista_friendly_1} />

        </Cue>

        {/* Vista gobbles sandwich */}
        <Cue notes='Vista gobbles sandwich.'>

          <SoundCue src={sounds.vista_gobble} />

        </Cue>

        {/* Vista burp */}
        <Cue notes='Vista burp interruption.'>

          <SoundCue src={sounds.vista_burp} />

        </Cue>

        {/* Evaluation part 1 */}
        <Cue notes='Evaluation part ONE'>

          <Screen output='primary'>

            <img src={images.badges_none} className='fs-image'/>

            <p className='evaluation'>
              Variation’s the name of this <span className='highlight'>game</span><br/>
              Everything has it, wild or <span className='highlight'>tame</span><br/>
              In any group<br/>
              School, flock, or troupe<br/>
              Individuals are not all the <span className='highlight'>____.</span>
            </p>

          </Screen>

          <SoundCue src={sounds.VO_060} />
          <SoundCue src={sounds.quiz} delay={15.25} />

        </Cue>

        {/* Correct Answer 1. */}
        <Cue notes='Correct answer. Part 1 (V).'>

          <Screen output='primary' lifespan={8.0}>

            <img src={images.badges_none} className='fs-image'/>
            <img src={images.badges_v} className='fs-image'/>

            <p className='evaluation'>
              Variation’s the name of this <span className='highlight'>game</span><br/>
              Everything has it, wild or <span className='highlight'>tame</span><br/>
              In any group<br/>
              School, flock, or troupe<br/>
              Individuals are not all the <span className='highlight'>same.</span>
            </p>

          </Screen>

          <SoundCue src={sounds.VO_061} delay={1.0} />
          <SoundCue src={sounds.correct_answer_1} />

        </Cue>


        {/* Alex sequence 2 */}
        <Cue notes='Alex triggers sequence 2'>

          <Screen output='primary'>
            <VideoCue src={videos.sequence2} width='1920px'/>
          </Screen>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* Empty */}
        <Cue notes='Empty'>

        </Cue>


        {/* Evaluation part 2 */}
        <Cue notes='Evaluation part 2'>

          <Screen output='primary'>

            <img src={images.badges_none} className='fs-image'/>
            <img src={images.badges_v} className='fs-image'/>

            <p className='evaluation'>
              You can have the best traits ever <span className='highlight'>seen</span><br/>
              But if you covet them, what does it <span className='highlight'>mean?</span><br/>
              You can’t evolve on your own<br/>
              So remember, when you’re grown,<br/>
              You simply must pass on your <span className='highlight'>_____.</span>
            </p>

          </Screen>

          <SoundCue src={sounds.VO_073} />
          <SoundCue src={sounds.quiz} delay={14} />

        </Cue>

        {/* Correct answer 2. (I) */}
        <Cue notes='Correct answer 2 (I)'>

          <Screen output='primary' lifespan={8.0}>

            <img src={images.badges_none} className='fs-image'/>
            <img src={images.badges_i} className='fs-image'/>

            <p className='evaluation'>
              You can have the best traits ever <span className='highlight'>seen</span><br/>
              But if you covet them, what does it <span className='highlight'>mean?</span><br/>
              You can’t evolve on your own<br/>
              So remember, when you’re grown,<br/>
              You simply must pass on your <span className='highlight'>genes.</span>
            </p>

          </Screen>

          <SoundCue src={sounds.VO_074} delay={1.0} />
          <SoundCue src={sounds.correct_answer_2} />

        </Cue>

        {/* Alex sequence 3 */}
        <Cue notes='Alex triggers Sequence 3'>

          <Screen output='primary'>
            <VideoCue src={videos.sequence3} width='1920px'/>
          </Screen>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* Empty */}
        <Cue notes='Empty'>

        </Cue>

        {/* Evaluation part 3 */}
        <Cue notes='Evaluation part 3.'>

          <Screen output='primary'>

            <img src={images.badges_none} className='fs-image'/>
            <img src={images.badges_i} className='fs-image'/>

            <p className='evaluation'>
              Take a moment’s <span className='highlight'>reflection</span><br/>
              On the effects of <span className='highlight'>selection:</span><br/>
              Good traits pass on<br/>
              And bad ones get gone<br/>
              To improve survival, not achieve <span className='highlight'>__________.</span>
            </p>

          </Screen>

          <SoundCue src={sounds.VO_083} />
          <SoundCue src={sounds.quiz} delay={13} />

        </Cue>

        {/* Correct answer 3. */}
        <Cue notes='Correct answer. Part 3 (S).' lifespan={8.0}>

          <Screen output='primary' lifespan={8.0}>

            <img src={images.badges_none} className='fs-image'/>
            <img src={images.badges_s} className='fs-image'/>

            <p className='evaluation'>
              Take a moment’s <span className='highlight'>reflection</span><br/>
              On the effects of <span className='highlight'>selection:</span><br/>
              Good traits pass on<br/>
              And bad ones get gone<br/>
              To improve survival, not achieve <span className='highlight'>perfection.</span>
            </p>

          </Screen>

          <SoundCue src={sounds.VO_084} delay={1.0} />
          <SoundCue src={sounds.correct_answer_3} />

        </Cue>

        {/* Empty */}
        <Cue notes='Empty'>

        </Cue>

        {/* Highlight Popper */}
        <Cue notes='Highlight Popper'>

          <CueServerOut cueId={Lookup.HIGHLIGHT_POPPER} />
          <h2 className='debug'>HIGHLIGHT_POPPER</h2>

        </Cue>

        {/* CAGE SET 1 */}

        {/* Vista chorus 1. Mostly unfriendly. */}
        <Cue notes='Vista chorus 1. Mostly unfriendly.'>

          <SoundCue src={sounds.vista_friendly_3} volume={0.3} delay={0.5} />
          <SoundCue src={sounds.vista_unfriendly_1} volume={0.3} delay={0.0} />
          <SoundCue src={sounds.vista_unfriendly_2} volume={0.3} delay={0.4} />
          <SoundCue src={sounds.vista_unfriendly_3} volume={0.3} delay={0.8} />
          <SoundCue src={sounds.vista_unfriendly_4} volume={0.3} delay={0.9} />

        </Cue>

        {/*  Vistas enter popper. */}
        <Cue notes='Vistas enter popper.'>

          <Screen output='secondary'>
            <Visualization startGen={0} endGen={0} startSpeed={0.1} endSpeed={0.1} />
          </Screen>

          <SoundCue src={sounds.popper} />
          <SoundCue src={sounds.vistas_popping} delay={2.0} />
          <CueServerOut cueId={Lookup.VISTAS_ENTER_POPPER} />

        </Cue>

        {/* Vistas train to vis. */}
        <Cue notes='Vistas train to vis.'>

          <Screen output='secondary'>
            <Visualization trainMode={true}/>
          </Screen>

          <CueServerOut cueId={Lookup.VISTA_TRAIN_ENTER} />
          <SoundCue src={sounds.train_swoosh_short} />

        </Cue>

        {/* Vistas enter visualization. */}
        <Cue notes='Visualization begins.'>

          <Screen output='secondary'>
            <Visualization startGen={0} endGen={5} startSpeed={0.1} endSpeed={0.1} seedVistas={[0.35, 0.2]} />
          </Screen>

          <CueServerOut cueId={Lookup.VISTAS_EXIT_POPPER} />

        </Cue>

        {/* Highlight Chute */}
        <Cue notes='Highlight Chute'>

          <Screen output='secondary'>
            <Visualization />
          </Screen>

          <CueServerOut cueId={Lookup.HIGHLIGHT_CHUTE} />
          <h2 className='debug'>HIGHLIGHT_CHUTE</h2>

        </Cue>

        {/* Vistas exit screen. Cage refill. */}
        <Cue notes='Vistas exit screen via train.'>

          <Screen output='secondary'>
            <Visualization trainMode={true}/>
          </Screen>

          <CueServerOut cueId={Lookup.VISTA_TRAIN_EXIT} />

          <SoundCue src={sounds.train_swoosh_long} />

        </Cue>

        {/* Vista-train off. Cages refill. */}
        <Cue notes='Vistas train off. Cages refill.'>

          <Screen output='secondary'>
            <Visualization/>
          </Screen>

          <SoundCue src={sounds.vista_friendly_2} volume={0.3} delay={0.4} />
          <SoundCue src={sounds.vista_friendly_3} volume={0.3} delay={0.0} />
          <SoundCue src={sounds.vista_unfriendly_2} volume={0.3} delay={0.4} />
          <SoundCue src={sounds.vista_unfriendly_3} volume={0.3} delay={0.8} />
          <SoundCue src={sounds.vista_unfriendly_4} volume={0.3} delay={0.9} />

          <CueServerOut cueId={Lookup.VISTA_TRAIN_EXIT_OFF} />

        </Cue>

        {/*  Vista growls at Alex. */}
        <Cue notes='Vista growls at Alex.'>

          <Screen output='secondary'>
            <Visualization/>
          </Screen>

          <SoundCue src={sounds.vista_unfriendly_4} />

        </Cue>

        {/* Alex sequence 4 */}
        <Cue notes='Alex triggers Sequence 4'>

          <Screen output='secondary'>
            <Visualization/>
          </Screen>

          <Screen output='primary'>
            <VideoCue src={videos.sequence4} width='1920px'/>
          </Screen>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* Empty. */}
        <Cue notes='Empty'>

          <Screen output='secondary'>
            <Visualization/>
          </Screen>

        </Cue>

        {/*  Vistas enter popper. */}
        <Cue notes='Vistas enter popper.'>

          <Screen output='secondary'>
            <Visualization/>
          </Screen>

          <SoundCue src={sounds.popper} />
          <SoundCue src={sounds.vistas_popping} delay={2.0} />
          <CueServerOut cueId={Lookup.VISTAS_ENTER_POPPER} />

        </Cue>

        {/* Vistas train to vis. */}
        <Cue notes='Vistas train to vis.'>

          <Screen output='secondary'>
            <Visualization trainMode={true}/>
          </Screen>

          <CueServerOut cueId={Lookup.VISTA_TRAIN_ENTER} />
          <SoundCue src={sounds.train_swoosh_short} />

        </Cue>

        {/* Visualization begins. */}
        <Cue notes='Visualization begins.'>

          <Screen output='secondary'>
            <Visualization startGen={5} endGen={25} startSpeed={0.1} endSpeed={1.0} seedVistas={[0.3, 0.65, 0.3, 0.4]}/>
          </Screen>

          <CueServerOut cueId={Lookup.VISTAS_EXIT_POPPER} />
          <SoundCue src={sounds.power_increasing} volume={0.4} delay={1.0} />

        </Cue>

        {/* Vistas exit screen. Cage refill. */}
        <Cue notes='Vistas exit screen via train.'>

          <Screen output='secondary'>
            <Visualization trainMode={true}/>
          </Screen>

          <CueServerOut cueId={Lookup.VISTA_TRAIN_EXIT} />

          <SoundCue src={sounds.train_swoosh_long} />

        </Cue>

        {/* Vista-train off. Cages refill. */}
        <Cue notes='Vistas train off. Cages refill.'>

          <Screen output='secondary'>
            <Visualization/>
          </Screen>

          <SoundCue src={sounds.vista_friendly_3} volume={0.3} delay={0.6} />
          <SoundCue src={sounds.vista_friendly_1} volume={0.3} delay={0.0} />
          <SoundCue src={sounds.vista_friendly_4} volume={0.3} delay={0.2} />
          <SoundCue src={sounds.vista_unfriendly_3} volume={0.2} delay={0.5} />
          <SoundCue src={sounds.vista_unfriendly_4} volume={0.3} delay={0.1} />

          <CueServerOut cueId={Lookup.VISTA_TRAIN_EXIT_OFF} />

        </Cue>

        {/*  Vistas enter popper. */}
        <Cue notes='Vistas enter popper.'>

          <Screen output='secondary'>
            <Visualization/>
          </Screen>

          <SoundCue src={sounds.popper} />
          <SoundCue src={sounds.vistas_popping} delay={2.0} />
          <CueServerOut cueId={Lookup.VISTAS_ENTER_POPPER} />

        </Cue>

        {/* Vistas train to vis. */}
        <Cue notes='Vistas train to vis.'>

          <Screen output='secondary'>
            <Visualization trainMode={true}/>
          </Screen>

          <CueServerOut cueId={Lookup.VISTA_TRAIN_ENTER} />
          <SoundCue src={sounds.train_swoosh_short} />

        </Cue>

        {/* Visualization begins. */}
        <Cue notes='Visualization begins.'>

          <Screen output='secondary'>
            <Visualization startGen={25} endGen={50} startSpeed={1.0} endSpeed={1.0} seedVistas={[0.65, 0.7, 0.5, 0.35, 0.75, 0.6, 0.6, 0.53]} />
          </Screen>

          <CueServerOut cueId={Lookup.VISTAS_EXIT_POPPER} />

        </Cue>

        {/* Vistas chute dump. */}
        <Cue notes='Chute dump'>

          <Screen output='secondary'>
            <Visualization startSpeed={1.0}  />
          </Screen>

          <SoundCue src={sounds.chute_dump} />

        </Cue>

        {/* Vistas exit screen. Cage refill. */}
        <Cue notes='Vistas exit screen via train.'>

          <Screen output='secondary'>
            <Visualization trainMode={true}/>
          </Screen>

          <CueServerOut cueId={Lookup.VISTA_TRAIN_EXIT} />

          <SoundCue src={sounds.train_swoosh_long} />

        </Cue>

        {/* Vista-train off. Cages refill. */}
        <Cue notes='Vistas train off. Cages refill.'>

          <Screen output='secondary'>
            <Visualization/>
          </Screen>

          <SoundCue src={sounds.vista_friendly_1} volume={0.3} delay={0.4} />
          <SoundCue src={sounds.vista_friendly_2} volume={0.3} delay={0.0} />
          <SoundCue src={sounds.vista_unfriendly_2} volume={0.2} delay={0.4} />
          <SoundCue src={sounds.vista_friendly_3} volume={0.3} delay={0.2} />

          <CueServerOut cueId={Lookup.VISTA_TRAIN_EXIT_OFF} />

        </Cue>

        {/* Evaluation part 4 */}
        <Cue notes='Evaluation part 4'>

          <Screen output='primary'>

            <img src={images.badges_none} className='fs-image'/>
            <img src={images.badges_s} className='fs-image'/>

            <p className='evaluation'>
              Whenever a new feature <span className='highlight'>appears,</span><br/>
              Like long hair, sharp teeth, or big <span className='highlight'>ears,</span><br/>
              Not all will have the trait<br/>
              First, genes must accumulate<br/>
              And that can take thousands of <span className='highlight'>_____.</span>
            </p>

          </Screen>

          <SoundCue src={sounds.VO_115} />
          <SoundCue src={sounds.quiz} delay={15} />

        </Cue>

        {/* Correct answer. Part 4 (T) */}
        <Cue notes='Correct answer. Part FOUR (T)'>

          <Screen output='primary' lifespan={8.0}>

            <img src={images.badges_none} className='fs-image'/>
            <img src={images.badges_t} className='fs-image'/>

            <p className='evaluation'>
              Whenever a new feature <span className='highlight'>appears,</span><br/>
              Like long hair, sharp teeth, or big <span className='highlight'>ears,</span><br/>
              Not all will have the trait<br/>
              First, genes must accumulate<br/>
              And that can take thousands of <span className='highlight'>years.</span>
            </p>

          </Screen>

          <SoundCue src={sounds.VO_116}  delay={1.0} />
          <SoundCue src={sounds.correct_answer_4} />

        </Cue>

        {/* Alex sequence 5 */}
        <Cue notes='Alex triggers Sequence 5'>

          <Screen output='primary'>
            <VideoCue src={videos.sequence5} width='1920px'/>
          </Screen>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* Empty */}
        <Cue notes='Empty'>

        </Cue>

        {/* Evaluation part 5 */}
        <Cue notes='Evaluation part 5'>

          <Screen output='primary'>

            <img src={images.badges_none} className='fs-image'/>
            <img src={images.badges_t} className='fs-image'/>

            <p className='evaluation'>
              There’s no perfection, no goal, and no <span className='highlight'>win</span><br/>
              You just pass your traits on to your <span className='highlight'>kin</span><br/>
              The useful genes in you<br/>
              Help your species continue<br/>
              Adapting to the environment it’s <span className='highlight'>__.</span>
            </p>

          </Screen>

          <SoundCue src={sounds.VO_127} />
          <SoundCue src={sounds.quiz} delay={14.5} />

        </Cue>

        {/* Correct answer. Part 5 (A) */}
        <Cue notes='Correct answer. Part 5 (A)'>

          <Screen output='primary' lifespan={8.0}>

            <img src={images.badges_none} className='fs-image'/>
            <img src={images.badges_a} className='fs-image'/>

            <p className='evaluation'>
              There’s no perfection, no goal, and no <span className='highlight'>win</span><br/>
              You just pass your traits on to your <span className='highlight'>kin</span><br/>
              The useful genes in you<br/>
              Help your species continue<br/>
              Adapting to the environment it’s <span className='highlight'>in.</span>
            </p>

          </Screen>

          <SoundCue src={sounds.fanfare} />
          <SoundCue src={sounds.VO_128} delay={2.5}/>

        </Cue>

        {/* Unplug Blackout */}
        <Cue notes='Unplug Blackout'>

          <SoundCue src={sounds.power_down} />
          <SoundCue src={sounds.cages_open} delay={0.75} />
          <SoundCue src={sounds.vistas_dropping} delay={2.5} />

          <CueServerOut cueId={Lookup.UNPLUG_BLACKOUT} delay={1.5} />

        </Cue>

        {/* Vistas escape through door. */}
        <Cue notes='Vistas escape through door.'>

          <SoundCue src={sounds.vistas_escape} />

        </Cue>


        {/* Plug in lockdown */}
        <Cue notes='Lockdown on plug in.'>

          <Screen output='primary'>
            <h1 className='text-fullscreen' >ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <Screen output='secondary'>
            <h1 className='text-fullscreen' >ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <CueServerOut cueId={Lookup.PLUG_IN_LOCKDOWN} />

          <SoundCue src={sounds.lockdown} />
          <SoundCue src={sounds.alarm} delay={0.5} />
          <SoundCue src={sounds.VO_142} delay={3.5} />

        </Cue>

        <Cue notes='And whose fault is that?'>

          <Screen output='primary'>
            <h1 className='text-fullscreen' >ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <Screen output='secondary'>
            <h1 className='text-fullscreen' >ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <SoundCue src={sounds.VO_144} />

        </Cue>

        <Cue notes='I cant. To ensure...'>

          <Screen output='primary'>
            <h1 className='text-fullscreen' >ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <Screen output='secondary'>
            <h1 className='text-fullscreen' >ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <SoundCue src={sounds.VO_150} />

        </Cue>

        <Cue notes='Yes. I understand your problem. '>

          <Screen output='primary'>
            <h1 className='text-fullscreen' >ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <Screen output='secondary'>
            <h1 className='text-fullscreen' >ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <SoundCue src={sounds.VO_152} />

        </Cue>

        <Cue notes='Override codes are changed daily'>

          <Screen output='primary'>
            <h1 className='text-fullscreen' >ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <Screen output='secondary'>
            <h1 className='text-fullscreen' >ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <SoundCue src={sounds.VO_157} />

        </Cue>

        <Cue notes='No. I was simply communicating...'>

          <Screen output='primary'>
            <h1 className='text-fullscreen' >ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <Screen output='secondary'>
            <h1 className='text-fullscreen' >ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <SoundCue src={sounds.VO_159} />

        </Cue>

        {/* Lockdown release after puzzle */}
        <Cue notes='Lockdown release on puzzle solved.'>

          <Screen output='primary'>
            <h1 className='text-fullscreen success' >ISOLATION MODE: DISENGAGED</h1>
          </Screen>

          <Screen output='secondary'>
            <h1 className='text-fullscreen success' >ISOLATION MODE: DISENGAGED</h1>
          </Screen>

          <SoundCue src={sounds.unlock} />
          <SoundCue src={sounds.unlock} delay={0.2}/>
          <SoundCue src={sounds.VO_161} delay={0.35}/>

          <CueServerOut cueId={Lookup.LOCKDOWN_RELEASE} />

        </Cue>

        {/* Post show. Audience extits. */}
        <Cue notes='Post show. Audience exits.'>

          <CueServerOut cueId={Lookup.POST_SHOW} />
          <h2 className='debug'>Post show. Audience exits.</h2>

        </Cue>


      </Deck>
    );
  }

}
