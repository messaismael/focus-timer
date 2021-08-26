import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';

import '../styles/mode-control.css'
import { Col, Row } from 'react-bootstrap';

type PropsBreak = {
    mode: string,
    increment?: any,
    decrement?: any,
    breakValue?: number,
    input?: any,
    active?: boolean,
}

const ModeComponent: React.FC<PropsBreak> = (props) => {

  return (
    <div className='mode-container'>
        <h2 className='mb-3'>{props.mode}</h2>
        <Row>
            <Col md={4} xs={12} className='text-right'>
                <div>
                    <FontAwesomeIcon icon={ faArrowCircleUp } className="arrow" onClick={ props.increment } />
                </div>
            </Col>
            <Col md={{span:4, offset:0}} xs={{span:10, offset:1}}>
                <input
                className='mode-length'
                value={ props.breakValue }
                onChange={ props.input }
                maxLength={2}
                disabled={props.active? false:true}
                />
            </Col>
            <Col md={4}  xs={12}className='text-left'>
                <div>
                    <FontAwesomeIcon icon={ faArrowCircleDown } className="arrow" onClick={ props.decrement } />
                </div>
            </Col>
        </Row>
    </div> 
  );
}

export default ModeComponent;
