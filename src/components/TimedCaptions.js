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

    let children = React.Children.toArray(this.props.children);

    for (let i = children.length - 1; i >= 0; i--) {

      const child = children[i];

      // Screen Type
      if (child.type.name == 'Caption') {

        console.log('Caption here');
        console.log(child.props.duration);

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

    console.log('delayeCaptions()----)');

    this.delayTimeout = setTimeout(() => {

      this.timedCaption();

    }, this.props.delay * 1000);

  }

  timedCaption() {

    // Trigger next caption....
    this.setState({ captionIndex: this.state.captionIndex + 1 });

    clearTimeout(this.captionTimeout);

    this.captionTimeout = setTimeout(() => {

      if (this.state.captionIndex < this.captionDurations.length) {

        console.log('Next caption :', this.captionDurations[this.state.captionIndex] * 1000);

        this.timedCaption();

      } else {

        console.log('No more captions :( ');
        this.setState({ captionIndex: -1 });
      }

    }, this.captionDurations[this.state.captionIndex] * 1000);

  }

  renderCurrentCaption() {

    console.log('~ renderCurrentCaption', this.state.captionIndex);

    if (this.state.captionIndex < 0) {

      return null;

    } else {

      return this.props.children[this.state.captionIndex];

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
