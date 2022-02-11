import React, { Component } from "react"
import AuthenticationService from "./AuthenticationService";
import { Route, Redirect } from "react-router-dom";

class AuthenticatedRoute extends Component {

    render() {
        if (AuthenticationService.isUserLoggedIn() === 1) {
            return <Route {...this.props} />
        }
        else if (AuthenticationService.isUserLoggedIn() === 2) {
            return <Redirect to="/result" />
        }
        else {
            return <Redirect to="/" />
        }
    }
}

export default AuthenticatedRoute