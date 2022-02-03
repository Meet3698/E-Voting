const { Component } = require("react");
const { Container, Card, Row, Col } = require("react-bootstrap")

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
            <div>
                <Row style={{ margin: "8%" }}>
                    <Col>
                        <Container>
                            <Card style={{ padding: "25%", textAlign: "center" }} onClick={this.Admin}>
                                <Card.Body>
                                    <h3>Admin</h3>
                                </Card.Body>
                            </Card>
                        </Container>
                    </Col>
                    <Col>
                        <Container>
                            <Card style={{ padding: "25%", textAlign: "center" }} onClick={this.voter}>
                                <Card.Body>
                                    <h3>Voter</h3>
                                </Card.Body>
                            </Card>
                        </Container>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default Home;