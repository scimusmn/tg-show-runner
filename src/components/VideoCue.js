import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { images, sounds, videos } from '../assets/assets';

export default class VideoCue extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.videoPlayer;

    this.delayTimeout = {};
  }

  componentDidMount() {
    this.delayTimeout = setTimeout(() => {
      this.loadVideo();
    }, this.props.delay * 1000);
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

    this.unloadVideo();
    clearTimeout(this.delayTimeout);

  }

  loadVideo() {
    this.videoPlayer = this.refs.videoCue;
    const videoSrc = this.refs.cueSrc;

    videoSrc.src = this.props.src;

    this.videoPlayer.load();
    this.videoPlayer.play();
  }

  unloadVideo() {
    if (this.videoPlayer) {
      this.videoPlayer.pause();
      this.videoPlayer.src = '';
      this.videoPlayer.load();
    }
  }

  renderStaticBg() {
    if (this.props.staticBgSrc !== '') {
      return <img className="video-bg" width="1920" src={this.props.staticBgSrc} />;
    } else {
      return null;
    }
  }

  render() {
    return (

      <div>        

        {this.renderStaticBg()}
        
        <video ref="videoCue" width="1920">
          <source ref="cueSrc" type="video/mp4" />
        </video>

        <div className="debug">Video Cue</div>

      </div>

    );
  }
}

VideoCue.propTypes = {
  src: PropTypes.string,
  delay: PropTypes.number,
  staticBgSrc: PropTypes.string,
};

VideoCue.defaultProps = {
  delay: 0.0,
  staticBgSrc:'',
};
