import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Caption from './Caption';

export default class TimedCaptions extends Component {

  constructor(props) {

    super(props);

    this.state = {

    };

    this.delayTimeout = {};
    this.captionTimeout = {};

    this.captionDurations = [];
    this.captionIndex = -1;

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
    this.captionIndex++;
    console.log('Caption index', this.captionIndex);

    clearTimeout(this.captionTimeout);

    this.captionTimeout = setTimeout(() => {

      if (this.captionIndex < this.captionDurations.length) {

        console.log('Next caption :', this.captionDurations[this.captionIndex] * 1000);

        this.timedCaption();

      } else {

        console.log('No more captions :( ');
        this.captionIndex = -1;
      }

    }, this.captionDurations[this.captionIndex] * 1000);

  }

  renderCurrentCaption(index) {

    console.log('~ renderCurrentCaption', index);

    if (index < 0) {

      return null;

    } else {

      return this.props.children[index];

    }

  }

  render() {

    return (
      <div className='timed-captions'>
        {this.renderCurrentCaption(this.captionIndex)}
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
