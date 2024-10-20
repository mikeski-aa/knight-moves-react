// this is where bulk of the game logic should live?

// create a node
// inputValue = coordinates we are moving to or starting at - i.e 0,0;
// parent value - if present - value of the parent node - maybe store as an array??
// children -

const newNode = (inputValue, parentValue, inputChildren) => {
  let value = inputValue;
  let parents = [];
  let children = [];

  return {
    value,
    parents,
    children,
  };
};

function addChildren(inputParent, inputVals) {
  for (let x of inputVals) {
    inputParent.children.push(newNode(x, inputParent.value));
  }

  // console.log(inputParent);
  return inputParent;
}

function addParent(inputParent) {
  for (let x of inputParent.children) {
    inputParent.parents.forEach((element) => {
      x.parents.push(element);
    });
    x.parents.push(inputParent.value);
  }

  return inputParent;
}

export { newNode, addChildren, addParent };

function test(inputVals) {
  for (let x of inputVals) {
    console.log(x);
  }
}
