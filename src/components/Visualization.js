import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TweenMax from 'gsap';
import {Howl} from '../vendors/howler/howler';
import $ from 'jquery';
import {images, sounds} from '../assets/assets';
import Vista from './Vista';
import VisGrid from '../utils/VisGrid';
import generationSimulator from '../utils/GenerationSimulator';

export default class Visualization extends Component {

  constructor(props) {

    super(props);

    this.state = {
      generationCount:0,
      systemState: 'waiting...',
    };

    this.currentGeneration = [];
    this.nextGeneration = [];

    this.vistas = [];
    this.hearts = [];

    // Reusable main gsap timelines
    this.mainTL;
    this.entranceTL;
    this.exitTL;
    this.pairingTL;
    this.sortTL;

    this.gridColumns = 7;
    this.gridRows = 10;
    this.gridCellSize = 61;

    this.childGridCols = 7;
    this.childCellSize = 33;

    this.matingMatrix = {};

    this.utilTimer = {};
    this.timeScale = 1.0;

    // Important sizes
    // this.visWidth = 600;
    // this.visHeight = 800;
    this.visWidth = 1080;
    this.visHeight = 1550;

    // Important scales
    this.vistaAdultScale = 0.38;
    this.vistaChildScale = 0.21;

    // Important locations
    this.visCenter = {x:0.37 * this.visWidth, y:0.37 * this.visHeight};
    this.entrancePoint = {x:0.83 * this.visWidth, y:0.12 * this.visHeight};
    this.exitPoint = {x:0.83 * this.visWidth, y:0.12 * this.visHeight};

    // Bind methods
    this.onEntranceComplete = this.onEntranceComplete.bind(this);
    this.onExitComplete = this.onExitComplete.bind(this);
    this.onNewGenerationComplete = this.onNewGenerationComplete.bind(this);
    this.onAllGenerationsComplete = this.onAllGenerationsComplete.bind(this);
    this.onSortAnimComplete = this.onSortAnimComplete.bind(this);
    this.onDeathComplete = this.onDeathComplete.bind(this);

    // Load all sounds
    this.loadSounds();

  }

  componentDidMount() {

    // Set initial states of visual refs.
    this.genCounter = this.refs.genCounter;
    this.genSpeedBar = this.refs.genSpeedBar;
    this.avgDataNum = this.refs.avgDataNum;
    this.trainLights = this.refs.trainLights;

    this.updateGenerationCount(this.props.startGen, false);
    this.updateGenerationSpeed(this.props.startSpeed, true);

    // Create legend
    this.vistaColorKey();

    // Find targets for all
    // render hearts.
    this.assignHeartTargets();

    // Turn on vistas glowing lights
    if (this.props.trainMode) {

      TweenMax.set(this.trainLights, {autoAlpha: 0.9});
      TweenMax.to(this.trainLights, 0.14, {autoAlpha: 0.0, ease: Power3.easeInOut, repeat:-1, yoyo:true});

    } else {

      TweenMax.set(this.trainLights, {autoAlpha: 0.0});

    }

    // No need to continue if no seed vistas...
    if (this.props.seedVistas.length == 0) {
      return;
    }

    // Start
    this.vistasEnter();

  }

  componentWillUnmount() {

    // Clear all timeouts, intervals
    clearTimeout(this.utilTimer);

    if (this.mainTL) {
      this.mainTL.pause();
      this.mainTL.kill();
    }

  }

  loadSounds() {

    this.dingSound = new Howl({
      src: [sounds.generation_ding],
      volume: 0.25,
    });

    this.kissSound1 = new Howl({
      src: [sounds.kiss1],
      volume: 0.5,
    });

    this.kissSound2 = new Howl({
      src: [sounds.kiss2],
      volume: 0.5,
    });

    this.kissSound3 = new Howl({
      src: [sounds.kiss3],
      volume: 0.5,
    });

  }

  vistaColorKey() {

    // Make one completely friendly vista
    // and one completely unfriendly vista
    // Always uses first two renderable vistas.

    const vistaFriendly = this.activateVista(1.0, -1);
    const vistaUnfriendly = this.activateVista(0.0, -1);

    TweenMax.set(vistaFriendly.target, {x:5, y:-39, scale:0.16, autoAlpha:1.0});
    TweenMax.set(vistaUnfriendly.target, {x:5, y:-8, scale:0.16, autoAlpha:1.0});

  }

