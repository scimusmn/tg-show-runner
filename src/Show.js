// Import React
import React from 'react';

// Import Spectacle Core tags
import Cue from './components/Cue';
import Deck from './components/deck';
import Slide from './components/slide';
import Screen from './components/Screen';

import SoundCue from './components/SoundCue';
import VideoCue from './components/VideoCue';
import TimedCaptions from './components/TimedCaptions';
import Caption from './components/Caption';
import Bee from './components/Bee';
import Visualization from './components/Visualization';
import CueServerOut from './components/CueServerOut';
import Lookup from './api/CueServerLookup';

import { images, sounds, videos } from './assets/assets';

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
    correct: '#458985',
  },
  {
    primary: 'Verdana',
    secondary: 'Helvetica',
  },
);

export default class Show extends React.Component {
  render() {
    return (

      <Deck theme={theme} progress="number">

        {/* Empty first cue */}
        <Cue notes="Empty first cue">

          <CueServerOut cueId={Lookup.PRE_SHOW} />

        </Cue>

        {/* Pre show */}
        <Cue notes="Pre-show vista noises. Audience entering.">

          <CueServerOut cueId={Lookup.PRE_SHOW} />

          <SoundCue src={sounds.vista_unfriendly_1} volume={0.15} delay={0.0} repeat={false} />

          <SoundCue src={sounds.vista_friendly_3} volume={0.125} delay={17.5} repeat />
          <SoundCue src={sounds.vista_unfriendly_1} volume={0.125} delay={19.0} repeat />
          <SoundCue src={sounds.vista_unfriendly_2} volume={0.125} delay={31.4} repeat />
          <SoundCue src={sounds.vista_unfriendly_3} volume={0.125} delay={26.8} repeat />
          <SoundCue src={sounds.vista_unfriendly_4} volume={0.125} delay={36.9} repeat />
          <SoundCue src={sounds.vista_friendly_2} volume={0.125} delay={29.5} repeat />
          <SoundCue src={sounds.vista_burp} volume={0.125} delay={69.5} repeat />

        </Cue>

        {/* Jobsworth */}
        <Cue notes="Jobsworth_2_10">

          <Screen output="secondary">
            <VideoCue src={videos.jobsworth_2_10_v2} />
          </Screen>

          <CueServerOut cueId={Lookup.SHOW_START} />

        </Cue>

        {/* Alex Intro */}
        <Cue notes="Alex Intro">

          <Screen output="primary">
            <img src={images.alex1} />
          </Screen>

          <SoundCue src={sounds.alex_intro} />

        </Cue>

        {/* Stop intro music */}
        <Cue notes="Stop music">

          <Screen output="primary">
            <img src={images.alex1} />
          </Screen>

        </Cue>

        {/* Highlight Easel */}
        <Cue notes="Highlight Easel">

          <h2 className="debug">HIGHLIGHT_EASEL</h2>
          <CueServerOut cueId={Lookup.HIGHLIGHT_EASEL} />

        </Cue>

        {/* What does the Fox Say!? */}
        <Cue notes="What Does the Fox Say?!">

          <Screen output="primary">
            <VideoCue src={videos.foxsay} />
          </Screen>

        </Cue>

        {/* Empty */}
        <Cue notes="Empty" />

        {/* Highlight Cages */}
        <Cue notes="Highlight Cages">

          <CueServerOut cueId={Lookup.HIGHLIGHT_CAGES} />
          <h2 className="debug">HIGHLIGHT_CAGES</h2>

        </Cue>

        <Cue notes="Bee: Certification">

          <Screen output='primary'>

            <Bee></Bee>

            <TimedCaptions>
                <Caption duration={6.7}>
                    If certification protocols are not followed, my biosecurity subsystem will trigger an emergency quarantine.
                </Caption>
                <Caption duration={4.2}>
                    This system is hard-wired and completely encryption-protected.
                </Caption>
            </TimedCaptions>

          </Screen>

          <SoundCue src={sounds.B_35}/>

        </Cue>


        {/* Empty */}
        <Cue notes="Empty" />

        {/* Theory of Evolution */}
        <Cue notes="Theory of Evolution">

          <Screen output="primary" lifespan={10.0}>
            <img src={images.evolution} width="1920px" />
          </Screen>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* Empty */}
        <Cue notes="Empty" />

        {/* Alex Sequence 1 */}
        <Cue notes="Alex shows sequence 1">

          <Screen output="primary">
            <VideoCue src={videos.sequence1} />
          </Screen>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* Empty */}
        <Cue notes="Empty" />

