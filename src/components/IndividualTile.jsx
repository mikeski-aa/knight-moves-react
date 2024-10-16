import { useContext, useState } from "react";
import { GlobalContext } from "../App";

function IndividualTile(props) {
  const globalContext = useContext(GlobalContext);
  const [selectedBox, setSelectedBox] = useState(undefined);
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

  useState(() => {
    if (globalContext.startCoord === props.item) {
      setSelectedBox("startLocation");
    } else if (globalContext.endCoord === props.item) {
      setSelectedBox("endLocation");
    }
  }, [globalContext.startCoord, globalContext.endCoord]);

  return (
    <>
      <div
        className={`tile ${boxType} ${selectedBox}`}
        onClick={handleBoxClick}
      >
        {props.item}
      </div>
    </>
  );
}

export default IndividualTile;
