import React from 'react';
import { Col } from 'react-bootstrap';
import '../styles/counter.css'

const Counter = ( props:any ) => {
  return (
    <Col sm={6} md={{ span: 4, offset: 4 }}  className='mt-4 counter' >
        <div>
            <div className='counter-label' >Counter</div>
            <div className="counter-length">{ props.count || 0}</div>
        </div>
    </Col> 
  );
}

export default Counter;