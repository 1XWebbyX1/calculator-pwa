
import * as actionModule from '../configureStore'


//mapping state and props to Redux-------
export const mapStateToProps = (state)  => {
  return {
    prev: state.prev,
    next: state.next,
    result: state.result,
    exp: state.exp,
    operation: state.operation
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    mapDigit : function(next,exp) {
        dispatch(actionModule.addDigit(next, exp));
     },
    mapOperation : function(prev, operation) {
       dispatch(actionModule.addOperation(prev, operation));
    },
    mapResult : function(result) {
       dispatch(actionModule.calculate(result));
    },
    mapChange :  function() {
       dispatch(actionModule.allClear());
    }
  };
};
