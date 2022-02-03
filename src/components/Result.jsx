import { Component } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import election from "../election";

class Result extends Component {

    constructor(props) {
        super(props);
        this.state = {
            votes: [],
            flag: false,
            flag1: false,
            address: "",
            VOTE: []
        }
    }

    async componentDidMount() {
        const result = await election.methods.result().call();
        this.setState({
            votes: result
        })
    }

    submit = () => {
        this.setState({
            flag: true
        })
    }

    verify = async () => {
        const result = await election.methods.verifyVote(this.state.address).call()
        console.log(result);
        this.setState({
            vote: result,
            flag1 : true
        })
    }

    render() {
        return (
            <div>
                <Container className="mt-5">
                    {
                        this.state.flag ?
                            this.state.flag1 ?
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
                                </Container>
                                :
                                <Container className="mt-5">
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text" name="name" value={this.state.address} placeholder="Enter your wallet address" onChange={event => this.setState({ address: event.target.value })} />
                                        </Form.Group>

                                        <Button variant="primary" type="button" onClick={this.verify}>
                                            verify
                                        </Button>
                                    </Form>

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
                                <Button onClick={this.submit}>Verify Your Vote</Button>
                            </Container>
                    }

                </Container>
            </div>
        )
    }
}

export default Result