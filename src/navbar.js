import React from 'react';
import logo4 from './logo/logo4.png';
import { Navbar, Nav, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { user } from './toolUser';


function Label( props ) {
    if ( !props.user ) {
        return ( <Nav>
            <Nav.Link href="/login"> Log in </Nav.Link>
            <Nav.Link href="/register"> Sign up </Nav.Link>
        </Nav> )
    } else {
        return ( <Nav>
            <Nav.Link href="/profile" > <FontAwesomeIcon icon={ faUser } /> Profile </Nav.Link>
        </Nav> )
    }
}

class NavBar extends React.Component {
    componentDidUpdate() {
        Label()
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">
                        <Nav.Link href="/" className="navbar-brand d-inline-block align-top" id="link">
                            <img src={ logo4 } width="50" height="50" alt="pomdoro" />{ '  ' } Focus Timer
                        </Nav.Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <Label user={ user } />
                            <Button variant="outline-primary" onClick={ this.props.Show } id='History'>
                                History
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default NavBar;