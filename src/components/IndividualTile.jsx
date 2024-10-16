import { useContext } from "react";
import { GlobalContext } from "../App";

function IndividualTile(props) {
  const globalContext = useContext(GlobalContext);
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
    globalContext.setStartCoord(props.item);
  };

  return (
    <>
      <div className={`tile ${boxType}`} onClick={handleBoxClick}>
        {props.item}
      </div>
    </>
  );
}

export default IndividualTile;
