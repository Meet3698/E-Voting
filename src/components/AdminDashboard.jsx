import axios from 'axios';
import { Component } from 'react'
import { Col, Row, Card, Container } from 'react-bootstrap';
import election from '../election';
import AdminNavbar from './AdminNavbar';

class AdminDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            positions: [],
            voters: [],
            voted: []
        }
    }

    async componentDidMount() {
        const candidate = await election.methods.getCandidate().call()
        this.setState({
            candidates: candidate
        })

        const position = await election.methods.getPositions().call()
        this.setState({
            positions: position
        })

        axios.get('http://localhost:3001/getVoters').then((response) => {
            this.setState({
                voters: response.data
            })
        })

        axios.get('http://localhost:3001/voterVoted').then((response) => {
            this.setState({
                voted: response.data
            })
        })
    }
    render() {
        return (
            <div>
                <Row>
                    <Col xs={2} bg="dark" style={{ padding: "0% 0%", fontWeight: "bold", height: "100vh", backgroundColor: "#343b41" }}>
                        <AdminNavbar />
                    </Col>

                    <Col xs={10}>
                        <Container>
                            <Row className="mt-3 mb-3">
                                <Col>
                                    <Card style={{ padding: "10% 10%", textAlign: "center", backgroundColor: "#181c19" }}>
                                        <Card.Body style={{ color: "white", textAlign: "left", paddingTop: "0%", paddingLeft: "2%" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "55px" }}>{this.state.positions.length}</p>
                                            <h5>No. of Positions</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card style={{ padding: "10% 10%", textAlign: "center", backgroundColor: "#343b41" }}>
                                        <Card.Body style={{ color: "white", textAlign: "left", paddingTop: "0%", paddingLeft: "2%" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "55px" }}>{this.state.candidates.length}</p>
                                            <h5>No. of Candidates</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Card style={{ padding: "10% 10%", textAlign: "center", backgroundColor: "#343b41" }}>
                                        <Card.Body style={{ color: "white", textAlign: "left", paddingTop: "0%", paddingLeft: "2%" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "55px" }}>{this.state.voters.length}</p>
                                            <h5>Total Voters</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card style={{ padding: "10% 10%", textAlign: "center", backgroundColor: "#181c19" }}>
                                        <Card.Body style={{ color: "white", textAlign: "left", paddingTop: "0%", paddingLeft: "2%" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "55px" }}>{this.state.voted.length}</p>
                                            <h5>Voters Voted</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Col>

                </Row>
            </div >
        );
    }
}

export default AdminDashboard;