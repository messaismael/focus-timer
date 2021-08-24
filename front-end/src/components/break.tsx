import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';

import '../styles/break.css'

type PropsBreak = {
  increment: any,
  decrement: any,
  breakValue: number,
  input: any,
  active: boolean,
}

const Break: React.FC<PropsBreak> = (props) => {

  return (
    <div id='break' className="col-sm-4 offset-sm-1">
      <h2 id='break-label'>Break</h2>
      <div className="row marge" >
        <div id="break-increment" className="col-sm-4" >
          <FontAwesomeIcon icon={ faArrowCircleUp } className="arrow" onClick={ props.increment } />
        </div>
        <input
          id='break-length'
          className="col-sm-4"
          value={ props.breakValue }
          onChange={ props.input }
          maxLength={2}
          disabled={props.active? false:true}
        />
        <div id="break-decrement" className="col-sm-4">
          <FontAwesomeIcon icon={ faArrowCircleDown } className="arrow" onClick={ props.decrement } />
        </div>
      </div>
    </div> 
  );
}

export default Break;
