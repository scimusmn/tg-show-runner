import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Howl} from '../vendors/howler/howler';

export default class SoundCue extends Component {

  constructor(props) {

    super(props);

    this.state = {

    };

    this.sound = new Howl({
      src: [this.props.src],
      volume: this.props.volume,
      loop: this.props.loop,
    });

    this.delayTimeout = {};

  }

  componentDidMount() {

    this.delayedSound();

  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

    this.sound.stop();

    clearTimeout(this.delayTimeout);

  }

  delayedSound() {

    this.delayTimeout = setTimeout(() => {

      this.sound.play();

      if (this.props.repeat == true) {
        this.delayedSound();
      }

    }, this.props.delay * 1000);

  }

  render() {

    return (
      <div className='debug'>Sound Cue</div>
    );
  }

}

SoundCue.propTypes = {
  src: PropTypes.string,
  delay: PropTypes.number,
  volume: PropTypes.number,
  repeat: PropTypes.bool,
  loop: PropTypes.bool,
};

SoundCue.defaultProps = {
  delay: 0.0,
  volume: 1.0,
  repeat: false,
  loop: false,
};
