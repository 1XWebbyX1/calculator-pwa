import React from 'react'
import Display from './Display';
import KeyPad from './KeyPad';


class Calculator extends React.Component {
  render() {
    return(
      <div id="calc">
        <Display />
        <KeyPad />
      </div>
    );
  }
}

export default Calculator;
