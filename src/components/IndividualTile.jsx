import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../App";
import "../styles/individualtile.css";

function IndividualTile(props) {
  const globalContext = useContext(GlobalContext);
  const [selectedBox, setSelectedBox] = useState(undefined);
  const [animateBox, setAnimateBox] = useState(undefined);
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

  // this useeffect should handle the "animation"
  // useEffect(() => {
  //   for (let x = 0; x < globalContext.animateArray.length; x++) {
  //     for (let y = 0; y < globalContext.animateArray[x].parents.length; y++) {
  //       if (
  //         globalContext.animateArray[x].parents[y][0] === props.item[0] &&
  //         globalContext.animateArray[x].parents[y][1] === props.item[1]
  //       ) {
  //         console.log("true detected");
  //         return setAnimateBox(`animate ${x}`);
  //       } else {
  //         setAnimateBox("inactive");
  //       }
  //     }
  //   }

  //   // for (let x = 0; x < globalContext.animateArray.length; x++) {
  //   //   if (
  //   //     globalContext.animateArray[x][0] === props.item[0] &&
  //   //     globalContext.animateArray[x][1] === props.item[1]
  //   //   ) {
  //   //     console.log("true detected");
  //   //     return setAnimateBox(`animate ${x}`);
  //   //   } else {
  //   //     setAnimateBox("inactive");
  //   //   }
  //   // }
  // }, [globalContext.animateArray]);

  useEffect(() => {
    console.log("testing timeout state setting");
  }, [globalContext.testArray]);

  return (
    <>
      <div
        className={`tile ${boxType} ${selectedBox} ${animateBox}`}
        onClick={handleBoxClick}
      >
        {props.item}
      </div>
    </>
  );
}

export default IndividualTile;
