import React, {Component} from "react";
import Firebase from "firebase";
import firebaseConfig from "./myFirebaseConfig"

class PrivateContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dbData: [],
            textInputValue: ""
        };
        this.getMessagesFromDatabase = this.getMessagesFromDatabase.bind(this);
        this.convertUnixTimestamp = this.convertUnixTimestamp.bind(this);
        this.deleteEntry = this.deleteEntry.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTextSubmission = this.handleTextSubmission.bind(this);
    } // end constructor

    componentDidMount() {
        // as soon as the component mounts, get the most recent messages from the firebase database.
        this.getMessagesFromDatabase();
    }

    convertUnixTimestamp(timestamp) {
        return new Date(parseInt(timestamp)).toLocaleDateString("en-GB");
    }

    deleteEntry(timestamp) {
        let user = Firebase.auth().currentUser;
        let uid = user.uid;

        Firebase.database().ref(`posts/${uid}/${timestamp}`).remove();
    }

    handleTextChange(event) {
        this.setState({textInputValue: event.target.value});
    }

    handleTextSubmission(event) {
        event.preventDefault();
        let user = Firebase.auth().currentUser;
        let uid = user.uid;
        let currentTime = Date.now().toString();
        let toAdd = {}
        toAdd[currentTime] = this.state.textInputValue;

        this.setState({textInputValue: ""})
        Firebase.database().ref(`posts/${uid}/`).update(toAdd);
    }

    getMessagesFromDatabase() {
        let user = Firebase.auth().currentUser;
        let uid = user.uid;
        let ref = Firebase.database().ref("posts").child(uid);

        ref.on("value", (snapshot) => {
            // json array
            let msgData = snapshot.val();
            let newMessagesFromDB = [];

            // create a JSON object version of our object.
            for (let m in msgData) {
                let currObject = {
                    timestamp: m,
                    content: msgData[m]
                };
                newMessagesFromDB.push(currObject);// add it to our newStateMessages array.
            } // end for loop
            // set state = don't use concat.
            this.setState({ dbData: newMessagesFromDB });
        }); // end of the on method
    } // end of getMessagesFromDatabase()

    render() {
        return (
            <div className="PrivateContentDB">
                <h1>Private Content DB</h1>
                <p>Type something here and click the button to add it to the database</p>
                <form onSubmit={(e) => {this.handleTextSubmission(e)}}>
                    <textarea value={this.state.textInputValue} onChange={this.handleTextChange} />
                    <input type="submit" />
                </form>
                {this.state.dbData.length <= 0 && <p>There is nothing in the database.</p>}

                {this.state.dbData.length > 0 && (
                    <p>There are {this.state.dbData.length} objects in the DB posted by user {Firebase.auth().currentUser.uid}</p>
                )}

                <ul>
                    {this.state.dbData.map((data, index) => (
                        <li key={index}>
                            [{this.convertUnixTimestamp(data.timestamp)}]&nbsp;{data.content}
                            <button onClick={() => this.deleteEntry(data.timestamp)}>Delete this entry</button>
                        </li>
                    ))}
                </ul>
            </div>
        ); // end of return statement
    } // end of render function
} // end of class

export default PrivateContent;
