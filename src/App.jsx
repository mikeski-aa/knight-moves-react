import { useState } from "react";
import "./App.css";
import Chessboard from "./components/Chessboard";

function App() {
  return (
    <div className="mainContainer">
      <div className="heading">Knight moves</div>
      <div className="howto">Click on chessboard bla bla bla</div>
      <div className="horse" draggable></div>
      <div className="gameboard">
        <Chessboard />
      </div>
      <div className="results"></div>
    </div>
  );
}

export default App;
