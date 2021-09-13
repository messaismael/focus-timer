import React, { createRef, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ModeComponent from "./mode-control";
import Counter from "./counter";
import Display from "./display";

import '../styles/main.css'

/**
 * @author messaismael
 * @description the main component of the focustimer which includes all the other components.
 * @returns {JSX}
 */
const Main:React.FC = () => {
    const [breakValue, setBreakValue] = useState(5);
    const [sessionValue, setSessionValue] = useState(25);
    const [time, setTime] = useState(sessionValue*60);
    const [mode, setMode] = useState('Session');
    const [active, setActive] = useState(false);
    const [count, setCount] = useState(0)

    const audioRef = createRef<HTMLAudioElement>()

    useEffect(() => {
        if(mode==='Session' && !active){
            setTime(sessionValue*60);
            // audioRef.current?.play()
        }else if(mode==='Break' && !active){
            setTime(breakValue*60);
        }
        
    }, [active, mode, breakValue, sessionValue]);
    
    useEffect(() => {
        let interval:any;

        // when the timer is running.
        if (!time && mode==='Session' && active){
            setMode("Break")
            setCount(count+1);
            setTime(breakValue*60);
            audioRef.current?.play();
        } else if (!time && mode==='Break' && active){
            setMode("Session");
            setTime(sessionValue*60);
            audioRef.current?.play();
        }

        if (active) {
            // decrement time after a second.
            interval = setInterval(()=>{
                console.log('time bla bla')
                setTime(time => time - 1);
            }, 1000);
        }

        // stop counter
        return () => clearInterval(interval);
    }, [time, mode, active, breakValue, audioRef, sessionValue]);

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
                    startTime={ mode==='Break'? breakValue* 60 : sessionValue*60}
                    time={time}
                    mode={mode}
                    active={active}
                    play={()=>{setActive(!active)}}
                    reset={handleReset}
                    />
                </Row>
                <Row className='mt-3'>
                    <Counter count={count}/>
                </Row>
            </div>
        </div>
        <audio id='beep' src={'/sound/BeepSound.mp3'} ref={audioRef}/>
    </Container>
  );
}

export default Main;