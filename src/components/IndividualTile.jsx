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

  const handleDragEnter = (e) => {
    if (
      (props.item[0] === globalContext.startCoord[0] &&
        props.item[1] === globalContext.startCoord[1] &&
        globalContext.dragItem === "end") ||
      (props.item[0] === globalContext.endCoord[0] &&
        props.item[1] === globalContext.endCoord[1] &&
        globalContext.dragItem === "start")
    ) {
      console.log(
        "YOU ARE DRAGGIN " + globalContext.dragItem + " OVER " + selectedBox
      );
      if (globalContext.dragItem === "start") {
        globalContext.setStartCoord(globalContext.dragStartLocStart);
        globalContext.setEndCoord(globalContext.dragStartLocEnd);
      } else if (globalContext.dragItem === "end") {
        globalContext.setEndCoord(globalContext.dragStartLocEnd);
        globalContext.setStartCoord(globalContext.dragStartLocStart);
      }
      handleDragExit(e);
      return null;
    }

    console.log("WE PROCEED");
    console.log("starting location of drag: " + globalContext.dragStartLoc);
    console.log("current target " + props.item);
    console.log(
      "being draggon " + globalContext.dragItem + " OVER " + selectedBox
    );
    globalContext.handleBoardReset();
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
    e.preventDefault();
    setSelectedBox(undefined);
  };

  const handleDrop = (e) => {
    if (
      (props.item[0] === globalContext.startCoord[0] &&
        props.item[1] === globalContext.startCoord[1] &&
        globalContext.dragItem === "end") ||
      (props.item[0] === globalContext.endCoord[0] &&
        props.item[1] === globalContext.endCoord[1] &&
        globalContext.dragItem === "start")
    ) {
      console.log("DROP you are dragging over the thing!");
      console.log("dropped");
      if (globalContext.dragItem === "start") {
        globalContext.setStartCoord(globalContext.dragStartLocStart);
        globalContext.setEndCoord(globalContext.dragStartLocEnd);
      } else if (globalContext.dragItem === "end") {
        globalContext.setEndCoord(globalContext.dragStartLocEnd);
        globalContext.setStartCoord(globalContext.dragStartLocStart);
      }
      return null;
    }
    console.log(" WE PROCEED WITH DROP");
    if (globalContext.dragItem === "start") {
      if (globalContext.startCoord != props.item) {
        setSelectedBox("startLocation");
        globalContext.setStartCoord(props.item);
      }
    } else if (globalContext.dragItem === "end") {
      if (globalContext.endCoord != props.item) {
        setSelectedBox("endLocation");
        globalContext.setEndCoord(props.item);
      }
    }
  };

  const handleDragStart = (e) => {
    console.log(selectedBox);

    if (typeof selectedBox === "undefined") {
      return e.preventDefault();
    }

    if (selectedBox === "startLocation") {
      globalContext.setDragItem("start");
      globalContext.setDragStartLocStart(props.item);
      globalContext.setDragStartLocEnd(globalContext.endCoord);
    } else if (selectedBox === "endLocation") {
      globalContext.setDragItem("end");
      globalContext.setDragStartLocEnd(props.item);
      globalContext.setDragStartLocStart(globalContext.startCoord);
    }
  };

  return (
    <>
      <div
        className={`tile ${boxType} ${selectedBox} ${animateBox}`}
        onDragEnter={(e) => handleDragEnter(e)}
        onDrop={(e) => handleDrop(e)}
        onDragLeave={(e) => handleDragExit(e)}
        onClick={handleBoxClick}
        onDragOver={(e) => e.preventDefault(e)}
        draggable
        onDragStart={(e) => handleDragStart(e)}
      >
        {selectedBox === "startLocation" ? "S" : undefined}
        {selectedBox === "endLocation" ? "E" : undefined}
      </div>
    </>
  );
}

export default IndividualTile;
