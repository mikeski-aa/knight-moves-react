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
// struggling to see how you can test this without breaking my own brain

describe("mock tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Spy function", () => {
    const mockKnightMoves = vi.fn(knightMoves);
    const target = [3, 3];
    const moveCount = 0;
    const queue = [{ value: [0, 0], parents: [], children: [] }];
    console.log(mockKnightMoves.mock.calls);
    mockKnightMoves(target, moveCount, queue);

    expect(mockKnightMoves).toHaveBeenCalled();
    expect(mockKnightMoves.mock.calls.length).toBe(1);
  });
});
