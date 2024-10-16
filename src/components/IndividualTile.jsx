import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../App";
import "../styles/individualtile.css";

function IndividualTile(props) {
  const globalContext = useContext(GlobalContext);
  const [selectedBox, setSelectedBox] = useState(undefined);
  const [animateBox, setAnimateBox] = useState(undefined);
  const hackarray = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  let stringSum = props.item[0] + props.item[1];
  let boxType = undefined;
  // scuffed logic
  if (props.item[0] != props.row) {
    return null;
  }

  // this might be a silly way of assignign black and white spaces, but it works!
  if (+stringSum % 2 === 0) {
    boxType = "odd";
  } else {
    boxType = "even";
  }

  const handleBoxClick = () => {
    if (!globalContext.running) {
      if (
        (globalContext.startCoord[0] === props.item[0] &&
          globalContext.startCoord[1] === props.item[1]) ||
        (globalContext.endCoord[0] === props.item[0] &&
          globalContext.endCoord[1] === props.item[1])
      ) {
        return null;
      } else {
        globalContext.handleBoardReset();
        if (globalContext.count % 2 === 0) {
          globalContext.setStartCoord(props.item);
          globalContext.setCount(globalContext.count + 1);
        } else {
          globalContext.setEndCoord(props.item);
          globalContext.setCount(globalContext.count + 1);
        }
      }
    }
  };

  useEffect(() => {
    if (
      globalContext.startCoord[0] === props.item[0] &&
      globalContext.startCoord[1] === props.item[1]
    ) {
      setSelectedBox("startLocation");
    } else if (
      globalContext.endCoord[0] === props.item[0] &&
      globalContext.endCoord[1] === props.item[1]
    ) {
      setSelectedBox("endLocation");
    } else {
      setSelectedBox(undefined);
    }
  }, [globalContext.startCoord, globalContext.endCoord]);

  useEffect(() => {
    for (let x = 0; x < globalContext.testArray.length; x++) {
      if (
        globalContext.testArray[x][0] === props.item[0] &&
        globalContext.testArray[x][1] === props.item[1]
      ) {
        return setAnimateBox(`animate ${hackarray[x]}`);
      } else {
        setAnimateBox("inactive");
      }
    }
  }, [globalContext.testArray]);

  const handleDragEnter = () => {
    globalContext.handleBoardReset();
    console.log(props.item, globalContext.dragItem);
    globalContext.setCurrentlyOver(props.item);
    if (globalContext.dragItem === "start") {
      setSelectedBox("startLocation");
      globalContext.setStartCoord(props.item);
    } else if (globalContext.dragItem === "end") {
      setSelectedBox("endLocation");
      globalContext.setEndCoord(props.item);
    }
  };

  const handleDragExit = (e) => {
    console.log("exitting now");
    e.preventDefault();
    setSelectedBox(undefined);
  };

  const handleDrop = () => {
    console.log(props.item);
    if (globalContext.dragItem === "start") {
      setSelectedBox("startLocation");
      globalContext.setStartCoord(props.item);
    } else if (globalContext.dragItem === "end") {
      setSelectedBox("endLocation");
      globalContext.setEndCoord(props.item);
    }
  };

  return (
    <>
      <div
        className={`tile ${boxType} ${selectedBox} ${animateBox}`}
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
        onDragLeave={(e) => handleDragExit(e)}
        onClick={handleBoxClick}
        onDragOver={(e) => e.preventDefault(e)}
      >
        {selectedBox === "startLocation" ? "S" : undefined}
        {selectedBox === "endLocation" ? "E" : undefined}
      </div>
    </>
  );
}

export default IndividualTile;
