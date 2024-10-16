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
    if (globalContext.activeStart) {
      globalContext.setStartCoord(props.item);
    } else if (globalContext.activeTarget) {
      globalContext.setEndCoord(props.item);
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

  return (
    <>
      <div
        className={`tile ${boxType} ${selectedBox} ${animateBox}`}
        onClick={handleBoxClick}
      >
        {selectedBox === "startLocation" ? "S" : undefined}
        {selectedBox === "endLocation" ? "E" : undefined}
      </div>
    </>
  );
}

export default IndividualTile;
