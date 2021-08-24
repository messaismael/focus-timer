import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Session from './components/session';
import Display from './components/display';
import Counter from './components/counter';
import Break from './components/break';
import NavBar from './components/navbar';
import History from './components/history'
/* import sound from './sound/BeepSound.mp3'; */
import Register from './components/register';
import Login from './components/login'
import { breakHistory, playHistory, resetHistory, sessionHistory } from './utils/historyData';

import './styles/App.css';

const App = () => {
  const [breakValue, setBreakValue] = useState(5);
  const [sessionValue, setSessionValue] = useState(25);
  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(true);
  const [mode, setMode] = useState('Session');
  const [count, setCount] = useState(0);
  const [modalShow, setModalShow] = useState(false);


  /* componentDidUpdate(prevProps, prevState) {
    if (prevState.time === 0 && prevState.mode === "Break") {
      // handle registration on break
      breakHistory(breakValue)

      this
        .audio
        .play();
      this.setState({
        time: sessionValue * 60,
        mode: "Session"
      })
    } else if (prevState.time === 0 && prevState.mode === "Session" && !this.state.active) {
      // handle registration on session
      sessionHistory(this.state.sessionValue, this.state.count)
      this
        .audio
        .play();
      this.setState({
        time: this.state.breakValue * 60,
        mode: "Break",
        count: this.state.count + 1
      })
    }
  } */

  /* useEffect(() => {
     if (time === 0 && mode === "Break") {
      // handle registration on break
      breakHistory(breakValue)

     //  this.audio.play(); 
      setTime(sessionValue * 60);
      setMode("Session")

    } else if (time === 0 && mode === "Session" && !active) {
      // handle registration on session
      sessionHistory(sessionValue, count)
    // this.audio.play(); 

      setTime(breakValue * 60);
      setMode('Break');
      setCount(count+1);

    }
    /* return () => {
      cleanup
    } 
  }, [breakValue, sessionValue,count, mode, time, active]) */

  const  handleInput = ( currentmode: string, event: any ) => {
    // match number only
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)){ 
      if (active === true && currentmode === "Session") {
        setSessionValue(event.target.value);
        setTime((!event.target.value)? 60: event.target.value * 60);
      }
    } else if (active === true && currentmode === "Break") {
      setBreakValue(event.target.value);
      setTime((currentmode === mode)? (!event.target.value)? 60 : event.target.value * 60 : time);
    }
  }

  const handleIncrement = (currentmode: string) => {
    //limit to max 60
    if (breakValue <= 60 && active === true && currentmode === "Break") {
      setBreakValue(breakValue + 1);
      setTime(mode === 'Break' ? breakValue * 60 + 60 : time);
    } else if (sessionValue < 60 && active === true && currentmode === "Session") {
      setSessionValue(sessionValue + 1)
      setTime(mode === 'Session' ? sessionValue * 60 + 60 : time);
    }
  }

  const handleDecrement = (currentmode: string) => {
    //limit to min 1
    if (breakValue > 1 && active === true && currentmode === "Break") {
      
      setBreakValue(breakValue - 1);
      setTime(mode === 'Break' ? breakValue * 60 - 60 : time);

    } else if (sessionValue > 1 && active === true && currentmode === "Session") {
      
      setSessionValue(sessionValue - 1);
      setTime(mode === 'Session' ? sessionValue * 60 - 60 : time)

    }
  }

  // reset all in the original state
  const handleReset = () => {
    // handle history when user click on reset button
    resetHistory(sessionValue, breakValue, time, mode);

   /*  this.audio.pause();
    this.audio.currentTime = 0; */

    setBreakValue(5);
    setSessionValue(25);
    setTime(25*60);
    setCount(0);
    setActive(true);
    setMode('Session');
    
    //Using clearInterval() to stop time
    clearInterval(time);
  }

  const handlePlay = () => {

   /*  if (active) {
      // handle history when user start focus timer
      playHistory(sessionValue, time, count);
      // decrement this.state.time after 1 second
      var intervalTime: NodeJS.Timer = setInterval(() => {
        setTime(time - 1)
      }, 1000);

      setActive(false);
      setSessionValue((!sessionValue) ? 1 : sessionValue)
      setBreakValue((!breakValue) ? 1 : breakValue)

    } else {
      // clear value of this.time
      clearInterval()
      //this.setState({active: true})
    } */
  }
  
  /* let col = 'white';
  if (time < (60 * 1000)) {
    col = 'red';
  } */

  return (
    <div className="container-fluid" id="all">
      <Router>
        <NavBar Show={() => setModalShow(true)}/>
        <Switch>
          <Route exact path="/">
            <div id='cent' className='d-flex align-items-center'>
              <div id="pomodoro" className="container">

                <div id='control' className="row">
                  <Break
                    input={(event:any) => handleInput('Break', event)}
                    increment={handleIncrement("Break")}
                    decrement={handleDecrement("Break")}
                    breakValue={breakValue}
                    active={active}/>

                  <Session
                    input={(event:any) => handleInput('Session', event)}
                    increment={handleIncrement("Session")}
                    decrement={handleDecrement("Session")}
                    sessionValue={sessionValue}
                    active={active}/>
                </div>
                <div id='display' className=''>
                  <Display
                    pour={mode === 'Session'
                    ? sessionValue * 60
                    : breakValue * 60}
                    time={time}
                    mode={mode}
                    play={handlePlay}
                    reset={handleReset}
                    active={active}/>
                  <div className=''>
                    <Counter count={count}/>
                  </div>
                </div>
                {/* <audio id='beep' src={sound} ref={i => this.audio = i}/> */}
                <div>
                  <History
                    /* history={history} */
                    /* show={modalShow} */
                    onHide={() => setModalShow(false)}/>
                </div>
              </div>
            </div>
          </Route>
        </Switch>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>

        <footer className="page-footer font-small blue">
          <div className="footer-copyright text-center py-3">© 2020 Copyright:
            <a href="https://github.com/messaismael/">
              Ismael Dassi</a>
          </div>
        </footer>
      </Router>
    </div>
  );
}

export default App;