  vistasEnter() {

    // Create entrance animation
    // for seed vistas.
    this.entranceTL = new TimelineMax({onComplete:this.onEntranceComplete});

    // Update text display
    this.setState({systemState:'Vistas entering'});

    for (let i = 0; i < this.props.seedVistas.length; i++) {

      const seedVista = this.props.seedVistas[i];

      // Activate vistas for entering
      const aVista = this.activateVista(seedVista, this.state.generationCount);
      this.currentGeneration.push(aVista);

      // Start vista animation for seed vistas
      this.entranceTL.add(this.createEntrance(aVista, i), i * 0.5);

    }

    // Start entrance drama
    this.entranceTL.play();

  }

  debugFillGrid() {

    const count = VisGrid.cells.length;

    for (var i = 0; i < count; i++) {

      const cell = VisGrid.getNextAvailableCell();
      cell.occupied = true;

      const gX = cell.x * this.gridCellSize + this.visCenter.x;
      const gY = cell.y * this.gridCellSize + this.visCenter.y + 200;

      const aVista = this.activateVista(0.5, 0);

      TweenMax.set(aVista.target, {autoAlpha:1.0, scale:0.4, x:gX, y:gY});

    }

  }

  createEntrance(vista, index) {

    TweenMax.set(vista.target, {x:this.entrancePoint.x, y:this.entrancePoint.y, scale:this.vistaAdultScale, autoAlpha:1.0});

    const cell = VisGrid.getNextAvailableCell();
    cell.occupied = true;

    vista.cell = cell;

    // Create a semi-random tween
    let bezTween = new TweenMax(vista.target, 1.1, {
      bezier:{
        type:'soft',
        values:[{x:this.entrancePoint.x, y:this.entrancePoint.y, x:this.visCenter.x, y:this.entrancePoint.y}, {x:cell.pixelX, y:cell.pixelY}],
        autoRotate:false,
      },
      delay:0.0,
      ease:Linear.easeNone,});

    return bezTween;

  }

  onEntranceComplete() {

    this.setState({systemState:'Reproducing'});

    // Set initial gen speeed
    this.updateGenerationSpeed(this.props.startSpeed, true);

    // Tween timescale (geneation speed)
    // if it doesn't match 4 secs into vis.
    setTimeout(() => {
      if (this.props.startSpeed != this.props.endSpeed) {
        this.updateGenerationSpeed(this.props.endSpeed, false);
      }
    }, 1000);

    // Start generations sim
    this.generationSequence();

  }

  generationSequence() {

    console.log('generationSequence()');

    this.pairingTL = new TimelineMax({onComplete:this.onNewGenerationComplete});

    let totalVistasSpawned = this.currentGeneration.length;

    // Pair off existing VISTAS
    for (let i = 0; i < this.currentGeneration.length; i += 2) {

      let curTime = 0;

      // Don't pair last vista if singleton
      // Skip to death animation :(
      if (i >= this.currentGeneration.length - 1) {

        const singletonDeath = new TweenMax(this.currentGeneration[i].target, 0.09, {delay:0.2, autoAlpha:0.0});
        this.pairingTL.add(singletonDeath, i * 0.1);

        break;

      }

      // TODO: Create more elegant
      // solution for pairing off vistas.
      // Ideally, they pair with a vista
      // adjacent to them.
      let mateIndex = i + 1;
      // if (i >= this.currentGeneration.length - 3) {
      //   mateIndex = 1;
      // }

      const v1 = this.currentGeneration[i];
      const v2 = this.currentGeneration[mateIndex];

      console.log('pairing:', i, mateIndex, this.currentGeneration.length);

      const cell1 = v1.cell;
      const cell2 = v2.cell;

      const midX = (cell1.pixelX + cell2.pixelX) * 0.5;
      const midY = (cell1.pixelY + cell2.pixelY) * 0.5;

      const mid1 = this.utilMidpoint(cell1.pixelX, cell1.pixelY, cell2.pixelX, cell2.pixelY, 0.4);
      const mid2 = this.utilMidpoint(cell1.pixelX, cell1.pixelY, cell2.pixelX, cell2.pixelY, 0.6);

      // Tween the mating dance
      const tween1 = new TweenMax(v1.target, 0.13, {x:mid1[0], y:mid1[1], ease: Bounce.easeOut});
      const tween2 = new TweenMax(v2.target, 0.13, {x:mid2[0], y:mid2[1], ease: Bounce.easeOut});

      // Add pair animation to timeline
      this.pairingTL.add(tween1, curTime);
      this.pairingTL.add(tween2, curTime);

      // Add heart animation
      const heartTween = this.activateHeart(midX, midY);
      this.pairingTL.add(heartTween, curTime + 0.13);

      // Create death tweens for each pair
      const death1 = new TweenMax(v1.target, 0.09, {delay:1.2, autoAlpha:0.0, onComplete:this.onDeathComplete, onCompleteParams:[v1]});
      const death2 = new TweenMax(v2.target, 0.09, {delay:1.2, autoAlpha:0.0, onComplete:this.onDeathComplete, onCompleteParams:[v2]});

      // Add death animations to timeline
      this.pairingTL.add(death1, curTime);
      this.pairingTL.add(death2, curTime);

      // Determine number of offspring for thi
      // couple to produce...
      let numKids = 2;
      if (this.currentGeneration.length < 6) {
        numKids = 4;
      } else if (this.currentGeneration.length < 30) {
        numKids += Math.floor(Math.random() * 2);
      }

     for (let k = 0; k < numKids; k++) {

        if (totalVistasSpawned >= this.maxRenderedVistas) {
          console.log('Max vista limit');
          break;
        }

        // Activate one vista for each...
        let childFriendliness = this.utilMap(this.state.currentGeneration, 0, 33, 0, 1);

        childFriendliness += Math.random() * 0.9 - 0.45;

        if (childFriendliness > 1) childFriendliness = 1.0;
        if (childFriendliness < 0) childFriendliness = 0.0;

        const childVista = this.activateVista(childFriendliness, this.state.currentGeneration + 1);
        totalVistasSpawned++;

        this.pairingTL.add(this.createBirthAnim(childVista, midX, midY, this.nextGeneration.length), curTime + 0.145);

        this.nextGeneration.push(childVista);

      }

      // Child generation becomes current gen.
      this.currentGeneration = this.nextGeneration;
      this.nextGeneration = [];

    }

    // Start entrance drama
    this.setState({systemState:'Allowing for reproduction'});
    this.pairingTL.play();

  }

