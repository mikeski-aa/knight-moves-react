const generateBoardArray = () => {
  let array = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      array.push([i, j]);
    }
  }
  console.log(array);
  return array;
};

export default generateBoardArray;
