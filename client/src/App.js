import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import axios from "axios";

import ViewSheet from "./components/ViewSheet";

class App extends Component {
  state = {
    test: { data: [] }
  };

  componentDidMount() {
    axios("/api/test/list-sheets").then(res => {
      console.log(res.data);
      this.setState({ test: res.data });
    });
  }

  render() {
    const { data } = this.state.test;

    if (data.length === 0) {
      return <div>Loading...</div>;
    }

    const sheetList = data.map((sheet, key) => {
      return (
        <>
          <Link key={key} to={`/sheet/${sheet.id}`}>
            {sheet.name}
          </Link>
          <br />
        </>
      );
    });

    return (
      <div className="App">
        {sheetList}
        <Router>
          <ViewSheet path={"/sheet/:id"} />
        </Router>
      </div>
    );
  }
}

export default App;
