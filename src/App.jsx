import { useState, useContext, createContext } from "react";
import "./App.css";
import Chessboard from "./components/Chessboard";
import { initialize } from "./logic/main";

export const GlobalContext = createContext();

function App() {
  const [startCoord, setStartCoord] = useState();
  const [endCoord, setEndCoord] = useState();
  let sCoord = [0, 0];
  let tCoord = [0, 7];

  const handleGameStart = () => {
    initialize(sCoord, tCoord, sCoord);
  };

  return (
    <div className="mainContainer">
      <div className="heading">Knight moves</div>
      <div className="howto">Click on chessboard bla bla bla</div>
      <div className="coordSelected">
        <div className="startC">Starting: {startCoord}</div>
        <div className="startC">Ending: {endCoord}</div>
      </div>
      <button className="goGame" onClick={handleGameStart}>
        Start
      </button>
      <GlobalContext.Provider
        value={{ startCoord, setStartCoord, endCoord, setEndCoord }}
      >
        <div className="horse" draggable></div>
        <div className="gameboard">
          <Chessboard />
        </div>
        <div className="results"></div>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
