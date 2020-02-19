class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakValue: 5,
      sessionValue: 25,
      time: 25 * 60 * 1000,
      active: true,
      mode: "Session",
      count: 0 };


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
        mode: "Session" });

    } else
    if (prevState.time === 0 && prevState.mode === "Session") {
      this.audio.play();
      this.setState({
        time: this.state.breakValue * 60 * 1000,
        mode: "Break",
        count: this.state.count + 1 });

    }

  }

  handleIncrementBreak() {
    //limit to max 60
    if (this.state.breakValue < 60 && this.state.active === true) {
      this.setState({
        breakValue: this.state.breakValue + 1,
        time: this.state.mode === 'Break' ? this.state.breakValue * 60 * 1000 + 60 * 1000 : this.state.time });

    }
  }

  handleDecrementBreak() {
    //limit to min 1
    if (this.state.breakValue > 1 && this.state.active === true) {
      this.setState({
        breakValue: this.state.breakValue - 1,
        time: this.state.mode === 'Break' ? this.state.breakValue * 60 * 1000 - 60 * 1000 : this.state.time });

    }
  }

  handleIncrementSession() {
    //limit to max 60
    if (this.state.sessionValue < 60 && this.state.active === true) {
      this.setState({
        sessionValue: this.state.sessionValue + 1,
        time: this.state.sessionValue * 60 * 1000 + 60 * 1000 });

    }
  }

  handleDecrementSession() {
    //limit to min 1
    if (this.state.sessionValue > 1 && this.state.active === true) {
      this.setState({
        sessionValue: this.state.sessionValue - 1,
        time: this.state.sessionValue * 60 * 1000 - 60 * 1000 });

    }
  }
  // reset all in the original state  
  handleReset() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.setState({
      breakValue: 5,
      sessionValue: 25,
      time: 25 * 60 * 1000,
      count: 0,
      active: true,
      mode: "Session" });

    //Using clearInterval() to stop time 
    clearInterval(this.time);
  }



  handlePlay() {
    if (this.state.active) {
      // decrement this.state.time after 1 second
      this.time = setInterval(() => {this.setState({ time: this.state.time - 1000 });}, 1000);
      this.setState({ active: false });
    } else
    {
      // clear value of this.time
      clearInterval(this.time);
      this.setState({ active: true });
    }
  }

  render() {
    let col = 'white';
    if (this.state.time < 60 * 1000) {
      col = 'red';
    }
    return (
      React.createElement("div", { id: "pomodoro" },
      React.createElement("h1", { className: "title" }, "Pomodoro Clock"),
      React.createElement("div", { id: "control" },
      React.createElement("div", { id: "break" },
      React.createElement("h2", { id: "break-label" }, "Break Length"),
      React.createElement("div", { id: "value" },
      React.createElement("div", { id: "break-increment", onClick: this.handleIncrementBreak },
      React.createElement("i", { className: "fa fa-arrow-up" })),

      React.createElement("div", { id: "break-length" }, this.state.breakValue),
      React.createElement("div", { id: "break-decrement", onClick: this.handleDecrementBreak },
      React.createElement("i", { className: "fa fa-arrow-down" })))),




      React.createElement("div", { id: "session" },
      React.createElement("h2", { id: "session-label" }, "Session Length"),
      React.createElement("div", { id: "value" },
      React.createElement("div", { id: "session-increment", onClick: this.handleIncrementSession },
      React.createElement("i", { className: "fa fa-arrow-up" })),

      React.createElement("div", { id: "session-length" }, this.state.sessionValue),
      React.createElement("div", { id: "session-decrement", onClick: this.handleDecrementSession },
      React.createElement("i", { className: "fa fa-arrow-down" }))))),




      React.createElement("div", null,
      React.createElement("div", { id: "counter", style: { textAlign: "center" } }, "counter of session"),
      React.createElement("div", { class: "counter" }, this.state.count)),

      React.createElement("div", { id: "display" },
      React.createElement("h1", { id: "timer-label" }, this.state.mode),
      React.createElement("h1", { id: "time-left", style: { "color": col } }, moment(this.state.time).format("mm:ss")),

      React.createElement("div", { id: "control" },
      React.createElement("div", { id: "start_stop", onClick: this.handlePlay },

      React.createElement("i", { className: this.state.active ? "fa fa-play" : "fa fa-pause" })),

      React.createElement("div", { id: "reset", onClick: this.handleReset },
      React.createElement("i", { className: "fa fa-redo" }))),


      React.createElement("audio", { id: "beep", src: "https://goo.gl/65cBl1", ref: i => this.audio = i })),



      React.createElement("div", { className: "author" },
      React.createElement("a", { href: "https://github.com/messaismael", target: "_blank", style: { color: "black" } }, " by Ismael"))));



  }}


ReactDOM.render(React.createElement(Application, null), document.getElementById('app'));
