import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Screen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lifespanComplete: false,
      birthDelayComplete: false,
    };

    this.lifespanTimeout = {};
    this.birthDelayTimeout = {};
  }

  componentDidMount() {
    this.setState({ lifespanComplete: false });

    if (this.props.lifespan > 0.0) {
      this.lifespanTimeout = setTimeout(() => {
        this.setState({ lifespanComplete: true });
      }, this.props.lifespan * 1000);
    }

    if (this.props.birthDelay > 0.0) {
      this.birthDelayTimeout = setTimeout(() => {
        this.setState({ birthDelayComplete: true });
      }, this.props.birthDelay * 1000);
    }

  }

  componentDidUpdate() {

  }

  componentWillUnmount() {
    clearTimeout(this.lifespanTimeout);
  }

  render() {

    const fadeCSS = () => {

      if (this.state.lifespanComplete === true) {
        return 'fadeIn';
      }

      if (this.props.birthDelay > 0.0) {
        if (this.state.birthDelayComplete === true) {
          return 'fadeOut';
        } else {
          return 'fadeIn';
        }
      }

      return '';

    }

    return (
      <div>
        <div className={`fade-overlay ${fadeCSS()}`} />
        {this.props.children}
      </div>
    );
  }
}

Screen.propTypes = {
  output: PropTypes.string,
  lifespan: PropTypes.number,
  birthDelay: PropTypes.number,
};

Screen.defaultProps = {
  lifespan: 0.0,
  birthDelay: 0.0,
};

export default Screen;
