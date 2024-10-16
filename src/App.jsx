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
  const [testArray, setTestArray] = useState([]);
  const [disableStart, setDisableStart] = useState(false);

  // it would be super cool if a brief animation played showing all moves that were tried!!!
  const handleGameStart = () => {
    if (!disableStart) {
      setDisableStart(true);
      let result = initialize(startCoord, endCoord, startCoord);
      let fakeObject = {
        parents: result.stepsTaken,
      };
      let queue = result.queue;
      let index = 0;
      queue.push(fakeObject);
      console.log(result);
      console.log(fakeObject);
      console.log(result.queue);

      setActiveTarget(false);
      setStartText("Set start coord");
      setActiveStart(false);
      setEndText("Set end coord");

      // probably should refactor to take this out
      function recursivelyGoThroughArray() {
        setTestArray(queue[index].parents);

        index++;

        if (index < queue.length) {
          setTimeout(recursivelyGoThroughArray, 0);
        } else {
          setDisableStart(false);
        }
      }

      recursivelyGoThroughArray();
    } else {
      alert("already running!");
    }
  };

  const handleStartClick = () => {
    setTestArray([]);
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
    setTestArray([]);
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
      <div className="howto">
        Select starting and ending coordinates. Click either set start coord or
        set end coord and then pick the tile from the board. Once you are happy
        click start.
      </div>
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
      </div>
      <button className="startBtn" onClick={() => handleGameStart()}>
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
          testArray,
          setTestArray,
        }}
      >
        <div className="gameboard">
          <Chessboard />
        </div>
        <div className="results"></div>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
