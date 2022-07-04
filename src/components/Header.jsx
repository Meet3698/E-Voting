import { Component } from "react";
import AuthenticationService from "./AuthenticationService";
import logo from '../images/logo.png'
import logout from '../images/Logout.png'
import { Container, Navbar, Nav, Button } from "react-bootstrap"

class Header extends Component {

    logout = () => {
        const cookies = document.cookie.split(";")

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }

        AuthenticationService.removeSession()

        window.location = '/'
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="white" >
                    <Navbar.Brand href="/"><img  alt="" src={logo} style={{ width: "200px" }} /></Navbar.Brand>
                    <Container>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            </Nav>
                            <Nav>
                                <Button variant="link"  onClick={this.logout}><img alt="" src={logout} style={{ width: "50px" }} /></Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default Header;