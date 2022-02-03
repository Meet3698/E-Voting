import axios from "axios";
import { Component } from "react";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";

class ManageVoter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            voters: [],
            flag : false,
            name : "",
            id : "",
            voted: false
        }
    }

    async componentDidMount() {

        axios.get('http://localhost:3001/getVoters').then((response) => {
            console.log(response.data);
            this.setState({
                voters: response.data
            })
        })
    }

    onSubmit = ()  =>{
        axios.post("http://localhost:3001/addVoter",this.state).then((response)=>{
            if(response.data === true){
                window.location.href = "/admin/dashboard"
            }
            else{
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
                    <Col xs={2} bg="dark" style={{ padding: "0% 0%", fontWeight: "bold", height: "100vh", backgroundColor: "#343b41" }}>
                        <AdminNavbar />
                    </Col>
                    {this.state.flag ? <Container style={{ padding: "4% 10%" }}>
                        <Card>
                            <Card.Body>
                                <Form onSubmit={this.onSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" name="name" value={this.state.name} onChange={event => this.setState({ name: event.target.value })} placeholder="Name of Voter" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" name="id" value={this.state.id} onChange={event => this.setState({ id: event.target.value })} placeholder="Voter ID" />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" >
                                        Add Voter
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
                                <Button variant="primary" onClick={this.submit} >
                                    Add Candidate
                                </Button>
                            </Col>
                        </Container>
                    }
                </Row>
            </div>
        )
    }
}

export default ManageVoter;