import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { emitCueMessageToNode } from '../api/api';

export default class CueServerOut extends Component {

  constructor(props) {

    super(props);

    this.state = {

    };

    this.delayTimeout = {};

  }

  componentDidMount() {

    this.delayTimeout = setTimeout(() => {


      emitCueMessageToNode(this.props.cueId);


    }, this.props.delay * 1000);

  }

  componentWillUnmount() {

    clearTimeout(this.delayTimeout);

  }

  render() {

    return <div className='debug'>CueServerOut: {this.props.cueId}</div>

  }

}

CueServerOut.propTypes = {
  cueId: PropTypes.string,
  delay: PropTypes.number,
};

CueServerOut.defaultProps = {
  delay: 0.0,
};
