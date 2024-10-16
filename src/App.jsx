import { useState, useContext, createContext, useEffect } from "react";
import "./App.css";
import Chessboard from "./components/Chessboard";
import { initialize } from "./logic/main";

export const GlobalContext = createContext();

function App() {
  const [startCoord, setStartCoord] = useState([0, 0]);
  const [endCoord, setEndCoord] = useState([7, 4]);
  const [activeStart, setActiveStart] = useState(false);
  const [activeTarget, setActiveTarget] = useState(false);
  const [startText, setStartText] = useState("Set start coord");
  const [endText, setEndText] = useState("Set end coord");
  const [animateArray, setAnimateArray] = useState([]);
  const [testArray, setTestArray] = useState([]);

  // it would be super cool if a brief animation played showing all moves that were tried!!!
  const handleGameStart = () => {
    let result = initialize(startCoord, endCoord, startCoord);
    let fakeObject = {
      parents: result.stepsTaken,
    };
    let queue = result.queue;
    queue.push(fakeObject);
    console.log(result);
    console.log(fakeObject);
    console.log(result.queue);
    setAnimateArray(queue);

    let index = 0;

    function recursivelyGoThroughArray() {
      setTestArray(queue[index].parents);

      index++;

      if (index < queue.length) {
        setTimeout(recursivelyGoThroughArray, 0);
      }
    }

    recursivelyGoThroughArray();
  };

  const handleStartClick = () => {
    if (activeTarget) {
      setActiveTarget(false);
      setStartText("Confirm coordinates");
      setActiveStart(true);
      setEndText("Set end coord");
    }

    if (!activeStart) {
      setStartText("Confirm coordinates");
      setActiveStart(true);
    } else {
      setActiveStart(false);
      setStartText("Set start coord");
    }
  };

  const handleEndClick = () => {
    if (activeStart) {
      setActiveStart(false);
      setStartText("Set start coord");
      setActiveTarget(true);
      setEndText("Confirm coordinates");
    }

    if (!activeTarget) {
      setEndText("Confirm coordinates");
      setActiveTarget(true);
    } else {
      setActiveTarget(false);
      setEndText("Set end coord");
    }
  };

  return (
    <div className="mainContainer">
      <div className="heading">Knight moves</div>
      <div className="howto">Click on chessboard bla bla bla</div>
      <div className="coordSelected">
        <div className="testStart">
          <div className="textCoord">Start coord:</div>{" "}
          <div className="coordDiv">
            [{startCoord[0]}, {startCoord[1]}]
          </div>
        </div>
        <div className="testEnd">
          <div className="textCoord">End coord:</div>
          <div className="coordDiv">
            {" "}
            [{endCoord[0]}, {endCoord[1]}]
          </div>
        </div>
        <button className="startSet" onClick={handleStartClick}>
          {startText}
        </button>
        <button className="endSet" onClick={handleEndClick}>
          {endText}
        </button>
        {/* <div className={`startC`}>
          <input placeholder="Starting coordinate" type="number"></input>
        </div>
        <div className={`startC`}>
          <input placeholder="Ending coordinate"></input>
        </div> */}
      </div>
      <button className="goGame" onClick={() => handleGameStart()}>
        Start
      </button>
      <GlobalContext.Provider
        value={{
          startCoord,
          setStartCoord,
          endCoord,
          setEndCoord,
          activeStart,
          setActiveStart,
          activeTarget,
          setActiveTarget,
          animateArray,
          setAnimateArray,
          testArray,
          setTestArray,
        }}
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
