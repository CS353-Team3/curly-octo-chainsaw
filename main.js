
import "./styles.css";
import React, { Component } from "react";
// import about from "./about";
// import { render } from "react-dom";
import first from "../img/first.png";
// import deskimg from "../images/deskimg.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <h1>Online Diary</h1>
                    <h2>This is the home page</h2>

                    {/* <p id="pic"><img src = {deskimg}/></p> */}

                    <p id="picture">
                        <img src={first} alt="diaryEntry" />
                    </p>

                    {/* <div id="wrap"> */}
                    <button id="login" class="button">
                        {" "}
                        Login{" "}
                    </button>

                    <button id="register" class="button">
                        {" "}
                        Register{" "}
                    </button>

                    <button id="about" class="button">
                        {" "}
                        About{" "}
                    </button>
                </div>

                <div className="route">
                    <Link to="/about">About</Link>
                    <br />
                    <Link to="/about">Home</Link>
                    <br />
                    <Link to="/about">Registration</Link>
                </div>

                {/* <Switch>
          <Route path="/" exact-component={App} />
          <Route path="/about" exact-component={About} />
        </Switch> */}
            </Router>
        );
    }
}

export default App;
