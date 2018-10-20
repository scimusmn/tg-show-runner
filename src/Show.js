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

        {/* Show Start. VO Intro. */}
        <Cue notes="Stage lights. Presentation begins. VO.">

          <Screen output='primary'>

            <Bee></Bee>

            <TimedCaptions>
                <Caption duration={7.5}>
                    Attention, museum visitors: You have entered the museum’s biocontainment facility. Wild animals are easily stressed.
                </Caption>
                <Caption duration={6.5}>
                    For their safety and yours, please don't eat, drink, make any sudden movements, or use your camera's flash.
                </Caption>
                <Caption duration={5}>
                    No animals are ever harmed in this facility. Unless you use your camera’s flash.
                </Caption>
                <Caption duration={0.75}>

                </Caption>
                <Caption duration={1.7}>
                    That last part was a joke.
                </Caption>
            </TimedCaptions>
          </Screen>

          <SoundCue src={sounds.VO_001} />

          <CueServerOut cueId={Lookup.SHOW_START} />

        </Cue>

        {/* It wasn't that funny. */}
        <Cue notes="VO: It wasnt that funny">

          <Bee></Bee>

          <TimedCaptions>
              <Caption duration={2.5}>
                  It wasn't that funny.
              </Caption>
          </TimedCaptions>

          <SoundCue src={sounds.VO_003} />

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

        {/* VO: Should any cage open... */}
        <Cue notes="VO: Should any cage open...">

          <Bee></Bee>

            <TimedCaptions>
                <Caption duration={6.7}>
                    If certification protocols are not followed, my biosecurity subsystem will trigger an emergency quarantine.
                </Caption>
                <Caption duration={4.2}>
                    This system is hard-wired and completely encryption-protected.
                </Caption>
            </TimedCaptions>



          <SoundCue src={sounds.VO_034}/>

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

          <SoundCue src={sounds.VO_060} />
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

          <SoundCue src={sounds.VO_061} delay={1.0} />
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

          <SoundCue src={sounds.VO_073} />
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

          <SoundCue src={sounds.VO_074} delay={1.0} />
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

          <SoundCue src={sounds.VO_083} />
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

          <SoundCue src={sounds.VO_084} delay={1.0} />
          <SoundCue src={sounds.correct_answer_3} />

          <CueServerOut cueId={Lookup.BADGE_S} />

        </Cue>

        {/* Highlight Popper */}
        {/* CAGE SET 1 */}
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

          <Bee mode='evaluation-mode'></Bee>

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

          <SoundCue src={sounds.VO_115} />
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

          <SoundCue src={sounds.VO_116} delay={1.0} />
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

          <SoundCue src={sounds.VO_127} />
          <SoundCue src={sounds.quiz} delay={11.0} />

        </Cue>

        {/* Correct answer. Part 5 (A) */}

        <Cue notes='Correct answer. Part 5 (A)'>

          <Screen output='primary' lifespan={8.0}>

            <Bee mode='evaluation-mode'></Bee>

            <p className='evaluation'>
              At first it may seem very <span className='highlight'>strange:</span><br/>
              Evolution’s not a path you <span className='highlight'>arrange.</span><br/>
              The environment organisms share<br/>
              Makes traits common or rare<br/>
              And causes a species to <span className='highlight'>change.</span>
            </p>

          </Screen>

          <SoundCue src={sounds.fanfare} />
          <SoundCue src={sounds.VO_128} delay={2.5} />

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
          <SoundCue src={sounds.VO_142} delay={3.5} />

        </Cue>

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

          <SoundCue src={sounds.VO_144} />
          <SoundCue src={sounds.alarm} loop />

        </Cue>

        <Cue notes="I cant. To ensure...">

          <Screen output='primary'>

            <h1 className='text-fullscreen' >ISOLATION MODE: ENGAGED</h1>

            <Bee mode='isolation-mode' mood='red'></Bee>

            <TimedCaptions>
                <Caption duration={8}>
                    I can’t. Protocols must remain in effect until all evolutionary test subjects are accounted for.
                </Caption>
            </TimedCaptions>

          </Screen>

          <Screen output="secondary">
            <h1 className="text-fullscreen">ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <SoundCue src={sounds.VO_150} />
          <SoundCue src={sounds.alarm} loop />

        </Cue>

        <Cue notes="Labaratory access codes are encrypted">

          <Screen output='primary'>
            <h1 className='text-fullscreen' >ISOLATION MODE: ENGAGED</h1>

            <Bee mode='isolation-mode' mood='red'></Bee>

            <TimedCaptions>
                <Caption duration={6}>
                    Laboratory access codes are encrypted in accordance with museum biosecurity protocols.
                </Caption>
                <Caption duration={6}>
                    Unfortunately, I cannot directly tell you that the locking mechanism can be short circuited
                </Caption>
                <Caption duration={6.5}>
                    if you synchronize the color-coded alarm system energy surges with the appropriate color-coded receptor circuits.
                </Caption>
                <Caption duration={2.2}>

                </Caption>
                <Caption duration={1.3}>
                    ;)
                </Caption>
                <Caption duration={1.3}>

                </Caption>
                <Caption duration={2.9}>
                    ;)
                </Caption>
            </TimedCaptions>

          </Screen>

          <Screen output="secondary">
            <h1 className="text-fullscreen">ISOLATION MODE: ENGAGED</h1>
          </Screen>

          <SoundCue src={sounds.VO_157} />
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
          <SoundCue src={sounds.VO_161} delay={0.35} />

          <CueServerOut cueId={Lookup.LOCKDOWN_RELEASE} />

        </Cue>

        {/* Post show. Audience extits. */}
        <Cue notes="Post show. Audience exits.">

          <CueServerOut cueId={Lookup.POST_SHOW} />
          <h2 className="debug">Post show. Audience exits.</h2>

        </Cue>

      {/* Intro to Game 2 */}
        <Cue notes='Intro to Game 2'>

          <SoundCue src={sounds.VO_Ending}/>

        </Cue>


      </Deck>
    );
  }
}
