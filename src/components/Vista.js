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
/*    if (this.props.friendliness < 0.5) {
      TweenMax.set(this.refs.friendly, { autoAlpha: 0.0 });
    } else {
      TweenMax.set(this.refs.unfriendly, { autoAlpha: 0.0 });
    }*/

    TweenMax.set(this.refs.friendly, { autoAlpha: this.props.friendliness });

  }

  componentWillUnmount() {

  }

  render() {

    return <div id={this.props.id} className='vista'>

              <img key='unfriendly' className='silhouette' ref='unfriendly' src={this.assets.unfriendly} />
              <img key='friendly' className='silhouette' ref='friendly' src={this.assets.friendly} />

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
