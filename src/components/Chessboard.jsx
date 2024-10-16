import { useState } from "react";
import "../styles/chessboardcomponent.css";
import generateBoardArray from "../utils/genBoard";
import TestBoard from "./TestBoard";

function Chessboard() {
  const letterArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const numberArray = [1, 2, 3, 4, 5, 6, 7, 8];
  const [board, setBoard] = useState(generateBoardArray);

  return (
    <div className="chessboardComponent">
      <div className="verticalNumber">
        {numberArray.map((item, index) => (
          <div key={index} className="numberBorderItem">
            {item}
          </div>
        ))}
      </div>
      <div className="horizontalDiv">
        <div className="horizontalLetter">
          {letterArray.map((item, index) => (
            <div key={index} className="numberBorderItem">
              {item}
            </div>
          ))}
        </div>

        <TestBoard board={board} />

        <div className="horizontalLetter">
          {letterArray.map((item, index) => (
            <div key={index} className="numberBorderItem">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="verticalNumber">
        {numberArray.map((item, index) => (
          <div key={index} className="numberBorderItem">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chessboard;
