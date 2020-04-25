import React from 'react';
import './Break.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
class Break extends React.Component {

  render( _props ) {
    return (
      <div id='break' className="col-sm-4 offset-sm-1">
        <h2 id='break-label'>Break</h2>
        <div className="row marge" >
          <div id="break-increment" className="col-sm-4" >
            <FontAwesomeIcon icon={ faArrowCircleUp } className="arrow" onClick={ this.props.increment } />
          </div>
          <input
            id='break-length'
            className="col-sm-4"
            value={ this.props.breakValue }
            onChange={ this.props.Input }
            maxlength="2"
          />
          <div id="break-decrement" className="col-sm-4">
            <FontAwesomeIcon icon={ faArrowCircleDown } className="arrow" onClick={ this.props.decrement } />
          </div>
        </div>
      </div> );
  }
}

export default Break;