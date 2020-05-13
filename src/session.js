import React from 'react';
import './session.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';

class Session extends React.Component {

  render( _props ) {
    return (
      <div id='session' className="col-sm-4 offset-sm-2">
        <h2 id='session-label'>Session</h2>
        <div className='row marge'>
          <div id='session-increment' className="col-sm-4">
            <FontAwesomeIcon icon={ faArrowCircleUp } className="arrow" onClick={ this.props.increment } />
          </div>
          <input
            id='session-length'
            className="col-sm-4"
            value={ this.props.sessionValue }
            onChange={ this.props.Input }
            maxlength="2"
          />
          <div id='session-decrement' className="col-sm-4">
            <FontAwesomeIcon icon={ faArrowCircleDown } className="arrow" onClick={ this.props.decrement } />
          </div>
        </div>
      </div> );
  }
}

export default Session;