import IndividualBox from "./IndividualBox";

function TestBoard(props) {
  return (
    <>
      <div className="testBoard">
        <div className="row 0">
          {props.board.map((item, index) => (
            <IndividualBox key={index} item={item} row={0} />
          ))}
        </div>
        <div className="row 1">
          {props.board.map((item, index) => (
            <IndividualBox key={index} item={item} row={1} />
          ))}
        </div>
        <div className="row 2">
          {props.board.map((item, index) => (
            <IndividualBox key={index} item={item} row={2} />
          ))}
        </div>
        <div className="row 3">
          {props.board.map((item, index) => (
            <IndividualBox key={index} item={item} row={3} />
          ))}
        </div>
        <div className="row 4">
          {props.board.map((item, index) => (
            <IndividualBox key={index} item={item} row={4} />
          ))}
        </div>
        <div className="row 5">
          {" "}
          {props.board.map((item, index) => (
            <IndividualBox key={index} item={item} row={5} />
          ))}
        </div>
        <div className="row 6">
          {" "}
          {props.board.map((item, index) => (
            <IndividualBox key={index} item={item} row={6} />
          ))}
        </div>
        <div className="row 7">
          {" "}
          {props.board.map((item, index) => (
            <IndividualBox key={index} item={item} row={7} />
          ))}
        </div>
      </div>
    </>
  );
}

export default TestBoard;
