import React from 'react';
import "./register.css"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { login } from './toolUser';

class Login extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            username: '',
            password: ''
        }
    }

    handleSubmit = ( e ) => {
        e.preventDefault();
        login( this.state.username );
    }

    handlePassword = event => {
        this.setState( {
            password: event.target.value
        } )
    }
    handleUsername = event => {
        this.setState( {
            username: event.target.value,
        } )
    }
    render() {
        return (
            <div id='centa'>
                <div id="register" className='col-md-3 col-sm-4'>
                    <h2> Login</h2>
                    <Form onSubmit={ ( e ) => this.handleSubmit( e ) } >
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name='username' onChange={ this.handleUsername } placeholder="Enter username" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name='password' onChange={ this.handlePassword } placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Login;