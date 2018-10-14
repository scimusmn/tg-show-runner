import React, { Children, cloneElement, Component } from 'react';

import PropTypes from 'prop-types';

export default class Caption extends Component {

  constructor(props) {

    super(props);

    this.state = {

    };

     // Array with texts to type in typewriter
    this.dataText = [];
    this.unmounted = false;

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
    // Text finished, call callback if there is a callback function
    else if (typeof fnCallback == 'function') {

      // Call callback after timeout
      setTimeout(fnCallback, 400);

    }

  }

  startTextAnimation(i) {

    if (this.unmounted == true) {
      return;
    }

    if (typeof this.dataText[i] == 'undefined'){
      console.log('Out of text');
      return;
    }

    // check if dataText[i] exists
    if (i < this.dataText[i].length) {
      // text exists! start typewriter animation
     this.typeWriter(this.dataText[i], 0, () => {
       // after callback (and whole text has been animated), start next text
       this.startTextAnimation(i + 1);

     });
    }

  }

  componentDidMount() {

    const children = Children.toArray(this.props.children);

    this.dataText = [];

    for (var i = 0; i < children.length; i++) {
          const ch = children[i];

          console.log(ch);
          this.dataText.push(ch);

        }

   // Start the text animation
   this.startTextAnimation(0);


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
          {this.props.children}
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
