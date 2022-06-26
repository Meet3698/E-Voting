import { Component } from "react";
import { Form, Button, Container, Alert, Card, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import AuthenticationService from "./AuthenticationService";
import img from '../images/voting.webp'


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            flag: false,
            alert: false
        }
    }

    login = () => {
        axios.post('http://localhost:3001/login', this.state).then((response) => {
            if (response.data === true) {
                AuthenticationService.setAdminSession(this.state.username, this.state.password)
                window.location.href = '/admin/dashboard'
            } else {
                this.setState({
                    alert: true
                })
            }
        })
    }

    render() {
        return (
            <div>
                <Container style={{ padding: "3% 15%" }}>
                    {this.state.alert ?
                        <Alert variant={"danger"}>
                            Invalid Credentials
                        </Alert>
                        :
                        <></>
                    }

                    <Card>
                        <Card.Img variant="top" src={img} />
                        <Card.Body>
                            <Form>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                    <Form.Label column sm={2}>
                                        Email
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" name="username" value={this.state.username} placeholder="Enter email" onChange={event => this.setState({ username: event.target.value })} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                    <Form.Label column sm={2}>
                                        Password
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="password" name="password" value={this.state.password} placeholder="Password" onChange={event => this.setState({ password: event.target.value })} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Col sm={{ span: 10, offset: 2 }}>
                                        <Button variant="primary" type="button" onClick={this.login}>
                                            Login
                                        </Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>

                </Container>
            </div >
        );
    }
}

export default Admin;