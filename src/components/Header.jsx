import { Component } from "react";
import AuthenticationService from "./AuthenticationService";
const { Container, Navbar, Nav, Button } = require("react-bootstrap")


class Header extends Component {

    logout = () => {
        const cookies = document.cookie.split(";")

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            console.log(name);
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }

        AuthenticationService.removeSession()

        window.location = '/'
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ width: "100vw" }}>
                    <Navbar.Brand href="/">Blockchain Based E-Voting</Navbar.Brand>
                    <Container>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            </Nav>
                            <Nav>
                                <Button variant="light" onClick={this.logout}>Logout</Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default Header;