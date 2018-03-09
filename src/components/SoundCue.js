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
    });

    this.delayTimeout = {};

  }

  componentDidMount() {

    this.delayTimeout = setTimeout(() => {

      this.sound.play();

    }, this.props.delay * 1000);

  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

    console.log('Stop Sound');

    this.sound.stop();

    clearTimeout(this.delayTimeout);

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
};

SoundCue.defaultProps = {
  delay: 0.0,
};
