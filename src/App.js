import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Session from './session';
import Display from './display';
import Counter from './counter';
import Break from './break';
import NavBar from './navbar';
import History from './history'
import sound from './sound/BeepSound.mp3';
import Register from './register';
import Login from './login'
import {breakHistory, sessionHistory, resetHistory, playHistory, history} from './historyData.js'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breakValue: 5,
      sessionValue: 25,
      time: 25 * 60,
      active: true,
      mode: "Session",
      count: 0,
      modalShow: false
    }
    this.handleReset = this
      .handleReset
      .bind(this);
    this.handlePlay = this
      .handlePlay
      .bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.time === 0 && prevState.mode === "Break") {
      // handle registration on break
      breakHistory(this.state.breakValue)

      this
        .audio
        .play();
      this.setState({
        time: this.state.sessionValue * 60,
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
  }

  handleInput( mode, event ) {
    // match number only
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) 
      if (this.state.active === true && mode === "Session") {
        this.setState({
          sessionValue: event.target.value,
          time: (!event.target.value)
            ? 60
            : event.target.value * 60
        })
      }
    else if (this.state.active === true && mode === "Break") {
      this.setState({
        breakValue: event.target.value,
        time: (this.state.mode === mode)
          ? (!event.target.value)
            ? 60
            : event.target.value * 60 : this.state.time
      })
    }
  }

  handleIncrement(mode) {
    //limit to max 60
    if (this.state.breakValue <= 60 && this.state.active === true && mode === "Break") {
      this.setState({
        breakValue: this.state.breakValue + 1,
        time: this.state.mode === 'Break'
          ? this.state.breakValue * 60 + 60
          : this.state.time
      })
    } else if (this.state.sessionValue < 60 && this.state.active === true && mode === "Session") {
      this.setState({
        sessionValue: this.state.sessionValue + 1,
        time: this.state.mode === 'Session'
          ? this.state.sessionValue * 60 + 60
          : this.state.time
      })
    }
  }

  handleDecrement(mode) {
    //limit to min 1
    if (this.state.breakValue > 1 && this.state.active === true && mode === "Break") {
      this.setState({
        breakValue: this.state.breakValue - 1,
        time: this.state.mode === 'Break'
          ? this.state.breakValue * 60 - 60
          : this.state.time
      })
    } else if (this.state.sessionValue > 1 && this.state.active === true && mode === "Session") {
      this.setState({
        sessionValue: this.state.sessionValue - 1,
        time: this.state.mode === 'Session'
          ? this.state.sessionValue * 60 - 60
          : this.state.time
      })
    }

  }

  // reset all in the original state
  handleReset() {
    // handle history when user click on reset button
    resetHistory(this.state.sessionValue, this.state.breakValue, this.state.time, this.state.mode);

    this
      .audio
      .pause();
    this.audio.currentTime = 0;
    this.setState({
      breakValue: 5,
      sessionValue: 25,
      time: 25 * 60,
      count: 0,
      active: true,
      mode: "Session"
    })
    //Using clearInterval() to stop time
    clearInterval(this.time);
  }

  handlePlay() {

    if (this.state.active) {
      // handle history when user start focus timer
      playHistory(this.state.sessionValue, this.state.time, this.state.count);
      // decrement this.state.time after 1 second
      this.time = setInterval(() => {
        this.setState({
          time: this.state.time - 1
        })
      }, 1000);
      this.setState({
        active: false,
        sessionValue: (!this.state.sessionValue)
          ? 1
          : this.state.sessionValue,
        breakValue: (!this.state.breakValue)
          ? 1
          : this.state.breakValue
      })
    } else {
      // clear value of this.time
      clearInterval(this.time)
      //this.setState({active: true})
    }
  }

  render() {
    let col = 'white';
    if (this.state.time < (60 * 1000)) {
      col = 'red';
    }
    return (
      <div className="container-fluid" id="all">
        <Router>
          <NavBar Show={() => this.setState({modalShow: true})}/>
          <Switch>
            <Route exact path="/">
              <div id='cent' className='d-flex align-items-center'>
                <div id="pomodoro" className="container">

                  <div id='control' className="row">
                    <Break
                      Input={(event) => this.handleInput('Break', event)}
                      increment={this
                      .handleIncrement
                      .bind(this, "Break")}
                      decrement={this
                      .handleDecrement
                      .bind(this, "Break")}
                      breakValue={this.state.breakValue}
                      active={this.state.active}/>

                    <Session
                      Input={(event) => this.handleInput('Session', event)}
                      increment={this
                      .handleIncrement
                      .bind(this, "Session")}
                      decrement={this
                      .handleDecrement
                      .bind(this, "Session")}
                      sessionValue={this.state.sessionValue}
                      active={this.state.active}/>
                  </div>
                  <div id='display' className=''>
                    <Display
                      pour={this.state.mode === 'Session'
                      ? this.state.sessionValue * 60
                      : this.state.breakValue * 60}
                      time={this.state.time}
                      mode={this.state.mode}
                      play={this.handlePlay}
                      reset={this.handleReset}
                      color={col}
                      active={this.state.active}/>
                    <div className=''>
                      <Counter count={this.state.count}/>
                    </div>
                  </div>
                  <audio id='beep' src={sound} ref={i => this.audio = i}/>
                  <div>
                    <History
                      history={history}
                      show={this.state.modalShow}
                      onHide={() => this.setState({modalShow: false})}/>
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
}

export default App;
