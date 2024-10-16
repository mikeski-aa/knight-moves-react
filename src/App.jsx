import { useState } from "react";
import "./App.css";
import Chessboard from "./components/Chessboard";

function App() {
  // writing scrips here for now, will move out certain bits

  const generateBoard = () => {
    let array = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        array.push(`${i}${j}`);
      }
    }
    console.log(array);
    return array;
  };

  return (
    <div className="mainContainer">
      <div className="heading">Knight moves</div>
      <div className="howto">Click on chessboard bla bla bla</div>
      <div className="gameboard" onClick={generateBoard}>
        <Chessboard />
      </div>
      <div className="results"></div>
    </div>
  );
}

export default App;
