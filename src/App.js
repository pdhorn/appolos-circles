import React from "react";
import "./App.css";
import Board from "./Board.js";

function App() {
  return (
    <div>
      <div style={{ marginTop: "5px" }}>
        <div
          style={{
            position: "absolute",
            fontSize: "11px",
            color: "white",
          }}
        >
          <i className="far fa-arrow-alt-circle-left"> </i>
          <a
            href="https://piggygames.net"
            style={{ color: "#61dafb", marginLeft: "5px" }}
          >
            piggygames.net
          </a>
        </div>
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "calc(10px + 2vmin)",
            color: "white",
          }}
        >
          Plop Circles
        </div>
      </div>
      <div className="App-header">
        <Board id="Board" />
      </div>{" "}
    </div>
  );
}

export default App;
