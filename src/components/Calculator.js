import React from 'react'
import asyncComponent from './asyncComponent/async';



  const Expression = asyncComponent(() =>
    	    import('./Expression').then(module => module.default)
    	);

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
        <Expression />
        <Display />
        <KeyPad />
      </div>
    );
  }
}

export default Calculator;
