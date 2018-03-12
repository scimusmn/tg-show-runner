import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Screen extends Component {

  render() {

    // Only display screen if correct param is found
/*    if (window.location.href.indexOf(this.props.output) == -1) {

      return null;

    } else {

      return <div>{this.props.children}</div>;

    }*/

    return <div>{this.props.children}</div>;

  }

}

Screen.propTypes = {
  output: PropTypes.string,
};

export default Screen;
