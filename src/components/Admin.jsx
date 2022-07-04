import { Component } from "react";
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import axios from 'axios'
import AuthenticationService from "./AuthenticationService";
import img from '../images/login.png'


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
            <div style={{ margin: "1% 22% 0% 22%", boxShadow: "5px 10px 20px", borderRadius: "10px" }}>
                <Row >
                    <Col >
                        <Row style={{ height: "40%", textAlign: "center" }}>
                            <h1 style={{ margin: "30% 0% 0% 5%" }}>Welcome</h1>

                        </Row>
                        <Row style={{ height: "50%", padding: "10%" }}>
                            <Row >
                                {this.state.alert ?

                                    // alert("Invalid Credentials")

                                    <Alert variant={"danger"} style={{ marginLeft: "10%" }}>
                                        Invalid Credentials
                                    </Alert>
                                    :
                                    <></>
                                }
                            </Row>
                            <Row style={{ marginLeft: "5%", padding: "5%" }}>

                                <Form>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                        {/* <Form.Label column sm={2}>
                                                Email
                                            </Form.Label> */}

                                        <Form.Control type="text" name="username" value={this.state.username} placeholder="Enter email" onChange={event => this.setState({ username: event.target.value })} />
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                        {/* <Form.Label column sm={2}>
                                                Password
                                            </Form.Label> */}
                                        <Form.Control type="password" name="password" value={this.state.password} placeholder="Password" onChange={event => this.setState({ password: event.target.value })} />
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Button style={{ position: "absolute", width: "75%", background: "linear-gradient(91.97deg, #00B3DB -3.9%, rgba(115, 103, 255, 0.63) 52.76%, rgba(173, 0, 255, 0.5) 107.11%)", borderRadius: "5px", color: "white" }} variant="light" type="button" onClick={this.login}>
                                            Login
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Row>
                        </Row>
                    </Col>
                    <Col>
                        <img src={img} alt="" width="100%" />
                    </Col>
                </Row>
            </div >
        );
    }
}

export default Admin;