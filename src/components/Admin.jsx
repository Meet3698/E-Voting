import { Component } from "react";
import { Form, Button, Container } from 'react-bootstrap'
import axios from 'axios'
import AuthenticationService from "./AuthenticationService";


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            flag: false
        }
    }

    login = () => {
        axios.post('http://localhost:3001/login', this.state).then((response) => {
            if (response.data === true) {
                AuthenticationService.setAdminSession(this.state.username,this.state.password)
                window.location.href = '/admin/dashboard'
            } else {
                alert("Invalid Credentials")
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <Container style={{ padding: "8% 30%" }}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" name="username" value={this.state.username} placeholder="Enter email" onChange={event => this.setState({ username: event.target.value })} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={this.state.password} placeholder="Password" onChange={event => this.setState({ password: event.target.value })} />
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={this.login}>
                            Login
                        </Button>
                    </Form>
                </Container>
            </div >
        );
    }
}

export default Admin;