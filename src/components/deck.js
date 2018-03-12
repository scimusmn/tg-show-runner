import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import configureStore from '../store';

import Controller from '../utils/controller';
import Manager from './manager';

import SoundCue from './SoundCue';

const store = configureStore();

export default class Deck extends Component {
  static displayName = 'Deck';

  static propTypes = {
    autoplay: PropTypes.bool,
    autoplayDuration: PropTypes.number,
    children: PropTypes.node,
    controls: PropTypes.bool,
    globalStyles: PropTypes.bool,
    history: PropTypes.object,
    progress: PropTypes.oneOf(['pacman', 'bar', 'number', 'none']),
    theme: PropTypes.object,
    transition: PropTypes.array,
    transitionDuration: PropTypes.number,
  };

  filterChildrenForRoute() {

    let filteredChildren = [];

    const href = window.location.href;
    let isSecondaryScreen = false;

    if (href.indexOf('secondary') == -1) {
      // Show primary slides
      console.log('show primary');
    } else {
      // Show secondary slides
      console.log('show secondary');
      isSecondaryScreen = true;
    }

    React.Children.forEach(this.props.children, function(child) {

      console.log(isSecondaryScreen, child.props.notes);
      if (isSecondaryScreen == true && child.props.notes == 'Cue 1') {

        console.log('Remove audio cue');

      } else {

        filteredChildren.push(child);

      }

    });

    return filteredChildren;

  }

  render() {
    return (
      <Provider store={store}>
        <Controller
          theme={this.props.theme}
          store={store}
          history={this.props.history}
        >
          <Manager {...this.props}>{this.filterChildrenForRoute()}</Manager>
        </Controller>
      </Provider>
    );
  }
}
