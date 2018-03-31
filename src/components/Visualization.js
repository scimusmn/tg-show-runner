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

    this.kissSound1 = new Howl({
      src: [sounds.kiss1],
      volume: 0.4,
    });

    this.kissSound2 = new Howl({
      src: [sounds.kiss2],
      volume: 0.4,
    });

    this.kissSound3 = new Howl({
      src: [sounds.kiss3],
      volume: 0.4,
    });

    this.renderVistas = [];
    this.currentGeneration = [];
    this.nextGeneration = [];

    this.renderHearts = [];
    this.maxHeartRenders = 333;

    this.entranceTL;
    this.exitTL;
    this.pairingTL;

    this.utilTimer = {};

    this.maxRenderedVistas = 666;

    this.gridCols = 7;
    this.cellWidth = 45;
    this.matingMatrix = {};

    this.childGridCols = 10;
    this.childCellSize = 32;

    // Important sizes
    // this.visWidth = 600;
    // this.visHeight = 800;
    this.visWidth = 480;
    this.visHeight = 640;

    // Default sizes
    this.vistaAdultScale = 0.26;
    this.vistaChildScale = 0.14;

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

    // No need to continue if no seed vistas...
    if (this.props.seedVistas.length == 0) {

      this.createAnimations(2);

    } else {

      this.createAnimations(this.maxRenderedVistas);

    }

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
    this.assignVistaTargets();


    this.assignHeartTargets();

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

  createAnimations(vistasToRender) {

    // How many visual Vistas will we need
    // for this simulation?
    // const numGens = this.props.endGen - this.props.startGen;
    // const vistasToSpawn = generationSimulator.totalVistaCount(numGens, this.props.seedVistas.length);

    // console.log('vistasToSpawn', vistasToSpawn);

    // Create vista placeholders for each generation...
    for (let i = 0; i < vistasToRender; i++) {

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
      const aVista = this.activateVista(seedVista, this.state.generationCount);

      this.currentGeneration.push(aVista);

      // Start vista animation for seed vistas
      this.entranceTL.add(this.createEntrance(aVista.target, i), i * 0.16);

    }

    // Start entrance drama
    this.setState({systemState:'Vistas entering'});
    this.entranceTL.play();

  }

  createVistaColorKey() {

    // Make one completely friendly vista
    // and one completely unfriendly vista
    console.log('createVistaColorKey');

  }

  createEntrance(element, index) {

    TweenMax.set(element, {x:this.entrancePoint.x, y:this.entrancePoint.y, scale:this.vistaAdultScale, autoAlpha:1.0});

    const gridPos = this.getGridPosition(index);

    // Create a semi-random tween
    let bezTween = new TweenMax(element, 1.4, {
      bezier:{
        type:'soft',
        values:[{x:this.entrancePoint.x, y:this.entrancePoint.y,x:this.visCenter.x, y:this.entrancePoint.y}, {x:gridPos.x, y:gridPos.y}],
        autoRotate:false,
      },
      delay:0.75,
    ease:Linear.easeNone,});

    return bezTween;

  }

  onEntranceComplete() {

    this.setState({systemState:'Reproducing'});
    this.generationSequenceGo();

  }

  vistasExit() {

    // Create entrance animation
    // for seed vistas.
    this.exitTL = new TimelineMax({onComplete:this.onExitComplete});

    this.exitTL.delay(1.0);

    let gridPoints = [];
    gridPoints.push({x:this.visCenter.x, y:this.exitPoint.y});
    gridPoints.push({x:this.exitPoint.x, y:this.exitPoint.y});

    let numToExit = 20;

    for (let i = 0; i < this.currentGeneration.length; i++) {

      if (i < numToExit) {

        this.exitTL.add(this.createExit(this.currentGeneration[i].target, gridPoints), (i % this.offGridCols) * 0.1);

        // Add next vista's point to path
        const gridPos = this.getOffspringPosition(i, false);

        // gridPoints.push({x:gridPos.x, y:gridPos.y});
        // gridPoints.splice(gridPoints.length - 2, 0, gridPos);

      } else {

        this.exitTL.add(this.createOblivionAnim(this.currentGeneration[i].target), (i % this.offGridCols) * 0.004);

      }

    }

    // Start entrance drama
    this.setState({systemState:'Vistas exiting'});
    this.exitTL.play();

  }

  createExit(element, bezPoints) {

    // Made the cut. March to exit.
    // Create a semi-random tween
    let tween = new TweenMax(element, 1.5, {
        bezier:{
          type:'soft',
          values:bezPoints,
          autoRotate:false,
        },
      delay:0.8,
      ease:Linear.easeNone,});

    let scaleTween = new TweenMax(element, 0.3, {delay:2.8, scale:this.vistaAdultScale});
    let scaleTween2 = new TweenMax(element, 0.1, {delay:3.1, scale:0.01});

    return [tween, scaleTween, scaleTween2];

  }

  onExitComplete() {

    this.setState({systemState:'Waiting'});

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
    }, 1000);

    const numGens = this.props.endGen - this.props.startGen;
    const stagger = 0.001;
    let totalVistasSpawned = this.currentGeneration.length;

    for (let j = 0; j < numGens; j++) {

      // Temp: shuffle before pairing?
      // this.currentGeneration = this.utilShuffle(this.currentGeneration);
      // this.currentGeneration = this.mateShuffle(this.currentGeneration);

      // Set correct ration of friendly/unfriendly offspring
      const generationFriendlyCount = Math.round(this.getProperFriendlyCount(this.props.startGen + j + 1));

      let genTime = (j * 0.7);

      // Pair off existing VISTAS
      for (let i = 0; i < this.currentGeneration.length; i += 2) {

        let curTime = (i * stagger) + genTime;

        // Don't pair last vista if singleton
        // Skip to death animation :(
        if (i >= this.currentGeneration.length - 1) {

          const singletonDeath = new TweenMax(this.currentGeneration[i].target, 0.09, {delay:0.2, autoAlpha:0.0});
          this.pairingTL.add(singletonDeath, curTime);

          break;

        }

        // TODO: Create more elegant
        // solution for pairing off vistas.
        // Ideally, they pair with a vista
        // adjacent to them.
        let mateIndex = i + 3;
        if (i >= this.currentGeneration.length - 3) {
          mateIndex = 1;
        }

        const v1 = this.currentGeneration[i];
        const v2 = this.currentGeneration[mateIndex];

        const vista1 = v1.target;
        const vista2 = v2.target;

        // Find point between two vistas
        const gridPos1 = this.getGridPosition(i);
        const gridPos2 = this.getGridPosition(mateIndex);

        const midX = (gridPos1.x + gridPos2.x) * 0.5;
        const midY = (gridPos1.y + gridPos2.y) * 0.5;

        const mid1 = this.utilMidpoint(gridPos1.x, gridPos1.y, gridPos2.x, gridPos2.y, 0.3);
        const mid2 = this.utilMidpoint(gridPos1.x, gridPos1.y, gridPos2.x, gridPos2.y, 0.7);

        // Tween the mating dance
        const tween1 = new TweenMax(vista1, 0.13, {x:mid1[0], y:mid1[1], ease: Bounce.easeOut});
        let tween2 = new TweenMax(vista2, 0.13, {x:mid2[0], y:mid2[1], ease: Bounce.easeOut});

        // Attach oncomplete to first pair up.
        if (i == 0) {
          tween2 = new TweenMax(vista2, 0.13, {x:midX, y:midY, ease: Bounce.easeOut, onComplete:this.onNewGenerationComplete});
        }

        // Add pair animation to timeline
        this.pairingTL.add(tween1, curTime);
        this.pairingTL.add(tween2, curTime);

        // Add heart animation
        const heartTween = this.activateHeart(midX, midY);

        // Create death tweens for each pair
        const death1 = new TweenMax(vista1, 0.09, {delay:0.2, autoAlpha:0.0, onComplete:this.onDeathComplete, onCompleteParams:[v1]});
        const death2 = new TweenMax(vista2, 0.09, {delay:0.2, autoAlpha:0.0, onComplete:this.onDeathComplete, onCompleteParams:[v2]});

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
            console.log('max vista limit');
            break;
          }

          if (this.nextGeneration.length > 52) {
            // This generation has enough offspring to fill screen.
            // no need for more....
            console.log('max offspring limit');
            break;
          }

          // Activate one vista for each...
          let childFriendliness = this.utilMap(j + 1, 0, 33, 0, 1);

          childFriendliness += Math.random() * 0.9 - 0.45;

          if (childFriendliness > 1) childFriendliness = 1.0;
          if (childFriendliness < 0) childFriendliness = 0.0;

          // if (this.nextGeneration.length < generationFriendlyCount) {
          //   childFriendliness += 0.5;
          // }

          const childVista = this.activateVista(childFriendliness, j + 1);
          totalVistasSpawned++;

          this.pairingTL.add(this.createBirthingAnim(childVista.target, midX, midY, this.nextGeneration.length), curTime + 0.145);

          this.nextGeneration.push(childVista);

        }

      }

      // Child generation becomes current gen.
      this.currentGeneration = this.nextGeneration;
      this.nextGeneration = [];

    }

    // Start entrance drama
    this.setState({systemState:'Allowing for reproduction'});
    this.pairingTL.play();

  }

  createBirthingAnim(element, parentsX, parentsY, index) {

    const birthTargetPos = this.getOffspringPosition(index);

    const setTween = new TweenMax.set(element, {x:parentsX, y:parentsY, scale:this.vistaChildScale});

    const tween0 = new TweenMax(element, 0.002, {autoAlpha:1.0, ease:Power2.easeOut});

    const tween1 = new TweenMax(element, 0.1, {
      bezier:{
        type:'soft',
        values:[{x:parentsX, y:parentsY + 100}, {x:birthTargetPos.x, y:birthTargetPos.y}],
        autoRotate:false,
      },
    ease:Power2.easeOut, delay:0.01,});

    // const tween1 = new TweenMax(element, 0.08, {delay:0.01, x:birthTargetPos.x, y:birthTargetPos.y,  autoAlpha:1.0, ease:Power2.easeOut});

    const tween2 = new TweenMax(element, 0.2, {delay:0.23, scale:this.vistaAdultScale, ease:Power2.easeInOut});

    // After birth, reform grid.
    const pos = this.getGridPosition(index);
    const tweenToGrid = new TweenMax(element, 0.03, {delay:0.22, x:pos.x, y:pos.y, ease:Linear.easeNone});

    return [setTween, tween0, tween1, tween2, tweenToGrid];

  }

  getGridPosition(index, fromCenter) {

    if (fromCenter == undefined) fromCenter = true;

    let pos = {x:0, y:0};

    let col = index % this.gridCols;
    let row = (index - col) / this.gridCols;

    if (fromCenter) {

      // Instead of counting columns left to right
      // count from the center out.
      const isOddCol = col % 2;
      const startCol = Math.floor(this.gridCols / 2);
      let colOffset = Math.ceil(col / 2);

      if (isOddCol == 1) {
        colOffset *= -1;
      }

      col = colOffset;

      pos.x = this.visCenter.x + (this.cellWidth * col);
      pos.y = this.visHeight * 0.15 + (this.cellWidth * row);

    } else {

      pos.x = this.visCenter.x + (this.cellWidth * col);
      pos.y = this.visHeight * 0.15 + (this.cellWidth * row);

    }

    return pos;

  };

  getOffspringPosition(index, fromCenter) {

    if (fromCenter == undefined) fromCenter = true;

    let pos = {x:0, y:0};

    let col = index % this.childGridCols;
    let row = (index - col) / this.childGridCols;

    if (fromCenter) {

      // Instead of counting columns left to right
      // count from the center out.
      const isOddCol = col % 2;
      const startCol = Math.floor(this.childGridCols / 2);
      let colOffset = Math.ceil(col / 2);

      if (isOddCol == 1) {
        colOffset *= -1;
      }

      col = colOffset;

      pos.x = this.visCenter.x + (this.childCellSize * col);
      pos.y = this.visCenter.y * 1.5 + (this.childCellSize * row);

    } else {

      pos.x = 24 + (this.childCellSize * col);
      pos.y = 120 + (this.childCellSize * row);

    }

    return pos;

  };



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

  }

  onAllGenerationsComplete() {

    this.sortByFriendliness();

  }

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

  mateShuffle(a) {

    for (let i = a.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));

      [a[i], a[j]] = [a[j], a[i]];

    }

    return a;
  }

  getProperFriendlyCount(forGen) {

    const exits = this.props.exitFriendlies;
    const enters = this.props.seedVistas.length;

    const fCount = this.utilMap(forGen, this.props.startGen, this.props.endGen, enters, exits);

    console.log('getProperFriendlyCount', fCount);

    return fCount;

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

    vistaToActivate.friendliness = friendliness;

    TweenMax.set(vistaToActivate.target, {scale:0.0, autoAlpha:0.0, transformOrigin:'center center'});

    // Uncomment for binary style.
    /*    if (friendliness < 0.6) {
          TweenMax.set(vistaToActivate.target.find('.friendly'), { autoAlpha: 0.0 });
        } else {
          TweenMax.set(vistaToActivate.target.find('.unfriendly'), { autoAlpha: 0.0 });
        }*/

    TweenMax.set(vistaToActivate.target.find('.friendly'), { autoAlpha: friendliness });

    // Uncomment for internal friendly movement
    if (friendliness > 0.4 && friendliness < 0.65) {
      TweenMax.set(vistaToActivate.target.find('img'),  {scale:0.99});
      TweenMax.to(vistaToActivate.target.find('img'), Math.random() * 0.3 + 0.3, {scale:1.1, rotation:Math.random() * 10, ease: Power2.easeInOut, repeat:-1, yoyo:true});
    } else if (friendliness >= 0.65) {
      TweenMax.set(vistaToActivate.target.find('img'),  {scale:0.96});
      TweenMax.to(vistaToActivate.target.find('img'), Math.random() * 0.2 + 0.2, {scale:1.25, rotation:Math.random() * 25, ease: Power2.easeInOut, repeat:-1, yoyo:true});
    }

    // vistaToActivate.renderElement.setProps({ friendliness: friendliness });
    vistaToActivate.generation = generation;

    return vistaToActivate;

  }

  activateHeart(x, y) {

    // Find first availaible inactive vista...
    let heartToActivate;
    for (let i = 0; i < this.renderHearts.length; i++) {
      if (this.renderHearts[i].active == false) {
        heartToActivate = this.renderHearts[i];
        break;
      }
    }

    heartToActivate.active = true;

    console.log('active heart', heartToActivate.id);

    const inTween = new TweenMax(heartToActivate.target, 0.05, {scale:0.5, autoAlpha:1.0, y:'-=40', ease: Power2.easeOut});
    const outTween = new TweenMax(heartToActivate.target, 0.01, {delay:0.07, autoAlpha:0.0, ease: Power2.easeIn, onComplete:this.onHeartAnimComplete, onCompleteParams:[heartToActivate]});

    return [setTween, inTween, outTween];
  }

  onHeartAnimComplete(heart) {

    heart.active = false;

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

    // TODO: we could assume once one non-active
    // vista is hit, break from loop...
    for (var i = 0; i < this.renderVistas.length; i++) {

      rVistas.push(this.renderVistas[i].renderElement);

    }

    return <div>{rVistas}</div>;

  }

  renderHeartsLayer() {

    let hearts = [];

    for (var i = 0; i < this.maxHeartRenders; i++) {

      const keyId = 'heart-' + i;

      const heartJSX = <img key={keyId} className={keyId} src={images.heart_small}></img>;

      hearts.push(heartJSX);

    }

    return <div>{hearts}</div>;

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

      const tweenTime = 7.0;

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
    this.entranceTL = new TimelineMax({onComplete:this.onSortAnimComplete});

    for (let i = 0; i < this.currentGeneration.length; i++) {

      // Single file snake sort
      /*const sortedX = 100;
      const sortedY = (i * 30) + 50;

      this.entranceTL.add(this.createSortAnim(this.currentGeneration[i].target, sortedX, sortedY), i * 0.03);*/

      // Sorted grid.
      let gridPos = this.getOffspringPosition(i, false);
      this.entranceTL.add(this.createSortAnim(this.currentGeneration[i].target, gridPos.x, gridPos.y), i * 0.03);

    }

    // Start entrance drama
    this.setState({systemState:'Sorting by friendliness'});

    this.entranceTL.play();

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
          {this.renderHeartsLayer()}

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
  exitFriendlies: PropTypes.number,
};

Visualization.defaultProps = {
  exitFriendlies: 5,
};
