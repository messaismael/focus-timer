import React from 'react';
import './Display.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo,  faPauseCircle, faPlayCircle} from '@fortawesome/free-solid-svg-icons';
var moment = require("moment");

class Display extends React.Component{
  
  render(_props){
    //fa fa-redo
    return (
      <div id='cont' className="row d-flex justify-content-center align-items-center">
        <div id='display' className="col-sm-5">
          <div id="timer-label" className="col-sm-12">{this.props.mode + ": "}</div>
          <div id='time-left' className="col-sm-12" style={{color:this.props.color}}>{moment(this.props.time).format("mm:ss")}</div>
          <div className='row  d-flex justify-content-center' id='contr'>
            <div id="start_stop" className="col-sm-3" onClick={this.props.play}>
              <FontAwesomeIcon icon={this.props.active? faPauseCircle : faPlayCircle } className='play' />
            </div>
            <div id='separate'></div>
            <div id='reset' className="col-sm-3 col-sm-offset-3" onClick={this.props.reset}>
              <FontAwesomeIcon  icon={faRedo} className='redo'/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 export default Display;