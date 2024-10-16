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
  const [testArray, setTestArray] = useState([]);
  const [running, setRunning] = useState(false);
  const [delay, setDelay] = useState(true);
  const [count, setCount] = useState(0);
  const [steps, setSteps] = useState([]);
  const [noOfMoves, setNoOfMoves] = useState(0);
  const letters = {
    0: "a",
    1: "b",
    2: "c",
    3: "d",
    4: "e",
    5: "f",
    6: "g",
    7: "h",
  };

  // it would be super cool if a brief animation played showing all moves that were tried!!!
  const handleGameStart = () => {
    if (!running) {
      setRunning(true);
      let result = initialize(startCoord, endCoord, startCoord);
      let fakeObject = {
        parents: result.stepsTaken,
      };
      let queue = result.queue;
      let index = 0;
      queue.push(fakeObject);
      setSteps(result.stepsTaken);
      // -1 because it counts initial location as move
      setNoOfMoves(result.numberOfMoves - 1);
      console.log(result.stepsTaken[1][0], result.stepsTaken[1][1]);

      // probably should refactor to take this out
      if (delay) {
        function recursivelyGoThroughArray() {
          setTestArray(queue[index].parents);

          index++;

          if (index < queue.length) {
            setTimeout(recursivelyGoThroughArray, 0);
          } else {
            return setRunning(false);
          }
        }

        recursivelyGoThroughArray();
      } else {
        function recursivelyGoThroughArrayNoDelay() {
          setTestArray(queue[index].parents);

          index++;

          if (index < queue.length) {
            recursivelyGoThroughArrayNoDelay();
          } else {
            return setRunning(false);
          }
        }

        recursivelyGoThroughArrayNoDelay();
      }
    } else {
      alert("already running!");
    }
  };

  const handleBoardReset = () => {
    if (!running) {
      setTestArray([0, 0]);
    } else {
      alert(
        "please wait for the current calculation to finish before resetting!"
      );
    }
  };

  const handleDelayToggle = () => {
    if (!running) {
      if (delay) {
        setDelay(false);
      } else {
        setDelay(true);
      }
    } else {
      return null;
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
      </div>
      <button className="startBtn" onClick={() => handleGameStart()}>
        Start
      </button>
      <div className="smallBtnDiv">
        <button className="startBtn" onClick={() => handleDelayToggle()}>
          {delay ? "Animation: ON" : "Animation: OFF"}
        </button>
      </div>

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
          count,
          setCount,
          running,
          handleBoardReset,
        }}
      >
        <div className="gameboard">
          <Chessboard />
        </div>
        <div className="results">
          {steps.length > 1 ? (
            <div className="shortestPath">
              Shortest path:{" "}
              {steps.map((item, index) => (
                <div key={index}>
                  {letters[item[1]]}
                  {item[0] + 1}
                </div>
              ))}
            </div>
          ) : null}

          <div className="stepsTaken">Moves made: {noOfMoves}</div>
        </div>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
