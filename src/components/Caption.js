import React, { Children, cloneElement, Component } from 'react';

import PropTypes from 'prop-types';

export default class Caption extends Component {

  constructor(props) {

    super(props);

    this.state = {

    };

     // Array with texts to type in typewriter
    this.dataText = '';
    this.unmounted = false;

  }

  componentDidMount() {

    const children = Children.toArray(this.props.children);
    this.dataText = children[0];

   // Start the text animation
   this.startTextAnimation(0);


  }

  typeWriter(text, i, fnCallback) {

    if (this.unmounted == true) {
      return;
    }

    // Check if text isn't finished yet
    if (i < (text.length)) {

      // Add next character to inner-box
     document.querySelector(".inner-box").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';

      // Wait for a while and call this function again for next character
      setTimeout(() => {
        this.typeWriter(text, i + 1, fnCallback)
      }, 19);

    }

  }

  startTextAnimation(i) {

    if (this.unmounted == true || typeof this.dataText == 'undefined') {
      return;
    }

    this.typeWriter(this.dataText, 0, () => {} );

  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

    this.unmounted = true;

  }

  render() {

    return (
      <div className='caption outer-box typewriter'>
        <div className='inner-box'>
          
        </div>
      </div>
    );

  }

}

Caption.propTypes = {
  duration: PropTypes.number,
};

Caption.defaultProps = {
  duration: 5.0,
};
