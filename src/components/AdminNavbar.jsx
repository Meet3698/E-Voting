import { Component } from "react";
import { ListGroup } from "react-bootstrap";

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
            <div>
                <ListGroup variant="flush">
                    <ListGroup.Item variant="dark" style={{ backgroundColor: "#343b41", color: "white", height: "60px", border: "solid #181c19 1px" }}>Profile</ListGroup.Item>
                    <ListGroup.Item variant="dark" style={{ backgroundColor: "#181c19", color: "#7d827e", height: "60px", border: "solid #181c19 1px" }}>Reports</ListGroup.Item>
                    <ListGroup.Item variant="dark" style={{ backgroundColor: "#343b41", color: "white", height: "60px", border: "solid #181c19 1px" }} onClick={this.dashboard}>Dashboard</ListGroup.Item>
                    <ListGroup.Item variant="dark" style={{ backgroundColor: "#343b41", color: "white", height: "60px", border: "solid #181c19 1px" }} onClick={this.votes}>Votes</ListGroup.Item>
                    <ListGroup.Item variant="dark" style={{ backgroundColor: "#181c19", color: "#7d827e", height: "60px", border: "solid #181c19 1px" }}>Manage</ListGroup.Item>
                    <ListGroup.Item variant="dark" style={{ backgroundColor: "#343b41", color: "white", height: "60px", border: "solid #181c19 1px" }} onClick={this.candidate}>Candidates</ListGroup.Item>
                    <ListGroup.Item variant="dark" style={{ backgroundColor: "#343b41", color: "white", height: "60px", border: "solid #181c19 1px" }} onClick={this.voter}>Voters</ListGroup.Item>
                    <ListGroup.Item variant="dark" style={{ backgroundColor: "#181c19", color: "#7d827e", height: "60px", border: "solid #181c19 1px" }}>Exit</ListGroup.Item>
                </ListGroup>
            </div>
        );
    }
}

export default AdminNavbar;