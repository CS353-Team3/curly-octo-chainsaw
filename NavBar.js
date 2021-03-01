import React, {Component} from "react";
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import Home from './Home';
import Register2 from './Register2';
import Firebase from "firebase";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        Firebase.auth().signOut();
    }

    render() {
        return (
            <Router>
                <div className="NavBar">
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="/">Navbar</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                            {Firebase.auth().currentUser && <Nav.Link as={NavLink} onClick={() => {this.handleLogout()}} to="/">Logout</Nav.Link>}
                            {!Firebase.auth().currentUser && <>
                            <Nav.Link as={NavLink} to="/">Login</Nav.Link>
                            <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                            </>}
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-info">Search</Button>
                        </Form>
                    </Navbar>
                    <Route path="/" exact component={Home} />
                    <Route path="/register" exact component={Register2} />
                </div>
            </Router>
        )
    }
}

export default NavBar;