import { newNode, addChildren, addParent } from "../logic/nodes";
import { expect, test, describe } from "vitest";

// testing possibleMoves

describe("Testing new node creation", () => {
  // min val test testing 0,0 coords
  test("input 1 should give empty children array, empty parents array and value 1 as an object", () => {
    expect(newNode(1).value).toBe(1);
    expect(newNode(1).parents).toBeInstanceOf(Array);
    expect(newNode(1).children).toBeInstanceOf(Array);
    expect(newNode(1).parents).toHaveLength(0);
    expect(newNode(1).children).toHaveLength(0);
  });

  test("Array input should return array and parent/children arrays of zero", () => {
    expect(newNode([1, 2]).value).toBeInstanceOf(Array);
    expect(newNode([1, 2]).value).toStrictEqual([1, 2]);
    expect(newNode(1).parents).toBeInstanceOf(Array);
    expect(newNode(1).children).toBeInstanceOf(Array);
    expect(newNode(1).parents).toHaveLength(0);
    expect(newNode(1).children).toHaveLength(0);
  });
});
