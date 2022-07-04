import axios from "axios";
import { Component } from "react";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";
import Cookies from 'universal-cookie';
import AuthenticationService from "./AuthenticationService";
import ellipticcurve from "starkbank-ecdsa";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import img from '../images/login.png'
import key from '../images/key.png'
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
            alert: false,
            set_key: false
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
        if (this.state.set_key !== false) {
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
        }
        else {
            confirmAlert({
                title: 'Please generate the keys',
            });
        }
    };

    generate_key = () => {
        let privateKey = new PrivateKey();
        let publicKey = privateKey.publicKey();

        axios.post('http://localhost:3001/setKeyGenerated', { name: this.state.name, id: this.state.id, public_key: publicKey.toPem() })

        this.setState({
            priv_key: privateKey.toPem(),
            pub_key: publicKey.toPem(),
            set_key: true
        })
    }

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

                    // let privateKey = new PrivateKey();
                    // let publicKey = privateKey.publicKey();

                    // await axios.post('http://localhost:3001/setKeyGenerated', { name: this.state.name, id: this.state.id })

                    this.setState({
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
            <div >
                {
                    this.state.flag ?
                        <div style={{ margin: "1% 5% 0% 5%", borderRadius: "10px" }}>
                            <Row style={{ margin: "2%" }}>
                                <Col xs={8}>
                                    <Row style={{ margin: "0% 0% 3% 0%" }}>

                                        <div>
                                            <h5>Now it's time to generate your keys which can help you to protect your privacy.</h5>
                                            <h5>When you're voting, you will use your public key and private key to vote. The system will save your public key into our database.</h5>
                                            <h5>Please attention that your <span style={{ color: "red" }}>PRIVATE KEY WILL NOT SAVE INTO OUR SYSTEM.</span></h5>
                                            <h5>So, please save your private key value into your computer and keep it privately.</h5>
                                            <h5>If you lost or forgot your provate key before the vote date, you can generate a new one and save the new public key into our system.</h5>

                                        </div>
                                    </Row>
                                    <Row style={{ margin: "0% 0% 3% 0%" }} >

                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>PUBLIC KEY</Form.Label>
                                            <Form.Control disabled as="textarea" value={this.state.pub_key} rows={5} style={{ borderRadius: "10px" }} />
                                        </Form.Group>
                                    </Row>
                                    <Row style={{ margin: "0% 0% 3% 0%" }} >


                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>PRIVATE KEY</Form.Label>
                                            <Form.Control as="textarea" value={this.state.priv_key} rows={5} style={{ borderRadius: "10px" }} />
                                        </Form.Group>


                                    </Row>
                                    <div style={{ position: "absolute", marginLeft: "62%" }}>
                                        <Button style={{ borderRadius: "5px", borderColor: "#AD00FF", color: "#AD00FF" }} variant="light" className="mr-3" onClick={this.dashboard}>Dashboard</Button>
                                        <Button style={{ background: "linear-gradient(91.97deg, #00B3DB -3.9%, rgba(115, 103, 255, 0.63) 52.76%, rgba(173, 0, 255, 0.5) 107.11%)", borderRadius: "5px", color: "white" }} variant="light" type="button" onClick={this.generate_key}>
                                            Generate Keys
                                        </Button>
                                    </div>
                                </Col>

                                <Col xs={4}>
                                    <img src={key} width="429px" height="690pxpx" alt="" />
                                </Col>
                            </Row>
                        </div>
                        :
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
                                                <Alert variant={"danger"} style={{ marginLeft: "15%" }}>
                                                    Invalid Credentials
                                                </Alert>
                                                :
                                                <></>
                                            }
                                        </Row>
                                        <Row style={{ marginLeft: "5%", padding: "5%" }}>

                                            <Form>
                                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                                    <Col >
                                                        <Form.Control type="text" name="name" value={this.state.name} placeholder="Name as per Voter Card" onChange={event => this.setState({ name: event.target.value })} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                                    <Col >
                                                        <Form.Control type="text" name="id" value={this.state.id} placeholder="Voter ID" onChange={event => this.setState({ id: event.target.value })} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3">
                                                    <Col >
                                                        <Button style={{ position: "absolute", width: "90%", background: "linear-gradient(91.97deg, #00B3DB -3.9%, rgba(115, 103, 255, 0.63) 52.76%, rgba(173, 0, 255, 0.5) 107.11%)", borderRadius: "5px", color: "white" }} variant="light" type="button" onClick={this.login}>
                                                            Login
                                                        </Button>
                                                    </Col>
                                                </Form.Group>
                                            </Form>
                                        </Row>
                                    </Row>
                                </Col>
                                <Col>
                                    <img src={img} alt="" width="100%" />
                                </Col>
                            </Row>
                        </div>
                }


            </div>
        )
    }
}

export default Voter;