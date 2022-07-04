import axios from 'axios';
import { Component } from 'react'
import { Col, Row, Card, Container } from 'react-bootstrap';
import election from '../election';
import AdminNavbar from './AdminNavbar';
import Chart from 'react-apexcharts'
import pos from '../images/pos.svg'
import votes from '../images/Vector.svg'
import candidates from '../images/3-Friends.svg'
import voters from '../images/Voters.svg'

class AdminDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            positions: [],
            voters: [],
            voted: [],
            options: {
                chart: {
                    id: 'apexchart-example'
                },
                xaxis: {
                    categories: []
                }
            },
            series: [{
                name: 'VoteCount',
                data: []
            }]
        }
    }

    async componentDidMount() {
        const candidate = await election.methods.getCandidate().call()
        this.setState({
            candidates: candidate
        })


        const name = []
        const count = []
        for (let i = 0; i < candidate.length; i++) {
            name.push(candidate[i].name)
            count.push(candidate[i].voteCount)
        }

        this.setState({
            options: {
                chart: {
                    id: 'apexchart-example'
                },
                xaxis: {
                    categories: name
                }
            },
            series: [{
                name: 'VoteCount',
                data: count
            }]
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
                    <Col xs={2} style={{ padding: "0% 0%", fontWeight: "bold" }}>
                        <AdminNavbar />
                    </Col>

                    <Col xs={10}>
                        <Container>
                            <Row className="mt-3 mb-3">
                                <Col >
                                    <Card style={{ textAlign: "center", backgroundColor: "white", boxShadow: "5px 10px 15px" }}>
                                        <Card.Body style={{ color: "#5065A8", textAlign: "left" }}>
                                            <Row>
                                                <Col xs={9}>
                                                    <h5>No. of Positions </h5>
                                                    <h2 style={{ fontWeight: "bold" }}>{this.state.positions.length}</h2>
                                                </Col >
                                                <Col xs={3}>
                                                    <img src={pos} width="100%" alt=""/>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card style={{ textAlign: "center", backgroundColor: "white", boxShadow: "5px 10px 15px" }}>
                                        <Card.Body style={{ color: "#5065A8", textAlign: "left" }}>
                                            <Row>
                                                <Col xs={10}>
                                                    <h5>Total Candidates</h5>
                                                    <h2 style={{ fontWeight: "bold" }}>{this.state.candidates.length}</h2>
                                                </Col >
                                                <Col xs={2}>
                                                    <img src={candidates} width="250%" alt=""/>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card style={{ textAlign: "center", backgroundColor: "white", boxShadow: "5px 10px 15px" }}>
                                        <Card.Body style={{ color: "#5065A8", textAlign: "left" }}>
                                            <Row>
                                                <Col xs={9}>
                                                    <h5>Total Voters </h5>
                                                    <h2 style={{ fontWeight: "bold" }}>{this.state.voters.length}</h2>
                                                </Col >
                                                <Col xs={3}>
                                                    <img src={voters} width="100%" alt=""/>
                                                </Col>
                                            </Row>


                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card style={{ textAlign: "center", backgroundColor: "white", boxShadow: "5px 10px 15px" }}>
                                        <Card.Body style={{ color: "#5065A8", textAlign: "left" }}>
                                            <Row>
                                                <Col xs={9}>
                                                    <h5>Total Voted </h5>
                                                    <h2 style={{ fontWeight: "bold" }}>{this.state.voted.length}</h2>
                                                </Col >
                                                <Col xs={3}>
                                                    <img src={votes} width="100%" alt="" />
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="mt-3 mb-3">
                                <Col >
                                    <Card style={{ textAlign: "center", boxShadow: "5px 10px 15px" }}>
                                        <Chart options={this.state.options} series={this.state.series} type="bar" height={300} />
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