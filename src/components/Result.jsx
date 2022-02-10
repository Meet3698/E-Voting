import { Component } from "react";
import { Alert, Button, Container, Form, Table } from "react-bootstrap";
import { Signature } from "starkbank-ecdsa";
import election from "../election";
import web3 from "../web3"
import axios from "axios";
import Cookies from 'universal-cookie';
import ellipticcurve from "starkbank-ecdsa";

class Result extends Component {

    constructor(props) {
        super(props);
        this.state = {
            votes: [],
            flag: false,
            flag1: false,
            address: "",
            vote: [],
            priv_key: "",
            alert: false
        }
    }

    async componentDidMount() {
        const result = await election.methods.result().call();
        this.setState({
            votes: result
        })
    }

    verify = async () => {
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

        var Ecdsa = ellipticcurve.Ecdsa;
        var PrivateKey = ellipticcurve.PrivateKey;
        var privateKey = PrivateKey.fromPem(this.state.priv_key.toString())
        var publicKey = privateKey.publicKey()

        const cookies = new Cookies()

        const voter_name = cookies.get('voter_name')
        const voter_id = cookies.get('voter_id')


        let resopnse = await axios.post('http://localhost:3001/getSignature', { name: voter_name, id: voter_id })

        this.setState({
            alert : Ecdsa.verify(JSON.stringify(obj), Signature.fromDer(resopnse.data.signature), publicKey)
        })
    }

    view = async () => {
        const accounts = await web3.eth.getAccounts()
        const result = await election.methods.verifyVote().call({
            from: accounts[0]
        })
        console.log(result);
        this.setState({
            vote: result,
            flag: true
        })
    }

    render() {
        return (
            <div>
                <Container className="mt-5">
                    {
                        this.state.flag ?
                            this.state.flag1 ?
                                <Container>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control as="textarea" value={this.state.priv_key} rows={6} placeholder="Enter Your Private Key" onChange={event => this.setState({ priv_key: event.target.value })} />
                                        </Form.Group>
                                    </Form>
                                    {this.state.alert ?
                                        <Alert variant={"success"}>
                                            Your Vote is Signed
                                        </Alert>
                                        :
                                        <Button onClick={this.verify}>Verify</Button>
                                    }
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
                                <Button onClick={this.view}>View Your Vote</Button>
                            </Container>
                    }

                </Container>
            </div>
        )
    }
}

export default Result