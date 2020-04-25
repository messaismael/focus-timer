import React from 'react';
import './App.css';
import Session from './Session';
import Display from './Display';
import Counter from './Counter';
import Break from './Break';
import NavBar from './Navbar';
import History from './History'
import sound from './sound/BeepSound.mp3';
//import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';

const moment = require( "moment" );


localStorage.setItem( 'history', JSON.stringify( [] ) );
let history = JSON.parse( localStorage.getItem( 'history' ) );

localStorage.setItem( 'start', 0 );
var start = JSON.parse( localStorage.getItem( 'start' ) );

function addZero( i ) {
  if ( i < 10 ) {
    i = "0" + i;
  }
  return i;
}

class App extends React.Component {
  constructor( props ) {
    super( props )
    this.state = {
      breakValue: 5,
      sessionValue: 25,
      time: 25 * 60,
      active: true,
      mode: "Session",
      count: 0,
      modalShow: false
    }
    this.handleReset = this.handleReset.bind( this );
    this.handlePlay = this.handlePlay.bind( this );
  }
  componentDidUpdate( prevProps, prevState ) {
    if ( prevState.time === 0 && prevState.mode === "Break" ) {

      history.unshift( {
        type: 'Break',
        value: moment( this.state.breakValue * 60000 ).format( "mm:ss" ),
        start: history[0].end,
        end: addZero( new Date().getHours() ) + ':' + addZero( new Date().getUTCMinutes() ),
      } )
      localStorage.setItem(
        'history',
        JSON.stringify(
          history
        )
      )

      this.audio.play();
      this.setState( {
        time: this.state.sessionValue * 60,
        mode: "Session"
      } )
    } else if ( prevState.time === 0 && prevState.mode === "Session" && !this.state.active ) {

      history.unshift( {
        type: 'Session',
        value: moment( this.state.sessionValue * 60000 ).format( "mm:ss" ),
        start: this.state.count === 0 ? start : history[0].end,
        end: addZero( new Date().getHours() ) + ':' + addZero( new Date().getUTCMinutes() ),
      } )
      console.log( history )
      localStorage.setItem(
        'history',
        JSON.stringify(
          history
        ) )

      this.audio.play();
      this.setState( {
        time: this.state.breakValue * 60,
        mode: "Break",
        count: this.state.count + 1
      } )
    }
  }
  handleInput( mode, event ) {
    const re = /^[0-9\b]+$/;
    if ( event.target.value === '' || re.test( event.target.value ) )
      if ( this.state.active === true && mode === "Session" ) {
        this.setState( {
          sessionValue: event.target.value,
          time: ( !event.target.value ) ? 60 : event.target.value * 60,
        } )
      }
      else if ( this.state.active === true && mode === "Break" ) {
        this.setState( {
          breakValue: event.target.value,
          time: ( this.state.mode === mode ) ? ( !event.target.value ) ? 60 : event.target.value * 60 : this.state.time,
        } )
      }
  }

  handleIncrement( mode ) {
    //limit to max 60
    if ( this.state.breakValue <= 60 && this.state.active === true && mode === "Break" ) {
      this.setState( {
        breakValue: this.state.breakValue + 1,
        time: this.state.mode === 'Break' ? this.state.breakValue * 60 + 60 : this.state.time,
      } )
    }
    else if ( this.state.sessionValue < 60 && this.state.active === true && mode === "Session" ) {
      this.setState( {
        sessionValue: this.state.sessionValue + 1,
        time: this.state.mode === 'Session' ? this.state.sessionValue * 60 + 60 : this.state.time,
      } )
    }
  }

