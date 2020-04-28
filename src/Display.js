import React from 'react';
import './Display.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faPauseCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const moment = require( "moment" );

class Display extends React.Component {
  constructor( props ) {
    super( props );
    this.color = "#343a40";
  }


  render( _props ) {
    return (
      <div id='cont' className="col-sm-6 offset-sm-3  ">

        <CircularProgressbarWithChildren
          value={ this.props.time * 100 / this.props.pour }
          strokeWidth={ 2 }
          className='svg'
          id='blink'
          styles={ buildStyles( {
            rotation: 0.25,
            strokeLinecap: 'round',
            pathTransitionDuration: 0.5,
            pathColor: `${( parseInt( this.props.time / 60 ) ) ? this.color : "red"}`,
            textColor: '#343a40',
            trailColor: '#343a4052',
            backgroundColor: '#3e98c7',
          } ) }>

          <div id="timer-label" >{ this.props.mode }</div>
          <div>
            <strong style={ { 'color': `${( parseInt( this.props.time / 60 ) ) ? this.color : "red"}` } }>{ moment( this.props.time * 1000 ).format( "mm:ss" ) } </strong>
          </div>
          <div className='row' id='contr'>
            <div id="start_stop" className="" onClick={ this.props.play }>
              <FontAwesomeIcon icon={ this.props.active ? faPlayCircle : faPauseCircle } className='play' />
            </div>
            <div id='reset' className="" onClick={ this.props.reset }>
              <FontAwesomeIcon icon={ faRedo } className='redo' />
            </div>
          </div>

        </CircularProgressbarWithChildren>

      </div>
    );
  }
}
export default Display;


/**
 *
 *  <div id='display' className="col-sm-5">
          <div id="timer-label" className="col-sm-12">{ this.props.mode + ": " }</div>
          <div id='time-left' className="col-sm-12" style={ { color: this.props.color } }>{ moment( this.props.time * 1000 ).format( "mm:ss" ) }</div>
          <div className='row  d-flex justify-content-center' id='contr'>
          </div>
        </div>
 *
 *
 * <div id="start_stop" className="col-sm-3" onClick={ this.props.play }>
              <FontAwesomeIcon icon={ this.props.active ? faPauseCircle : faPlayCircle } className='play' />
            </div>
            <div id='separate'></div>
            <div id='reset' className="col-sm-3 col-sm-offset-3" onClick={ this.props.reset }>
              <FontAwesomeIcon icon={ faRedo } className='redo' />
            </div
 */