        {/* Vista burp */}
        <Cue notes="Vista burp interruption.">

          <SoundCue src={sounds.vista_burp} />

        </Cue>

        {/* Evaluation part 1 */}
        <Cue notes='Evaluation part ONE'>

          <Screen output='primary'>

            <Bee mode='evaluation-mode'></Bee>

            <p className='evaluation'>
              Variation’s the name of this <span className='highlight'>game</span><br/>
              Everything has it, wild or <span className='highlight'>tame</span><br/>
              In any group<br/>
              School, flock, or troupe<br/>
              Individuals are not all the <span className='highlight'>_____.</span>
            </p>

          </Screen>

          <SoundCue src={sounds.B_53} />
          <SoundCue src={sounds.quiz} delay={13.5} />

        </Cue>

        {/* Correct Answer 1. */}
        <Cue notes='Correct answer. Part 1 (V).'>

          <Screen output='primary' lifespan={8.0}>

            <Bee mode='evaluation-mode'></Bee>

            <p className='evaluation'>
              Variation’s the name of this <span className='highlight'>game</span><br/>
              Everything has it, wild or <span className='highlight'>tame</span><br/>
              In any group<br/>
              School, flock, or troupe<br/>
              Individuals are not all the <span className='highlight'>same.</span>
            </p>

          </Screen>

          <SoundCue src={sounds.B_54} delay={1.0} />
          <SoundCue src={sounds.correct_answer_1} />

          <CueServerOut cueId={Lookup.BADGE_V} />

        </Cue>


        {/* Alex sequence 2 */}
        <Cue notes="Alex triggers sequence 2">

