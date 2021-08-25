import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Redirect} from 'react-router-dom'

import { login } from '../utils/toolUser';

import "../styles/register.css"

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [active, setActive] = useState(false)
  const [isSignedUp, setIsSignedUp] = useState(false)

  useEffect(() => {
    if (isSignedUp) 
      window.location.reload();
    /* return () => {
      cleanup
    } */
  });
  
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const data = await login(username, password);
    if (data.status === 200) {
      localStorage.setItem("username", data.username);
      setIsSignedUp(true);
    } else {
      alert(username + "already exist");
    }
  }

  const handlePassword = (event:any) => {
    setPassword(event.target.value);
  }
  const handleUsername = (event:any) => {
    setUsername(event.target.value);
  }
    
  return (<>
    { isSignedUp?
      <Redirect to={{pathname: "/"}}/>
      :
      <div id='centa'>
        <div id="register" className='col-md-3 col-sm-4'>
          <h2>
            Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name='username'
                onChange={handleUsername}
                placeholder="Enter username"
                disabled={active}/>
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name='password'
                onChange={handlePassword}
                placeholder="Enter your password"
                disabled={active}/>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out"/>
            </Form.Group>
            <Button variant='secondary' type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    }
  </>)
}

export default Login;