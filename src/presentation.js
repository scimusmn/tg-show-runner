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
    primary: '#F6C27C',
    secondary: '#24DDB4',
    tertiary: '#FAF97B',
    quartenary: '#555666',
    correct:'#33ddbc',
  },
  {
    primary: 'Verdana',
    secondary: 'Helvetica',
  }
);

const images = {

  moths: require('./images/moths.gif'),
  youtube: require('./images/youtube.png'),
  tribble: require('./images/tribble.png'),
  sequence1: require('./images/sequence1.png'),
  sequence2: require('./images/sequence2.png'),
  sequence3: require('./images/sequence3.png'),
  evolution: require('./images/evolution.png'),

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
        transition={['fade']}
        transitionDuration={300}
        controls={false}
        progress={false}
        theme={theme}
      >
        <Slide bgColor='quartenary' onActive={this.onSlideActive}>

          <Heading size={1} fit caps lineHeight={1} textColor='secondary'>
            Guest lecture starting soon.
          </Heading>
          <Text margin='10px 0 0' textColor='tertiary' size={1} fit bold>
            For your own safety, do NOT approach cages.
          </Text>

        </Slide>

        <Slide bgColor='secondary' notes='ENTER: Alex Makes It Amazing' onActive={this.onSlideActive}>

          <Heading size={1} fit caps lineHeight={1} textColor='tertiary'>
            ALEX MAKES IT AMAZING!
          </Heading>

          <Image src={images.youtube}></Image>

        </Slide>

        <Slide bgColor='tertiary' notes='First quiz questions' onActive={this.onSlideActive}>

          <Heading textColor='quartenary' fit={true}>If you had 100 VISTAs of your very own—you lucky dogs—what genetic variation might you observe among them?</Heading>
          <br/>
          <List ordered type='A' textColor='quartenary'>
            <ListItem>VISTAs who have encountered humans more often will be friendlier than other VISTAs.</ListItem>
            <br/>
            <ListItem>Some VISTAs will be born friendly. Others, not.</ListItem>
            <br/>
            <ListItem>They are all VISTAs. They are all the same.</ListItem>
            <br/>
          </List>

        </Slide>

        <Slide bgColor='tertiary' notes='First quiz questions' onActive={this.onSlideActive}>

          <Heading textColor='quartenary' fit={true}>If you had 100 VISTAs of your very own—you lucky dogs—what genetic variation might you observe among them?</Heading>
          <br/>
          <List ordered type='A' textColor='quartenary'>
            <ListItem>VISTAs who have encountered humans more often will be friendlier than other VISTAs.</ListItem>
            <br/>
            <ListItem textColor='correct'>Some VISTAs will be born friendly. Others, not.</ListItem>
            <br/>
            <ListItem>They are all VISTAs. They are all the same.</ListItem>
            <br/>
          </List>

        </Slide>

        <Slide>
          <Notes>
            <h4>Slide notes</h4>
            <ol>
              <li>First note</li>
              <li>Second note</li>
            </ol>

          </Notes>
          {/* Slide content */}
          <p>My slide content(see notes)</p>
        </Slide>

        <Slide bgImage={images.tribble} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.evolution} notes='Listen up, Alex Makes It Amazing fans: like the theory of gravity, the theory of evolution is sound science.'></Slide>
        <Slide bgImage={images.sequence1} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.sequence2} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>
        <Slide bgImage={images.sequence3} notes='Slide notes here.' onActive={this.onSlideActive}></Slide>

        <Slide bgColor='quartenary' onActive={this.onSlideActive}>

          <Heading size={1} fit caps lineHeight={1} textColor='primary'>
            Isolation mode:
          </Heading>

          <Heading size={1} fit caps lineHeight={2} textColor='secondary'>
            DISENGAGED
          </Heading>

        </Slide>

      </Deck>
    );
  }
}
