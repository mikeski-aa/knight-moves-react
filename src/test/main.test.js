import { expect, test, describe } from "vitest";
import { checkPrevMoves, initialize, knightMoves } from "../logic/main";

describe("Testing pervious moves", () => {
  // checking if moves are allowed
  test("", () => {
    expect(checkPrevMoves([1, 2], [3, 4])).toBe(1);
  });

  // test("Array input should return array and parent/children arrays of zero", () => {

  // });
});
