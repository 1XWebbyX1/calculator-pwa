import React from 'react'
import asyncComponent from './asyncComponent/async';




  const Display = asyncComponent(() =>
          	    import('./Display').then(module => module.default)
          	);


   const KeyPad = asyncComponent(() =>
                	    import('./KeyPad').then(module => module.default)
                	);



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
