import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TweenMax from 'gsap';
import {Howl} from '../vendors/howler/howler';
import $ from 'jquery';
import {images, sounds} from '../assets/assets';
import Vista from './Vista';
import grid from '../utils/VisGrid';

export default class Visualization extends Component {

  constructor(props) {

    super(props);

    this.state = {
      generationCount:0,
      systemState: 'waiting...',
    };

    this.dingSound = new Howl({
      src: [sounds.generation_ding],
      volume: 0.2,
    });

    this.spawnedVistas = [];

    this.entranceTL;
    this.exitTL;
    this.pairingTL;

    this.utilTimer = {};

    // Important sizes
    this.visWidth = 500;
    this.visHeight = 700;

    // Important locations
    this.visCenter = {x:0.5 * this.visWidth, y:0.5 * this.visHeight};
    this.entrancePoint = {x:0.95 * this.visWidth, y:0.95 * this.visHeight};
    this.exitPoint = {x:0.95 * this.visWidth, y:0.05 * this.visHeight};

    this.createAnimations();

    // Bind methods
    this.onEntranceComplete = this.onEntranceComplete.bind(this);
    this.onExitComplete = this.onExitComplete.bind(this);
    this.onNewGenerationComplete = this.onNewGenerationComplete.bind(this);
    this.onAllGenerationsComplete = this.onAllGenerationsComplete.bind(this);
    this.onSortAnimComplete = this.onSortAnimComplete.bind(this);

  }

  componentDidMount() {

    // Set initial states of all.
    this.genCounter = this.refs.genCounter;
    this.genSpeedBar = this.refs.genSpeedBar;
    this.avgDataNum = this.refs.avgDataNum;

    this.updateGenerationCount(this.props.startGen, false);
    this.updateGenerationSpeed(this.props.startSpeed, true);

    // Start
    this.vistasEnter();

  }

  componentWillUnmount() {

    // Clear all timeouts, intervals
    clearTimeout(this.utilTimer);

    // Unload all sounds and animations.
    this.dingSound.stop();
    if (this.entranceTL) {
      this.entranceTL.pause();
      this.entranceTL.kill();
    }

    if (this.exitTL) {
      this.exitTL.pause();
      this.exitTL.kill();
    }

    if (this.pairingTL) {
      this.pairingTL.pause();
      this.pairingTL.kill();
    }

  }

  createAnimations() {

    // Create first seed vistas
    for (let i = 0; i < this.props.seedVistas.length; i++) {

      // Create new vista with
      // specific friendliness
      const seedFriendliness = this.props.seedVistas[i];
      const vista = this.spawnVista(seedFriendliness);

    }

  }

  vistasEnter() {

    // Create entrance animation
    // for seed vistas.
    this.entranceTL = new TimelineMax({onComplete:this.onEntranceComplete});

    for (let i = 0; i < this.spawnedVistas.length; i++) {

      const vista = this.spawnedVistas[i];
      const $vista = $('.visualization .vistaContainer #' + vista.id);
      this.spawnedVistas[i].target = $vista;

      // Start vista animation every 0.3 secs
      this.entranceTL.add(this.createEntrance(this.spawnedVistas[i].target), i * 0.3);

    }

    // Start entrance drama
    this.setState({systemState:'scanning...'});
    this.entranceTL.play();

  }

  createEntrance(element) {

    TweenLite.set(element, {x:this.entrancePoint.x, y:this.entrancePoint.y, scale:0.36})

    // Create a semi-random tween
    let bezTween = new TweenMax(element, 2, {
      bezier:{
        type:'soft',
        values:[{x:this.visCenter.x, y:this.entrancePoint.y}, {x:this.visCenter.x, y:this.entrancePoint.y - 50}, {x:this.visCenter.x, y:this.entrancePoint.y - 100}, {x:this.visCenter.x + Math.random() * 500 - 250, y:this.visCenter.y + Math.random() * 600 - 300}],
        autoRotate:false,
      },
    ease:Linear.easeNone,});

    return bezTween;

  }

  onEntranceComplete() {

    this.setState({systemState:'allowing reproduction...'});
    this.generationSequenceGo();
  }

