import { useState, useContext, createContext, useEffect } from "react";
import "./App.css";
import Chessboard from "./components/Chessboard";
import { initialize } from "./logic/main";

export const GlobalContext = createContext();

function delay(i) {
  setTimeout(() => {
    console.log("hello");
  }, 5000);
}

var array = [1, 2, 3, 4, 5];

function App() {
  const [startCoord, setStartCoord] = useState([0, 0]);
  const [endCoord, setEndCoord] = useState([7, 7]);
  const [activeStart, setActiveStart] = useState(false);
  const [activeTarget, setActiveTarget] = useState(false);
  const [startText, setStartText] = useState("Set start coord");
  const [endText, setEndText] = useState("Set end coord");
  const [animateArray, setAnimateArray] = useState([]);
  const [testArray, setTestArray] = useState([]);

  // it would be super cool if a brief animation played showing all moves that were tried!!!
  const handleGameStart = () => {
    let result = initialize(startCoord, endCoord, startCoord);
    console.log(result);

    console.log(result.queue);
    setAnimateArray(result.queue);
    // setAnimateArray(result.queue[5].parents);
    // for (let x = 0; x < result.queue.length; x++) {
    //   console.log(result.queue[5].parents);
    // }

    // for (let x = 0; x < result.queue.length; x++) {
    //   delay();
    // }

    for (let i = 0; i < array.length; i++) {
      setTimeout(() => {
        console.log(array[i]);
      }, 1000);
    }
  };

  // useEffect(() => {
  //   for (let x = 0; x < animateArray.length; x++) {
  //     setInterval(() => {
  //       setTestArray(animateArray[x].parents);
  //     }, 5000);
  //   }
  // }, [animateArray]);

  const handleStartClick = () => {
    if (activeTarget) {
      return null;
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
      return null;
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
