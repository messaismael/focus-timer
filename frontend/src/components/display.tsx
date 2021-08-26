import 'react-circular-progressbar/dist/styles.css';
import '../styles/display.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faPauseCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { Row } from 'react-bootstrap';
const moment = require( "moment" );


type PropsDisplay = {
  time: number,
  pour: number,
  mode: string,
  play: any,
  active: boolean,
  reset: any
}

const Display: React.FC<PropsDisplay> = (props) => {
  const color = "#343a40";


  return (
    <div id='cont' className="mt-3 col-sm-6 offset-sm-3  ">

      <CircularProgressbarWithChildren
        value={ props.time * 100 / props.pour }
        strokeWidth={ 2 }
        className='svg'
        styles={ 
          buildStyles({
            rotation: 0.25,
            strokeLinecap: 'round',
            pathTransitionDuration: 0.5,
            pathColor: `${( ( props.time / 60 ) ) ? color : "red"}`,
            textColor: '#343a40',
            trailColor: '#343a4052',
            backgroundColor: '#3e98c7',
          })
        }>
        <div className='process-controler'>
            <div id="timer-label" >{ props.mode }</div>
            <div  className='text-center' style={{fontSize: 25, fontWeight:'bold','color': `${ (props.time / 60)? color : "red"}`}} >{ moment( props.time * 1000 ).format( "mm:ss" ) } </div>
            <Row id='contr'>
                <div id="start_stop" className="" onClick={ props.play }>
                    <FontAwesomeIcon icon={ props.active ? faPlayCircle : faPauseCircle } className='play' />
                </div>
                <div id='reset' className="" onClick={ props.reset }>
                    <FontAwesomeIcon icon={ faRedo } className='redo' />
                </div>
            </Row>
        </div>

      </CircularProgressbarWithChildren>

    </div>
  );
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