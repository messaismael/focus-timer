
class Application extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
      breakValue:5,
      sessionValue:25,
      time:25 * 60 * 1000,
      active: true,
      mode:"Session",
      count:0,
    }
    
    this.handleDecrementBreak = this.handleDecrementBreak.bind(this);
    this.handleIncrementBreak = this.handleIncrementBreak.bind(this);
    this.handleIncrementSession = this.handleIncrementSession.bind(this);
    this.handleDecrementSession = this.handleDecrementSession.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }
  
  componentDidUpdate (prevProps, prevState) {
      if (prevState.time===0 && prevState.mode==="Break") {
        this.audio.play();
        this.setState({
          time: this.state.sessionValue*60*1000,
          mode:"Session"
        })
      }
    else if (prevState.time===0 && prevState.mode==="Session") {
      this.audio.play();
      this.setState({
        time: this.state.breakValue*60*1000,
        mode:"Break",
        count: this.state.count + 1
      })
    }
      
  }
   
  handleIncrementBreak(){
    //limit to max 60
    if(this.state.breakValue<60 && this.state.active===true){
      this.setState({
        breakValue: this.state.breakValue+1,
         time: this.state.mode==='Break'?  this.state.breakValue*60*1000+60*1000 : this.state.time,
      })
    }
  }
    
  handleDecrementBreak () {
    //limit to min 1
    if(this.state.breakValue>1 && this.state.active===true){
      this.setState({
        breakValue: this.state.breakValue-1,
        time: this.state.mode==='Break'?  this.state.breakValue*60*1000-60*1000 : this.state.time,
      })
    }
  }
    
  handleIncrementSession () {
    //limit to max 60
    if(this.state.sessionValue < 60 && this.state.active===true){
      this.setState({
       sessionValue: this.state.sessionValue+1,
        time: this.state.sessionValue*60*1000+60*1000,
      })
    }
  }
    
  handleDecrementSession () {
    //limit to min 1
    if (this.state.sessionValue>1 && this.state.active===true) {
      this.setState({
        sessionValue: this.state.sessionValue-1,
        time: this.state.sessionValue*60*1000-60*1000,
      })
    }
  }
  // reset all in the original state  
  handleReset () {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.setState({
      breakValue: 5,
      sessionValue: 25,
      time: 25 * 60 * 1000,
      count: 0,
      active: true,
      mode:"Session",
    })
    //Using clearInterval() to stop time 
    clearInterval(this.time);
  }
    
  
    
  handlePlay () {
    if (this.state.active) {
    // decrement this.state.time after 1 second
    this.time = setInterval(() => { this.setState({time: this.state.time-1000})}, 1000);
      this.setState({ active: false,})
    }
    else {
      // clear value of this.time
      clearInterval(this.time)
      this.setState({active: true,})
    }
  }
    
  render(){
    let col='white';
    if(this.state.time <(60*1000)) {
      col='red';
    }
    return(
    <div className="container">
    <div className="row wid">
      <div id="pomodoro" className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2" >
          <div className='row'>
            <div className='title col-md-12'>Pomodoro Clock</div>
          </div>
        <div id='control' className="col-lg-12 col-md-12 col-sm-12 col-xs-12">   

          <div id='break' className="col-sm-4 col-xs-12">
            <div>
              <h2 id= 'break-label'>Break</h2>
              <div className="row">
                <div id="break-increment" className="col-sm-12 col-sm-offset-0 col-xs-2 col-xs-offset-2" onClick={this.handleIncrementBreak}>
                  <i className='fa fa-arrow-up'></i>
                </div>
                <div id="break-length" className="col-sm-12 col-xs-4">{this.state.breakValue}</div>
                <div id="break-decrement" className="col-sm-12 col-xs-2" onClick={this.handleDecrementBreak}>
                  <i className='fa fa-arrow-down'></i>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-0" id="counter">
            <div >Counter</div>
            <div class ="counter">{this.state.count}</div>
          </div>
          <div id='session' className="col-sm-4 col-xs-12">
            <div>
              <h2 id='session-label'>Session</h2>
              <div className='row'>
                <div id= 'session-increment' className="col-sm-12 col-sm-offset-0 col-xs-2 col-xs-offset-2" onClick={this.handleIncrementSession}>
                  <i className='fa fa-arrow-up'></i>
                </div>
                <div id='session-length' className="col-sm-12 col-xs-4">{this.state.sessionValue}</div>
                <div id= 'session-decrement' className="col-sm-12 col-xs-2" onClick={this.handleDecrementSession}>
                  <i className='fa fa-arrow-down'></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
        <div id='display' className='col-md-8 col-md-offset-2 col-xs-8 col-xs-offset-2'>
        
          <div id="timer-label" className=' col-sm-4 col-xs-12' >{this.state.mode+": "}</div>
          <div id='time-left' className='col-sm-4 col-xs-12' style={{"color":col}}>{moment(this.state.time).format("mm:ss")}</div>           
          <div id="start_stop" className='col-sm-2 col-sm-offset-0 col-xs-3 col-xs-offset-2' onClick={this.handlePlay}>
              <i className={this.state.active? "fa fa-play":"fa fa-pause"}></i>
          </div>
          <div id='reset' className='col-sm-2 col-sm-offset-0 col-xs-3 col-xs-offset-2' onClick={this.handleReset}>
            <i className='fa fa-redo'></i>
          </div>
        </div>
        
        </div>
        <audio id='beep' src="https://goo.gl/65cBl1" ref={i =>this.audio= i} />
      </div>
  </div></div>)
  }
}

ReactDOM.render(<Application />, document.getElementById('app'))
