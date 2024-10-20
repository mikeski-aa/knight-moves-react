import { expect, test, describe, vi, afterEach } from "vitest";
import { checkPrevMoves, initialize, knightMoves } from "../logic/main";
import { Children } from "react";

describe("Testing pervious moves", () => {
  // checking if moves are allowed
  const possibleMoves = [
    [1, 2],
    [0, 0],
  ];
  const invalidMoves = [[1, 2]];
  const smallVisitedMoves = [[0, 0]];
  const moveSetOne = [
    [3, 4],
    [5, 6],
    [9, 9],
    [1, 2],
  ];

  test("Checking for duplicate values - should return an array of [0, 0] since that was NOT visited before", () => {
    expect(checkPrevMoves(possibleMoves, invalidMoves)).toBeInstanceOf(Array);
    expect(checkPrevMoves(possibleMoves, invalidMoves)).toStrictEqual([[0, 0]]);
  });

  test("An empty array should be return -> no valid moves found", () => {
    expect(checkPrevMoves(possibleMoves, invalidMoves)).toBeInstanceOf(Array);
    expect(checkPrevMoves(possibleMoves, smallVisitedMoves)).toStrictEqual([]);
  });
});

describe("Knight moves recursive function test", () => {
  const targetOne = [0, 0];
  const queueOne = [{ value: [0, 0], parents: [], children: [] }];
  const queueTwo = [{ value: [2, 5], parents: [], children: [] }];
  const moveCount = 1;

  test("Target and queue values match. This should return an object. Children should be arrays", () => {
    expect(knightMoves(targetOne, moveCount, queueOne)).toBeInstanceOf(Object);
    expect(knightMoves(targetOne, moveCount, queueOne).movesCalculated).toBe(1);
    expect(knightMoves(targetOne, moveCount, queueOne).numberOfMoves).toBe(3);
    expect(
      knightMoves(targetOne, moveCount, queueOne).stepsTaken
    ).toBeInstanceOf(Array);
    expect(knightMoves(targetOne, moveCount, queueOne).queue).toBeInstanceOf(
      Array
    );
  });
});

const obj = {
  target: [0, 0],
  moveCount: 1,
  queue: [{ value: [0, 0], parents: [], children: [] }],
  knightMoves(
    target = obj.target,
    moveCount = obj.moveCount,
    queue = obj.queue
  ) {
    if (queue[0].value[0] === target[0] && queue[0].value[1] === target[1]) {
      queue[0].parents.push(target);
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

      addChildren(queue[0], tempValid);
      addParent(queue[0]);
      moveCount += 1;

      queue[0].children.forEach((element) => {
        queue.push(element);
      });

      queue.shift();

      return knightMoves(target, moveCount, queue);
    }
  },
};

describe("mock tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Spy function", () => {
    const spy = vi.spyOn(obj, "knightMoves");
    expect(spy.getMockName()).toEqual("knightMoves");
    expect(obj.knightMoves).toBe(1);
    expect(spy).toHaveBeenCalledTimes(2);

    // expect(knightMoves(targetOne, moveCount, queueTwo)).toBe(1);
  });
});
