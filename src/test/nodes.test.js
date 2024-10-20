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

describe("Testing adding children", () => {
  const inputParent = {
    value: [0, 0],
    children: [
      [1, 3],
      [1, 5],
    ],
    parents: [],
  };
  const inputVals = [[1, 2]];

  const simpleParent = {
    value: [0, 0],
    children: [],
    parents: [],
  };
  // this function should return an object
  test("children should be added to each children node of parent", () => {
    expect(addChildren(simpleParent, inputVals)).toBeInstanceOf(Object);
  });

  // the children object should be an array
  test("children should be an array", () => {
    expect(addChildren(simpleParent, inputVals).children).toBeInstanceOf(Array);
  });

  // the children value should equal input value
  test("children should be an array", () => {
    expect(
      addChildren(simpleParent, inputVals).children[0].value
    ).toStrictEqual([1, 2]);
  });
});
