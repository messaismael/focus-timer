import React from 'react';
import logo4 from './logo/logo4.png';
import { Navbar, NavDropdown, Nav, Button } from 'react-bootstrap'
import $ from 'jquery';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faTwitter, faGooglePlusG, faUser } from "@fortawesome/free-brands-svg-icons";
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';

/*  <FontAwesomeIcon icon={faUbuntu} />
    <FontAwesomeIcon icon={faTwitter} />
    <FontAwesomeIcon icon={faGooglePlusG} />

    <nav className="navbar navbar-dark bg-dark" id='nav'>
                    
                </nav>
 */

class NavBar extends React.Component {
    handleHistory = () => {
        $( '#history' ).toggle();
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">
                        <a href="#home" className="navbar-brand d-inline-block align-top" >
                            <img src={ logo4 } width="50" height="50" alt="pomdoro" />{ '  ' } Focus Timer
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav>
                                <NavDropdown title={ <FontAwesomeIcon icon={ faUserAlt } /> } drop='left' id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#log-in">Log in</NavDropdown.Item>
                                    <NavDropdown.Item href="#sign-in">singn in</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#about">About Focus Timer</NavDropdown.Item>
                                </NavDropdown>
                                <Button variant="outline-primary" onClick={ this.props.Show } id='History'>
                                    History
                                </Button>
                            </Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default NavBar;