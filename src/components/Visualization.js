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

    this.updateGenerationSpeed(this.props.endSpeed);

    // Pass Generations...
    /*    this.utilTimer = setTimeout( () => {
          // newGenerationGo();
          // this.vistasExit();

          this.newGenerationGo();

        }, 2000);*/

    this.newGenerationGo();

    // console.log(grid.getNearestOpenCell());

  }

  vistasExit() {

    // Create entrance animation
    // for seed vistas.
    this.exitTL = new TimelineMax({onComplete:this.onExitComplete});

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

  newGenerationGo() {

    if (!this.pairingTL) {
      this.pairingTL = new TimelineMax({onComplete:this.onNewGenerationComplete});
    } else {
      this.pairingTL.clear();
    }

    const stagger = 0.15;

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
      const pairAnim = this.createPairAnim(vista1, vista2);

      // Start vista animation
      this.pairingTL.add(pairAnim[0], i * stagger);
      this.pairingTL.add(pairAnim[1], i * stagger);

    }

    this.pairingTL.addPause(1.0);

    // Start entrance drama
    this.setState({systemState:'pairing...'});
    this.pairingTL.play();

  }

  onNewGenerationComplete() {

    console.log('onNewGenerationComplete()');

    // Update generation counter.
    this.updateGenerationCount(1);

    if (this.state.generationCount >= this.props.endGen) {
      // Cue exit if end generation hit.
      this.vistasExit();
    } else {
      // Start next generation.
      this.newGenerationGo();
    }

  }

  createPairAnim(element1, element2) {

    // Find point between two vistas
    const e1trans = element1[0]._gsTransform;
    const e2trans = element2[0]._gsTransform;

    const meetup = this.utilMidpoint(e1trans.x, e1trans.y, e2trans.x, e2trans.y, 0.5);

    // Tween the mating dance
    const tween1 = new TweenMax(element1, 0.25, {x:meetup[0], y:meetup[1], ease: Bounce.easeOut});
    const tween2 = new TweenMax(element2, 0.25, {x:meetup[0], y:meetup[1], ease: Bounce.easeOut});

    return [tween1, tween2];

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

    let vista = {id:keyId, renderElement:renderElement};

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

      const tweenTime = 2.0;
      TweenMax.to(this.refs.genSpeedBar, tweenTime, {scaleY:speedValue, ease: Power2.easeInOut});
      if (this.pairingTL) {
        console.log('tween timescale');
        TweenMax.to(this.pairingTL, tweenTime, {timeScale:speedValue});
      }

    }

  }

  sortFriendliness() {

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
