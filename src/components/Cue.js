/* eslint-disable no-invalid-this, max-statements */
import React from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';
import { getStyles } from '../utils/base';
import { addFragment } from '../actions';
import stepCounter from '../utils/step-counter';
import findIndex from 'lodash/findIndex';

import Screen from './Screen';

import {
  SlideContainer,
  SlideContent,
  SlideContentWrapper,
} from './slide-components';

class Cue extends React.PureComponent {
  state = {
    contentScale: 1,
    reverse: false,
    z: 1,
    zoom: 1,
    outputScreen: '',
  };

  getChildContext() {
    return {
      stepCounter: {
        setFragments: this.stepCounter.setFragments,
      },
      slideHash: this.props.hash,
    };
  }

  componentDidMount() {

    const urlParams = this.context.store.getState().route.params;

    // TODO - checking for valid output screen
    // should be broken into a separate file
    // where it's simple to add a third/fourth/fifth screen.
    if (urlParams.indexOf('primary') !== -1) {

      this.setState({outputScreen:'primary'});

    } else if (urlParams.indexOf('secondary') !== -1) {

      this.setState({outputScreen:'secondary'});

    }  else if (urlParams.indexOf('controller') !== -1) {

      this.setState({outputScreen:'controller'});

    }

    this.setZoom();
    const slide = this.slideRef;
    const frags = slide.querySelectorAll('.fragment');
    let currentOrder = 0;
    if (frags && frags.length && !this.context.overview) {
      Array.prototype.slice.call(frags, 0)
        .sort((lhs, rhs) => parseInt(lhs.dataset.order, 10) - parseInt(rhs.dataset.order, 10))
        .forEach(frag => {
          frag.dataset.fid = currentOrder;
          if (this.props.dispatch) {
            this.props.dispatch(
              addFragment({
                className: frag.className || '',
                slide: this.props.hash,
                id: `${this.props.slideIndex}-${currentOrder}`,
                visible: this.props.lastCueIndex > this.props.slideIndex,
              })
            );
          }

          currentOrder += 1;

        });
    }

    window.addEventListener('load', this.setZoom);
    window.addEventListener('resize', this.setZoom);

    if (isFunction(this.props.onActive)) {
      this.props.onActive(this.props.slideIndex);
    }

  }

