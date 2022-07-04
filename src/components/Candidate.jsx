import { Component } from "react";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";
import election from '../election'
import web3 from '../web3'
import side from '../images/side.png'

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
        console.log(this.state);
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();

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
                    <Col xs={2} style={{ padding: "0% 0%", fontWeight: "bold" }}>
                        <AdminNavbar />
                    </Col>
                    <Col xs={10} >
                        {this.state.flag ?
                            <Row style={{margin:"0% 5% 0% 5%",boxShadow: "5px 10px 20px", borderRadius: "10px"}}>

                                <Col xs={7} style={{paddingTop: "15%", textAlign: "center" }}>
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

                                        <div style={{ position: "absolute", marginLeft: "70%" }}>
                                            <Button style={{ background: "linear-gradient(91.97deg, #00B3DB -3.9%, rgba(115, 103, 255, 0.63) 52.76%, rgba(173, 0, 255, 0.5) 107.11%)", borderRadius: "5px", color: "white" }} variant="light" type="submit">
                                                Add Candidate
                                            </Button>
                                        </div>
                                    </Form>
                                </Col>

                                <Col xs={5}>
                                    <img src={side}  alt="" width="410px" height="500px"/>
                                </Col>
                            </Row>
                            :

                            <Col xs={12} >
                                <Container className="mt-3" style={{ overflowY: "scroll", height: "80vh" }}>
                                    <Table hover style={{ boxShadow: "5px 10px 20px" }}>
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
                                    <div style={{ position: "absolute", marginLeft: "80%" }}>
                                        <Button style={{ background: "linear-gradient(91.97deg, #00B3DB -3.9%, rgba(115, 103, 255, 0.63) 52.76%, rgba(173, 0, 255, 0.5) 107.11%)", borderRadius: "5px", color: "white" }} variant="light" type="button" onClick={this.submit}>
                                            Add Candidate
                                        </Button>
                                    </div>
                                </Container>
                            </Col>
                        }
                    </Col>
                </Row>
            </div >
        );
    }
}

export default Candidate;