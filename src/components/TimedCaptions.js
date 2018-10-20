import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Caption from './Caption';

export default class TimedCaptions extends Component {

  constructor(props) {

    super(props);

    this.state = {

      captionIndex: -1,

    };

    this.delayTimeout = {};
    this.captionTimeout = {};

    this.captionDurations = [];

  }

  componentDidMount() {

    const children = React.Children.toArray(this.props.children);

    for (var i = 0; i < children.length; i++) {

      const child = children[i];

      // Screen Type
      if (child.type.name == 'Caption') {

        this.captionDurations.push(parseFloat(child.props.duration));

      }

    }

    this.delayedCaptions();

  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

    clearTimeout(this.delayTimeout);
    clearTimeout(this.captionTimeout);

  }

  delayedCaptions() {

    this.delayTimeout = setTimeout(() => {

      this.timedCaption();

    }, this.props.delay * 1000);

  }

  timedCaption() {

    // Trigger next caption....
    this.setState({ captionIndex: this.state.captionIndex + 1 });

    clearTimeout(this.captionTimeout);

    this.captionTimeout = setTimeout(() => {

      if (this.state.captionIndex < this.captionDurations.length - 1) {

        this.timedCaption();

      } else {

        // No more captions :(
        this.setState({ captionIndex: -1 });

      }

    }, this.captionDurations[this.state.captionIndex] * 1000);

  }

  renderCurrentCaption() {

    if (this.state.captionIndex < 0) {

      return null;

    } else {

      const childrenArray = React.Children.toArray(this.props.children);
      return childrenArray[this.state.captionIndex];

    }

  }

  render() {

    return (
      <div className='timed-captions'>
        {this.renderCurrentCaption()}
      </div>
    );

  }

}

TimedCaptions.propTypes = {
  delay: PropTypes.number,
};

TimedCaptions.defaultProps = {
  delay: 0.0,
};
