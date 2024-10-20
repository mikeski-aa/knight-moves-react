import { possibleMoves, checkValidMoves, matchCheck } from "./moves";
import { expect, test, describe } from "vitest";

// testing possibleMoves

describe("Testing possible moves", () => {
  // min val test testing 0,0 coords
  test("x=0, y=0 gives array of possible moves", () => {
    expect(possibleMoves(0, 0)).toBeInstanceOf(Array);
  });

  // testing x less than 0
  test("x < 0, y = 0 gives array of possible moves", () => {
    expect(() => possibleMoves(-1, 0)).toThrowError();
  });

  // testing x > 7
  test(" x > 7, y = 0 gives array of possible moves", () => {
    expect(() => possibleMoves(8, 0)).toThrowError();
  });

  // testing y < 0
  test("x = 0, y<0 gives array of possible moves", () => {
    expect(() => possibleMoves(0, -5)).toThrowError();
  });

  // testing y > 7
  test("x = 7, y>7 gives array of possible moves", () => {
    expect(() => possibleMoves(0, 8)).toThrowError();
  });

  //testing x and y max value
  test("max val both", () => {
    expect(possibleMoves(7, 7)).toBeInstanceOf(Array);
  });

  //testing in range value
  test("max val both", () => {
    expect(possibleMoves(4, 6)).toBeInstanceOf(Array);
  });
});

// testing checkValidMoves

describe("testing checkValidMoves", () => {
  // array should be returned
  test("[0, 0]", () => {
    expect(checkValidMoves([[0, 0]])).toBeInstanceOf(Array);
    expect(checkValidMoves([[0, 0]])).toHaveLength(1);
  });

  // array should be returned, length = 1
  test("[7, 7]", () => {
    expect(checkValidMoves([[7, 7]])).toBeInstanceOf(Array);
    expect(checkValidMoves([[7, 7]])).toHaveLength(1);
  });

  // array should be returned length = 1
  test("[7, 7]", () => {
    expect(checkValidMoves([[4, 4]])).toBeInstanceOf(Array);
    expect(checkValidMoves([[4, 4]])).toHaveLength(1);
  });

  // min val test testing 0,0 coords - returns empty array
  test("[-1, -1]", () => {
    expect(checkValidMoves([[-1, -1]])).toBeInstanceOf(Array);
    expect(checkValidMoves([[-1, -1]])).toHaveLength(0);
  });

  // min val test testing 8,8 coords - returns empty array
  test("[8, 8]", () => {
    expect(checkValidMoves([[8, 8]])).toBeInstanceOf(Array);
    expect(checkValidMoves([[8, 8]])).toHaveLength(0);
  });

  // min val test testing 8,8 coords - returns array length 2
  test("array 2 length, valid", () => {
    expect(
      checkValidMoves([
        [5, 5],
        [2, 2],
      ])
    ).toBeInstanceOf(Array);
    expect(
      checkValidMoves([
        [5, 5],
        [2, 2],
      ])
    ).toHaveLength(2);
  });

  // min val test testing 8,8 coords - returns array length 2
  test("array 1 length, valid", () => {
    expect(
      checkValidMoves([
        [5, 5],
        [-2, 2],
      ])
    ).toBeInstanceOf(Array);
    expect(
      checkValidMoves([
        [5, 5],
        [-2, 2],
      ])
    ).toHaveLength(1);
  });
});

describe("Testing match check, returns true only on finding matching value", () => {
  const target = [2, 2];
  const currentMoves = [
    [2, 1],
    [0, 0],
    [-1, -1],
  ];
  const currentMovesValidMatch = [
    [2, 1],
    [0, 0],
    [-1, -1],
    [2, 2],
  ];

  test("no valid matches, should return undefined", () => {
    expect(matchCheck(target, currentMoves)).toBe(undefined);
  });

  test("valid match should return true", () => {
    expect(matchCheck(target, currentMovesValidMatch)).toBe(true);
  });
});