  createBirthAnim(vista, parentsX, parentsY, index) {


    const cell = VisGrid.getNextAvailableCell();
    cell.occupied = true;
    vista.cell = cell;

    const birthTargetPos = {x:cell.pixelX, y:cell.pixelY};

    const setTween = new TweenMax.set(vista.target, {x:parentsX, y:parentsY, scale:this.vistaChildScale});

    const tween0 = new TweenMax(vista.target, 0.002, {autoAlpha:1.0, ease:Power2.easeOut});

    const tween1 = new TweenMax(vista.target, 0.1, {
      bezier:{
        type:'soft',
        values:[{x:parentsX, y:parentsY + 100}, {x:birthTargetPos.x, y:birthTargetPos.y}],
        autoRotate:false,
      },
    ease:Power2.easeOut, delay:0.01,});

    const tween2 = new TweenMax(vista.target, 0.2, {delay:0.23, scale:this.vistaAdultScale, ease:Power2.easeInOut});

    const tweenToGrid = new TweenMax(vista.target, 0.03, {delay:0.22, x:cell.pixelX, y:cell.pixelY, ease:Linear.easeNone});

    return [setTween, tween0, tween1, tween2, tweenToGrid];

  }

  onNewGenerationComplete() {

    const r = Math.random();
    if (r <= 0.33) {
      this.kissSound1.play();
    } else if (r <= 0.66) {
      this.kissSound2.play();
    } else {
      this.kissSound3.play();
    }

    // Update generation counter.
    setTimeout(() => {
      this.updateGenerationCount(1);
    }, 500);

    if (this.state.generationCount < this.props.endGen) {
      // Create one more generation.
      this.generationSequence();
    } else {
      // All generations complete.
      this.onAllGenerationsComplete();
    }

  }

  onAllGenerationsComplete() {

    this.sortByFriendliness();

  }

  vistasExit() {

    // Create entrance animation
    // for seed vistas.
    this.exitTL = new TimelineMax({onComplete:this.onExitComplete});

    this.exitTL.delay(1.0);

    let numToExit = 20;

    for (let i = 0; i < this.vistas.length; i++) {

      if (i < numToExit) {

        this.exitTL.add(this.createExit(this.vistas[i]), (i % this.offGridCols) * 0.1);

      } else {

        this.exitTL.add(this.createOblivionAnim(this.vistas[i]), (i % this.offGridCols) * 0.004);

      }

    }

    // Start entrance drama
    this.setState({systemState:'Vistas exiting'});
    this.exitTL.play();

  }

