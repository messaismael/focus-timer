import React from 'react';
import './Counter.css'

class Counter extends React.Component {

  render( _props ) {
    return (
      <div className="col-sm-6 offset-3" id="counter">
        <div id='label' >Counter</div>
        <div className="counter">{ this.props.count }</div>
      </div> );
  }
}

export default Counter;