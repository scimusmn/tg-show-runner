import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TweenMax from 'gsap';
import {getVistaSet} from '../assets/assets';

class Vista extends Component {

  constructor(props) {

    super(props);

    this.state = {

    };

    this.assets = getVistaSet();

  }

  componentDidMount() {

    // uncomment for binary style
    // if (this.props.friendliness < 0.6) {
    //   TweenMax.set(this.refs.friendly, { autoAlpha: 0.0 });
    // } else {
    //   TweenMax.set(this.refs.unfriendly, { autoAlpha: 0.0 });
    // }

    // TweenMax.set(this.refs.friendly, { autoAlpha: this.props.friendliness });

    // Uncomment for internal friendly movement
    // TweenMax.to(this.refs.friendly, Math.random() * 0.3 + 0.4, {scale:0.9, rotation:Math.random() * 15, ease: Power2.easeInOut, repeat:99, yoyo:true});

  }

  componentWillUnmount() {

  }

  render() {

    return <div id={this.props.id} className='vista'>

              <img key='unfriendly' className='silhouette unfriendly' ref='unfriendly' src={this.assets.unfriendly} />
              <img key='friendly' className='silhouette friendly' ref='friendly' src={this.assets.friendly} />

          </div>;

  }

}

Vista.propTypes = {
  friendliness: PropTypes.number,
};

Vista.defaultProps = {
  friendliness: 0.0,
};

export default Vista;