  componentDidUpdate() {

    const { steps, slideIndex } = this.stepCounter.getSteps();
    if (this.props.getAppearStep) {
      if (slideIndex === this.props.slideIndex) {
        this.props.getAppearStep(steps);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.setZoom);
    window.removeEventListener('resize', this.setZoom);
  }

  componentWillEnter(callback) {
    this.setState({ transitioning: false, reverse: false, z: 1 });
    this.routerCallback(callback);
  }

  componentWillAppear(callback) {
    this.setState({ transitioning: false, reverse: false, z: 1 });
    this.routerCallback(callback);
  }

  componentWillLeave(callback) {
    this.setState({ transitioning: true, reverse: true, z: '' });
    this.routerCallback(callback);
  }

  routerCallback = callback => {
    const { transition, transitionDuration } = this.props;
    if (transition.length > 0) {
      setTimeout(() => callback(), transitionDuration);
    } else {
      callback();
    }
  };

  stepCounter = stepCounter();

  setZoom = () => {
    const mobile = window.matchMedia('(max-width: 628px)').matches;
    const content = this.contentRef;
    if (content) {
      const zoom = this.props.viewerScaleMode
        ? 1
        : content.offsetWidth / this.context.contentWidth;

      const contentScaleY =
        content.parentNode.offsetHeight / this.context.contentHeight;
      const contentScaleX = this.props.viewerScaleMode
        ? content.parentNode.offsetWidth / this.context.contentWidth
        : content.parentNode.offsetWidth / this.context.contentHeight;
      const minScale = Math.min(contentScaleY, contentScaleX);

      let contentScale = minScale < 1 ? minScale : 1;
      if (mobile && this.props.viewerScaleMode !== true) {
        contentScale = 1;
      }

      this.setState({
        zoom: zoom > 0.6 ? zoom : 0.6,
        contentScale,
      });
    }
  };

  getRouteCueIndex = () => {

    const { slideReference } = this.props;
    const { route } = this.context.store.getState();
    const { slide } = route;
    const slideIndex = findIndex(slideReference, reference => {
      return slide === String(reference.id);
    });

    return Math.max(0, slideIndex);
  };

  // Filter out children that we  don't
  // want displayed/triggered on current
  // output screen.
  filterChildren() {

    let children = React.Children.toArray(this.props.children);
    let removalIndices = [];
    let hasScreen = false;

    for (let i = children.length - 1; i >= 0; i--) {

      const child = children[i];

      // Screen Type
      if (child.type.name == 'Screen') {

        if (child.props.output == this.state.outputScreen) {

          hasScreen = true;

        } else {

          // Remove any Screen not matching
          // current output screen.
          children.splice(i, 1);

        }

      }

      // Prevent sounds and cueserver events from
      // being triggered on multiple browsers.
      if (child.type.name == 'SoundCue' || child.type.name == 'CueServerOut') {

        // TODO: We should possibly only play sounds
        // on Controller screen OR have a smart scree
        // system that only plays on first screen, no
        // matter which are connected....
        if (this.state.outputScreen !== 'primary') {
          // Remove sound if not on primary screen.

          children.splice(i, 1);

        }

      }

    }

    // If no screen is found for current Output,
    // add an empty screen.
    if (!hasScreen) {
      children.push(<Screen key='auto-screen-empty' output={this.state.outputScreen}><p>Auto-added empty screen.</p></Screen>);
    }

    return children;

  }

  render() {
    const { presenterStyle, children, transitionDuration } = this.props;

    if (!this.props.viewerScaleMode) {
      document.documentElement.style.fontSize = `${16 * this.state.zoom}px`;
    }

    const contentClass = isUndefined(this.props.className)
      ? ''
      : this.props.className;

    return (

          <SlideContainer
            className='spectacle-slide'
            innerRef={s => {
              this.slideRef = s;
            }}

            exportMode={this.props.export}
            printMode={this.props.print}
            background={this.context.styles.global.body.background}
            styles={{
              base: getStyles.call(this),
              presenter: presenterStyle,
            }}
          >
            <SlideContentWrapper
              align={this.props.align}
              overviewMode={this.context.overview}
            >
              <SlideContent
                innerRef={c => {
                  this.contentRef = c;
                }}

                className={`${contentClass} spectacle-content`}
                overviewMode={this.context.overview}
                width={this.context.contentWidth}
                height={this.context.contentHeight}
                scale={this.state.contentScale}
                zoom={this.state.zoom}
                margin={this.props.margin}
                styles={{ context: this.context.styles.components.content }}
              >
                {this.filterChildren()}
              </SlideContent>
            </SlideContentWrapper>
          </SlideContainer>
    );
  }
}

Cue.defaultProps = {
  align: 'center center',
  presenterStyle: {},
  style: {},
  viewerScaleMode: false,
};

Cue.propTypes = {
  align: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  dispatch: PropTypes.func,
  export: PropTypes.bool,
  getAppearStep: PropTypes.func,
  hash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lastCueIndex: PropTypes.number,
  margin: PropTypes.number,
  notes: PropTypes.any,
  onActive: PropTypes.func,
  presenterStyle: PropTypes.object,
  print: PropTypes.bool,
  slideIndex: PropTypes.number,
  slideReference: PropTypes.array,
  style: PropTypes.object,
  transition: PropTypes.array,
  transitionDuration: PropTypes.number,
  transitionIn: PropTypes.array,
  transitionOut: PropTypes.array,
  viewerScaleMode: PropTypes.bool,
};

Cue.contextTypes = {
  styles: PropTypes.object,
  contentWidth: PropTypes.number,
  contentHeight: PropTypes.number,
  export: PropTypes.bool,
  print: PropTypes.object,
  overview: PropTypes.bool,
  store: PropTypes.object,
};

Cue.childContextTypes = {
  slideHash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  stepCounter: PropTypes.shape({
    setFragments: PropTypes.func,
  }),
};

export default Cue;
