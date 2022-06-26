import axios from "axios";
import { Component } from "react";
import { Alert, Button, Container, Form, Card, Row, Col } from "react-bootstrap";
import Cookies from 'universal-cookie';
import AuthenticationService from "./AuthenticationService";
import ellipticcurve from "starkbank-ecdsa";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import img from '../images/voting.webp'

var PrivateKey = ellipticcurve.PrivateKey;

class Voter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            id: "",
            priv_key: "",
            pub_key: "",
            flag: false,
            alert: false
        }
    }

    result = () => {
        confirmAlert({
            title: 'You have already Voted',
            buttons: [
                {
                    label: 'View Votes',
                    onClick: () => { }
                }
            ]
        });
    };

    dashboard = () => {
        confirmAlert({
            title: 'Have You Copy Keys?',
            message: 'if not then you cannot sign your vote',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => window.location.href = "/voter/dashboard"
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };

    login = () => {
        axios.post('http://localhost:3001/voterLogin', { name: this.state.name, id: this.state.id }).then(async (response) => {
            if (response.data === false) {
                this.setState({
                    alert: true
                })
            }

            else if (response.data.voted === true) {
                const cookies = new Cookies();
                AuthenticationService.setSession(this.state.name, this.state.id, response.data.voted)

                cookies.set('voter_name', response.data.voter_name)
                cookies.set('voter_id', response.data.voter_id)
                this.result()
                window.location.href = '/result'
            }
            else {
                if (response.data.key_generated === false) {
                    const cookies = new Cookies();
                    AuthenticationService.setSession(this.state.name, this.state.id, response.data.voted)

                    cookies.set('voter_name', response.data.voter_name, { path: '/' })
                    cookies.set('voter_id', response.data.voter_id, { path: '/' })

                    let privateKey = new PrivateKey();
                    let publicKey = privateKey.publicKey();

                    await axios.post('http://localhost:3001/setKeyGenerated', { name: this.state.name, id: this.state.id })

                    this.setState({
                        priv_key: privateKey.toPem(),
                        pub_key: publicKey.toPem(),
                        flag: true
                    })
                } else {
                    AuthenticationService.setSession(this.state.name, this.state.id, response.data.voted)

                    window.location.href = "/voter/dashboard"
                }

            }
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.flag ?
                        <Container style={{ padding: "3%" }}>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>PRIVATE KEY</Form.Label>
                                    <Form.Control as="textarea" value={this.state.priv_key} rows={6} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>PUBLIC KEY</Form.Label>
                                    <Form.Control as="textarea" value={this.state.pub_key} rows={6} />
                                </Form.Group>

                                <Button onClick={this.dashboard}>Dashboard</Button>
                            </Form>
                        </Container>
                        :
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
                                                Name
                                            </Form.Label>
                                            <Col sm={10}>
                                                <Form.Control type="text" name="name" value={this.state.name} placeholder="Enter Name as per Voter Card" onChange={event => this.setState({ name: event.target.value })} />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                            <Form.Label column sm={2}>
                                                VoterID
                                            </Form.Label>
                                            <Col sm={10}>
                                                <Form.Control type="text" name="id" value={this.state.id} placeholder="Enter Voter ID" onChange={event => this.setState({ id: event.target.value })} />
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
                }


            </div>
        )
    }
}

export default Voter;