  createExit(vista, bezPoints) {

    let tween = new TweenMax(vista.target, 0.3, {delay:0, x:this.exitPoint.x, y:this.exitPoint.y});

    let scaleTween = new TweenMax(vista.target, 0.3, {delay:2.8, scale:this.vistaAdultScale});
    let scaleTween2 = new TweenMax(vista.target, 0.1, {delay:3.1, scale:0.01});

    return [tween, scaleTween, scaleTween2];

  }

  onExitComplete() {

    this.setState({systemState:'Waiting'});

  }

  assignHeartTargets() {

    // Find first availaible inactive vista...
    this.renderHearts = [];

    for (let i = 0; i < this.maxHeartRenders; i++) {

      const keyId = 'heart-' + i;

      const $target = $('.visualization .vistaContainer .' + keyId);

      const heart = {id:keyId, target:$target, active:false};

      this.renderHearts.push(heart);

      // Hide offscreen
      TweenMax.set(this.renderHearts[i].target, {scale:0.0, autoAlpha:0.0, x:88});

    }

  }

  addVista() {

    const keyId = 'vista_' + this.vistas.length;

    // Add new flyer div to stage
    $(this.refs.vistaContainer).append('<div id="' + keyId + '" class="vista" ><img id="friendly" class="vista" src=' + images.testdude + '/></div>');
    const vistaDiv = $('#' + keyId);

    // Start off screen
    TweenMax.set($(vistaDiv), { x:-999, autoAlpha:0.0 });

    // Add to game loop
    var newDude = {     id:keyId,
                        target:vistaDiv,
                        img:$(vistaDiv).children('img'),
                        active:false,
                        friendliness: -1,
                        generation: -1,
                    };

    this.vistas.push(newDude);

    return newDude;

  };

  addHeart() {

    const keyId = 'heart_' + this.hearts.length;

    // Add new flyer div to stage
    $(this.refs.vistaContainer).append('<div id="' + keyId + '" class="heart" ><img src=' + images.heart_small + '/></div>');
    const heartDiv = $('#' + keyId);

    // Start off screen
    TweenMax.set($(heartDiv), { x:-999, autoAlpha:0.0 });

    // Add to game loop
    var newHeart = {    id:keyId,
                        target:heartDiv,
                        img:$(heartDiv).children('img'),
                        active:false,
                    };

    this.hearts.push(newHeart);

    return newHeart;

  };

  activateVista(friendliness, generation) {

    const newVista = this.addVista();

    // Set initial properties
    newVista.active = true;
    newVista.friendliness = friendliness;
    newVista.generation = generation;

    // Start hidden
    TweenMax.set(newVista.target, {scale:0.0, autoAlpha:0.0, transformOrigin:'center center'});

    // Fade friendly top color
    // TweenMax.set(newVista.target.find('.friendly'), { autoAlpha: friendliness });

    // Uncomment for internal friendly movement
    if (friendliness > 0.4 && friendliness < 0.65) {
      TweenMax.set(newVista.target.find('img'),  {scale:0.99});
      TweenMax.to(newVista.target.find('img'), Math.random() * 0.3 + 0.3, {scale:1.1, rotation:Math.random() * 10, ease: Power2.easeInOut, repeat:-1, yoyo:true});
    } else if (friendliness >= 0.65) {
      TweenMax.set(newVista.target.find('img'),  {scale:0.96});
      TweenMax.to(newVista.target.find('img'), Math.random() * 0.2 + 0.2, {scale:1.25, rotation:Math.random() * 25, ease: Power2.easeInOut, repeat:-1, yoyo:true});
    }

    return newVista;

  }

  activateHeart(x, y) {

    const heartToActivate = this.addHeart();

    heartToActivate.active = true;

    const setTween = new TweenMax(heartToActivate.target, 0.0, {scale:0.2, autoAlpha:0.0, x:x + 50, y:y + 40, transformOrigin:'center center'});
    const inTween = new TweenMax(heartToActivate.target, 0.05, {scale:0.5, autoAlpha:1.0, y:'-=40', ease: Power2.easeOut});
    const outTween = new TweenMax(heartToActivate.target, 0.01, {delay:0.07, autoAlpha:0.0, ease: Power2.easeIn, onComplete:this.onHeartAnimComplete, onCompleteParams:[heartToActivate]});

    return [setTween, inTween, outTween];
  }

  onHeartAnimComplete(heart) {

    heart.active = false;

  }

