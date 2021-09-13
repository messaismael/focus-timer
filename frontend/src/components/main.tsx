import React, { createRef, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ModeComponent from "./mode-control";
import Counter from "./counter";
import Display from "./display";

import '../styles/main.css'

const Main:React.FC = () => {
    const [breakValue, setBreakValue] = useState(5);
    const [sessionValue, setSessionValue] = useState(25);
    const [time, setTime] = useState(sessionValue*60);
    const [mode, setMode] = useState('Session');
    const [active, setActive] = useState(false);

    const audioRef = createRef<HTMLAudioElement>()

    
    useEffect(() => {
        if(mode=='Session' && !active){
            setTime(sessionValue*60);
            // audioRef.current?.play()
        }else if(mode=='Break' && !active){
            setTime(breakValue*60);
        }
        
    }, [breakValue, sessionValue]);
    
    useEffect(() => {
        // decrement time after a second.
        let interval:any;
        if(active){
            interval = setInterval(()=>{
                console.log('time bla bla')
                setTime(time => time - 1);
            }, 1000);
        }
        // stop the decrementation
        return () => clearInterval(interval);
    }, [active]);

    const handleReset = () => {
        setActive(false); 
        setBreakValue(5);
        setSessionValue(25);
        setTime(sessionValue*60);
    }
    
    return( 
      <Container>
        <div id='main'>
            <div>
                <Row>
                    <Col>
                        <ModeComponent mode='Break' modeValue={breakValue} updateModeValue={setBreakValue} active={active}/>
                    </Col>
                    <Col>
                        <ModeComponent mode='Session' modeValue={sessionValue} updateModeValue={setSessionValue} active={active}/>
                    </Col>
                </Row>
                <Row>
                    <Display
                    startTime={ mode=='Break'? breakValue* 60 : sessionValue*60}
                    time={time}
                    mode={mode}
                    active={active}
                    play={()=>{setActive(!active)}}
                    reset={handleReset}
                    />
                </Row>
                <Row className='mt-3'>
                    <Counter />
                </Row>
            </div>
        </div>
        <audio id='beep' src={'/sound/BeepSound.mp3'} ref={audioRef}/>
    </Container>
  );
}

export default Main;