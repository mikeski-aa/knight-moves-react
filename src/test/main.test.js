import { expect, test, describe } from "vitest";
import { checkPrevMoves, initialize, knightMoves } from "../logic/main";

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
