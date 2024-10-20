// functions to deal with moves

// possible knight moves
// valid moves list kinda ugly, probably there is a better way of writing that code
// alternatively, validation check could be done here, but I want function to only do one thing

function possibleMoves(xInput, yInput) {
  if (xInput > 7 || xInput < 0 || yInput > 7 || yInput < 0) {
    throw new Error(
      "Invalid coordinate provided. Coordinates cannot be less than 0 or more than 7"
    );
  }

  let allMoves = [];
  allMoves.push([xInput + 1, yInput + 2]);
  allMoves.push([xInput + 1, yInput - 2]);
  allMoves.push([xInput - 1, yInput + 2]);
  allMoves.push([xInput - 1, yInput - 2]);

  allMoves.push([xInput + 2, yInput + 1]);
  allMoves.push([xInput + 2, yInput - 1]);
  allMoves.push([xInput - 2, yInput + 1]);
  allMoves.push([xInput - 2, yInput - 1]);

  return allMoves;
}

// check validity of potential moves

function checkValidMoves(array) {
  let validMoves = [];
  let reValidate = [];

  for (let x of array) {
    if (x[0] > 7 || x[0] < 0 || x[1] > 7 || x[1] < 0) {
      console.log("Ignoring invalid coordinate!");
    } else {
      validMoves.push(x);
    }
  }
  return validMoves;
}

// check for target match

function matchCheck(target, currentMoves) {
  for (let x of currentMoves) {
    if (target[0] == x[0] && target[1] == x[1]) {
      // console.log('target found ' + target);
      return true;
    }
  }
}

// testing
// checkValidMoves(possibleMoves(1,1));

export { possibleMoves, checkValidMoves, matchCheck };