  vistasExit() {

    // Create entrance animation
    // for seed vistas.
    this.exitTL = new TimelineMax({onComplete:this.onExitComplete});

    this.exitTL.delay(2.0)

    for (let i = 0; i < this.spawnedVistas.length; i++) {

      // Start vista animation every 0.1 secs
      this.exitTL.add(this.createExit(this.spawnedVistas[i].target), i * 0.1);

    }

    // Start entrance drama
    this.setState({systemState:'releasing...'});
    this.exitTL.play();

  }

  createExit(element) {

    // Create a semi-random tween
    let bezTween = new TweenMax(element, 2, {
      bezier:{
        type:'soft',
        values:[{x:this.visCenter.x, y:this.exitPoint.y + 70}, {x:this.visCenter.x, y:this.exitPoint.y}, {x:this.exitPoint.x, y:this.exitPoint.y}],
        autoRotate:false,
      },
    ease:Linear.easeNone,});

    return bezTween;

  }

  onExitComplete() {

    this.setState({systemState:'empty'});

  }

  generationSequenceGo() {

    this.pairingTL = new TimelineMax({onComplete:this.onAllGenerationsComplete});

    // Set initial gen speeed
    this.updateGenerationSpeed(this.props.startSpeed, true);

    // Tween timescale (geneation speed)
    // if it doesn't match 4 secs into vis.
    setTimeout(() => {
      if (this.props.startSpeed != this.props.endSpeed) {
        this.updateGenerationSpeed(this.props.endSpeed, false);
      }
    }, 4000);

    const numGens = this.props.endGen - this.props.startGen;
    const stagger = 0.02;
    for (let j = 0; j < numGens; j++) {

      // Temp: shuffle before pairing?
      this.spawnedVistas = this.utilShuffle(this.spawnedVistas);

      // Pair off existing VISTAS
      for (let i = 0; i < this.spawnedVistas.length; i += 2) {

        // Don't pair last vista if singleton
        if (i >= this.spawnedVistas.length - 1) {
          break;
        }

        const vista1 = this.spawnedVistas[i].target;
        const vista2 = this.spawnedVistas[i + 1].target;

        // Find point between two vistas
        const e1trans = vista1[0]._gsTransform;
        const e2trans = vista2[0]._gsTransform;

        const meetup = this.utilMidpoint(e1trans.x, e1trans.y, e2trans.x, e2trans.y, 0.5);

        // Tween the mating dance
        const tween1 = new TweenMax(vista1, 0.15, {x:meetup[0], y:meetup[1], ease: Bounce.easeOut, repeat:1, yoyo:true});
        const tween2 = new TweenMax(vista2, 0.15, {x:meetup[0], y:meetup[1], ease: Bounce.easeOut, repeat:1, yoyo:true});

        // Attach oncomplete to last to pair up.
        if (i >= this.spawnedVistas.length - 2) {
          tween2.vars._onComplete = this.onNewGenerationComplete;
        }

        let curTime = (i * stagger) + (j * 0.4);

        // Add pair animation to timeline
        this.pairingTL.add(tween1, curTime);
        this.pairingTL.add(tween2, curTime);

        // TODO: Create and add offspring animation for each pair.

        /*
        // Each pair have FOUR offspring
        for (let k = 0; k < 1; k++) {

          const childFriendliness = Math.random();
          const childVista = this.spawnVista(childFriendliness);

          const $vista = $('.visualization .vistaContainer #' + childVista.id);
          childVista.target = $vista;

          this.pairingTL.add(this.createBirthingAnim(childVista.target, meetup[0], meetup[1] ), curTime);

        }
        */

      }

    }

    // Start entrance drama
    this.setState({systemState:'pairing...'});
    this.pairingTL.play();

  }

  createBirthingAnim(element, parentsX, parentsY) {

    TweenLite.set(element, {x:parentsX, y:parentsY, scale:0.16})

    // Create a semi-random tween
    let bezTween = new TweenMax(element, 2, {
      bezier:{
        type:'soft',
        values:[{x:parentsX, y:parentsY}, {x:parentsX, y:parentsY - 80}],
        autoRotate:false,
      },
    ease:Linear.easeNone,});

    return bezTween;

  }

