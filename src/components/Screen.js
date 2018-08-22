import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Screen extends Component {

  constructor(props) {

    super(props);

    this.state = {
      lifespanComplete: false,
    };

    this.lifespanTimeout = {};

  }

  componentDidMount() {

    this.setState({lifespanComplete:false});

    if (this.props.lifespan > 0.0) {

      this.lifespanTimeout = setTimeout(() => {

        this.setState({lifespanComplete:true});

      }, this.props.lifespan * 1000);

    }

  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

    clearTimeout(this.lifespanTimeout);

  }

  render() {

    const doFade = this.state.lifespanComplete ? 'fadeIn' : '';

    return <div>
              <div className={`fade-overlay ${doFade}`}></div>
              {this.props.children}
            </div>;

  }

}

Screen.propTypes = {
  output: PropTypes.string,
  lifespan: PropTypes.number,
};

Screen.defaultProps = {
  lifespan: 0.0,
};

export default Screen;
