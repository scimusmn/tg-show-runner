/*eslint new-cap:0, max-statements:0*/
/* eslint react/no-did-mount-set-state: 0 */

import React, { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import ReactTransitionGroup from 'react-transition-group/TransitionGroup';
import filter from 'lodash/filter';
import size from 'lodash/size';
import findIndex from 'lodash/findIndex';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { setGlobalStyle, updateFragment } from '../actions';
import { getSlideByIndex } from '../utils/slides';
import styled from 'react-emotion';
import { string as toStringStyle } from 'to-style';
import memoize from 'lodash/memoize';

import Presenter from './presenter';
import Controller from './Controller';
import {preloadAllImages} from '../assets/assets';
import Export from './export';
import Overview from './overview';

import Progress from './progress';
import Controls from './controls';

let convertStyle = styles => {
  return Object.keys(styles)
    .map(key => {
      return `${key} { ${toStringStyle(styles[key])}} `;
    })

    .join('');
};

convertStyle = memoize(convertStyle);

const StyledDeck = styled('div')(props => ({
  backgroundColor:
    props.route.params.indexOf('presenter') !== -1 ||
    props.route.params.indexOf('overview') !== -1
      ? 'black'
      : '',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
}));

const StyledTransition = styled(ReactTransitionGroup)({
  height: '100%',
  width: '100%',
  perspective: 1000,
  transformStyle: 'flat',
});

export class Manager extends Component {
  static displayName = 'Manager';

  static defaultProps = {
    autoplay: false,
    autoplayDuration: 7000,
    contentWidth: 1000,
    contentHeight: 700,
    transition: [],
    transitionDuration: 500,
    progress: 'none',
    controls: false,
    globalStyles: true,
  };

  static propTypes = {
    autoplay: PropTypes.bool,
    autoplayDuration: PropTypes.number,
    children: PropTypes.node,
    contentHeight: PropTypes.number,
    contentWidth: PropTypes.number,
    controls: PropTypes.bool,
    dispatch: PropTypes.func,
    fragment: PropTypes.object,
    globalStyles: PropTypes.bool,
    progress: PropTypes.oneOf(['pacman', 'bar', 'number', 'none']),
    route: PropTypes.object,
    transition: PropTypes.array,
    transitionDuration: PropTypes.number,
  };

  static contextTypes = {
    styles: PropTypes.object,
    print: PropTypes.object,
    history: PropTypes.object,
    presenter: PropTypes.bool,
    export: PropTypes.bool,
    overview: PropTypes.bool,
    store: PropTypes.object,
    slide: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  static childContextTypes = {
    contentWidth: PropTypes.number,
    contentHeight: PropTypes.number,
    goToSlide: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._handleDisplayChange = this._handleDisplayChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this._goToSlide = this._goToSlide.bind(this);
    this._startAutoplay = this._startAutoplay.bind(this);
    this._stopAutoplay = this._stopAutoplay.bind(this);
    this.resetShow = this.resetShow.bind(this);
    this.state = {
      lastSlideIndex: null,
      slideReference: [],
      fullscreen: window.innerHeight === screen.height,
      mobile: window.innerWidth < props.contentWidth,
      autoplaying: props.autoplay,
    };
    this.slideCache = null;
  }

  getChildContext() {
    return {
      contentWidth: this.props.contentWidth,
      contentHeight: this.props.contentHeight,
      goToSlide: slide => this._goToSlide({ slide }),
    };
  }

  componentWillMount() {
    this.setState({
      slideReference: this._buildSlideReference(this.props),
    });
  }

  componentDidMount() {
    const slideIndex = this._getSlideIndex();

    // TN
    if (slideIndex == 0) {

      // Preload all images for all cues.
      preloadAllImages();

      this.clearVisData();

    }

    this.setState({
      lastSlideIndex: slideIndex,
    });
    this._attachEvents();
    if (this.props.autoplay) {
      this._startAutoplay();
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      slideReference: this._buildSlideReference(nextProps),
    });
  }

  componentDidUpdate() {
    if (
      this.props.globalStyles &&
      !this.context.store.getState().style.globalStyleSet
    ) {
      this.props.dispatch(setGlobalStyle());
    }
  }

  componentWillUnmount() {
    this._detachEvents();
  }

  viewedIndexes = new Set();

  _attachEvents() {
    window.addEventListener('storage', this._goToSlide);
    window.addEventListener('keydown', this._handleKeyPress);
    window.addEventListener('resize', this._handleDisplayChange);
  }

  _detachEvents() {
    window.removeEventListener('storage', this._goToSlide);
    window.removeEventListener('keydown', this._handleKeyPress);
    window.removeEventListener('resize', this._handleDisplayChange);
  }

  _startAutoplay() {
    clearInterval(this.autoplayInterval);
    this.setState({ autoplaying: true });
    this.autoplayInterval = setInterval(() => {
      this._nextSlide();
    }, this.props.autoplayDuration);
  }

  _stopAutoplay() {
    this.setState({ autoplaying: false });
    clearInterval(this.autoplayInterval);
  }

  _handleEvent(e) {
    // eslint-disable-line complexity
    const event = window.event ? window.event : e;

    /*----------  Keyboard Hotkeys  ----------*/

    // Previous slide
    // includes LEFT key
    // and PAGE UP.
    if (
      event.keyCode === 37 ||
      event.keyCode === 33 ||
      (event.keyCode === 32 && event.shiftKey)
    ) {
      this._prevSlide();
      this._stopAutoplay();

    // Next slide
    // includes RIGHT key
    // and PAGE DOWN.
    } else if (
      event.keyCode === 39 ||
      event.keyCode === 34 ||
      (event.keyCode === 32 && !event.shiftKey)
    ) {
      this._nextSlide();
      this._stopAutoplay();

    // o for Overview mode
    } else if (
      event.altKey &&
      event.keyCode === 79 &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      // o
      this._toggleOverviewMode();

    // p for Presenter mode
    } else if (
      event.altKey &&
      event.keyCode === 80 &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      // p
      this._togglePresenterMode();

    // c for Controller mode
    } else if (
      event.keyCode === 67 &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      // c
      this._toggleControllerMode();

    // t for Timer mode
    } else if (
      event.altKey &&
      event.keyCode === 84 &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      // t
      this._toggleTimerMode();
    } else if (
      event.altKey &&
      event.keyCode === 65 &&
      !event.ctrlKey &&
      !event.metaKey

    // a for Auto play
    ) {
      // a
      if (this.props.autoplay) {
        this._startAutoplay();
      }
    } else if (
      event.keyCode === 81 &&
      !event.ctrlKey &&
      !event.metaKey

    // q to reset show
    ) {
      // q
      this.resetShow();
    } else if (
      event.keyCode === 87 &&
      !event.ctrlKey &&
      !event.metaKey

    // w to jump to beginning of game 2
    ) {
      // w
      this.resetShow(67);
    }
  }

  // Listen for all keyboard events
  _handleKeyPress(e) {
    const event = window.event ? window.event : e;

    if (
      event.target instanceof HTMLInputElement ||
      event.target.type === 'textarea'
    ) {
      return;
    }

    this._handleEvent(e);
  }

  _handleDisplayChange() {
    this.setState({
      fullscreen: window.innerHeight === screen.height,
      mobile: window.innerWidth < this.props.contentWidth,
    });
  }

  _toggleOverviewMode() {
    const suffix =
      this.props.route.params.indexOf('overview') !== -1 ? '' : '?overview';
    this.context.history.replace(`/${this.props.route.slide}${suffix}`);
  }

  _togglePresenterMode() {
    const suffix =
      this.props.route.params.indexOf('presenter') !== -1 ? '' : '?presenter';
    this.context.history.replace(`/${this.props.route.slide}${suffix}`);
  }

  _toggleControllerMode() {
    const suffix =
      this.props.route.params.indexOf('controller') !== -1 ? '' : '?controller';
    this.context.history.replace(`/${this.props.route.slide}${suffix}`);
  }

  _toggleTimerMode() {
    const isTimer =
      this.props.route.params.indexOf('presenter') !== -1 &&
      this.props.route.params.indexOf('timer') !== -1;
    const suffix = isTimer ? '?presenter' : '?presenter&timer';
    this.context.history.replace(`/${this.props.route.slide}${suffix}`);
  }

  // This carries any current param
  // over to the next slide route.
  _getSuffix() {

    const params = this.props.route.params;
    let suffix = '';

    for (var i = 0; i < params.length; i++) {

      if (i == 0) {
        suffix += '?';
      } else {
        suffix += '&';
      }

      suffix += params[i];

    }

    return suffix;

  }

  // This is how the various screens
  // stay in sync. We set a local storage
  // variable that all other screens are listening
  // to, then they update their route to match.
  setLocalStorageSlide(_slideIndex, _forward) {

    localStorage.setItem(
        'show-runner-slide',
        JSON.stringify({
          slide: this._getHash(_slideIndex),
          forward: _forward,
          time: Date.now(),
        })
      );

  }

  resetShow(_jumpToSlide) {

    const jumpToSlide = _jumpToSlide || 0;

    const slideData = '{ "slide": "'+jumpToSlide.toString()+'", "forward": "false" }';
    this._goToSlide({ key: 'show-runner-slide', newValue: slideData });

    this.viewedIndexes.clear();
    this.setLocalStorageSlide(jumpToSlide, true);

    this.clearVisData();

    // When on slide zero, assume we
    // have just reset show.
    // Clear cache with refresh.
    setTimeout(() => {
      // body...
      console.log('Go reset', jumpToSlide);
      this.setLocalStorageSlide(jumpToSlide, true);
      window.location.reload();
      this.setLocalStorageSlide(jumpToSlide, true);
    }, 250);

  }

  clearVisData() {

    console.log('clearVisData');

    // Reset any saved state for vizualiations
    localStorage.setItem(
      'visualization-state', JSON.stringify({})
    );

  }

  // This is used to navigate
  // slides that ARE NOT the
  // screen the prev/next event was
  // triggered on.
  _goToSlide(e) {
    let data = null;
    let canNavigate = true;
    let offset = 0;
    if (e.key === 'show-runner-slide') {
      data = JSON.parse(e.newValue);
      canNavigate = this._checkFragments(this.props.route.slide, data.forward);

      // When on slide zero, assume we
      // have just reset show.
      // Clear cache with referesh.
      /// - TN
      if (data.slide == 0 && data.forward == true) {
        window.location.reload();
      }

    } else if (e.slide) {
      data = e;
      offset = 1;

      const index = isNaN(parseInt(data.slide, 10)) ?
        get(this.state.slideReference.find(slide => slide.id === data.slide), 'rootIndex', 0) :
        data.slide - 1;

      this.setLocalStorageSlide(index, false);

    } else {
      return;
    }

    const slideIndex = this._getSlideIndex();
    this.setState({
      lastSlideIndex: slideIndex || 0,
    });
    if (canNavigate) {
      let slide = data.slide;
      if (!isNaN(parseInt(slide, 10))) {
        slide = parseInt(slide, 10) - offset;
      }

      this.context.history.replace(`/${slide}${this._getSuffix()}`);
    }
  }

  // Navigate history to previous slide.
  _prevSlide() {
    const slideIndex = this._getSlideIndex();
    this.setState({
      lastSlideIndex: slideIndex,
    });
    this.viewedIndexes.delete(slideIndex);
    if (
      this._checkFragments(this.props.route.slide, false) ||
      this.props.route.params.indexOf('overview') !== -1
    ) {
      if (slideIndex > 0) {
        this.context.history.replace(
          `/${this._getHash(slideIndex - 1)}${this._getSuffix()}`
        );

        this.setLocalStorageSlide(slideIndex - 1, false);

      }
    } else if (slideIndex > 0) {

      this.setLocalStorageSlide(slideIndex, false);

    }
  }

  _nextUnviewedIndex() {
    const sortedIndexes = Array.from(this.viewedIndexes).sort((a, b) => a - b);
    return Math.min(
      (sortedIndexes[sortedIndexes.length - 1] || 0) + 1,
      this.state.slideReference.length - 1
    );
  }

  _getOffset(slideIndex) {
    const { goTo } = this.state.slideReference[slideIndex];
    const nextUnviewedIndex = this._nextUnviewedIndex();
    if (goTo && !isNaN(parseInt(goTo))) {
      const goToIndex = () => {
        if (this.viewedIndexes.has(goTo - 1)) {
          return this._nextUnviewedIndex();
        }

        return goTo - 1;
      };

      return goToIndex() - slideIndex;
    }

    return nextUnviewedIndex - slideIndex;
  }

  // Navigate history to next slide.
  _nextSlide() {
    const slideIndex = this._getSlideIndex();
    this.setState({
      lastSlideIndex: slideIndex,
    });
    const slideReference = this.state.slideReference;
    if (
      this._checkFragments(this.props.route.slide, true) ||
      this.props.route.params.indexOf('overview') !== -1
    ) {
      if (slideIndex === slideReference.length - 1) {
        // On last slide, loop to first slide
        if (this.props.autoplay && this.state.autoplaying) {
          this.resetShow();
        }
      } else if (slideIndex < slideReference.length - 1) {
        this.viewedIndexes.add(slideIndex);
        const offset = this._getOffset(slideIndex);
        this.context.history.replace(
          `/${this._getHash(slideIndex + offset) + this._getSuffix()}`
        );

        this.setLocalStorageSlide(slideIndex + offset, true);
      }
    } else if (slideIndex < slideReference.length) {

      this.setLocalStorageSlide(slideIndex, true);
    }
  }

  _getHash(slideIndex) {
    return this.state.slideReference[slideIndex].id;
  }

  _checkFragments(slide, forward) {
    const state = this.context.store.getState();
    const fragments = state.fragment.fragments;

    // Not proud of this at all. 0.14 Parent based contexts will fix this.
    if (this.props.route.params.indexOf('presenter') !== -1) {
      const main = document.querySelector('.spectacle-presenter-main');
      if (main) {
        const frags = main.querySelectorAll('.fragment');
        if (!frags.length) {
          return true;
        }
      } else {
        return true;
      }
    }

    if (slide in fragments) {
      const count = size(fragments[slide]);
      const visible = filter(fragments[slide], s => s.visible === true);
      const hidden = filter(fragments[slide], s => s.visible !== true);
      if (forward === true && visible.length !== count) {
        this.props.dispatch(
          updateFragment({
            fragment: hidden[0],
            visible: true,
          })
        );
        return false;
      }

      if (forward === false && hidden.length !== count) {
        this.props.dispatch(
          updateFragment({
            fragment: visible[size(visible) - 1],
            visible: false,
          })
        );
        return false;
      }

      return true;
    } else {
      return true;
    }
  }

  handleClick(e) {
    if (this.clickSafe === true) {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopPropagation();
    }
  }

  _buildSlideReference(props) {
    const slideReference = [];
    Children.toArray(props.children).forEach((child, rootIndex) => {
      if (!child.props.hasSlideChildren) {
        const reference = {
          id: child.props.id || slideReference.length,
          rootIndex,
        };
        if (child.props.goTo) {
          reference.goTo = child.props.goTo;
        }

        slideReference.push(reference);
      } else {
        child.props.children.forEach((setSlide, setIndex) => {
          const reference = {
            id: setSlide.props.id || slideReference.length,
            setIndex,
            rootIndex,
          };
          if (child.props.goTo) {
            reference.goTo = child.props.goTo;
          }

          slideReference.push(reference);
        });
      }
    });

    return slideReference;
  }

  // Return current slide index
  // by parsing current route.
  _getSlideIndex() {
    let index = parseInt(this.props.route.slide);
    if (!Number.isFinite(index)) {
      const foundIndex = findIndex(this.state.slideReference, reference => {
        return this.props.route.slide === reference.id;
      });

      index = foundIndex >= 0 ? foundIndex : 0;
    }

    return index;
  }

  // Retrieve slide.
  _getSlideByIndex(index) {

    return getSlideByIndex(
      this.props.children,
      this.state.slideReference,
      index
    );
  }

  // Select and prep the correct
  // slide based on current route,
  // then render.
  _renderSlide() {

    // Get slide index from current route.
    const slideIndex = this._getSlideIndex();

    // Retrieve slide.
    const slide = this._getSlideByIndex(slideIndex);

    //TEMP: Get next slide notes
    const nextSlide = this._getSlideByIndex(slideIndex + 1);
    let nextNotes = '';
    if (nextSlide) {
      if (nextSlide.props.notes) {
        nextNotes = nextSlide.props.notes;
      }
    }

    // Return a clone of the slide
    return cloneElement(slide, {
      dispatch: this.props.dispatch,
      fragments: this.props.fragment,
      export: this.props.route.params.indexOf('export') !== -1,
      print: this.props.route.params.indexOf('print') !== -1,
      hash: this.props.route.slide,
      slideIndex,
      lastSlideIndex: this.state.lastSlideIndex,
      transition: (slide.props.transition || {}).length
        ? slide.props.transition
        : this.props.transition,
      transitionDuration: (slide.props.transition || {}).transitionDuration
        ? slide.props.transitionDuration
        : this.props.transitionDuration,
      slideReference: this.state.slideReference,
      nextNotes: nextNotes,
    });

  }

  _getProgressStyles = () => {
    const slideIndex = this._getSlideIndex();
    const slide = this._getSlideByIndex(slideIndex);

    if (slide.props.progressColor) {
      return slide.props.progressColor;
    }

    return null;
  }

  _getControlStyles = () => {
    const slideIndex = this._getSlideIndex();
    const slide = this._getSlideByIndex(slideIndex);

    if (slide.props.controlColor) {
      return slide.props.controlColor;
    }

    return null;
  }

  // Actually render everything
  render() {

    // This slide doesn't exist...
    if (this.props.route.slide === null) {
      return false;
    }

    const globals = { '.spectacle-presenter-next .fragment': { display: 'none !important' } };

    let componentToRender;

    // children includes all CUES within Deck
    const children = Children.toArray(this.props.children);

    // TEMP: LOG ALL CUE NOTES IN ORDER
    /*    console.log('======= MEDIA CUES ======');
        var alright = [];
        for (var i = 0; i < children.length; i++) {
          const ch = children[i];

          console.log(ch.props.notes);
          alright.push(ch.props.notes);

        }
        console.log('======= ========== ======');
        */

    // Render PRESENTER view
    if (this.props.route.params.indexOf('presenter') !== -1) {
      const isTimerMode = this.props.route.params.indexOf('timer') !== -1;
      componentToRender = (
        <Presenter
          dispatch={this.props.dispatch}
          slides={children}
          slideReference={this.state.slideReference}
          slideIndex={this._getSlideIndex()}
          hash={this.props.route.slide}
          route={this.props.route}
          lastSlideIndex={this.state.lastSlideIndex}
          timer={isTimerMode}
        />
      );

    // Render CONTROLLER view
    } else if (this.props.route.params.indexOf('controller') !== -1) {
      const isTimerMode = this.props.route.params.indexOf('timer') !== -1;
      const isDarkMode = this.props.route.params.indexOf('dark') !== -1;
      console.log('DARK MODE', isDarkMode);
      componentToRender = (
        <Controller
          dispatch={this.props.dispatch}
          slides={children}
          slideReference={this.state.slideReference}
          slideIndex={this._getSlideIndex()}
          hash={this.props.route.slide}
          route={this.props.route}
          lastSlideIndex={this.state.lastSlideIndex}
          timer={isTimerMode}
          darkMode={isDarkMode}
        />
      );

    // Render OVERVIEW.. view
    } else if (this.props.route.params.indexOf('overview') !== -1) {
      componentToRender = (
        <Overview
          slides={children}
          slideReference={this.state.slideReference}
          slideIndex={this._getSlideIndex()}
          route={this.props.route}
        />
      );

    // Render normal Slide view
    } else {
      // Default to rendering a
      // normal, fullscreen slide.
      componentToRender = (
        <StyledTransition component='div'>
          {this._renderSlide()}
        </StyledTransition>
      );

    }

    const showControls =
      !this.state.fullscreen &&
      !this.state.mobile &&
      this.props.route.params.indexOf('export') === -1 &&
      this.props.route.params.indexOf('overview') === -1 &&
      this.props.route.params.indexOf('presenter') === -1;

    return (
      <StyledDeck
        className='spectacle-deck'
        route={this.props.route}
        onClick={this.handleClick}
      >
        {this.props.controls &&
          showControls && (
            <Controls
              currentSlideIndex={this._getSlideIndex()}
              totalSlides={this.state.slideReference.length}
              onPrev={this._prevSlide.bind(this)}
              onNext={this._nextSlide.bind(this)}
              controlColor={this._getControlStyles()}
            />
          )}

        {componentToRender}

        {this.props.route.params.indexOf('export') === -1 &&
        this.props.route.params.indexOf('overview') === -1 ? (
          <Progress
            items={this.state.slideReference}
            currentSlideIndex={this._getSlideIndex()}
            type={this.props.progress}
            progressColor={this._getProgressStyles()}
          />
        ) : (
          ''
        )}

        {this.props.globalStyles && (
          <style
            dangerouslySetInnerHTML={{
              __html: convertStyle(
                Object.assign({}, this.context.styles.global, globals)
              ),
            }}
          />
        )}
      </StyledDeck>
    );
  }
}

export default connect(state => state, null, null, { withRef: true })(Manager);
