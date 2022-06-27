import { Component } from "react";
import { Alert, Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import { Signature } from "starkbank-ecdsa";
import election from "../election";
import web3 from "../web3"
import axios from "axios";
import Cookies from 'universal-cookie';
import ellipticcurve from "starkbank-ecdsa";
import { confirmAlert } from 'react-confirm-alert';
import AuthenticationService from "./AuthenticationService";
var Ecdsa = ellipticcurve.Ecdsa;
var PrivateKey = ellipticcurve.PrivateKey;

class Result extends Component {

    constructor(props) {
        super(props);
        this.state = {
            votes: [],
            flag: false,
            address: "",
            vote: [],
            priv_key: "",
            pub_key: "",
            alert: false,
            data: false
        }
    }


    async componentDidMount() {
        if (AuthenticationService.isUserLoggedIn() === 2) {
            this.setState({
                data: true
            })

            const cookies = new Cookies()

            const voter_name = cookies.get('voter_name')
            const voter_id = cookies.get('voter_id')

            await axios.post('http://localhost:3001/getPublicKey', { name: voter_name, id: voter_id }).then(async (response) => {
                this.setState({
                    pub_key: response.data[0].public_key
                })
            })
        }

        const result = await election.methods.result().call();
        this.setState({
            votes: result
        })



        if (result.length === 0) {
            this.result()
        }
    }

    result = () => {
        confirmAlert({
            title: 'Nobody has voted yet',
            buttons: [
                {
                    label: 'Close',
                    onClick: () => window.location.href = "/"
                }
            ]
        });
    };

    verify = async () => {
        try {
            var privateKey = PrivateKey.fromPem(this.state.priv_key.toString())
            const publicKey = privateKey.publicKey()

            if (publicKey.toPem() === this.state.pub_key) {
                const accounts = await web3.eth.getAccounts()
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



                const cookies = new Cookies()

                const voter_name = cookies.get('voter_name')
                const voter_id = cookies.get('voter_id')


                let resopnse = await axios.post('http://localhost:3001/getSignature', { name: voter_name, id: voter_id })

                if (Ecdsa.verify(JSON.stringify(obj), Signature.fromDer(resopnse.data.signature), publicKey) === true) {
                    this.setState({
                        flag: true
                    })
                    this.view()
                }
            }
        } catch (error) {
            confirmAlert({
                title: 'You have entered wrong private key',
            });
        }


    }

    view = async () => {
        const accounts = await web3.eth.getAccounts()
        const result = await election.methods.verifyVote().call({
            from: accounts[0]
        })
        this.setState({
            vote: result,
            flag: true
        })
    }

    render() {

        return (
            <div>
                <Container className="mt-5">
                    <Row>
                        <Col xs={7}>
                            {this.state.flag ?
                                <Container >
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <th>Candidate ID</th>
                                                <th>Candidate Name</th>
                                                <th>Your Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{this.state.vote[0]}</td>
                                                <td>{this.state.vote[1]}</td>
                                                <td>{this.state.vote[2]}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Container>
                                :
                                <Container >
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <th>Candidate ID</th>
                                                <th>Candidate Name</th>
                                                <th>Voter Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.votes.map((vote) => (
                                                <tr>
                                                    <td>{vote.candidateId}</td>
                                                    <td>{vote.name}</td>
                                                    <td>{vote.adr}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    {this.state.button ?
                                        <Button onClick={this.view}>View Your Vote</Button>
                                        :
                                        <></>
                                    }
                                </Container>
                            }

                        </Col>
                        {this.state.data ?
                            <Col className="ml-5">

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>PUBLIC KEY</Form.Label>
                                    <Form.Control disabled as="textarea" value={this.state.pub_key} rows={6} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>PRIVATE KEY</Form.Label>
                                    <Form.Control as="textarea" value={this.state.priv_key} rows={7} placeholder="Enter Your Private Key" onChange={event => this.setState({ priv_key: event.target.value })} />
                                </Form.Group>
                                <Button onClick={this.verify}>View Your Vote</Button>

                            </Col>
                            :
                            <></>
                        }

                    </Row>
                </Container>
                {/* <Container className="mt-5"> */}
                {/* {
                        this.state.flag ?
                            this.state.flag1 ?
                                <Container className="mt-5">
                                    {this.state.flag2 ?
                                        this.state.alert ?
                                            <Alert variant={"success"}>
                                                Your Vote is Signed and verified
                                            </Alert>
                                            :
                                            <Alert variant={"danger"}>
                                                Your Vote is not Signed or Private Key is not Correct
                                            </Alert>
                                        :
                                        <>
                                        </>
                                    }
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control as="textarea" value={this.state.priv_key} rows={6} placeholder="Enter Your Private Key" onChange={event => this.setState({ priv_key: event.target.value })} />
                                        </Form.Group>
                                        <Button onClick={this.verify}>Verify</Button>
                                    </Form>

                                </Container>
                                :
                                <Container className="mt-5">
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <th>Candidate ID</th>
                                                <th>Candidate Name</th>
                                                <th>Your Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{this.state.vote[0]}</td>
                                                <td>{this.state.vote[1]}</td>
                                                <td>{this.state.vote[2]}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Button onClick={() => this.setState({ flag1: true })}>Verify Your Vote</Button>
                                </Container>
                            :
                            <Container className="mt-5">
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Candidate ID</th>
                                            <th>Candidate Name</th>
                                            <th>Voter Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.votes.map((vote) => (
                                            <tr>
                                                <td>{vote.candidateId}</td>
                                                <td>{vote.name}</td>
                                                <td>{vote.adr}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                {this.state.button ?
                                    <Button onClick={this.view}>View Your Vote</Button>
                                    :
                                    <></>

                                }
                            </Container>
                    } */}

                {/* </Container> */}
            </div>
        )
    }
}

export default Result