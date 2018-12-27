import React from 'react'
import $ from 'jquery'
import * as mapFuncModule from '../redux/utilities/mapping_functions'
import {connect} from 'react-redux'
import keys from '../data/keys.js'



class KeyPad extends React.Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.clear = this.clear.bind(this);
    this.setResult = this.setResult.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.accumulateExp = this.accumulateExp.bind(this);
    this.animate = this.animate.bind(this);
    this.state = {
      prev : 0,
      next : 0,
      result : 0,
      exp : Number($('#display').text()),
      operation : '+'
    };
    this.clearB = false;
    this.refresh = false;
    this.operOverride = false;
  }
  //All Clear function--------
  clear(){
    $('#exp').empty();
    $('#display #input').empty();
    this.props.mapChange();
    this.clearB = true;
  }
  //------



  //calculate final result from expressin accumulator-----
  setResult(){
    $('#display #input').html(this.props.exp); //display and set result as accumulated exp
      this.result = this.props.exp;
      this.refresh = true;
      this.clearB = true;  //clear and reset after setting result
      $('#exp').empty();
      this.props.mapResult(this.result); //send result to store
  }
  //-------



  //set operation and update prev--------
  setOperation(oper){
    if(this.operOverride){  //multiple operations (last operation overrides rest)
          this.clearB = false;
          this.operOverride = false;
        }

        if(this.clearB) {
           this.prev = Number(this.props.next); //if exp is empty, next added input becomes prev
          this.clearB = false;
        }
        else{
           this.prev = this.props.exp;
        }

       this.operation = oper;
        this.operOverride = true;
  }
  //--------



  //Update exp accumulator----------
  accumulateExp(){
      var exp;
      var next = $('#display #input').text(); //current input
      switch(this.props.operation){
        case '+': exp = this.props.prev + Number(next);
                  break;
        case '-': exp = this.props.prev - Number(next);
                  break;
        case 'X': exp = this.props.prev * Number(next);
                  break;
        case '/': exp = this.props.prev / Number(next);
                  break;
        default: return;
      }
      this.props.mapDigit(next, exp);
  }
  //-------------

 animate(target){
   $(target).addClass('anim');
   setTimeout(function() {
       $('.anim').removeClass('anim');
     }, 500);
 }


  handleClick(e){

    //animation for keypad_____________________
    import('../sass/02-utilities/_animation.scss')
    .then(this.animate(e.target));

    //--------


    var input = $(e.target).text();//current input key-----------

   //regex____________________________
    var digits = /[\d.]/;//regex to match digits
    var operationals = /[/X+-]/;//regex to match operations
    //---------


    if(operationals.test($('#display #input').text())){
      $('#display #input').empty(); //clear display of digits if input is operation
    }
    if(this.refresh){
        $('#exp').html(Number(this.props.result));
        this.refresh = false;
       if(digits.test(input)){
         $('#exp').empty();
         $('#input').empty();
       }
      else {this.clearB = false;}
    }



    if(digits.test(input)){  //if input is a DIGIT---------
       $('#display #input').append(input);

       this.accumulateExp();

       $('#exp').append(input);
       this.operOverride = false;
    }
    else if(operationals.test(input)){ //if input is an OPERATION------------
        //checking if display intially contains digits (canbe stored as prev) prior to updating it with operation
        if(!operationals.test($('#display #input').text())){
           this.setOperation(input);
        }

        this.props.mapOperation(this.prev, this.operation);
        $('#exp').append(input);
        $('#display #input').html(input);
    }
     //-------------------------------------------------------------------
   else if(input === '='){
      this.setResult();
    }

   else if(input === 'AC'){
      this.clear();
   }
 }


  render() {
      var keyss = keys.map((a) => {
        return (
          <div id={a.id} key={a.key} class="key" onClick={this.handleClick}>{a.key}</div>
        )
      });


    return (
      <div id="keypad">
        {keyss}
      </div>
    );
  }
}

export default connect(mapFuncModule.mapStateToProps, mapFuncModule.mapDispatchToProps)(KeyPad) ;
