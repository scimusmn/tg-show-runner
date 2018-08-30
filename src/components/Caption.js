import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Caption extends Component {

  constructor(props) {

    super(props);

    this.state = {

    };

  }

  componentDidMount() {

   // TODO - Fancy word by word appear effect

  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  render() {

    return (
      <div className='caption outer-box'>
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
