import React, { Component } from "react";
import Firebase from "firebase";
import './App.css';
import NavBar from "./NavBar";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null
        };
    }

    componentDidMount() {
        Firebase.auth().onAuthStateChanged((user) => {
            user
                ? this.setState(() => ({
                    authenticated: true,
                    currentUser: user
                }))
                : this.setState(() => ({
                    authenticated: false,
                    user: null
                }));
        });
    }

    render() {
    return (
        <div className="NavigationApp">
            {<NavBar />}
            {/*<h1>My App's Control Page</h1>
            <hr />
            {this.state.currentUser !== null && (
                <i>Logged on as {this.state.currentUser.email}</i>
            )}
            {this.state.authenticated && <PrivateContent />}
            {!this.state.authenticated && <Logon />}
            {this.state.authenticated && <Logout />}
            {!this.state.authenticated && <Register2 />}

            <p>
            This is my application which implements authentication via Firebase.
            </p>*/}
        </div>
    );
  }
}

export default App;
