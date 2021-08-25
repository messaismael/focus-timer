import React from 'react';
import '../styles/counter.css'

const Counter = ( props:any ) => {
  return (
    <div className="col-sm-6 offset-3" id="counter">
      <div id='label' >Counter</div>
      <div className="counter">{ props.count }</div>
    </div> 
  );
}

export default Counter;