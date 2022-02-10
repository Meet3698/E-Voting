import { Component } from "react";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";
import election from '../election'
import web3 from '../web3'

class Candidate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            partyName: "",
            position: "",
            candidates: [],
            flag: false
        }
    }

    async componentDidMount() {
        const candidate = await election.methods.getCandidate().call()
        this.setState({
            candidates: candidate
        })
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);

        await election.methods.addCandidate(this.state.name, this.state.partyName, this.state.position).send({
            from: accounts[0]
        }).then(() => {
            window.location.href = '/admin/dashboard'
        })
    }

    submit = () => {
        this.setState({
            flag: true
        })

    }

    render() {
        return (
            <div >
                <Row>
                    <Col xs={2} bg="dark" style={{ padding: "0% 0%", fontWeight: "bold", height: "100vh", backgroundColor: "#343b41" }}>
                        <AdminNavbar />
                    </Col>
                    {this.state.flag ? <Container style={{ padding: "4% 10%" }}>
                        <Card>
                            <Card.Body>
                                <Form onSubmit={this.onSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" name="name" value={this.state.name} onChange={event => this.setState({ name: event.target.value })} placeholder="Name of Candidate" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" name="partyName" value={this.state.partyName} onChange={event => this.setState({ partyName: event.target.value })} placeholder="Party Name" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" name="position" value={this.state.position} onChange={event => this.setState({ position: event.target.value })} placeholder="Position" />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" >
                                        Add Candidate
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                        :
                        <Container style={{ padding: "3% 2%" }}>
                            <Col xs={10} >
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Candidate Name</th>
                                            <th>Party Name</th>
                                            <th>Position</th>
                                            <th>Vote Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.candidates.map((candidate) => (
                                            <tr>
                                                <td>{candidate.id}</td>
                                                <td>{candidate.name}</td>
                                                <td>{candidate.patryName}</td>
                                                <td>{candidate.position}</td>
                                                <td>{candidate.voteCount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Button variant="primary" onClick={this.submit} >
                                    Add Candidate
                                </Button>
                            </Col>
                        </Container>
                    }

                </Row>
            </div >
        );
    }
}

export default Candidate;