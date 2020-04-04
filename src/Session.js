import React from 'react';
import './Session.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';

class Session extends React.Component{

  render(_props){
    return (
    <div id='session' className="col-sm-4">
      <h2 id='session-label'>Session</h2>
      <div className='row marge'>
        <div id='session-increment' className="col-sm-4">
          <FontAwesomeIcon icon={faArrowCircleUp} className="arrow" onClick={this.props.increment} />
        </div>
        <div id='session-length' className="col-sm-4">{this.props.sessionValue}</div>
        <div id='session-decrement' className="col-sm-4">
          <FontAwesomeIcon icon={ faArrowCircleDown } className="arrow" onClick={this.props.decrement} />
        </div>
      </div>
    </div>);
  }
}

export default Session;