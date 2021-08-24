import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { user } from '../utils/toolUser';

const NavBar = (props:any) => {
    const [isLoggIn, setIsLoggIn] = useState(false)

    useEffect(() => {
        setIsLoggIn(!!user);
    },[]);

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">
                        <img src='/logo/logo4.png' width="50" height="50" alt="pomdoro" />{ '  ' } Focus Timer
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {!isLoggIn && 
                            <>
                                <Nav.Link href="/login"> Log in </Nav.Link>
                                <Nav.Link href="/register"> Sign up </Nav.Link>
                            </>
                        }
                        {isLoggIn && <Nav.Link href="/profile"><FontAwesomeIcon icon={ faUser } /> Profile </Nav.Link> }

                        <Button variant="outline-primary" onClick={ props.Show } id='History'>
                            History
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;