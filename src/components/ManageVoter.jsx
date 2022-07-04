import axios from "axios";
import { Component } from "react";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";
import side from '../images/side.png'

class ManageVoter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            voters: [],
            flag: false,
            name: "",
            id: "",
            voted: false,
            signature: "",
            public_key: ""
        }
    }

    async componentDidMount() {

        axios.get('http://localhost:3001/getVoters').then((response) => {
            this.setState({
                voters: response.data
            })
        })
    }

    onSubmit = () => {
        axios.post("http://localhost:3001/addVoter", this.state).then((response) => {
            if (response.data === true) {
                window.location.href = "/admin/dashboard"
            }
            else {
                alert(response.data)
            }
        })
    }

    submit = () => {
        this.setState({
            flag: true
        })

    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs={2} style={{ padding: "0% 0%", fontWeight: "bold" }}>
                        <AdminNavbar />
                    </Col>
                    <Col xs={10} >
                        {this.state.flag ?
                            <Row style={{ margin: "0% 5% 0% 5%", boxShadow: "5px 10px 20px", borderRadius: "10px" }}>

                                <Col xs={7} style={{ paddingTop: "15%", textAlign: "center" }}>

                                    <Form onSubmit={this.onSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text" name="name" value={this.state.name} onChange={event => this.setState({ name: event.target.value })} placeholder="Name of Voter" />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Control type="text" name="id" value={this.state.id} onChange={event => this.setState({ id: event.target.value })} placeholder="Voter ID" />
                                        </Form.Group>

                                        <div style={{ position: "absolute", marginLeft: "77%" }}>
                                            <Button style={{ background: "linear-gradient(91.97deg, #00B3DB -3.9%, rgba(115, 103, 255, 0.63) 52.76%, rgba(173, 0, 255, 0.5) 107.11%)", borderRadius: "5px", color: "white" }} variant="light" type="submit">
                                                Add Voter
                                            </Button>
                                        </div>
                                    </Form>
                                </Col>
                                <Col xs={5}>
                                    <img src={side} alt="" width="410px" height="500px" />
                                </Col>
                            </Row>
                            :
                            <Col xs={12} >
                                <Container className="mt-3" style={{ overflowY: "scroll", height: "80vh" }}>
                                    <Table hover style={{ boxShadow: "5px 10px 20px" }}>
                                        <thead >
                                            <tr >
                                                <th>Voter Name</th>
                                                <th>Voter ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.voters.map((voter) => (
                                                <tr>
                                                    <td>{voter.voter_name}</td>
                                                    <td>{voter.voter_id}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <div style={{ position: "absolute", marginLeft: "84%" }}>
                                        <Button style={{ background: "linear-gradient(91.97deg, #00B3DB -3.9%, rgba(115, 103, 255, 0.63) 52.76%, rgba(173, 0, 255, 0.5) 107.11%)", borderRadius: "5px", color: "white" }} variant="light" type="button" onClick={this.submit}>
                                            Add Voter
                                        </Button>
                                    </div>
                                </Container>
                            </Col>
                        }
                    </Col>

                </Row>
            </div>
        )
    }
}

export default ManageVoter;