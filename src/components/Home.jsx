import { Component } from "react"
import { Card, Row, Col } from "react-bootstrap"
import img from '../images/business-executives-show-their-approval-by-raising-hands 1home.png'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    Admin = () => {
        window.location.href = '/admin'
    }

    voter = () => {
        window.location.href = '/voter'
    }

    render() {

        return (
            <div style={{margin:"0% 12% 0% 12%",padding:"0px"}}>
                <Row >
                    <Col>
                        <Card style={{ borderRadius: "16px",margin:"5%"}}>
                            <img src={img} alt="" style={{width:"100%"}} ></img>
                        </Card>
                    </Col>
                    <Col>
                        <Row style={{margin:"6%"}}>
                            <Card style={{padding: "12%", textAlign: "center", border: "1px solid", borderRadius: "16px", borderWidth: "2px", borderColor: "#5065A8" }} onClick={this.Admin}>
                                <Card.Body>
                                    <h1 style={{ fontWeight: "bold", color: "#5065A8" }}>Admin</h1>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row style={{margin:"6%"}}>
                            <Card style={{ padding: "12%", textAlign: "center", border: "1px solid", borderRadius: "16px", borderWidth: "2px", borderColor: "#5065A8", backgroundColor: "#5065A8" }} onClick={this.voter}>
                                <Card.Body>
                                    <h1 style={{ fontWeight: "bold", color: "white" }}>Voter</h1>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Home;