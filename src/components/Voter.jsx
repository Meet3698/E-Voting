import axios from "axios";
import { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Cookies from 'universal-cookie';
import AuthenticationService from "./AuthenticationService";

class Voter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            id: "",
        }
    }

    login = () => {
        axios.post('http://localhost:3001/voterLogin', this.state).then((response) => {
            if (response.data.voted === true) {
                AuthenticationService.setSession(this.state.name,this.state.id)
                window.location.href = '/result'
            }
            else if (response) {
                const cookies = new Cookies();
                cookies.set('voter_name', response.data.voter_name, { path: '/voter' })
                cookies.set('voter_id', response.data.voter_id, { path: '/voter' })

                window.location.href = '/voter/dashboard'

            } else {
                alert("Invalid Credentials")
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    render() {
        return (
            <div>
                <Container style={{ padding: "8% 30%" }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" name="name" value={this.state.name} placeholder="Enter Name as per Voter Card" onChange={event => this.setState({ name: event.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control type="text" name="id" value={this.state.id} placeholder="Enter Voter ID" onChange={event => this.setState({ id: event.target.value })} />
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={this.login}>
                            Login
                        </Button>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default Voter;