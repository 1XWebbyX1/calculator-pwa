import React, { Component } from 'react';
import { Provider } from 'react-redux'
import './App.scss';
import Calculator from './components/Calculator.js'
import store from './redux/configureStore'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Calculator />
       </Provider>
    );
  }
}

export default App;
