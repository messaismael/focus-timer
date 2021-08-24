import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';

import '../styles/session.css'

type PropsSession = {
  increment: any,
  decrement: any,
  active: Boolean,
  sessionValue: number,
  input: any,

}

const Session: React.FC<PropsSession> = (props) => {

  return (
    <div id='session' className="col-sm-4 offset-sm-2">
      <h2 id='session-label'>Session</h2>
      <div className='row marge'>
        <div id='session-increment' className="col-sm-4">
          <FontAwesomeIcon icon={ faArrowCircleUp } className="arrow" onClick={ props.increment } />
        </div>
        <input
          id='session-length'
          className="col-sm-4"
          value={ props.sessionValue }
          onChange={ props.input }
          maxLength={2}
          disabled={props.active? false:true}
        />
        <div id='session-decrement' className="col-sm-4">
          <FontAwesomeIcon icon={ faArrowCircleDown } className="arrow" onClick={ props.decrement } />
        </div>
      </div>
    </div> );
}

export default Session;