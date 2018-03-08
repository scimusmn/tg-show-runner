// Import React
import React from 'react';
import cueServer from './cueServer';

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Appear,
  Quote,
  Image,
  Notes,
  Slide,
  Text,
} from 'spectacle';

// Import theme
import createTheme from 'spectacle/lib/themes/default';

// Require CSS
require('normalize.css');

const theme = createTheme(
  {
    primary: '#ededed',
    secondary: '#074358',
    tertiary: '#677562',
    quartenary: '#A55C55',
    correct:'#458985',
  },
  {
    primary: 'Verdana',
    secondary: 'Helvetica',
  }
);

const images = {

  moths: require('./images/moths.gif'),
  alex1: require('./images/alex1.png'),
  alex2: require('./images/alex2.png'),
  tribble: require('./images/tribble.png'),
  sequence1: require('./images/sequence1.png'),
  sequence2: require('./images/sequence2.png'),
  sequence3: require('./images/sequence3.png'),
  evolution: require('./images/evolution.png'),

  quiz1: require('./images/quiz_1.png'),
  quiz1Answer: require('./images/quiz_1b.png'),
  quiz2: require('./images/quiz_2.png'),
  quiz2Answer: require('./images/quiz_2b.png'),
  quiz3: require('./images/quiz_3.png'),
  quiz3Answer: require('./images/quiz_3b.png'),
  quiz4: require('./images/quiz_4.png'),
  quiz4Answer: require('./images/quiz_4b.png'),
  quiz5: require('./images/quiz_5.png'),
  quiz5Answer: require('./images/quiz_5b.png'),
  quiz6: require('./images/quiz_6.png'),
  quiz6Answer: require('./images/quiz_6b.png'),
  quiz7: require('./images/quiz_7.png'),
  quiz7Answer: require('./images/quiz_7b.png'),
  quiz8: require('./images/quiz_8.png'),
  quiz8Answer: require('./images/quiz_8b.png'),
  quiz9: require('./images/quiz_9.png'),
  quiz9Answer: require('./images/quiz_9b.png'),
  quiz10: require('./images/quiz_10.png'),
  quiz10Answer: require('./images/quiz_10b.png'),

};

const videos = {

  explanation: require('./videos/explanation.mp4'),
  video1: require('./videos/video1.mp4'),
  video2: require('./videos/video2.mp4'),
  video3: require('./videos/video3.mp4'),

};

const videoStyle = {
  width: 1000,
  height: 1000,
  top: -470,
  left: -20,
  position: 'fixed',
};

export default class Presentation extends React.Component {

  onSlideActive(slideIndex) {

    console.log('onSlideActive');
    console.log(slideIndex);

    // TODO - detect if slide contains
    // sound or video and autoplay.

    cueServer.loadCueByIndex(slideIndex);

  }

  render() {
    return (
      <Deck
        transition={['spin']}
        transitionDuration={1500}
        controls={false}
        progress={false}
        theme={theme}
      >
        <Slide notes='Black' bgColor='#000'></Slide>

        <Slide bgImage={images.alex1} notes='' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.alex2} notes='' onActive={this.onSlideActive}></Slide>

        <Slide notes='Black' bgColor='#000'></Slide>

        <Slide bgImage={images.tribble} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>

        <Slide notes='Black' bgColor='#000'></Slide>

        <Slide bgImage={images.evolution} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>

        <Slide notes='Black' bgColor='#000'></Slide>

        <Slide bgImage={images.sequence1} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>

        <Slide notes='Black' bgColor='#000'></Slide>

        <Slide notes='Video 1' bgColor='#000' onActive={this.onSlideActive}>

          <video width='720' height='480' style={videoStyle} autoPlay loop>
            <source src={videos.video1} type='video/mp4' />
          </video>

        </Slide>

        <Slide notes='Black' bgColor='#000'></Slide>

        <Slide notes='Video 2' bgColor='#000' onActive={this.onSlideActive}>

          <video width='720' height='480' style={videoStyle} autoPlay loop>
            <source src={videos.video2} type='video/mp4' />
          </video>

        </Slide>

        <Slide notes='Black' bgColor='#000'></Slide>

        <Slide notes='Video 3' bgColor='#000' onActive={this.onSlideActive}>

          <video width='720' height='480' style={videoStyle} autoPlay loop>
            <source src={videos.video3} type='video/mp4' />
          </video>

        </Slide>

        <Slide notes='Black' bgColor='#000'></Slide>

        <Slide bgImage={images.quiz1} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.quiz1Answer} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.quiz2} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.quiz2Answer} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.quiz3} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.quiz3Answer} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.quiz4} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.quiz4Answer} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.quiz5} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.quiz5Answer} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.quiz6} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.quiz6Answer} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.quiz7} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.quiz7Answer} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.quiz8} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.quiz8Answer} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.quiz9} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.quiz9Answer} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.quiz10} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.quiz10Answer} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>

        <Slide notes='Black' bgColor='#000'></Slide>

        <Slide onActive={this.onSlideActive}>

          <Heading size={1} fit caps lineHeight={1}>
            Isolation mode:
          </Heading>
          <Heading size={1} fit caps lineHeight={1}>
            DISENGAGED
          </Heading>

        </Slide>

      </Deck>
    );
  }
}
