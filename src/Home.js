import React, {Component} from "react";
import Firebase from "firebase";
import Logon from "./Logon";
import Logout from "./Logout";
import PrivateContent from "./PrivateContent";

class Home extends Component {
    render() {
        return (
            <div className="container-fluid">
                {Firebase.auth().currentUser && (
                    <i>Logged on as {Firebase.auth().currentUser.email}</i>
                )}
                {Firebase.auth().currentUser && <PrivateContent />}
                {!Firebase.auth().currentUser && <Logon />}
                {Firebase.auth().currentUser && <Logout />}
            </div>
        );
    }
}

export default Home;
