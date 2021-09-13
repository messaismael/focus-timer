import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ModeComponent from "./mode-control";
import Counter from "./counter";

import '../styles/main.css'
import Display from "./display";

const Main:React.FC = () => {
    const [breakValue, setBreakValue] = useState(5);
    const [sessionValue, setSessionValue] = useState(25);
  
    return( 
      <Container>
        <div id='main'>
            <div>
                <Row>
                    <Col>
                        <ModeComponent mode='Break' modeValue={breakValue} updateModeValue={setBreakValue} />
                    </Col>
                    <Col>
                        <ModeComponent mode='Session' modeValue={sessionValue} updateModeValue={setSessionValue} />
                    </Col>
                </Row>
                <Row>
                    <Display
                    pour={ 25 * 60}
                    time={2*60}
                    mode={'break'}
                    play={()=>{}}
                    reset={()=>{}}
                    active={false}/>
                </Row>
                <Row className='mt-3'>
                    <Counter />
                </Row>
            </div>
        </div>
    </Container>
  );
}

export default Main;