  handleDecrement( mode ) {
    //limit to min 1
    if ( this.state.breakValue > 1 && this.state.active === true && mode === "Break" ) {
      this.setState( {
        breakValue: this.state.breakValue - 1,
        time: this.state.mode === 'Break' ? this.state.breakValue * 60 - 60 : this.state.time,
      } )
    }
    else if ( this.state.sessionValue > 1 && this.state.active === true && mode === "Session" ) {
      this.setState( {
        sessionValue: this.state.sessionValue - 1,
        time: this.state.mode === 'Session' ? this.state.sessionValue * 60 - 60 : this.state.time,
      } )
    }

  }


  // reset all in the original state  
  handleReset() {
    if ( this.state.time !== this.state.sessionValue * 60000 ) {
      history.unshift( {
        type: this.state.mode,
        value: this.state.mode === 'Break' ? moment( this.state.breakValue * 60000 - this.state.time ).format( "mm:ss" ) : moment( this.state.sessionValue * 60000 - this.state.time ).format( "mm:ss" ),
        start: start,
        end: addZero( new Date().getHours() ) + ':' + addZero( new Date().getUTCMinutes() ),
      } )
      localStorage.setItem(
        'history',
        JSON.stringify(
          history
        ) )
    }

    this.audio.pause();
    this.audio.currentTime = 0;
    this.setState( {
      breakValue: 5,
      sessionValue: 25,
      time: 25 * 60,
      count: 0,
      active: true,
      mode: "Session",
    } )
    //Using clearInterval() to stop time 
    clearInterval( this.time );
  }

  handlePlay() {

    if ( this.state.active ) {
      if ( this.state.time === this.state.sessionValue * 60000 && this.state.count === 0 ) {
        start = addZero( new Date().getHours() ) + ':' + addZero( new Date().getUTCMinutes() );
        localStorage.setItem(
          'start',
          JSON.stringify(
            start
          )
        )
      }
      // decrement this.state.time after 1 second
      this.time = setInterval( () => { this.setState( { time: this.state.time - 1 } ) }, 1000 );
      this.setState( {
        active: false,
        sessionValue: ( !this.state.sessionValue ) ? 1 : this.state.sessionValue,
        breakValue: ( !this.state.breakValue ) ? 1 : this.state.breakValue,
      } )
    } else {
      // clear value of this.time
      clearInterval( this.time )
      this.setState( { active: true, } )
    }
  }

  render() {
    let col = 'white';
    if ( this.state.time < ( 60 * 1000 ) ) {
      col = 'red';
    }
    return (
      <div className="container-fluid" id="all">
        <NavBar Show={ () => this.setState( { modalShow: true } ) } />
        <div id='cent' className='d-flex align-items-center'>
          <div id="pomodoro" className="container">

            <div id='control' className="row">
              <Break
                Input={ ( event ) => this.handleInput( 'Break', event ) }
                increment={ this.handleIncrement.bind( this, "Break" ) }
                decrement={ this.handleDecrement.bind( this, "Break" ) }
                breakValue={ this.state.breakValue } />

              <Session
                Input={ ( event ) => this.handleInput( 'Session', event ) }
                increment={ this.handleIncrement.bind( this, "Session" ) }
                decrement={ this.handleDecrement.bind( this, "Session" ) }
                sessionValue={ this.state.sessionValue } />
            </div>
            <div id='display' className=''>
              <Display
                pour={ this.state.mode === 'Session' ? this.state.sessionValue * 60 : this.state.breakValue * 60 }
                time={ this.state.time }
                mode={ this.state.mode }
                play={ this.handlePlay }
                reset={ this.handleReset }
                color={ col }
                active={ this.state.active }
              />
            </div>
            <div className=''>
              <Counter count={ this.state.count } />
            </div>
            <audio id='beep' src={ sound } ref={ i => this.audio = i } />
            <div>
              <History history={ history } show={ this.state.modalShow } onHide={ () => this.setState( { modalShow: false } ) } />
            </div>
          </div>
        </div>
        <footer className="page-footer font-small blue">
          <div className="footer-copyright text-center py-3">© 2020 Copyright:
            <a href="https://github.com/messaismael/"> Ismael Dassi</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
