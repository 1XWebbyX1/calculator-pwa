import $ from 'jquery'
import {createStore} from 'redux'



const DIGIT= 'DIGIT';
const OPERATION= 'OPERATION';
const CAL= 'CAL';
const CLEAR= 'CLEAR';
const initialState = {
      prev : 0,
      next : 0,
      result : 0,
      exp : Number($('#display').text()),
      operation : '+'
}


export function addDigit(next, exp) {
  return {
    type: DIGIT,
    next: next,
    exp: exp
  }
}

export function addOperation(prev, operation){
  return{
    type: OPERATION,
    prev: prev,
    operation: operation
  }
}

export function calculate(result){
  return{
    type: CAL,
    result: result
  }
}

export function allClear(){
  return{
    type: CLEAR,
    prev: 0,
    next: 0
  }
}


function reducer(state= initialState, action){
  switch(action.type){
    case DIGIT : return {prev: state.prev, next: action.next, result: state.result, exp: action.exp, operation: state.operation};
    case OPERATION: return {prev: action.prev, next: state.next, result: state.result, exp: state.exp, operation: action.operation};
    case CAL: return {prev: state.prev, next: state.next, result: action.result, exp: state.exp, operation: state.operation};
    case CLEAR: return {prev: action.prev, next: action.next, result: state.result, exp: state.exp, operation: state.operation};
    default : return state;
  }
}


//Redux Store__________________________________________
const store = createStore(reducer);

export default store;
