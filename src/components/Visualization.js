import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TweenMax from 'gsap';
import {Howl} from '../vendors/howler/howler';
import $ from 'jquery';
import {images, sounds} from '../assets/assets';
import Vista from './Vista';
import grid from '../utils/VisGrid';
import generationSimulator from '../utils/GenerationSimulator';

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

    this.renderVistas = [];
    this.currentGeneration = [];
    this.nextGeneration = [];

    this.entranceTL;
    this.exitTL;
    this.pairingTL;

    this.utilTimer = {};

    this.maxRenderedVistas = 300;

    // Important sizes
    this.visWidth = 600;
    this.visHeight = 800;

    // Important locations
    this.visCenter = {x:0.5 * this.visWidth, y:0.5 * this.visHeight};
    this.entrancePoint = {x:0.84 * this.visWidth, y:0.09 * this.visHeight};
    this.exitPoint = {x:0.84 * this.visWidth, y:0.09 * this.visHeight};

    this.createAnimations();

    // Bind methods
    this.onEntranceComplete = this.onEntranceComplete.bind(this);
    this.onExitComplete = this.onExitComplete.bind(this);
    this.onNewGenerationComplete = this.onNewGenerationComplete.bind(this);
    this.onAllGenerationsComplete = this.onAllGenerationsComplete.bind(this);
    this.onSortAnimComplete = this.onSortAnimComplete.bind(this);
    this.onDeathComplete = this.onDeathComplete.bind(this);

  }

  componentDidMount() {

    // Set initial states of all.
    this.genCounter = this.refs.genCounter;
    this.genSpeedBar = this.refs.genSpeedBar;
    this.avgDataNum = this.refs.avgDataNum;

    this.updateGenerationCount(this.props.startGen, false);
    this.updateGenerationSpeed(this.props.startSpeed, true);

    // Find element targets for
    // all render vistas
    console.log('assignVistaTargets', this.renderVistas.length);
    this.assignVistaTargets();

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

    // How many visual Vistas will we need
    // for this simulation?
    const numGens = this.props.endGen - this.props.startGen;
    const vistasToSpawn = generationSimulator.totalVistaCount(numGens, this.props.seedVistas.length);

    console.log('vistasToSpawn', vistasToSpawn);

    // Create vista placeholders for each generation...
    for (let i = 0; i < this.maxRenderedVistas; i++) {

      this.createRenderVista();

    }
  }

  vistasEnter() {

    // Create entrance animation
    // for seed vistas.
    this.entranceTL = new TimelineMax({onComplete:this.onEntranceComplete});

    for (let i = 0; i < this.props.seedVistas.length; i++) {

      const seedVista = this.props.seedVistas[i];

      // Activate vistas for entering
      const aVista = this.activateVista(seedVista.friendliness, this.state.generationCount);

      this.currentGeneration.push(aVista);

      // Start vista animation for seed vistas
      this.entranceTL.add(this.createEntrance(aVista.target), i * 0.3);

    }

    // Start entrance drama
    this.setState({systemState:'Scanning'});
    this.entranceTL.play();

  }

  createEntrance(element) {

    TweenMax.set(element, {x:this.entrancePoint.x, y:this.entrancePoint.y, scale:0.36, autoAlpha:1.0});

    // Create a semi-random tween
    let bezTween = new TweenMax(element, 2, {
      bezier:{
        type:'soft',
        values:[{x:this.entrancePoint.x, y:this.entrancePoint.y,x:this.visCenter.x, y:this.entrancePoint.y}, {x:this.visCenter.x, y:this.entrancePoint.y + 30}, {x:this.visCenter.x + Math.random() * 300 - 150, y:this.visCenter.y + Math.random() * 500 - 200}],
        autoRotate:false,
      },
      delay:0.75,
    ease:Linear.easeNone,});

    return bezTween;

  }

  onEntranceComplete() {

    this.setState({systemState:'Allowing for reproduction'});
    this.generationSequenceGo();

  }

  vistasExit() {

    // Create entrance animation
    // for seed vistas.
    this.exitTL = new TimelineMax({onComplete:this.onExitComplete});

    this.exitTL.delay(1.0);

    for (let i = 0; i < this.currentGeneration.length; i++) {

      // Start vista animation every 0.1 secs
      this.exitTL.add(this.createExit(this.currentGeneration[i].target), i * 0.1);

    }

    // Start entrance drama
    this.setState({systemState:'Release to cages'});
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

    this.setState({systemState:'Waiting'});

  }

  generationSequenceGo() {

    console.log('generationSequenceGo');

    this.pairingTL = new TimelineMax({onComplete:this.onAllGenerationsComplete});

    // Set initial gen speeed
    this.updateGenerationSpeed(this.props.startSpeed, true);

    // Tween timescale (geneation speed)
    // if it doesn't match 4 secs into vis.
    setTimeout(() => {
      if (this.props.startSpeed != this.props.endSpeed) {
        this.updateGenerationSpeed(this.props.endSpeed, false);
      }
    }, 7000);

    const numGens = this.props.endGen - this.props.startGen;
    const stagger = 0.01;
    let totalVistasSpawned = this.currentGeneration.length;

    for (let j = 0; j < numGens; j++) {

      // Temp: shuffle before pairing?
      // this.currentGeneration = this.utilShuffle(this.currentGeneration);

      console.log('GENERATION LOOP', this.currentGeneration.length);
      let genTime = (j * 0.7);

      // Pair off existing VISTAS
      for (let i = 0; i < this.currentGeneration.length; i += 2) {

        let curTime = (i * stagger) + genTime;

        // Don't pair last vista if singleton
        // Skip to death animation :(
        if (i >= this.currentGeneration.length - 1) {

          const singletonDeath = new TweenMax(this.currentGeneration[i].target, 0.13, {delay:0.25, autoAlpha:0.0});
          this.pairingTL.add(singletonDeath, curTime);

          break;
        }

        const v1 = this.currentGeneration[i];
        const v2 = this.currentGeneration[i + 1];

        const vista1 = v1.target;
        const vista2 = v2.target;

        // Find point between two vistas
        const e1trans = vista1[0]._gsTransform;
        const e2trans = vista2[0]._gsTransform;

        const midX = (e1trans.x + e2trans.x) * 0.5;
        const midY = (e1trans.y + e2trans.y) * 0.5;

        // Tween the mating dance
        const tween1 = new TweenMax(vista1, 0.15, {x:midX, y:midY, ease: Bounce.easeOut});
        const tween2 = new TweenMax(vista2, 0.15, {x:midX, y:midY, ease: Bounce.easeOut});

        // Attach oncomplete to last to pair up.
        if (i >= this.currentGeneration.length - 2) {
          tween2.vars._onComplete = this.onNewGenerationComplete;
        }

        // Add pair animation to timeline
        this.pairingTL.add(tween1, curTime);
        this.pairingTL.add(tween2, curTime);

        // Create death tweens for each pair
        const death1 = new TweenMax(vista1, 0.13, {delay:0.25, autoAlpha:0.0, onComplete:this.onDeathComplete, onCompleteParams:[v1]});
        const death2 = new TweenMax(vista2, 0.13, {delay:0.25, autoAlpha:0.0, onComplete:this.onDeathComplete, onCompleteParams:[v2]});

        // Add death animations to timeline
        this.pairingTL.add(death1, curTime);
        this.pairingTL.add(death2, curTime);

        // Each pair have FOUR offspring
        const numKids = Math.floor(Math.random() * 2) + 2;
        for (let k = 0; k < numKids; k++) {

          if (totalVistasSpawned >= this.maxRenderedVistas) {
            console.log('max vista limit');
            break;
          }

          // Activate one vista for each...
          const childFriendliness = Math.random();
          const childVista = this.activateVista(childFriendliness, j + 1);
          totalVistasSpawned++;

          this.pairingTL.add(this.createBirthingAnim(childVista.target, midX, midY), curTime + 0.14);

          this.nextGeneration.push(childVista);

        }

      }

      this.currentGeneration = this.nextGeneration;
      this.nextGeneration = [];

    }

    // Start entrance drama
    this.setState({systemState:'Allowing for reproduction'});
    this.pairingTL.play();

  }

  createBirthingAnim(element, parentsX, parentsY) {

    const setTween = new TweenMax.set(element, {x:parentsX, y:parentsY, scale:0.16});

    const tween1 = new TweenMax(element, 0.04, {x:parentsX + (Math.random() * 500 - 250), y:parentsY + (Math.random() * 500 - 250),  autoAlpha:1.0, ease:Power2.easeOut});

    const tween2 = new TweenMax(element, 0.18, {delay:0.06, scale:0.36, ease:Power2.easeInOut});

    return [setTween, tween1, tween2];

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

  createRenderVista() {

    const keyId = 'spawn-' + this.renderVistas.length;

    const rFriendliness = Math.random();

    const renderElement = React.createElement(Vista, {id: keyId, key:keyId, friendliness:rFriendliness}, '');

    let vista = {id:keyId, active: true, renderElement:renderElement, friendliness:rFriendliness, generation:-1};

    this.renderVistas.push(vista);

    return vista;

  }

  assignVistaTargets() {

    // Find first availaible inactive vista...
    for (let i = 0; i < this.renderVistas.length; i++) {

      const $vista = $('.visualization .vistaContainer #' + this.renderVistas[i].id);
      this.renderVistas[i].target = $vista;

      // Hide offscreen
      TweenMax.set(this.renderVistas[i].target, {scale:0.0, autoAlpha:0.0, x:-999});

      this.renderVistas[i].active = false;

    }

  }

  activateVista(friendliness, generation) {

    // Find first availaible inactive vista...
    let vistaToActivate;
    for (let i = 0; i < this.renderVistas.length; i++) {
      if (this.renderVistas[i].active == false) {
        vistaToActivate = this.renderVistas[i];
        break;
      }
    }

    // Shouldn't need to reset jq target
    // vistaToActivate.target = $('.visualization .vistaContainer #' + vistaToActivate.id);

    vistaToActivate.active = true;

    // vistaToActivate.friendliness = friendliness;

    TweenMax.set(vistaToActivate.target, {scale:0.0, autoAlpha:0.0, transformOrigin:'center center'});

    // vistaToActivate.renderElement.setProps({ friendliness: friendliness });
    vistaToActivate.generation = generation;

    return vistaToActivate;

  }

  onDeathComplete(vista) {
    // console.log('deathComplete', vista);

    // TODO: prep this vis for recycle

  }

  killVista(vistaToKill) {

    vistaToKill.active = false;

    // Move to end of array
    const targetIndex = arr.indexOf(vistaToKill);
    this.renderVistas.push(arr.splice(targetIndex, 1)[0]);

    return vista;

  }

  renderSpawnedVistas() {

    let rVistas = [];
    let rVista;

    // TODO: we could assume once one non-active
    // vista is hit, break from loop...
    for (var i = 0; i < this.renderVistas.length; i++) {

      rVista = this.renderVistas[i];

      // if (rVista.active == true) {
      rVistas.push(rVista.renderElement);

      // }

    }

    return <div>{rVistas}</div>;

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

      TweenMax.set(this.refs.genSpeedBar, {scaleY:speedValue, transformOrigin:'right bottom'});
      if (this.pairingTL) TweenMax.set(this.pairingTL, {timeScale:speedValue});

    } else {

      const tweenTime = 8.0;
      TweenMax.to(this.refs.genSpeedBar, tweenTime, {scaleY:speedValue, ease: Power2.easeInOut});
      if (this.pairingTL) TweenMax.to(this.pairingTL, tweenTime, {timeScale:speedValue});

    }

  }

  sortByFriendliness() {

    // Sort array by friendliness
    this.currentGeneration.sort(function(a,b) {return (a.friendliness < b.friendliness) ? 1 : ((b.friendliness < a.friendliness) ? -1 : 0);});

    // Create entrance animation
    // for seed vistas.
    this.entranceTL = new TimelineMax({onComplete:this.onSortAnimComplete});

    for (let i = 0; i < this.currentGeneration.length; i++) {

      const sortedX = 200;
      const sortedY = (i * 50) + 150;

      this.entranceTL.add(this.createSortAnim(this.currentGeneration[i].target, sortedX, sortedY), i * 0.03);

    }

    // Start entrance drama
    this.setState({systemState:'Sorting by friendliness'});

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

        <h1 className='genCounter' ref='genCounter'>000{this.state.generationCount}</h1>

        <img className='genSpeedBar' ref='genSpeedBar' src={images.vis_gen_speed} />

        <h2 className='avgDataNum' ref='avgDataNum'></h2>

        <h3 className='systemState' ref='systemState'>[ {this.state.systemState} ]</h3>

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
