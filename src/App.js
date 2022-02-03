import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import Header from './components/Header'
import Admin from './components/Admin'
import AdminDashboard from './components/AdminDashboard'
import Candidate from './components/Candidate'
import ManageVoter from './components/ManageVoter';
import Voter from './components/Voter';
import VoterDashboard from './components/VoterDashboard';
import Result from './components/Result';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import AuthenticatedAdminRoute from './components/AuthenticationAdminRoute';

class App extends Component {
    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route exact path="/admin">
                        <Admin />
                    </Route>

                    <AuthenticatedAdminRoute exact path="/admin/dashboard">
                        <AdminDashboard />
                    </AuthenticatedAdminRoute>

                    <AuthenticatedAdminRoute exact path="/admin/candidate">
                        <Candidate />
                    </AuthenticatedAdminRoute>

                    <AuthenticatedAdminRoute exact path="/admin/manageVoter">
                        <ManageVoter />
                    </AuthenticatedAdminRoute>

                    <Route exact path="/voter">
                        <Voter />
                    </Route>

                    <AuthenticatedRoute exact path="/voter/dashboard">
                        <VoterDashboard />
                    </AuthenticatedRoute>

                    <Route exact path="/result">
                        <Result />
                    </Route>

                </Switch>
            </Router>
        );
    }
}

export default App;
