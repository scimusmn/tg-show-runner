import React, { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import { getSlideByIndex } from '../utils/slides';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {
  HeaderContainer,
  EndHeader,
  ControllerContent,
  PresenterContent,
  SlideInfo,
  ContentContainer,
  PreviewPane,
  PreviewCurrentSlide,
  PreviewNextSlide,
  Notes,
} from './presenter-components';

import Time from './time';

export default class Controller extends Component {

  static childContextTypes = {
    updateNotes: PropTypes.func,
  };

  state = {
    notes: {},
  };

  componentDidMount() {

    // Generate cue data
    this.cueTableData = [];
    for (var i = 0; i < this.props.slides.length; i++) {

      const cueData = this.getCueData(this.props.slides[i], i + 1);
      this.cueTableData.push(cueData);

    }

    this.getTrProps = this.getTrProps.bind(this);

  }

  getCueData(cue, num) {

    let notes = cue.props.notes;
    let children = React.Children.toArray(cue.props.children);
    let hasScreen = false;
    let primaryScreen = false;
    let secondaryScreen = false;
    let hasSoundCue = false;
    let hasCueServer = false;
    let hasEmpty = false;

    for (let i = children.length - 1; i >= 0; i--) {

      const child = children[i];

      // Screen Type
      if (child.type.name == 'Screen') {

        if (child.props.output == 'primary') {

          hasScreen = true;
          primaryScreen = true;

        } else if (child.props.output == 'secondary') {

          hasScreen = true;
          secondaryScreen = true;

        }

      }

      if (child.type.name == 'SoundCue') {

        hasSoundCue = true;

      }

      if (child.type.name == 'CueServerOut') {

        hasCueServer = true;

      }

    }

    // If no screen is found for current Output,
    // add an empty screen.
    if (!hasScreen) {
      hasEmpty = true;
    }

    return {num:num,
            notes:notes,
            hasScreen:hasScreen,
            primaryScreen:primaryScreen,
            secondaryScreen:secondaryScreen,
            hasSoundCue:hasSoundCue,
            hasCueServer:hasCueServer,
            hasEmpty:hasEmpty,
          };

  }

  getChildContext() {
    return {
      updateNotes: this.updateNotes.bind(this),
    };
  }

  getCurrentSlide() {
    return this.context.store.getState().route.slide;
  }

  updateNotes(newNotes, slide = null) {
    const notes = { ...this.state.notes };
    notes[slide || this.getCurrentSlide()] = newNotes;

    this.setState({ notes });
  }

  _getSlideByIndex(index) {
    return getSlideByIndex(
      Children.toArray(this.props.slides),
      this.props.slideReference,
      index
    );
  }

  _renderMainSlide() {
    const { slideIndex, hash, lastSlideIndex } = this.props;
    const child = this._getSlideByIndex(slideIndex);
    const presenterStyle = {
      position: 'relative',
    };
    return cloneElement(child, {
      dispatch: this.props.dispatch,
      key: slideIndex,
      hash,
      export: this.props.route.params.indexOf('export') !== -1,
      print: this.props.route.params.indexOf('print') !== -1,
      slideIndex,
      lastSlideIndex,
      transition: [],
      transitionIn: [],
      transitionOut: [],
      transitionDuration: 0,
      presenter: true,
      presenterStyle,
    });
  }

  _renderNextSlide() {
    const { slideIndex, lastSlideIndex } = this.props;
    const presenterStyle = {
      position: 'relative',
    };
    const child = this._getSlideByIndex(slideIndex + 1);
    return child ? (
      cloneElement(child, {
        dispatch: this.props.dispatch,
        export: this.props.route.params.indexOf('export') !== -1,
        print: this.props.route.params.indexOf('print') !== -1,
        key: slideIndex + 1,
        hash: child.props.id || slideIndex + 1,
        slideIndex: slideIndex + 1,
        lastSlideIndex,
        transition: [],
        transitionIn: [],
        transitionOut: [],
        transitionDuration: 0,
        presenterStyle,
        presenter: true,
        appearOff: true,
      })
    ) : (
      <EndHeader>END</EndHeader>
    );
  }

  _renderNotes() {
    let notes;
    const currentSlide = this.getCurrentSlide();

    if (this.state.notes[currentSlide]) {
      notes = this.state.notes[currentSlide];
    } else {
      const child = this._getSlideByIndex(this.props.slideIndex);
      notes = child.props.notes;
    }

    if (!notes) {
      return false;
    }

    if (typeof notes === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: notes }} />;
    }

    return <div>{notes}</div>;
  }

  _renderNextNotes() {
    let notes;

    // const currentSlide = this.getCurrentSlide();

    const child = this._getSlideByIndex(this.props.slideIndex + 1);

    if (!child) {
      return false;
    }

    notes = child.props.notes;

    if (!notes) {
      return false;
    }

    if (typeof notes === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: notes }} />;
    }

    return <div>{notes}</div>;
  }

  renderCellCue(props) {

    let jsx = '';

    console.log(props);

    return jsx;
  }

  getTrProps(state, rowInfo, instance) {

    if (rowInfo) {
      return {
        style: {
          background: rowInfo.index == this.props.slideIndex ? '#f3e523' : '',
        },
      }
    }

    return {};

  }

  render() {

    const columns = [{
      Header: 'Cue',
      accessor: 'num',
      maxWidth: 50,
    },
    {
      Header: 'CueServer',
      accessor: 'hasCueServer',
      maxWidth: 50,
      Cell: row => (
          <span>{row.value == true ? 'X' : '-'}</span>
      ),
    },
    {
      Header: 'Sound',
      accessor: 'hasSoundCue',
      maxWidth: 50,
      Cell: row => (
       <span>{row.value == true ? 'X' : '-'}</span>
      ),
    },
    {
      Header: 'Primary Screen',
      accessor: 'primaryScreen',
      maxWidth: 50,
      Cell: row => (
          <span>{row.value == true ? 'X' : '-'}</span>
      ),
    },
    {
      Header: 'Secondary Screen',
      accessor: 'secondaryScreen',
      maxWidth: 50,
      Cell: row => (
          <span>{row.value == true ? 'X' : '-'}</span>
      ),
    },
    {
      Header: 'Notes',
      accessor: 'notes',
      minWidth: 350,
    },];

    return (
      <PresenterContent className={this.props.darkMode === true ? 'dark-mode' : ''} >
        <HeaderContainer>
          <SlideInfo>
            Cue {this.props.slideIndex + 1} of{' '}
            {this.props.slideReference.length}
          </SlideInfo>
          <Time timer={this.props.timer} />
        </HeaderContainer>
        <ContentContainer>
          <PreviewPane>
            <ReactTable
              data={this.cueTableData}
              columns={columns}
              showPagination= {false}
              showPageJump= {false}
              defaultPageSize={this.props.slides.length}
              className='-highlight -striped'
              getTrProps={this.getTrProps}
            />
          </PreviewPane>
          <Notes className='currentnotes'>Current: <span>{this._renderNotes()}</span></Notes>
          <Notes className='nextnotes'>Next: <span>{this._renderNextNotes()}</span> </Notes>
        </ContentContainer>
      </PresenterContent>
    );
  }
}

Controller.propTypes = {
  dispatch: PropTypes.func,
  hash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lastSlideIndex: PropTypes.number,
  route: PropTypes.object,
  slideIndex: PropTypes.number,
  slideReference: PropTypes.array,
  slides: PropTypes.array,
  timer: PropTypes.bool,
  darkMode: PropTypes.bool,
};

Controller.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object.isRequired,
};