          <Screen output="primary">
            <VideoCue src={videos.sequence2} width="1920px" />
          </Screen>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* Empty */}
        <Cue notes="Empty" />

        {/* Evaluation part 2 */}
        <Cue notes='Evaluation part 2'>

          <Screen output='primary'>

            <Bee mode='evaluation-mode'></Bee>

            <p className='evaluation'>
              Here’s what “inheritance” <span className='highlight'>means:</span><br/>
              A baby’s slate doesn’t start <span className='highlight'>clean.</span><br/>
              Her mom and her dad<br/>
              Passed on traits that they had,<br/>
              And her kids get some of her <span className='highlight'>______.</span>
            </p>

          </Screen>

          <SoundCue src={sounds.B_65} />
          <SoundCue src={sounds.quiz} delay={9.0} />

        </Cue>

        {/* Correct answer 2. (I) */}
        <Cue notes='Correct answer 2 (I)'>

          <Screen output='primary' lifespan={8.0}>

            <Bee mode='evaluation-mode'></Bee>

            <p className='evaluation'>
              Here’s what “inheritance” <span className='highlight'>means:</span><br/>
              A baby’s slate doesn’t start <span className='highlight'>clean.</span><br/>
              Her mom and her dad<br/>
              Passed on traits that they had,<br/>
              And her kids get some of her <span className='highlight'>genes.</span>
            </p>

          </Screen>

          <SoundCue src={sounds.B_66} delay={1.0} />
          <SoundCue src={sounds.correct_answer_2} />

          <CueServerOut cueId={Lookup.BADGE_I} />

        </Cue>

        {/* Alex sequence 3 */}
        <Cue notes="Alex triggers Sequence 3">

          <Screen output="primary">
            <VideoCue src={videos.sequence3} width="1920px" />
          </Screen>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* Empty */}
        <Cue notes="Empty" />

        {/* Evaluation part 3 */}

        <Cue notes='Evaluation part 3.'>

          <Screen output='primary'>

            <Bee mode='evaluation-mode'></Bee>

            <p className='evaluation'>
              Here’s a fact you just can’t <span className='highlight'>ignore:</span><br/>
              Useful traits get “selected <span className='highlight'>for.</span>”<br/>
              Your strength, size, stealth, or coloration<br/>
              Can help you succeed in your situation<br/>
              By surviving longer and reproducing <span className='highlight'>_____.</span>
            </p>

          </Screen>

          <SoundCue src={sounds.B_74} />
          <SoundCue src={sounds.quiz} delay={12} />

        </Cue>

        {/* Correct answer 3. */}

        <Cue notes='Correct answer. Part 3 (S).' lifespan={8.0}>

          <Screen output='primary' lifespan={8.0}>

            <Bee mode='evaluation-mode'></Bee>

            <p className='evaluation'>
              Here’s a fact you just can’t <span className='highlight'>ignore:</span><br/>
              Useful traits get “selected <span className='highlight'>for.</span>”<br/>
              Your strength, size, stealth, or coloration<br/>
              Can help you succeed in your situation<br/>
              By surviving longer and reproducing <span className='highlight'>more.</span>
            </p>

          </Screen>

          <SoundCue src={sounds.V_75} delay={1.0} />
          <SoundCue src={sounds.correct_answer_3} />

          <CueServerOut cueId={Lookup.BADGE_S} />

        </Cue>

        {/* Highlight Popper */}
        <Cue notes="Highlight Popper">

          <CueServerOut cueId={Lookup.HIGHLIGHT_POPPER} />
          <h2 className="debug">HIGHLIGHT_POPPER</h2>

        </Cue>

        {/*  Vistas enter popper. */}
        <Cue notes="Vistas enter popper.">

          <Screen output="secondary">
            <Visualization startGen={0} endGen={0} startSpeed={0.1} endSpeed={0.1} />
          </Screen>

          <SoundCue src={sounds.popper} />
          <SoundCue src={sounds.vistas_popping} delay={2.0} />
          <CueServerOut cueId={Lookup.VISTAS_ENTER_POPPER} />

        </Cue>

        {/* Vistas train to vis. */}
        <Cue notes="Vistas train to vis.">

          <Screen output="secondary">
            <Visualization trainMode="enter" />
          </Screen>

          <CueServerOut cueId={Lookup.VISTA_TRAIN_ENTER} />
          <SoundCue src={sounds.train_swoosh_short} />

        </Cue>

        {/* Vistas enter visualization. */}
        <Cue notes="Visualization begins.">

          <Screen output="secondary">
            <Visualization startGen={0} endGen={5} startSpeed={0.1} endSpeed={0.1} seedVistas={[0.35, 0.2]} />
          </Screen>

          <CueServerOut cueId={Lookup.VISTAS_EXIT_POPPER} />

        </Cue>

        {/* Vistas exit screen. Cage refill. */}
        <Cue notes="Vistas exit screen via train.">

          <Screen output="secondary">
            <Visualization trainMode="exit" />
          </Screen>

          <CueServerOut cueId={Lookup.VISTA_TRAIN_EXIT} />

          <SoundCue src={sounds.train_swoosh_long} />

        </Cue>

        {/* Vista-train off. Cages refill. */}
        <Cue notes="Vistas train off. Cages refill.">

          <Screen output="secondary">
            <Visualization />
          </Screen>

          <SoundCue src={sounds.vista_friendly_2} volume={0.3} delay={0.4} />
          <SoundCue src={sounds.vista_friendly_3} volume={0.3} delay={0.0} />
          <SoundCue src={sounds.vista_unfriendly_2} volume={0.3} delay={0.4} />
          <SoundCue src={sounds.vista_unfriendly_3} volume={0.3} delay={0.8} />
          <SoundCue src={sounds.vista_unfriendly_4} volume={0.3} delay={0.9} />

          <CueServerOut cueId={Lookup.VISTA_TRAIN_EXIT_OFF} />

        </Cue>

        {/*  Vista growls at Alex. */}
        <Cue notes="Vista growls at Alex.">

          <Screen output="secondary">
            <Visualization />
          </Screen>

          <SoundCue src={sounds.vista_unfriendly_4} />

        </Cue>

        {/* Alex sequence 4 */}
        <Cue notes="Alex triggers Sequence 4">

          <Screen output="secondary">
            <Visualization />
          </Screen>

          <Screen output="primary">
            <VideoCue src={videos.sequence4} width="1920px" />
          </Screen>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* Empty. */}
        <Cue notes="Empty">

          <Screen output="secondary">
            <Visualization />
          </Screen>

        </Cue>

        {/*  Vistas enter popper. */}
        <Cue notes="Vistas enter popper.">

          <Screen output="secondary">
            <Visualization />
          </Screen>

          <SoundCue src={sounds.popper} />
          <SoundCue src={sounds.vistas_popping} delay={2.0} />
          <CueServerOut cueId={Lookup.VISTAS_ENTER_POPPER} />

        </Cue>

        {/* Vistas train to vis. */}
        <Cue notes="Vistas train to vis.">

          <Screen output="secondary">
            <Visualization trainMode="enter" />
          </Screen>

          <CueServerOut cueId={Lookup.VISTA_TRAIN_ENTER} />
          <SoundCue src={sounds.train_swoosh_short} />

        </Cue>

        {/* Visualization begins. */}
        <Cue notes="Visualization begins.">

          <Screen output="secondary">
            <Visualization startGen={5} endGen={25} startSpeed={0.1} endSpeed={1.0} seedVistas={[0.3, 0.65, 0.3, 0.4]} />
          </Screen>

          <CueServerOut cueId={Lookup.VISTAS_EXIT_POPPER} />
          <SoundCue src={sounds.power_increasing} volume={0.4} delay={1.0} />

        </Cue>

        {/* Vistas exit screen. Cage refill. */}
        <Cue notes="Vistas exit screen via train.">

          <Screen output="secondary">
            <Visualization trainMode="exit" />
          </Screen>

          <CueServerOut cueId={Lookup.VISTA_TRAIN_EXIT} />

          <SoundCue src={sounds.train_swoosh_long} />

        </Cue>

        {/* Vista-train off. Cages refill. */}
        <Cue notes="Vistas train off. Cages refill.">

          <Screen output="secondary">
            <Visualization />
          </Screen>

          <SoundCue src={sounds.vista_friendly_3} volume={0.3} delay={0.6} />
          <SoundCue src={sounds.vista_friendly_1} volume={0.3} delay={0.0} />
          <SoundCue src={sounds.vista_friendly_4} volume={0.3} delay={0.2} />
          <SoundCue src={sounds.vista_unfriendly_3} volume={0.2} delay={0.5} />
          <SoundCue src={sounds.vista_unfriendly_4} volume={0.3} delay={0.1} />

          <CueServerOut cueId={Lookup.VISTA_TRAIN_EXIT_OFF} />

        </Cue>

        {/*  Vistas enter popper. */}
        <Cue notes="Vistas enter popper.">

          <Screen output="secondary">
            <Visualization />
          </Screen>

          <SoundCue src={sounds.popper} />
          <SoundCue src={sounds.vistas_popping} delay={2.0} />
          <CueServerOut cueId={Lookup.VISTAS_ENTER_POPPER} />

        </Cue>

        {/* Vistas train to vis. */}
        <Cue notes="Vistas train to vis.">

          <Screen output="secondary">
            <Visualization trainMode="enter" />
          </Screen>

          <CueServerOut cueId={Lookup.VISTA_TRAIN_ENTER} />
          <SoundCue src={sounds.train_swoosh_short} />

        </Cue>

        {/* Visualization begins. */}
        <Cue notes="Visualization begins.">

          <Screen output="secondary">
            <Visualization startGen={25} endGen={50} startSpeed={1.0} endSpeed={1.0} seedVistas={[0.65, 0.7, 0.5, 0.35, 0.75, 0.6, 0.6, 0.53]} />
          </Screen>

          <CueServerOut cueId={Lookup.VISTAS_EXIT_POPPER} />

        </Cue>

        {/* Vistas exit screen. Cage refill. */}
        <Cue notes="Vistas exit screen via train.">

          <Screen output="secondary">
            <Visualization trainMode="exit" />
          </Screen>

          <CueServerOut cueId={Lookup.VISTA_TRAIN_EXIT} />

          <SoundCue src={sounds.train_swoosh_long} />

        </Cue>

        {/* Vista-train off. Cages refill. */}
        <Cue notes="Vistas train off. Cages refill.">

          <Screen output="secondary">
            <Visualization />
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

            <Bee mode='evaluation-mode'></Bee>

            <p className='evaluation'>
              Whenever a new feature <span className='highlight'>appears—</span><br/>
              Like long hair, sharp teeth, or big <span className='highlight'>ears—</span><br/>
              Genes must accumulate<br/>
              Before all have the trait,<br/>
              And that can take thousands of <span className='highlight'>______.</span>
            </p>

          </Screen>

          <SoundCue src={sounds.B_106} />
          <SoundCue src={sounds.quiz} delay={10} />

        </Cue>

        {/* Correct answer. Part 4 (T) */}
        <Cue notes='Correct answer. Part FOUR (T)'>

          <Screen output='primary' lifespan={8.0}>

            <Bee mode='evaluation-mode'></Bee>

            <p className='evaluation'>
              Whenever a new feature <span className='highlight'>appears—</span><br/>
              Like long hair, sharp teeth, or big <span className='highlight'>ears—</span><br/>
              Genes must accumulate<br/>
              Before all have the trait,<br/>
              And that can take thousands of <span className='highlight'>years.</span>
            </p>

          </Screen>

          <SoundCue src={sounds.B_107} delay={1.0} />
          <SoundCue src={sounds.correct_answer_4} />

          <CueServerOut cueId={Lookup.BADGE_T} />

        </Cue>

        {/* Vista trait progression */}
        <Cue notes="Alex shows vista progression">

          <Screen output="primary" lifespan={20.0}>
            <img src={images.progression} width="1920px" />
          </Screen>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* Alex sequence 5 */}
        <Cue notes="Alex triggers Sequence 5">

          <Screen output="primary">
            <VideoCue src={videos.sequence5} width="1920px" />
          </Screen>

          <SoundCue src={sounds.upload} />

        </Cue>

        {/* Empty */}
        <Cue notes="Empty" />

        {/* Evaluation part 5 */}
        <Cue notes='Evaluation part 5'>

          <Screen output='primary'>

            <Bee mode='evaluation-mode'></Bee>

            <p className='evaluation'>
              At first it may seem very <span className='highlight'>strange:</span><br/>
              Evolution’s not a path you <span className='highlight'>arrange.</span><br/>
              The environment organisms share<br/>
              Makes traits common or rare<br/>
              And causes a species to <span className='highlight'>______.</span>
            </p>

          </Screen>

          <SoundCue src={sounds.B_115} />
          <SoundCue src={sounds.quiz} delay={11.0} />

        </Cue>

        {/* Correct answer. Part 5 (A) */}
        <Cue notes='Correct answer. Part 5 (A)'>
          <Screen output='primary' lifespan={14.0}>

            <Bee mode='evaluation-mode' mood='smile'></Bee>

            <p className='evaluation'>
              At first it may seem very <span className='highlight'>strange:</span><br/>
              Evolution’s not a path you <span className='highlight'>arrange.</span><br/>
              The environment organisms share<br/>
              Makes traits common or rare<br/>
              And causes a species to <span className='highlight'>change.</span>
            </p>

          </Screen>

          <SoundCue src={sounds.fanfare} />
          <SoundCue src={sounds.B_116} delay={2.5} />

          <CueServerOut cueId={Lookup.BADGE_A} />

        </Cue>

        {/* Unplug Blackout */}
        <Cue notes="Unplug Blackout">

          <SoundCue src={sounds.power_down} />
          <SoundCue src={sounds.cages_open} delay={0.75} />
          <SoundCue src={sounds.vistas_dropping} delay={2.5} />

          <CueServerOut cueId={Lookup.UNPLUG_BLACKOUT} delay={1.5} />

        </Cue>

        {/* Vistas escape through door. */}
        <Cue notes="Vistas escape through door.">

          <SoundCue src={sounds.vistas_escape} />

        </Cue>

        {/* Plug in lockdown */}
        <Cue notes="Lockdown on plug in.">

          <Screen output='primary'>

            <h1 className='text-fullscreen' >ISOLATION MODE: ENGAGED</h1>

            <Bee mode='isolation-mode' mood='red'></Bee>

            <TimedCaptions>
                <Caption duration={3.5}>

                </Caption>
                <Caption duration={3.5}>
                    Infestation alert! We are at level tangerine.
                </Caption>
                <Caption duration={4.75}>
                    I repeat—level tangerine. Quarantine initiated.
                </Caption>
            </TimedCaptions>

          </Screen>

          <Screen output="secondary">
            <h1 className="text-fullscreen">ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <CueServerOut cueId={Lookup.PLUG_IN_LOCKDOWN} />

          <SoundCue src={sounds.lockdown} />
          <SoundCue src={sounds.alarm} delay={0.5} loop />
          <SoundCue src={sounds.B_129} delay={3.5} />

        </Cue>

        {/* And whose fault is that? */}
        <Cue notes="And whose fault is that?">

          <Screen output='primary'>
            <h1 className='text-fullscreen' >ISOLATION MODE: ENGAGED</h1>

            <Bee mode='isolation-mode' mood='red'></Bee>

            <TimedCaptions>
                <Caption duration={8}>
                    And whose fault is that? Isolation mode: engaged.
                </Caption>
            </TimedCaptions>
          </Screen>

          <Screen output='secondary'>

            <h1 className='text-fullscreen' >ISOLATION MODE: ENGAGED</h1>

          </Screen>

          <SoundCue src={sounds.B_131} />
          <SoundCue src={sounds.alarm} loop />

        </Cue>

        {/* Overriding security measures */}
        <Cue notes="Overriding security measures">

          <Screen output='primary'>

            <h1 className='text-fullscreen' >ISOLATION MODE: ENGAGED</h1>

            <Bee mode='isolation-mode' mood='red'></Bee>

          </Screen>

          <Screen output="secondary">
            <h1 className="text-fullscreen">ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <SoundCue src={sounds.B_133} />
          <SoundCue src={sounds.alarm} loop />

        </Cue>

        {/* Lockdown release after puzzle */}
        <Cue notes="Lockdown release on puzzle solved.">

          <Screen output="primary">
            <h1 className="text-fullscreen success">ISOLATION MODE: DISENGAGED</h1>
          </Screen>

          <Screen output="secondary">
            <h1 className="text-fullscreen success">ISOLATION MODE: DISENGAGED</h1>
          </Screen>

          <SoundCue src={sounds.unlock} />
          <SoundCue src={sounds.unlock} delay={0.2} />
          <SoundCue src={sounds.B_135} delay={0.35} />

          <CueServerOut cueId={Lookup.LOCKDOWN_RELEASE} />

        </Cue>

        {/* Jobsworth: What's going on */}
        <Cue notes="Jobsworth: What's going on">

          <Screen output="secondary">
            <VideoCue src={videos.jobsworth_139} />
          </Screen>

        </Cue>

        {/* Post show. Audience exits. */}
        <Cue notes="Post show lights. Partial audience exit.">

          <CueServerOut cueId={Lookup.POST_SHOW} />
          <h2 className="debug">Post show. Audience exits.</h2>

        </Cue>

        {/* Jobsworth: I knew this would happen */}
        <Cue notes="Jobsworth: I knew this would happen">

          <Screen output="secondary">
            <VideoCue src={videos.jobsworth_202_211} />
          </Screen>

        </Cue>

        {/* Jobsworth: Gestures over button */}
        <Cue notes="Jobsworth: Gestures over button">

          <Screen output="secondary">
            <VideoCue src={videos.jobsworth_213} />
          </Screen>

        </Cue>

        {/* Jobsworth: You really did a number on the */}
        <Cue notes="Jobsworth: You really did a number on the">

          <Screen output="secondary">
            <VideoCue src={videos.jobsworth_217_v1} />
          </Screen>

        </Cue>

        {/* Empty */}
        <Cue notes="Empty: 3" />

        {/* Empty */}
        <Cue notes="Empty: 2" />

        {/* Empty */}
        <Cue notes="Empty: 1" />

        {/* Jobsworth: Not so fast */}
        <Cue notes="Jobsworth: Not so fast">

          <Screen output="secondary">
            <VideoCue src={videos.jobsworth_221_225} />
          </Screen>

        </Cue>

        {/* Variation circuit */}
        <Cue notes="Highlight variation circuit">

          <Screen output="secondary">
            <VideoCue src={videos.jobsworth_empty} />
          </Screen>

          <CueServerOut cueId={Lookup.HIGHLIGHT_VARIATION_CIRCUIT} />

        </Cue>

        {/* Correct Answer: V */}
        <Cue notes="Correct Answer: V">

          <Screen output="secondary">
            <VideoCue src={videos.jobsworth_empty} />
          </Screen>

          <CueServerOut cueId={Lookup.BADGE_V} />
          <SoundCue src={sounds.correct_answer_1} />

        </Cue>

        {/* Inheritance circuit */}
        <Cue notes="Highlight inheritance circuit">

          <Screen output="secondary">
            <VideoCue src={videos.jobsworth_empty} />
          </Screen>

          <CueServerOut cueId={Lookup.HIGHLIGHT_INHERITANCE_CIRCUIT} />

        </Cue>

        {/* Correct Answer: I */}
        <Cue notes="Correct Answer: I">

          <Screen output="secondary">
            <VideoCue src={videos.jobsworth_empty} />
          </Screen>

          <CueServerOut cueId={Lookup.BADGE_I} />
          <SoundCue src={sounds.correct_answer_2} />

        </Cue>

        {/* Selection circuit */}
        <Cue notes="Highlight selection circuit">

          <Screen output="secondary">
            <VideoCue src={videos.jobsworth_empty} />
          </Screen>

          <CueServerOut cueId={Lookup.HIGHLIGHT_SELECTION_CIRCUIT} />

        </Cue>

        {/* Correct Answer: S */}
        <Cue notes="Correct Answer: S">

          <Screen output="secondary">
            <VideoCue src={videos.jobsworth_empty} />
          </Screen>

          <CueServerOut cueId={Lookup.BADGE_S} />
          <SoundCue src={sounds.correct_answer_3} />

        </Cue>

        {/* Highlight time circuit */}
        <Cue notes="Highlight time circuit">

          <Screen output="secondary">
            <VideoCue src={videos.jobsworth_empty} />
          </Screen>

          <CueServerOut cueId={Lookup.HIGHLIGHT_TIME_CIRCUIT} />

        </Cue>

        {/* Correct Answer: T */}
        <Cue notes="Correct Answer: T">

          <Screen output="secondary">
            <VideoCue src={videos.jobsworth_empty} />
          </Screen>

          <CueServerOut cueId={Lookup.BADGE_T} />
          <SoundCue src={sounds.correct_answer_4} />

        </Cue>

        {/* Highlight adaptation circuit */}
        <Cue notes="Highlight adaptation circuit">

          <Screen output="secondary">
            <VideoCue src={videos.jobsworth_empty} />
          </Screen>

          <CueServerOut cueId={Lookup.HIGHLIGHT_ADAPTATION_CIRCUIT} />

        </Cue>

        {/* Correct Answer: A */}
        <Cue notes="Correct Answer: A">

          <Screen output="secondary">
            <VideoCue src={videos.jobsworth_empty} />
          </Screen>

          <CueServerOut cueId={Lookup.BADGE_A} />
          <SoundCue src={sounds.fanfare} />
          <SoundCue src={sounds.fireworks} delay={1.5} />

        </Cue>

        {/* Jobsworth: Spit take */}
       <Cue notes="Jobsworth: Spit take">

          <Screen output="secondary">
            <VideoCue src={videos.jobsworth_238} />
          </Screen>

        </Cue>

        {/* Bee reboot */}
        <Cue notes="Bee Reboot">

          <Screen output='primary'>

            <Bee></Bee>

          </Screen>

          <SoundCue src={sounds.bee_reboot} delay={0.0} />
          <SoundCue src={sounds.B_240} delay={1.65}/>

        </Cue>

        {/* VISTA Drop */}
        <Cue notes="VISTA Drop">

          <SoundCue src={sounds.vista_friendly_1} volume={0.3} delay={0.0} />
          <SoundCue src={sounds.vista_friendly_2} volume={0.6} delay={0.5} />
          <SoundCue src={sounds.vista_friendly_3} volume={0.2} delay={1.0} />
          <SoundCue src={sounds.vista_friendly_4} volume={0.6} delay={1.5} />
          <SoundCue src={sounds.vista_friendly_5} volume={0.5} delay={2.2} />
          <SoundCue src={sounds.vista_friendly_6} volume={0.6} delay={2.5} />
          <SoundCue src={sounds.vista_friendly_7} volume={0.2} delay={3.0} />
          <SoundCue src={sounds.vista_friendly_8} volume={0.7} delay={3.9} />
          <SoundCue src={sounds.vista_friendly_1} volume={0.5} delay={4.0} />
          <SoundCue src={sounds.vista_friendly_2} volume={0.6} delay={6.5} />
          <SoundCue src={sounds.vista_friendly_3} volume={0.2} delay={6.9} />
          <SoundCue src={sounds.vista_friendly_4} volume={0.6} delay={7.9} />
          <SoundCue src={sounds.vista_friendly_5} volume={0.3} delay={6.9} />
          <SoundCue src={sounds.vista_friendly_6} volume={0.6} delay={6.2} />
          <SoundCue src={sounds.vista_friendly_7} volume={0.2} delay={8.0} />
          <SoundCue src={sounds.vista_friendly_8} volume={0.7} delay={6.5} />

          <CueServerOut cueId={Lookup.VISTA_DROP} />

        </Cue>

        {/* Jobsworth: You've passed the test */}
        <Cue notes="Jobsworth: You've passed the test">

          <Screen output="secondary">
            <VideoCue src={videos.jobsworth_243_246} />
          </Screen>

        </Cue>

        {/* Post show. Audience exits. */}
        <Cue notes="Post show lights. Partial audience exit.">

          <CueServerOut cueId={Lookup.POST_SHOW} />

        </Cue>

      </Deck>
    );
  }
}