  onDeathComplete(vista) {

    // console.log('deathComplete', vista);
    vista.active = false;

    // TODO: prep this vis for recycle

  }

  killVista(vistaToKill) {

    vistaToKill.active = false;

    // Move to end of array
    const targetIndex = arr.indexOf(vistaToKill);
    this.renderVistas.push(arr.splice(targetIndex, 1)[0]);

    return vista;

  }

  updateGenerationCount(increment, playSound) {

    if (playSound == undefined || playSound == true) {
      this.dingSound.play();
    }

    const newCount = this.state.generationCount + increment;
    this.setState({generationCount:newCount});

  }

  updateGenerationSpeed(speedValue, setInitial) {

    if (setInitial == true) {

      TweenMax.set(this.refs.genSpeedBar, {scaleY:speedValue, transformOrigin:'right bottom'});

      // Temp
      if (speedValue > 0.7) speedValue = 0.7;
      if (this.pairingTL) TweenMax.set(this.pairingTL, {timeScale:speedValue});

    } else {

      const tweenTime = 5.0;

      TweenMax.to(this.refs.genSpeedBar, tweenTime, {scaleY:speedValue, ease: Power2.easeInOut});

      // Temp
      if (speedValue > 0.7) speedValue = 0.7;
      if (this.pairingTL) TweenMax.to(this.pairingTL, tweenTime, {timeScale:speedValue});

    }

  }

  sortByFriendliness() {

    // Sort array by friendliness
    this.currentGeneration.sort(function(a,b) {return (a.friendliness < b.friendliness) ? 1 : ((b.friendliness < a.friendliness) ? -1 : 0);});

    // Create entrance animation
    // for seed vistas.
    this.sortTL = new TimelineMax({onComplete:this.onSortAnimComplete});

    for (let i = 0; i < this.vistas.length; i++) {

      // Sorted grid.
      this.sortTL.add(this.createSortAnim(this.vistas[i].target, 200, (i * 40) + 200), i * 0.03);

    }

    // Start entrance drama
    this.setState({systemState:'Sorting by friendliness'});

    this.sortTL.play();

  }

  createSortAnim(element, sortedX, sortedY) {

    let bezTween = new TweenMax(element, 0.4, {scale:0.2,
      bezier:{
        type:'soft',
        values:[{x:sortedX + 70, y:sortedY}, {x:sortedX, y:sortedY}],
        autoRotate:false,
      },
    ease:Linear.easeNone,});

    return bezTween;

  }

  createOblivionAnim(vista) {

    let tween = new TweenMax(vista.target, 0.5, {autoAlpha:0.0, y:'+=20', ease:Power2.easeIn});

    return tween;

  }

  onSortAnimComplete() {

    // Vista train exit
    this.vistasExit();

  }

  /**
   *
   * UTILS
   *
   */
  utilMidpoint(lat1, long1, lat2, long2, per) {
    return [lat1 + (lat2 - lat1) * per, long1 + (long2 - long1) * per];
  }

  utilMap(value, inmin, inmax, outmin, outmax) {
    return (value - inmin) * (outmax - outmin) / (inmax - inmin) + outmin;
  }

  utilShuffle(a) {

    for (let i = a.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];

    }

    return a;

  }

  render() {

    return (

      <div className='visualization'>

        {/*<img src={images.vis_bg_1} className='fs-image'/>*//*<img src={images.vis_bg_1} className='fs-image'/>*/}/*<img src={images.vis_bg_1} className='fs-image'/>*/}/*<img src={images.vis_bg_1} className='fs-image'/>*/}

        <h1 className='genCounter' ref='genCounter'>000{this.state.generationCount}</h1>

        <img className='genSpeedBar' ref='genSpeedBar' src={images.vis_gen_speed} />

        <h2 className='avgDataNum' ref='avgDataNum'></h2>

        <h3 className='systemState' ref='systemState'>[ {this.state.systemState} ]</h3>

        <div className='vistaContainer' ref='vistaContainer'>

        </div>

        {/*<img src={images.vis_fg_1} className='fs-image'/>*//*<img src={images.vis_fg_1} className='fs-image'/>*/}/*<img src={images.vis_fg_1} className='fs-image'/>*/}/*<img src={images.vis_fg_1} className='fs-image'/>*/}

        <img className='trainLights fs-image' ref='trainLights' src={images.vis_train_lights} />

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
  trainMode: PropTypes.bool,
};

Visualization.defaultProps = {
  seedVistas: [],
  trainMode: false,
};
