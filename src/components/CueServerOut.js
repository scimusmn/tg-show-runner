import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Howl} from '../vendors/howler/howler';

export default class CueServerOut extends Component {

  constructor(props) {

    super(props);

    this.state = {

    };

    this.delayTimeout = {};

  }

  componentDidMount() {

    this.delayTimeout = setTimeout(() => {

      console.log('cueserver Out:', this.props.cueId);

    }, this.props.delay * 1000);

  }

  componentWillUnmount() {

    clearTimeout(this.delayTimeout);

  }

  render() {

    return (null);

  }

}

CueServerOut.propTypes = {
  cueId: PropTypes.string,
  delay: PropTypes.number,
};

CueServerOut.defaultProps = {
  delay: 0.0,
};
