import "../styles/chessboardcomponent.css";

function Chessboard() {
  const letterArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const numberArray = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="chessboardComponent">
      <div className="verticalNumber">
        {numberArray.map((item, index) => (
          <div key={index} className="numberBorderItem">
            {item}
          </div>
        ))}
      </div>
      <div className="horizontalDiv">
        <div className="horizontalLetter">
          {letterArray.map((item, index) => (
            <div key={index} className="numberBorderItem">
              {item}
            </div>
          ))}
        </div>
        <div className="gameBoardMain"></div>
        <div className="horizontalLetter">
          {letterArray.map((item, index) => (
            <div key={index} className="numberBorderItem">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="verticalNumber">
        {numberArray.map((item, index) => (
          <div key={index} className="numberBorderItem">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chessboard;
