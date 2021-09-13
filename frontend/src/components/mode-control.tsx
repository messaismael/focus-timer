import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

import '../styles/mode-control.css'
import { Button, Col, Form, Row } from 'react-bootstrap';

type PropsBreak = {
    mode: string,
    updateModeValue: Function,
    modeValue: number,
    active?: boolean,
}

const ModeComponent: React.FC<PropsBreak> = (props) => {

    let defValue = props.mode == 'Break'? 5:25;
    return (
        <div className='mode-container'>
            <h2 className='mb-3'>{props.mode}</h2>
            <Row>
                <Col md={4} xs={12} className='text-right'>
                    <div>
                        <Button variant='dark' className="button-arrow" onClick={()=> props.updateModeValue(props.modeValue+1) } disabled={props.active}>
                            <FontAwesomeIcon icon={ faArrowUp } />
                        </Button>
                    </div>
                </Col>
                <Col md={{span:4, offset:0}} xs={{span:10, offset:1}}>
                    <Form.Control
                    className='mode-length'
                    type='number'
                    value={ props.modeValue }
                    onChange={(e)=> props.updateModeValue(e.target.value? e.target.value: defValue)}
                    maxLength={2}
                    disabled={props.active}
                    />
                </Col>
                <Col md={4}  xs={12}className='text-left'>
                    <div>
                        <Button variant='dark' className="button-arrow" onClick={()=> props.updateModeValue(props.modeValue-1) } disabled={!props.modeValue?true:props.active}>
                            <FontAwesomeIcon icon={ faArrowDown } />
                        </Button>
                    </div>
                </Col>
            </Row>
        </div> 
    );
}

export default ModeComponent;
