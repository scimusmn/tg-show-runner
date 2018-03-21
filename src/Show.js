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

        {/* Pre show */}
        <Cue notes='Pre-show lighting. Audience entering.'>

          <h1>Cue 1 Pre-show</h1>

          <CueServerOut cueId={Lookup.PRE_SHOW} />

        </Cue>


        {/* TEMP */}
        {/* TEMP */}
        {/* TEMP */}
        {/* TEMP */}
        {/* TEMP */}
        <Cue notes='Empty'>

        </Cue>

        {/* TEMP VIS 1 */}
        <Cue notes='Vis 1'>

          <Screen output='secondary'>
            <Visualization startGen={0} endGen={2} startSpeed={0.1} endSpeed={0.1} seedVistas={[0.14, 0.86]} />
          </Screen>

        </Cue>

        {/* TEMP */}
        <Cue notes='Empty'>

        </Cue>

        {/* TEMP VIS 2 */}
        <Cue notes='Empty'>

          <Screen output='secondary'>
            <Visualization startGen={2} endGen={12} startSpeed={0.1} endSpeed={0.95} seedVistas={[0.7, 0.2, 0.4, 0.4, 0.3]} />
          </Screen>

        </Cue>

        {/* TEMP */}
        <Cue notes='Empty'>

        </Cue>

        {/* TEMP VIS 2 */}
        <Cue notes='Empty'>

          <Screen output='secondary'>
            <Visualization startGen={12} endGen={24} startSpeed={0.95} endSpeed={0.95} seedVistas={[0.2, 0.5, 0.6, 0.1, 0.7, 0.9]} />
          </Screen>

        </Cue>

        {/* TEMP */}
        <Cue notes='Empty'>

        </Cue>

        {/* TEMP */}
        {/* TEMP */}
        {/* TEMP */}


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
            <img src={images.alex1} width='900px'/>
          </Screen>

          <SoundCue src={sounds.alex_intro} />

        </Cue>

        {/* Highlight Easel */}
        <Cue notes='Highlight Easel'>

          <h2 className='debug'>HIGHLIGHT_EASEL</h2>
          <CueServerOut cueId={Lookup.HIGHLIGHT_EASEL} />

        </Cue>

        {/* What does the Fox Say!? */}
        <Cue notes='What Does the Fox Say?!'>

          <Screen output='primary'>
            <img src={images.whatthefoxsay} width='900px'/>
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

          <Screen output='primary' lifepan={15.0}>
            <img src={images.tribble} width='900px'/>
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

          <Screen output='primary' lifespan={15.0}>
            <img src={images.evolution} width='900px'/>
          </Screen>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* Empty */}
        <Cue notes='Empty'>

        </Cue>

        {/* Alex Sequence 1 */}
        <Cue notes='Alex shows sequence 1'>

          <Screen output='primary'>
            <VideoCue src={videos.video1} />
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

          <Screen output='secondary'>

            <h1>
              [ - - - - - ]
            </h1>

            <p>
              Variation’s the name of this game<br/>
              Everything has it, wild or tame<br/>
              In any group<br/>
              School, flock, or troupe<br/>
              Individuals are not all the _______.
            </p>

          </Screen>

          <SoundCue src={sounds.VO_060} />
          <SoundCue src={sounds.quiz} delay={14} />

        </Cue>

        {/* Correct Answer 1. */}
        <Cue notes='Correct answer. Part 1 (V).'>

          <Screen output='secondary'>

            <h1>
              [ V - - - - ]
            </h1>

          </Screen>

          <SoundCue src={sounds.VO_061} delay={1.0} />
          <SoundCue src={sounds.correct_answer_1} />

        </Cue>


        {/* Alex sequence 2 */}
        <Cue notes='Alex triggers sequence 2'>

          <Screen output='primary'>
            <VideoCue src={videos.video2} />
          </Screen>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* Empty */}
        <Cue notes='Empty'>

        </Cue>


        {/* Evaluation part 2 */}
        <Cue notes='Evaluation part 2'>

          <Screen output='secondary'>

            <h1>
              [ V - - - - ]
            </h1>

            <p>
              You can have the best traits ever seen<br/>
              But if you covet them, what does it mean?<br/>
              You can’t evolve on your own<br/>
              So remember, when you’re grown,<br/>
              You simply must pass on your ________.
            </p>

          </Screen>

          <SoundCue src={sounds.VO_073} />
          <SoundCue src={sounds.quiz} delay={12} />

        </Cue>

        {/* Correct answer 2. (I) */}
        <Cue notes='Correct answer 2 (I)'>

          <Screen output='secondary'>

            <h1>
              [ V I - - - ]
            </h1>

          </Screen>

          <SoundCue src={sounds.VO_074} delay={1.0} />
          <SoundCue src={sounds.correct_answer_2} />

        </Cue>

        {/* Alex sequence 3 */}
        <Cue notes='Alex triggers Sequence 3'>

          <Screen output='primary'>
            <VideoCue src={videos.video3} />
          </Screen>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* Empty */}
        <Cue notes='Empty'>

        </Cue>

        {/* Evaluation part 3 */}
        <Cue notes='Evaluation part 3.'>

          <Screen output='secondary'>

            <h1>
              [ V I - - - ]
            </h1>

            <p>
              Take a moment’s reflection<br/>
              On that brutal election<br/>
              Where good traits pass on<br/>
              And bad ones get gone<br/>
              It’s the process we call __________.
            </p>

          </Screen>

          <SoundCue src={sounds.VO_083} />
          <SoundCue src={sounds.quiz} delay={10.5} />

        </Cue>

        {/* Correct answer 3. */}
        <Cue notes='Correct answer. Part 3 (S).'>

          <Screen output='secondary'>

            <h1>
              [ V I S - - ]
            </h1>

          </Screen>

          <SoundCue src={sounds.VO_084} delay={1.0} />
          <SoundCue src={sounds.correct_answer_3} />

        </Cue>

        {/* Highlight Popper */}
        <Cue notes='Highlight Popper'>

          <CueServerOut cueId={Lookup.HIGHLIGHT_POPPER} />
          <h2 className='debug'>HIGHLIGHT_POPPER</h2>

        </Cue>

        {/* CAGE SET 1 */}

        {/* Vista chorus 1. Mostly unfriendly. */}
        <Cue notes='Vista chorus 1. Mostly unfriendly.'>

          <SoundCue src={sounds.vista_friendly_3} delay={0.5} />
          <SoundCue src={sounds.vista_unfriendly_1} delay={0.0} />
          <SoundCue src={sounds.vista_unfriendly_2} delay={0.4} />
          <SoundCue src={sounds.vista_unfriendly_3} delay={0.8} />
          <SoundCue src={sounds.vista_unfriendly_4} delay={0.9} />

        </Cue>

        {/*  Vistas enter popper. */}
        <Cue notes='Vistas enter popper.'>

          <SoundCue src={sounds.popper} />
          <SoundCue src={sounds.vistas_popping} delay={2.0} />
          <CueServerOut cueId={Lookup.VISTAS_ENTER_POPPER} />

        </Cue>

        {/* Vistas exit popper. */}
        <Cue notes='Vistas exit popper. Visualization begins.'>

          <Screen output='secondary'>
            <h3>Visualization begins.<br/>Generations pass.</h3>
            <img src={images.vis_interface} width='200px'/>
          </Screen>

          <CueServerOut cueId={Lookup.VISTAS_EXIT_POPPER} />
          <SoundCue src={sounds.train_swoosh_short} />

        </Cue>

        {/* Highlight Chute */}
        <Cue notes='Highlight Chute'>

          <CueServerOut cueId={Lookup.HIGHLIGHT_CHUTE} />
          <h2 className='debug'>HIGHLIGHT_CHUTE</h2>

        </Cue>

        {/* Vistas chute dump. */}
        <Cue notes='Chute dump'>

          <SoundCue src={sounds.chute_dump} />

        </Cue>

        {/* Vistas exit screen. Cage refill. */}
        <Cue notes='Vistas exit screen. Cage refill.'>

          <Screen output='secondary'>
            <h2>20 Vistas exit screen back to cages.</h2>
          </Screen>

          <CueServerOut cueId={Lookup.VISTAS_EXIT_SCREEN} />

          <SoundCue src={sounds.train_swoosh_long} />

        </Cue>

        {/*  Vista growls at Alex. */}
        <Cue notes='Vista growls at Alex.'>

          <SoundCue src={sounds.vista_unfriendly_4} />

        </Cue>

        {/* Alex sequence 4 */}
        <Cue notes='Alex triggers Sequence 4'>

          <Screen output='primary'>
            <img src={images.sequence4} width='900px'/>
          </Screen>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* Empty. */}
        <Cue notes='Empty'>

        </Cue>

        {/* CAGE SET 2 */}

        {/* Vista chorus 2. Majority unfriendly. */}
        <Cue notes='Vista chorus 2. Majority unfriendly.'>

          <SoundCue src={sounds.vista_friendly_2} delay={0.4} />
          <SoundCue src={sounds.vista_friendly_3} delay={0.0} />
          <SoundCue src={sounds.vista_unfriendly_2} delay={0.4} />
          <SoundCue src={sounds.vista_unfriendly_3} delay={0.8} />
          <SoundCue src={sounds.vista_unfriendly_4} delay={0.9} />

        </Cue>

        {/*  Vistas enter popper. */}
        <Cue notes='Vistas enter popper.'>

          <SoundCue src={sounds.popper} />
          <SoundCue src={sounds.vistas_popping} delay={2.0} />
          <CueServerOut cueId={Lookup.VISTAS_ENTER_POPPER} />

        </Cue>

        {/* Vistas exit popper. */}
        <Cue notes='Vistas exit popper. Visualization begins.'>

          <Screen output='secondary'>
            <h3>Visualization begins.<br/>Generations pass.</h3>
            <img src={images.vis_interface} width='200px'/>
          </Screen>

          <CueServerOut cueId={Lookup.VISTAS_EXIT_POPPER} />
          <SoundCue src={sounds.train_swoosh_short} />

        </Cue>

        {/* Generation speed crank. */}
        <Cue notes='Generation speed ramps up.'>

          <Screen output='secondary'>
            <h1>Generation speed ramps up.</h1>
            <h2>...Generations pass...</h2>
          </Screen>

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

        {/* Vistas chute dump. */}
        <Cue notes='Chute dump'>

          <SoundCue src={sounds.chute_dump} />

        </Cue>

        {/* Vistas exit screen. Cage refill. */}
        <Cue notes='Vistas exit screen. Cage refill.'>

          <Screen output='secondary'>
            <h2>20 Vistas exit screen back to cages.</h2>
          </Screen>

          <CueServerOut cueId={Lookup.VISTAS_EXIT_SCREEN} />

          <SoundCue src={sounds.train_swoosh_long} />

        </Cue>

        {/* CAGE SET 3 */}

        {/* Vista chorus 3. Mixed friendly/unfriendly. */}
        <Cue notes='Vista chorus 3. Mixed friendly/unfriendly.'>

          <SoundCue src={sounds.vista_friendly_3} delay={0.4} />
          <SoundCue src={sounds.vista_friendly_1} delay={0.0} />
          <SoundCue src={sounds.vista_friendly_4} delay={0.4} />
          <SoundCue src={sounds.vista_unfriendly_3} delay={0.8} />
          <SoundCue src={sounds.vista_unfriendly_4} delay={0.9} />

        </Cue>

        {/*  Vistas enter popper. */}
        <Cue notes='Vistas enter popper.'>

          <SoundCue src={sounds.popper} />
          <SoundCue src={sounds.vistas_popping} delay={2.0} />
          <CueServerOut cueId={Lookup.VISTAS_ENTER_POPPER} />

        </Cue>

        {/* Vistas exit popper. */}
        <Cue notes='Vistas exit popper. Visualization begins.'>

          <Screen output='secondary'>
            <h3>Visualization begins.<br/>Generations pass.</h3>
            <img src={images.vis_interface} width='200px'/>
          </Screen>

          <CueServerOut cueId={Lookup.VISTAS_EXIT_POPPER} />
          <SoundCue src={sounds.train_swoosh_short} />

        </Cue>

        {/* Vistas chute dump. */}
        <Cue notes='Chute dump'>

          <SoundCue src={sounds.chute_dump} />

        </Cue>

        {/* Vistas exit screen. Cage refill. */}
        <Cue notes='Vistas exit screen. Cage refill.'>

          <Screen output='secondary'>
            <h2>20 Vistas exit screen back to cages.</h2>
          </Screen>

          <CueServerOut cueId={Lookup.VISTAS_EXIT_SCREEN} />

          <SoundCue src={sounds.train_swoosh_long} />

        </Cue>

        {/* CAGE SET 4 */}

        {/* Vista chorus 4. Majority friendly. */}
        <Cue notes='Vista chorus 4. Majority friendly.'>

          <SoundCue src={sounds.vista_friendly_1} delay={0.4} />
          <SoundCue src={sounds.vista_friendly_2} delay={0.0} />
          <SoundCue src={sounds.vista_unfriendly_2} delay={0.4} />
          <SoundCue src={sounds.vista_friendly_4} delay={0.8} />
          <SoundCue src={sounds.vista_friendly_3} delay={0.9} />

        </Cue>

        {/*  Vistas enter popper. */}
        <Cue notes='Vistas enter popper.'>

          <SoundCue src={sounds.popper} />
          <SoundCue src={sounds.vistas_popping} delay={2.0} />
          <CueServerOut cueId={Lookup.VISTAS_ENTER_POPPER} />

        </Cue>

        {/* Vistas exit popper. */}
        <Cue notes='Vistas exit popper. Visualization begins.'>

          <Screen output='secondary'>
            <h3>Visualization begins.<br/>Generations pass.</h3>
            <img src={images.vis_interface} width='200px'/>
          </Screen>

          <CueServerOut cueId={Lookup.VISTAS_EXIT_POPPER} />
          <SoundCue src={sounds.train_swoosh_short} />

        </Cue>

        {/* Vistas chute dump. */}
        <Cue notes='Chute dump'>

          <SoundCue src={sounds.chute_dump} />

        </Cue>

        {/* Vistas exit screen. Cage refill. */}
        <Cue notes='Vistas exit screen. Cage refill.'>

          <Screen output='secondary'>
            <h2>20 Vistas exit screen back to cages.</h2>
          </Screen>

          <CueServerOut cueId={Lookup.VISTAS_EXIT_SCREEN} />

          <SoundCue src={sounds.train_swoosh_long} />

        </Cue>


        {/* Evaluation part 4 */}
        <Cue notes='Evaluation part 4'>

          <Screen output='secondary'>

            <h1>
              [ V I S - - ]
            </h1>

            <p>
              Whenever a new feature appears,<br/>
              Like long hair, sharp teeth, or big ears,<br/>
              Not all will have the trait<br/>
              First, genes must accumulate<br/>
              And that can take thousands of ________,
            </p>

          </Screen>

          <SoundCue src={sounds.VO_115} />
          <SoundCue src={sounds.quiz} delay={14} />

        </Cue>

        {/* Correct answer. Part 4 (T) */}
        <Cue notes='Correct answer. Part FOUR (T)'>

          <Screen output='secondary'>

            <h1>
              [ V I S T - ]
            </h1>

          </Screen>

          <SoundCue src={sounds.VO_116}  delay={1.0} />
          <SoundCue src={sounds.correct_answer_4} />

        </Cue>

        {/* Alex sequence 5 */}
        <Cue notes='Alex triggers Sequence 5'>

          <Screen output='primary'>
            <img src={images.sequence5} width='900px'/>
          </Screen>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* Empty */}
        <Cue notes='Empty'>

        </Cue>

        {/* Evaluation part 5 */}
        <Cue notes='Evaluation part 5'>

          <Screen output='secondary'>

            <h1>
              [ V I S T - ]
            </h1>

            <p>
              Remember, you cannot control<br/>
              How evolution fulfills its role.<br/>
              Species may get stronger,<br/>
              Faster, shorter, or longer<br/>
              To simply adapt is the real  ________,
            </p>

          </Screen>

          <SoundCue src={sounds.VO_127} />
          <SoundCue src={sounds.quiz} delay={13} />

        </Cue>

        {/* Correct answer. Part 5 (A) */}
        <Cue notes='Correct answer. Part 5 (A)'>

          <Screen output='secondary'>

            <h1>
              [ V I S T A ]
            </h1>

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
            <h1>ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <Screen output='secondary'>
            <h1>ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <CueServerOut cueId={Lookup.PLUG_IN_LOCKDOWN} />

          <SoundCue src={sounds.lockdown} />
          <SoundCue src={sounds.alarm} delay={0.5} />
          <SoundCue src={sounds.VO_142} delay={3.5} />

        </Cue>

        <Cue notes='And whose fault is that?'>

          <Screen output='primary'>
            <h1>ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <Screen output='secondary'>
            <h1>ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <SoundCue src={sounds.VO_144} />

        </Cue>

        <Cue notes='Isolation mode engaged.'>

          <Screen output='primary'>
            <h1>ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <Screen output='secondary'>
            <h1>ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <SoundCue src={sounds.VO_146} />

        </Cue>

        <Cue notes='Isolation mode[interrupted]'>

          <Screen output='primary'>
            <h1>ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <Screen output='secondary'>
            <h1>ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <SoundCue src={sounds.VO_148} />

        </Cue>

        <Cue notes='You dont. To ensure...'>

          <Screen output='primary'>
            <h1>ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <Screen output='secondary'>
            <h1>ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <SoundCue src={sounds.VO_150} />

        </Cue>

        <Cue notes='Yes. I understand your problem. '>

          <Screen output='primary'>
            <h1>ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <Screen output='secondary'>
            <h1>ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <SoundCue src={sounds.VO_152} />

        </Cue>

        <Cue notes='Override codes are changed daily'>

          <Screen output='primary'>
            <h1>ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <Screen output='secondary'>
            <h1>ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <SoundCue src={sounds.VO_157} />

        </Cue>

        <Cue notes='No. I was simply communicating...'>

          <Screen output='primary'>
            <h1>ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <Screen output='secondary'>
            <h1>ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <SoundCue src={sounds.VO_159} />

        </Cue>

        {/* Lockdown release after puzzle */}
        <Cue notes='Lockdown release on puzzle solved.'>

          <Screen output='primary'>
            <h1>ISOLATION MODE: DISENGAGED</h1>
          </Screen>

          <Screen output='secondary'>
            <h1>ISOLATION MODE: DISENGAGED</h1>
          </Screen>

          <SoundCue src={sounds.unlock} />
          <SoundCue src={sounds.VO_161} delay={1.5} />

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
