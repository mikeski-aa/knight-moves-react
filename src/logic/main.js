import { possibleMoves, checkValidMoves } from "./moves";
import { newNode, addChildren, addParent } from "./nodes";
// function to check moves v.s parent moves aka inaccessible moves

function checkPrevMoves(inputValidMoves, visitedMoves) {
  for (let z of inputValidMoves) {
    for (let o of visitedMoves) {
      if (o[0] == z[0] && o[1] == z[1]) {
        console.log("Duplicate found!!");
        console.log(z);
        console.log(inputValidMoves.indexOf(z));
        let tempInd = inputValidMoves.indexOf(z);

        inputValidMoves.splice(tempInd, 1);
      }
    }
  }
  return inputValidMoves;
}

// main function utilizing BFS to find target
// do I need to remove moves? Not sure with BFS. It works with it, so we leave it in.

function knightMoves(target, moveCount, queue, sCoord, tCoord) {
  if (queue[0].value[0] === target[0] && queue[0].value[1] === target[1]) {
    // console.log("VALUE FOUND!!!!!");
    // console.log(`Start coordinates: ${sCoord}, target coordinate: ${tCoord}`);

    // console.log(`Found in ${queue[0].parents.length} moves`);
    // console.log("Steps taken: ");
    queue[0].parents.push(target);
    // console.log(queue[0].parents);
    console.log(moveCount);

    const returnObj = {
      queue: queue,
      stepsTaken: queue[0].parents,
      numberOfMoves: queue[0].parents.length,
      movesCalculated: moveCount,
    };
    return returnObj;
  } else {
    let tempMoves = possibleMoves(queue[0].value[0], queue[0].value[1]);
    let tempValid = checkValidMoves(tempMoves);

    tempValid = checkPrevMoves(tempValid, queue[0].parents);

    // console.log("Current Value is: ");
    // console.log(queue[0].value);
    // console.log("Current possible moves: ");
    // console.log(tempValid);

    addChildren(queue[0], tempValid);
    addParent(queue[0]);
    moveCount += 1;
    // console.log(`CURRENT MOVE COUNT IS ${moveCount}`);
    // console.log(queue[0]);
    queue[0].children.forEach((element) => {
      queue.push(element);
    });
    // console.log("queue is");
    // console.log(queue);
    queue.shift();
    // console.log("New queue is");
    // console.log(queue);

    return knightMoves(target, moveCount, queue);
  }
}

// initialize the first iteration of children and begin main function

function initialize(start, target) {
  // checking whether inputs are the same -> no moves requierd
  if (start[0] === target[0] && start[1] === target[1]) {
    return console.log("Start and target are the same!");
  }

  // checking whether inputs are valid - i.e within board range.
  possibleMoves(start[0], start[1]);
  possibleMoves(target[0], target[1]);

  let testRoot = newNode(start);
  // console.log(testRoot);
  let tar = target;
  let moveCount = 0;
  let tempMoves = possibleMoves(testRoot.value[0], testRoot.value[1]);
  let tempValid = checkValidMoves(tempMoves);
  // console.log(tempValid);

  addChildren(testRoot, tempValid);
  // console.log(addChildren(testRoot, tempValid));
  addParent(testRoot);

  let queue = [];

  testRoot.children.forEach((element) => {
    queue.push(element);
  });

  // console.log("queue is");
  // console.log(queue);

  return knightMoves(tar, 0, queue, start, target);
}

// let sCoord = [0, 0];
// let tCoord = [0, 7];

// initialize(sCoord, tCoord, sCoord);

export { initialize, knightMoves, checkPrevMoves };