  onNewGenerationComplete() {

    console.log('onNewGenerationComplete()');

    // Update generation counter.
    this.updateGenerationCount(1);

    console.log(this.state.generationCount);

  }

  onAllGenerationsComplete() {

    console.log('onAllGenerationsComplete()');

    this.sortByFriendliness();

  }

  utilMidpoint(lat1, long1, lat2, long2, per) {
    return [lat1 + (lat2 - lat1) * per, long1 + (long2 - long1) * per];
  }

  utilShuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
  }

  spawnVista(seedFriendliness) {

    const keyId = 'spawn-' + this.spawnedVistas.length;
    const renderElement = React.createElement(Vista, {id: keyId, key:keyId, friendliness:seedFriendliness}, '');

    let vista = {id:keyId, renderElement:renderElement, friendliness:seedFriendliness, generation:this.state.generationCount};

    this.spawnedVistas.push(vista);

    return vista;

  }

  renderSpawnedVistas() {

    let renderVistas = [];

    for (var i = 0; i < this.spawnedVistas.length; i++) {

      renderVistas.push(this.spawnedVistas[i].renderElement);

    }

    return <div>{renderVistas}</div>;

  }

  updateGenerationCount(increment, playSound) {

    if (playSound == undefined || playSound == true) {
      this.dingSound.play();
    }

    const newCount = this.state.generationCount + increment;
    this.setState({generationCount:newCount});

  }

  updateAverageData() {

  }

  updateGenerationSpeed(speedValue, setInitial) {

    if (setInitial == true) {

      TweenMax.set(this.refs.genSpeedBar, {scaleY:speedValue, width:25, x:200, y:50, transformOrigin:'right bottom'});
      if (this.pairingTL) TweenMax.set(this.pairingTL, {timeScale:speedValue});

    } else {

      const tweenTime = 3.0;
      TweenMax.to(this.refs.genSpeedBar, tweenTime, {scaleY:speedValue, ease: Power2.easeInOut});
      if (this.pairingTL) TweenMax.to(this.pairingTL, tweenTime, {timeScale:speedValue});

    }

  }

  sortByFriendliness() {

    // Sort array by friendliness
    this.spawnedVistas.sort(function(a,b) {return (a.friendliness < b.friendliness) ? 1 : ((b.friendliness < a.friendliness) ? -1 : 0);});

    // Create entrance animation
    // for seed vistas.
    this.entranceTL = new TimelineMax({onComplete:this.onSortAnimComplete});

    for (let i = 0; i < this.spawnedVistas.length; i++) {

      const sortedX = 200;
      const sortedY = (i * 50) + 150;

      this.entranceTL.add(this.createSortAnim(this.spawnedVistas[i].target, sortedX, sortedY), i * 0.03);

    }

    // Start entrance drama
    this.setState({systemState:'sorting...'});

    this.entrace
    this.entranceTL.play();

  }

  createSortAnim(element, sortedX, sortedY) {

    let bezTween = new TweenMax(element, 0.4, {
      bezier:{
        type:'soft',
        values:[{x:sortedX + 70, y:sortedY}, {x:sortedX, y:sortedY}],
        autoRotate:false,
      },
    ease:Linear.easeNone,});

    return bezTween;

  }

  onSortAnimComplete() {

    // Vista train exit
    this.vistasExit();

  }

  render() {

    return (

      <div className='visualization'>

        <h1 className='genCounter' ref='genCounter'>{this.state.generationCount}</h1>

        <img className='genSpeedBar' ref='genSpeedBar' src={images.vis_gen_speed} />

        <h2 className='avgDataNum' ref='avgDataNum'></h2>

        <h3 className='systemState' ref='systemState'>[{this.state.systemState}]</h3>

        <div className='vistaContainer' ref='vistaContainer'>

          {this.renderSpawnedVistas()}

        </div>


      </div>

    );

  }

}

Visualization.propTypes = {
  startGen: PropTypes.number,
  endGen: PropTypes.number,
  startSpeed: PropTypes.number,
  endSpeed: PropTypes.number,
  seedVistas: PropTypes.array,
};

Visualization.defaultProps = {

};
