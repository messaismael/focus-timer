import React from 'react';
import logo4 from './logo/logo4.png';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faTwitter, faGooglePlusG, faUbuntu} from "@fortawesome/free-brands-svg-icons";

/* <FontAwesomeIcon icon={faUbuntu} />
<FontAwesomeIcon icon={faTwitter} />
<FontAwesomeIcon icon={faGooglePlusG} /> */

class Navbar extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark" id='nav'>
                    <a href="#home" className="navbar-brand d-inline-block align-top" >
                        <img src={ logo4 } width="50" height="50" alt="pomdoro" />{ '  ' } Pomodoro Clock
                    </a>
                </nav>
            </div>
        )
    }
}

export default Navbar;