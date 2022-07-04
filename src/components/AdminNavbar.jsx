import { Component } from "react";
import { ListGroup } from "react-bootstrap";
import dash from '../images/Combined-Shapedash.png'
import votes from '../images/Vector.png'
import candidates from '../images/3-Friends.png'
import voters from '../images/Combined-Shape.png'

class AdminNavbar extends Component {

    candidate = () => {
        window.location.href = '/admin/candidate'

    }

    voter = () => {
        window.location.href = '/admin/manageVoter'

    }

    dashboard = () => {
        window.location.href = '/admin/dashboard'

    }

    votes = () => {
        window.location.href = '/result'

    }

    render() {
        return (
            <div style={{margin:"5%"}}>
                <ListGroup variant="flush">
                    <ListGroup.Item variant="light" style={{ backgroundColor: "white", color: "#5065A8", height: "60px", border: "solid white 1px" }} onClick={this.dashboard}><img src={dash} alt="" />&nbsp;&nbsp;Dashboard</ListGroup.Item>
                    <ListGroup.Item variant="light" style={{ backgroundColor: "white", color: "#5065A8", height: "60px", border: "solid white 1px" }} onClick={this.candidate}><img src={candidates}  alt=""/>&nbsp;&nbsp;Candidates</ListGroup.Item>
                    <ListGroup.Item variant="light" style={{ backgroundColor: "white", color: "#5065A8", height: "60px", border: "solid white 1px" }} onClick={this.voter}><img src={voters} alt=""/>&nbsp;&nbsp;Voters</ListGroup.Item>
                    <ListGroup.Item variant="light" style={{ backgroundColor: "white", color: "#5065A8", height: "60px", border: "solid white 1px" }} onClick={this.votes}><img src={votes} alt=""/>&nbsp;&nbsp;Votes</ListGroup.Item>
                </ListGroup>
            </div>
        );
    }
}

export default AdminNavbar;