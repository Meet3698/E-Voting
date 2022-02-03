import axios from "axios";
import { Component } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import election from "../election";
import img from '../images/195-1953680_candidate-cartoon-hd-png-download.png'
import Cookies from 'universal-cookie';
import web3 from "../web3";

class VoterDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidates: []
        }
    }

    async componentDidMount() {
        const candidate = await election.methods.getCandidate().call()
        this.setState({
            candidates: candidate
        })
    }

    vote = async (id,name) => {
        const accounts = await web3.eth.getAccounts()
        console.log(id);
        await election.methods.vote(id,name).send({
            from : accounts[0]
        })

        const cookies = new Cookies()

        const voter_name = cookies.get('voter_name')
        const voter_id = cookies.get('voter_id')
        
        await axios.post('http://localhost:3001/voted',{voter_name,voter_id}).then((response)=>{
            if(response.data === true){
                window.location.href = "/result"
            }
        })
    }

    render() {
        return (
            <div>
                <Container className="mt-5">
                    <Row>
                        {
                            this.state.candidates.map((candidate) => (
                                <Col>
                                    <Card style={{ width: '18rem' }} className="mb-3 text-center">
                                        <Card.Img variant="top" src={img} />
                                        <Card.Body>
                                            <Card.Title>{candidate.name}</Card.Title>
                                            <Card.Text>{candidate.patryName}</Card.Text>
                                            <Button variant="primary" onClick={() => this.vote(candidate.id,candidate.name)}>Vote</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </div>
        )
    }
}

export default VoterDashboard;