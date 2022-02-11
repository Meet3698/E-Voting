import axios from "axios";
import { Component } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import election from "../election";
import img from '../images/195-1953680_candidate-cartoon-hd-png-download.png'
import Cookies from 'universal-cookie';
import web3 from "../web3";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ellipticcurve from "starkbank-ecdsa";
import AuthenticationService from "./AuthenticationService";
var Ecdsa = ellipticcurve.Ecdsa;
var PrivateKey = ellipticcurve.PrivateKey;

class VoterDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            flag: false,
            id: "",
            name: "",
            priv_key: ""
        }
    }

    async componentDidMount() {

        const candidate = await election.methods.getCandidate().call()
        this.setState({
            candidates: candidate
        })
    }

    submit = (id, name) => {
        confirmAlert({
            title: 'Do you want to sign this vote?',
            // message: 'If yes',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.setState({ flag: true, id: id, name: name })
                },
                {
                    label: 'No',
                    onClick: () => this.vote(id, name)
                }
            ]
        });
    };

    signedVote = async () => {
        const accounts = await web3.eth.getAccounts()
        await election.methods.vote(this.state.id, this.state.name).send({
            from: accounts[0]
        })

        AuthenticationService.setUserVoted()
        const vote = await election.methods.verifyVote().call({
            from: accounts[0]
        })

        let obj = {
            "vote": [{
                "id": vote[0],
                "name": vote[1],
                "address": vote[2]
            }]
        }

        var privateKey = PrivateKey.fromPem(this.state.priv_key.toString())
        let signature = Ecdsa.sign(JSON.stringify(obj), privateKey);
        
        const cookies = new Cookies()

        const voter_name = cookies.get('voter_name')
        const voter_id = cookies.get('voter_id')

        await axios.post('http://localhost:3001/setSignature', { name: voter_name, id: voter_id, signature: signature.toDer() })

        await axios.post('http://localhost:3001/voted', { voter_name, voter_id }).then((response) => {
            if (response.data === true) {

                window.location.href = "/result"
            }
        })
    }

    vote = async (id, name) => {
        const accounts = await web3.eth.getAccounts()
        await election.methods.vote(id, name).send({
            from: accounts[0]
        })

        AuthenticationService.setUserVoted()
        
        const cookies = new Cookies()

        const voter_name = cookies.get('voter_name')
        const voter_id = cookies.get('voter_id')

        await axios.post('http://localhost:3001/voted', { voter_name, voter_id }).then((response) => {
            if (response.data === true) {

                window.location.href = "/result"
            }
        })
    }

    render() {
        return (
            <div>

                {
                    this.state.flag ?
                        <Container>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" value={this.state.priv_key} rows={6} placeholder="Enter Your Private Key" onChange={event => this.setState({ priv_key: event.target.value })} />
                                </Form.Group>
                            </Form>
                            <Button onClick={this.signedVote}>Sign Vote</Button>
                        </Container>

                        :
                        <Container className="mt-5">
                            <Row>

                                {this.state.candidates.map((candidate) => (
                                    <Col>
                                        <Card style={{ width: '18rem' }} className="mb-3 text-center">
                                            <Card.Img variant="top" src={img} />
                                            <Card.Body>
                                                <Card.Title>{candidate.name}</Card.Title>
                                                <Card.Text>{candidate.patryName}</Card.Text>
                                                <Button variant="primary" onClick={() => this.submit(candidate.id, candidate.name)}>Vote</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                                }
                            </Row>

                        </Container>
                }

            </div>
        )
    }
}

export default VoterDashboard;