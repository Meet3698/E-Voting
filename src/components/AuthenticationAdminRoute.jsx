import React, { Component } from "react"
import AuthenticationService from "./AuthenticationService";
import { Route, Redirect } from "react-router-dom";

class AuthenticatedAdminRoute extends Component {

    render() {
        if (AuthenticationService.isAdminLoggedIn()) {
            return <Route {...this.props} />
        }
        else {
            return <Redirect to="/" />
        }
    }
}

export default AuthenticatedAdminRoute