import React from "react";
import ReactDOM from "react-dom";
import Table from "./table";

import "./style.css";

function App() {
  return (
    <div className="App">
      <div className="heading">Joke List</div>
      <Table />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
