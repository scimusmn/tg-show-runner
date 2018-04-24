import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TweenMax from 'gsap';
import {Howl} from '../vendors/howler/howler';
import $ from 'jquery';
import {images, sounds, getVistaSet} from '../assets/assets';
import Vista from './Vista';
import VisGrid from '../utils/VisGrid';
import generationSimulator from '../utils/GenerationSimulator';
import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesBars } from 'react-sparklines';

export default class Visualization extends Component {

  constructor(props) {

    super(props);

    this.state = {
      generationCount:0,
      generationSpeed:0,
      averageFriendliness: 0,
      totalVistasSpawned: 0,
      currentPopulation: 0,
      systemState: 'Waiting...',
    };

    this.currentGeneration = [];
    this.nextGeneration = [];

    this.newVistasSpawned = 0;
    this.friendlinessData = [];
    this.totalSpawnsData = [];

    this.vistas = [];
    this.hearts = [];

    // Reusable main gsap timelines
    this.mainTL;
    this.entranceTL;
    this.exitTL;
    this.pairingTL;
    this.sortTL;

    this.utilTimer = {};
    this.timeScale = 1.0;
    this.displayTimeScale = 100;

    // Important sizes
    // this.visWidth = 600;
    // this.visHeight = 800;
    this.visWidth = 1080;
    this.visHeight = 1550;

    // Important scales
    this.vistaAdultScale = 0.32;
    this.vistaChildScale = 0.13;

    // Important locations
    this.visCenter = {x:0.37 * this.visWidth, y:0.37 * this.visHeight};
    this.entrancePoint = {x:0.99 * this.visWidth, y:0.134 * this.visHeight};
    this.exitPoint = {x:0.44 * this.visWidth, y:-0.1 * this.visHeight};

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
    this.trainLights = this.refs.trainLights;

    // Load initial state
    this.loadInitialState();

    // Create legend
    this.vistaColorKey();

    // Find targets for all
    // render hearts.
    this.assignHeartTargets();

    // Reset vis grid
    VisGrid.reset();

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

    // Save ending state
    // for next vis to pick up.
    this.storeCurrentState();

    // Clear all timeouts, intervals
    clearTimeout(this.utilTimer);

    if (this.mainTL) {
      this.mainTL.pause();
      this.mainTL.kill();
    }

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

    if (this.sortTL) {
      this.sortTL.pause();
      this.sortTL.kill();
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

    TweenMax.set(vistaFriendly.target, {x:40, y:0, scale:this.vistaAdultScale + 0.05, autoAlpha:1.0});
    TweenMax.set(vistaUnfriendly.target, {x:40, y:61, scale:this.vistaAdultScale + 0.05, autoAlpha:1.0});

  }

  vistasEnter() {

    // Create entrance animation
    // for seed vistas.
    this.entranceTL = new TimelineMax({onComplete:this.onEntranceComplete});

    // Update text display
    this.setState({systemState:'Vistas entering'});

    for (let i = 0; i < this.props.seedVistas.length; i++) {

      const seedVista = this.props.seedVistas[i];

      // Increment for data vis
      this.newVistasSpawned++;

      // Activate vistas for entering
      const aVista = this.activateVista(seedVista, this.state.generationCount);
      this.currentGeneration.push(aVista);

      // Start vista animation for seed vistas
      this.entranceTL.add(this.createEntrance(aVista, i), i * 0.5);

    }

    // Start entrance drama
    this.entranceTL.play();

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

    this.pairingTL = new TimelineMax({onComplete:this.onNewGenerationComplete});

    // const mateLookup = VisGrid.resetMates(this.currentGeneration);

    // Pair off existing VISTAS
    for (let i = 0; i < this.currentGeneration.length; i += 2) {

      let curTime = 0;

      // Don't pair last vista if singleton
      // Skip to death animation :(
      if (i >= this.currentGeneration.length - 1) {

        const singletonDeath = new TweenMax(this.currentGeneration[i].target, 0.9 * this.timeScale, {delay:2.5 * this.timeScale, ease: Power2.easeOut, autoAlpha:0.0, scaleY:0.01, scaleX:0.1, ease: Power2.easeOut, autoAlpha:0.0, onComplete:this.onDeathComplete, onCompleteParams:[this.currentGeneration[i]]});
        this.pairingTL.add(singletonDeath, curTime);

        break;

      }

      // TODO: Create more elegant
      // solution for pairing off vistas.
      // Ideally, they pair with a vista
      // adjacent to them.
      let mainIndex = i;
      let mateIndex = mainIndex + 1;

      // mainIndex = mateLookup[mainIndex];
      // mateIndex = mateLookup[mateIndex];

      const v1 = this.currentGeneration[mainIndex];
      const v2 = this.currentGeneration[mateIndex];

      const cell1 = v1.cell;
      const cell2 = v2.cell;

      const midX = (cell1.pixelX + cell2.pixelX) * 0.5;
      const midY = (cell1.pixelY + cell2.pixelY) * 0.5;

      const mid1 = this.utilMidpoint(cell1.pixelX, cell1.pixelY, cell2.pixelX, cell2.pixelY, 0.4);
      const mid2 = this.utilMidpoint(cell1.pixelX, cell1.pixelY, cell2.pixelX, cell2.pixelY, 0.6);

      // Tween the mating dance
      const tween1 = new TweenMax(v1.target, 0.4 * this.timeScale, {x:mid1[0], y:mid1[1], ease: Power4.easeIn,  yoyo:true, repeat:1});
      const tween2 = new TweenMax(v2.target, 0.4 * this.timeScale, {x:mid2[0], y:mid2[1], ease: Power4.easeIn,  yoyo:true, repeat:1});

      // Add pair animation to timeline
      this.pairingTL.add(tween1, curTime);
      this.pairingTL.add(tween2, curTime);

      // Add heart animation
      // const heartTween = this.activateHeart(midX, midY);
      // this.pairingTL.add(heartTween, curTime + (0.2 * this.timeScale));

      // Create death tweens for each pair
      const death1 = new TweenMax(v1.target, 0.9 * this.timeScale, {delay:2.5 * this.timeScale, ease: Power2.easeOut, autoAlpha:0.0, scaleY:0.01, scaleX:0.1, onComplete:this.onDeathComplete, onCompleteParams:[v1]});
      const death2 = new TweenMax(v2.target, 0.9 * this.timeScale, {delay:2.5 * this.timeScale, ease: Power2.easeOut, autoAlpha:0.0, scaleY:0.01, scaleX:0.1, onComplete:this.onDeathComplete, onCompleteParams:[v2]});

      // Add death animations to timeline
      this.pairingTL.add(death1, curTime);
      this.pairingTL.add(death2, curTime);

      // Determine number of offspring for thi
      // couple to produce...
      let numKids = 0;
      if (this.currentGeneration.length < 10) {
        numKids = 3 + Math.round(Math.random());
      } else if (this.currentGeneration.length < 40) {
        numKids = 2 + Math.round(Math.random());
      } else {
        numKids = 1 + Math.round(Math.random() * 2.5);
      }

      // Buffer time before spawn anims.
      curTime += (0.3 * this.timeScale);

      for (let k = 0; k < numKids; k++) {

        // Activate one vista for each...
        const childFriendliness = this.getProperFriendliness(this.state.generationCount);

        const childVista = this.activateVista(childFriendliness, this.state.currentGeneration + 1);

        // Increment for data vis
        this.newVistasSpawned++;

        const birthTweens = this.createBirthAnim(childVista, midX, midY, k, cell1);

        if (birthTweens) {
          this.pairingTL.add(birthTweens, curTime);
          this.nextGeneration.push(childVista);
        } else {
          // Grid was already full.
          // Let this child vista go...
          this.onDeathComplete(childVista);
        }

      }

    }

    // Child generation becomes current gen.
    this.currentGeneration = this.nextGeneration;
    this.nextGeneration = [];

    this.onNewGenerationSpawned();

    // Start pairing
    this.setState({systemState:'Spawning'});

    this.utilTimer = setTimeout(() => {
      this.setState({systemState:'Waiting'});
    }, 1500 * this.timeScale);

    this.pairingTL.play();

  }

  getProperFriendliness(forGeneration) {

    let childFriendliness = this.utilMap(forGeneration, 0, 45, 0, 1);

    childFriendliness += Math.random() * 1.2 - 0.6;

    if (childFriendliness > 1) childFriendliness = 1.0;
    if (childFriendliness < 0) childFriendliness = 0.0;

    return childFriendliness;
  }

  createBirthAnim(vista, parentsX, parentsY, index, parentCellRef) {

    // const cell = VisGrid.getRandomAvailableCell();

    // TODO: This is where the program gets help up.
    // Need to optimize further.
    const cell = VisGrid.getNearestAvailableCell(parentCellRef);

    if (!cell) {
      // All cells occupied.
      // return null.
      return null;
    }

    cell.occupied = true;
    vista.cell = cell;

    const birthTargetPos = {x:cell.pixelX, y:cell.pixelY};
    /*
        if (birthTargetPos.x > VisGrid.gridCenter.x) {
          birthTargetPos.x += 15 + Math.random()*30;
        } else {
          birthTargetPos.x -= 15 + Math.random()*30;
        }

        if (birthTargetPos.y > VisGrid.gridCenter.y) {
          birthTargetPos.y += 15 + Math.random()*30;
        } else {
          birthTargetPos.y -= 15 + Math.random()*30;
        }*/

    const setTween = new TweenMax.set(vista.target, {x:parentsX, y:parentsY, scale:this.vistaChildScale});

    const tweenShow = new TweenMax(vista.target, 0.3 * this.timeScale, {autoAlpha:1.0, ease:Power2.easeOut});

    const tweenToGrid = new TweenMax(vista.target, 0.6 * this.timeScale, {delay:0.05 * this.timeScale, x:birthTargetPos.x, y:birthTargetPos.y, ease:Power3.easeOut});

    const tweenGrow = new TweenMax(vista.target, 1.0 * this.timeScale, {delay:1.4 * this.timeScale, autoAlpha:1.0, x:cell.pixelX, y:cell.pixelY, scale:this.vistaAdultScale, ease:Power2.easeInOut});

    return [setTween, tweenShow, tweenToGrid, tweenGrow];

  }

  onNewGenerationSpawned() {

    console.log('onNewGenerationSpawned()');

    // Update data
    this.setState({totalVistasSpawned:this.newVistasSpawned});

    this.totalSpawnsData.push(this.newVistasSpawned);

    // Get sum of all active vistas' friendliness
    let sumFriendliness = 0.0;
    let numActive = 0;
    for (let i = 0; i < this.vistas.length; i++) {

      if (this.vistas[i].active == true) {
        sumFriendliness += this.vistas[i].friendliness;
        numActive++;
      }

    }

    const newAvg = (sumFriendliness / numActive).toFixed(2);
    this.setState({averageFriendliness:newAvg});

    // Update sparkline data
    this.friendlinessData.push(newAvg);

    this.setState({currentPopulation:numActive});

    setTimeout(() => {
      this.updateGenerationCount(1);
    }, 400 * this.timeScale);

    console.log('end onNewGenerationSpawned()');

  }

  onNewGenerationComplete() {

    console.log('onNewGenerationComplete()');

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

    const stagger = 0.2;
    const totalTime = this.currentGeneration.length * stagger;

    for (var i = this.currentGeneration.length - 1; i >= 0; i--) {

      if (i < numToExit) {

        this.exitTL.add(this.createExit(this.currentGeneration[i]), (i * stagger) + 1.5);

      } else {

        this.exitTL.add(this.createOblivionAnim(this.currentGeneration[i]), 0.0);

      }

    }

    // Start entrance drama
    this.setState({systemState:'Vistas exiting'});
    this.exitTL.play();

  }

  createExit(vista, bezPoints) {

    let bezTween = new TweenMax(vista.target, 1.1, {
      bezier:{
        type:'soft',
        values:[{x:this.exitPoint.x, y:this.entrancePoint.y}, {x:this.exitPoint.x, y:this.exitPoint.y}],
        autoRotate:false,
      },
      delay:0.0,
      scale:this.vistaAdultScale,
      ease:Linear.easeNone,});

    return [bezTween];

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

    const set = getVistaSet();

    // Add new flyer div to stage
    $(this.refs.vistaContainer).append('<div id="' + keyId + '" class="vista"><img id="unfriendly" class="vista unfriendly" src=' + set.unfriendly + '/><img id="friendly" class="vista friendly" src=' + set.friendly + '/></div>');
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

    let newVista;

    for (var i = 0; i < this.vistas.length; i++) {
      if (this.vistas[i].active == false) {
        newVista = this.vistas[i];
        break;
      }
    }

    // Create new vista if no inactive ones found.
    if (!newVista || newVista == undefined) {
      newVista = this.addVista();
    }

    // Set initial properties
    newVista.active = true;
    newVista.friendliness = friendliness;
    newVista.generation = generation;

    // Start hidden
    TweenMax.set(newVista.target, {scale:0.0, autoAlpha:0.0, transformOrigin:'center center'});

    // Fade friendly top color
    TweenMax.set(newVista.target.find('img.friendly'), { autoAlpha: friendliness });

    // Uncomment for internal friendly movement
    if (friendliness > 0.4 && friendliness < 0.65) {
      TweenMax.set(newVista.target.find('img'),  {scale:0.99});
      TweenMax.to(newVista.target.find('img'), Math.random() * 0.3 + 0.3, {scale:1.1, ease: Power2.easeInOut, repeat:-1, yoyo:true});
    } else if (friendliness >= 0.65) {
      TweenMax.set(newVista.target.find('img'),  {scale:0.95});
      TweenMax.to(newVista.target.find('img'), Math.random() * 0.2 + 0.2, {scale:1.3, ease: Power2.easeInOut, repeat:-1, yoyo:true});
    }

    return newVista;

  }

  activateHeart(x, y) {

    const heartToActivate = this.addHeart();

    heartToActivate.active = true;

    const setTween = new TweenMax(heartToActivate.target, 0.0 * this.timeScale, {scale:0.3, autoAlpha:0.0, x:x + 51, y:y + 65, transformOrigin:'center center'});
    const inTween = new TweenMax(heartToActivate.target, 0.3 * this.timeScale, {scale:0.7, autoAlpha:1.0, y:'-=30', ease: Power2.easeOut});
    const outTween = new TweenMax(heartToActivate.target, 0.8 * this.timeScale, {delay:0.9 * this.timeScale, autoAlpha:0.0, ease: Power2.easeIn, onComplete:this.onHeartAnimComplete, onCompleteParams:[heartToActivate]});

    return [setTween, inTween, outTween];

  }

  onHeartAnimComplete(heart) {

    heart.active = false;

  }

  onDeathComplete(vista) {

    vista.active = false;
    if (vista.cell) vista.cell.occupied = false;

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

  updateGenerationSpeed(generationSpeed, setInitial) {

    console.log('updateGenerationSpeed', generationSpeed);

    this.setState({generationSpeed:generationSpeed});

    if (setInitial == true) {

      TweenMax.set(this.refs.genSpeedBar, {scaleY:generationSpeed, transformOrigin:'right bottom'});

      if (generationSpeed >= 0.5) {
        this.timeScale = 0.35;
        this.displayTimeScale = 500;
      }

    } else {

      const tweenTime = 5.0;

      TweenMax.to(this.refs.genSpeedBar, tweenTime, {scaleY:generationSpeed, ease: Power2.easeInOut});

      if (generationSpeed >= 0.5) {
        TweenMax.to(this, tweenTime, {timeScale:0.35});
        TweenMax.to(this, tweenTime, {displayTimeScale:500});
      }

    }

  }

  getGenSpeedPercent() {
    return Math.round(this.displayTimeScale) + '%';
  }

  sortByFriendliness() {

    // Sort array by friendliness
    this.currentGeneration.sort(function(a,b) {return (a.friendliness < b.friendliness) ? 1 : ((b.friendliness < a.friendliness) ? -1 : 0);});

    // Create entrance animation
    // for seed vistas.
    this.sortTL = new TimelineMax({onComplete:this.onSortAnimComplete});

    const sortCols = 10;
    const padding = 50;

    for (let i = 0; i < this.currentGeneration.length; i++) {

      const col = i % sortCols;
      const row = (i - col) / sortCols;

      const sortedX = 160 + (padding * col);
      const sortedY = 450 + (padding * row);

      this.sortTL.add(this.createSortAnim(this.currentGeneration[i].target, sortedX, sortedY), i * 0.03);

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

  createOblivionAnim(element) {

    let tween = new TweenMax(element, 0.5, {autoAlpha:0.0, y:'+=20', ease:Power2.easeIn});

    return tween;

  }

  createOblivionAnim(vista) {

    let tween = new TweenMax(vista.target, 0.4, {autoAlpha:0.0, y:'+=30', ease:Power2.easeIn});

    return tween;

  }

  onSortAnimComplete() {

    // Vista train exit
    this.vistasExit();

  }

  loadInitialState() {

    // Look for a previously saved initial state.
    let storedState = JSON.parse(window.localStorage.getItem('visualization-state'));

    // Set intial generation count
    if (this.props.startGen) {
      // Prop was explicitly set.
      this.updateGenerationCount(this.props.startGen, false);
    } else if (storedState && storedState.generationCount) {
      this.updateGenerationCount(storedState.generationCount, false);
    } else {
      console.log('Missing initial generationCount. Default:', this.state.generationCount);
    }

    // Set intial generation speed
    if (this.props.startSpeed) {
      // Prop was explicitly set.
      this.updateGenerationSpeed(this.props.startSpeed, true);
    } else if (storedState && storedState.generationSpeed) {
      this.updateGenerationSpeed(storedState.generationSpeed, true);
    } else {
      console.log('Missing initial generationSpeed. Default:', this.state.generationSpeed);
    }

    // Set intial avg friendliness level
    if (storedState && storedState.averageFriendliness) {
      this.setState({averageFriendliness:storedState.averageFriendliness});
    } else {
      console.log('Missing initial averageFriendliness. Default:', this.state.averageFriendliness);
    }

    // Set intial total spawned
    if (storedState && storedState.totalVistasSpawned) {
      this.setState({totalVistasSpawned:storedState.totalVistasSpawned});
    } else {
      console.log('Missing initial totalVistasSpawned. Default:', this.state.totalVistasSpawned);
    }

    if (storedState && storedState.friendlinessData) {
      this.friendlinessData = storedState.friendlinessData;
    }

    if (storedState && storedState.totalSpawnsData) {
      this.totalSpawnsData = storedState.totalSpawnsData;
    }

    return storedState;

  }

  // Save current state
  // to local storage
  storeCurrentState() {

    const state = JSON.stringify({

      generationCount: this.state.generationCount,
      generationSpeed: this.state.generationSpeed,
      averageFriendliness: this.state.averageFriendliness,
      totalVistasSpawned: this.state.totalVistasSpawned,
      friendlinessData: this.friendlinessData,
      totalSpawnsData: this.totalSpawnsData,

    });

    console.log('-- storing State --');
    console.log(state);

    localStorage.setItem(
      'visualization-state', state
    );

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

  utilPad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
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

        <img src={images.vis_bg_1} className='fs-image'/>

        <div className='data-pane legend'>
          <h3 className='label friendly'>FRIENDLY</h3>
          <h3 className='label unfriendly'>UNFRIENDLY</h3>
        </div>

        <div className='vistaContainer' ref='vistaContainer'></div>

        <h3 className='label counter'>GENERATIONS<br/>PASSED</h3>
        <h1 className='label genCounter' ref='genCounter'>{this.utilPad(this.state.generationCount, 2)}</h1>

        <h3 className='label speed'>GENERATION<br/>SPEED<br/>{this.getGenSpeedPercent()}</h3>
        <img className='genSpeedBar gray' src={images.vis_gen_speed_bg} />
        <img className='genSpeedBar red' ref='genSpeedBar' src={images.vis_gen_speed} />

        <p className='label currentPopulation'>CURRENT POPPER COUNT: <span className='data-val'>{this.state.currentPopulation}</span></p>
        <p className='label averageFriendliness'>AVERAGE FRIENDLINESS: <span className='data-val'>{Math.floor(this.state.averageFriendliness * 100) }%</span></p>
        <p className='label totalVistasSpawned'>TOTAL VISTAS SPAWNED: <span className='data-val'>{this.state.totalVistasSpawned}</span></p>

        <h3 className='label systemState' ref='systemState'>[ {this.state.systemState} ]</h3>

        <img className='trainLights fs-image' ref='trainLights' src={images.vis_train_lights} />

        <img src={images.vis_fg_1} className='fs-image'/>

        <div className='sparkline-container'>
          <Sparklines data={this.friendlinessData} limit={50} min={0.0} max={1.0}>
            <SparklinesLine color={'red' } />
          </Sparklines>
        </div>

        <div className='bars-container'>
          <Sparklines data={this.totalSpawnsData} limit={50} min={0.0} max={1600}>
            <SparklinesBars color={'blue'} />
          </Sparklines>
        </div>

        <img className='digi-clock' src={images.red_digital_clock} />

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
