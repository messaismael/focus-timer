class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakValue: 5,
      sessionValue: 25,
      time: 25 * 60 * 1000,
      active: true,
      mode: "Session",
      count: 0
    };
    this.handleDecrementBreak = this.handleDecrementBreak.bind(this);
    this.handleIncrementBreak = this.handleIncrementBreak.bind(this);
    this.handleIncrementSession = this.handleIncrementSession.bind(this);
    this.handleDecrementSession = this.handleDecrementSession.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.time === 0 && prevState.mode === "Break") {
      this.audio.play();
      this.setState({
        time: this.state.sessionValue * 60 * 1000,
        mode: "Session"
      });
    } else if (prevState.time === 0 && prevState.mode === "Session") {
      this.audio.play();
      this.setState({
        time: this.state.breakValue * 60 * 1000,
        mode: "Break",
        count: this.state.count + 1
      });
    }
  }

  handleIncrementBreak() {
    //limit to max 60
    if (this.state.breakValue < 60 && this.state.active === true) {
      this.setState({
        breakValue: this.state.breakValue + 1,
        time: this.state.mode === 'Break' ? this.state.breakValue * 60 * 1000 + 60 * 1000 : this.state.time
      });
    }
  }

  handleDecrementBreak() {
    //limit to min 1
    if (this.state.breakValue > 1 && this.state.active === true) {
      this.setState({
        breakValue: this.state.breakValue - 1,
        time: this.state.mode === 'Break' ? this.state.breakValue * 60 * 1000 - 60 * 1000 : this.state.time
      });
    }
  }

  handleIncrementSession() {
    //limit to max 60
    if (this.state.sessionValue < 60 && this.state.active === true) {
      this.setState({
        sessionValue: this.state.sessionValue + 1,
        time: this.state.sessionValue * 60 * 1000 + 60 * 1000
      });
    }
  }

  handleDecrementSession() {
    //limit to min 1
    if (this.state.sessionValue > 1 && this.state.active === true) {
      this.setState({
        sessionValue: this.state.sessionValue - 1,
        time: this.state.sessionValue * 60 * 1000 - 60 * 1000
      });
    }
  } // reset all in the original state  


  handleReset() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.setState({
      breakValue: 5,
      sessionValue: 25,
      time: 25 * 60 * 1000,
      count: 0,
      active: true,
      mode: "Session"
    }); //Using clearInterval() to stop time 

    clearInterval(this.time);
  }

  handlePlay() {
    if (this.state.active) {
      // decrement this.state.time after 1 second
      this.time = setInterval(() => {
        this.setState({
          time: this.state.time - 1000
        });
      }, 1000);
      this.setState({
        active: false
      });
    } else {
      // clear value of this.time
      clearInterval(this.time);
      this.setState({
        active: true
      });
    }
  }

  render() {
    let col = 'white';

    if (this.state.time < 60 * 1000) {
      col = 'red';
    }

    return React.createElement("div", {
      className: "container"
    }, React.createElement("div", {
      className: "row wid"
    }, React.createElement("div", {
      id: "pomodoro",
      className: "col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2"
    }, React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      className: "title col-md-12"
    }, React.createElement("img", {
      src: "../logo/logo4.png"
    }))), React.createElement("div", {
      id: "control",
      className: "col-lg-12 col-md-12 col-sm-12 col-xs-12"
    }, React.createElement("div", {
      id: "break",
      className: "col-sm-4 col-xs-12"
    }, React.createElement("div", null, React.createElement("h2", {
      id: "break-label"
    }, "Break"), React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      id: "break-increment",
      className: "col-sm-12 col-sm-offset-0 col-xs-2 col-xs-offset-2",
      onClick: this.handleIncrementBreak
    }, React.createElement("i", {
      className: "fa fa-arrow-up"
    })), React.createElement("div", {
      id: "break-length",
      className: "col-sm-12 col-xs-4"
    }, this.state.breakValue), React.createElement("div", {
      id: "break-decrement",
      className: "col-sm-12 col-xs-2",
      onClick: this.handleDecrementBreak
    }, React.createElement("i", {
      className: "fa fa-arrow-down"
    }))))), React.createElement("div", {
      className: "col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-0",
      id: "counter"
    }, React.createElement("div", null, "Counter"), React.createElement("div", {
      class: "counter"
    }, this.state.count)), React.createElement("div", {
      id: "session",
      className: "col-sm-4 col-xs-12"
    }, React.createElement("div", null, React.createElement("h2", {
      id: "session-label"
    }, "Session"), React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      id: "session-increment",
      className: "col-sm-12 col-sm-offset-0 col-xs-2 col-xs-offset-2",
      onClick: this.handleIncrementSession
    }, React.createElement("i", {
      className: "fa fa-arrow-up"
    })), React.createElement("div", {
      id: "session-length",
      className: "col-sm-12 col-xs-4"
    }, this.state.sessionValue), React.createElement("div", {
      id: "session-decrement",
      className: "col-sm-12 col-xs-2",
      onClick: this.handleDecrementSession
    }, React.createElement("i", {
      className: "fa fa-arrow-down"
    })))))), React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      id: "display",
      className: "col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-8 col-xs-offset-2"
    }, React.createElement("div", {
      id: "timer-label",
      className: "col-md-4 col-md-offset-0 col-sm-4 col-sm-offset-0 col-xs-8 col-xs-offset-2"
    }, this.state.mode + ": "), React.createElement("div", {
      id: "time-left",
      className: "col-md-4 col-md-offset-0 col-sm-4 col-sm-offset-0 col-xs-8 col-xs-offset-2",
      style: {
        "color": col
      }
    }, moment(this.state.time).format("mm:ss")), React.createElement("div", {
      id: "start_stop",
      className: "col-sm-2 col-sm-offset-0 col-xs-3 col-xs-offset-2",
      onClick: this.handlePlay
    }, React.createElement("i", {
      className: this.state.active ? "fa fa-play" : "fa fa-pause"
    })), React.createElement("div", {
      id: "reset",
      className: "col-sm-2 col-sm-offset-0 col-xs-3 col-xs-offset-2",
      onClick: this.handleReset
    }, React.createElement("i", {
      className: "fa fa-redo"
    })))), React.createElement("audio", {
      id: "beep",
      src: "../sound/BeepSound.mp3",
      ref: i => this.audio = i
    }))));
  }

}

ReactDOM.render(React.createElement(Application, null), document.getElementById('app'));