import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TweenMax from 'gsap';

// import {Howl} from '../vendors/howler/howler';
import {images} from '../assets/assets';

class Bee extends Component {

  constructor(props) {

    super(props);

    this.state = {

    };

    this.soundAnalysisInterval = {};

  }

  componentDidMount() {

    // uncomment for binary style
    // if (this.props.friendliness < 0.6) {
    //   TweenMax.set(this.refs.friendly, { autoAlpha: 0.0 });
    // } else {
    //   TweenMax.set(this.refs.unfriendly, { autoAlpha: 0.0 });
    // }

    // TweenMax.set(this.refs.friendly, { autoAlpha: this.props.friendliness });

    // Uncomment for internal friendly movement
    // TweenMax.to(this.refs.friendly, Math.random() * 0.3 + 0.4, {scale:0.9, rotation:Math.random() * 15, ease: Power2.easeInOut, repeat:99, yoyo:true});

    this.soundAnalysis();

  }

  componentWillUnmount() {

    clearInterval(this.soundAnalysisInterval);

  }

  soundAnalysis() {

    if (Howler.ctx == null) {

      console.log('WARNING - Howler was not initilized. Skipping audio analyser.')
      return;

    }

    // Create analyzer
    let analyser = Howler.ctx.createAnalyser();

    // Connect master gain to analyzer
    Howler.masterGain.connect(analyser);

    // Connect analyzer to destination
    // analyser.connect(Howler.ctx.destination);

    // Creating output array (according to documentation https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API)
    analyser.fftSize = 32;
    let bufferLength = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);

    // Get the Data array
    analyser.getByteTimeDomainData(dataArray);

    this.soundAnalysisInterval = setInterval(() => {

      analyser.getByteTimeDomainData(dataArray);

      let average = 0;
      let max = 0;

      for (let a of dataArray) {
        a = Math.abs(a - 128);
        average += a;
        max = Math.max(max, a);
      }

      average /= dataArray.length;

      const newOpacity = this.utilMap(max, 0, 10, 0, 1);
      const newScale = this.utilMap(average, 0, 15, 1, 1.037);

      TweenMax.to(this.refs.glow, 0.125, {scale: newScale, opacity:newOpacity, ease: Power2.easeInOut});

    }, 25);

  }

  getClassNames() {
    let classStr = 'bee-container ';

    console.log('this.props.mode', this.props.mode);
    if (this.props.mode != 'default') {
      classStr += this.props.mode;
    }

    return classStr;
  }

  getImageAsset(append) {

    let assetName = 'ai_bee';

    if (this.props.mood.length > 0) {
      assetName += ('_' + this.props.mood);
    }

    if (append.length > 0) {
      assetName += ('_' + append);
    }

    console.log('getImageAsset', assetName);

    return images[assetName];

  }

  utilMap(value, inmin, inmax, outmin, outmax) {
    return (value - inmin) * (outmax - outmin) / (inmax - inmin) + outmin;
  }

  render() {

    return <div id={this.props.id} className={this.getClassNames()}>

              <img key='base' className='base bee' ref='base' src={this.getImageAsset('')} />

              <img key='glow' className='glow bee' ref='glow' src={this.getImageAsset('glow')} />

          </div>;

  }

}

Bee.propTypes = {
  mood: PropTypes.string,
  mode: PropTypes.string,
};

Bee.defaultProps = {
  mood: '',
  mode: 'default',
};

export default Bee;
