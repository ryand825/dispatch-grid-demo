import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import axios from "axios";

import "./App.css";
import ViewSheet from "./components/ViewSheet";

class App extends Component {
  state = {
    test: { data: [] }
  };

  // componentDidMount() {
  //   axios("/api/test/list-sheets").then(res => {
  //     console.log(res.data);
  //     this.setState({ test: res.data });
  //   });
  // }

  render() {
    // const { data } = this.state.test;

    // if (data.length === 0) {
    //   return <div>Loading...</div>;
    // }

    return (
      <div className="App">
        <Link to="/sheet/8964692619093892">FM Dispatch View</Link>
        <Router>
          <ViewSheet path={"/sheet/:id"} />
        </Router>
      </div>
    );
  }
}

export default App;
