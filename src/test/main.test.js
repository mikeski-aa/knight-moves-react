import { expect, test, describe, vi, afterEach } from "vitest";
import { checkPrevMoves, initialize, knightMoves } from "../logic/main";
import { Children } from "react";
import { checkValidMoves } from "../logic/moves";

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

// creating object to mock recursive function

// describe("mock tests", () => {
//   afterEach(() => {
//     vi.restoreAllMocks();
//   });

//   test("Spy function", () => {
//     const spy = vi.spyOn(obj, "knightMoves");
//     expect(spy.getMockName()).toEqual("knightMoves");
//     expect(obj.knightMoves).toEqual("knightMoves");
//     expect(spy).toHaveBeenCalledTimes(1);

//     // expect(knightMoves(targetOne, moveCount, queueTwo)).toBe(1);
//   });
// });
