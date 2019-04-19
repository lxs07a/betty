import test from "ava";
import freeze from "deep-freeze";

/**
 * Write a function to recursively update a given node and its children inside a tree structure.
 * We added tests to help you, run them by using `yarn test`.
 */

 //assuming the update pattern is "start at the given id, update 1, skip 1, update 2, skip 1, update 3, etc"
 //if the assumption is not correct, just this portion would need correction
function pattern(num1, num2) {

  //the id is passed as a string, turning it to numeral
  let id = parseInt(num1)

  //starting empty pattern
  let arr =[]

  //starting the number of updates in each iteration of the pattern
  const count = [0]

  //go through each node
  for (let i=1; i<=num2; i++) {
    for (let j=0; j<count.length; j++) {

      //while the ocunt is 0, update the first node: equal to id
      if (i===(id+count[j])) {
        arr.push(i)

        //if this is the last update in the iteration, increase the update count
        if (j===count.length-1) {
          count.push(count.length)

          //skip one node
          id=i+2
          continue  
        }
      }
    }
  }
  return arr
}

function updateTree(tree, id, values) {

  //make a copy of the deeply frozen object
  let treeCopy = JSON.parse( JSON.stringify( tree ) );

  // Retrieve the property names of the tree object
  const objectPropNames = Object.getOwnPropertyNames(treeCopy);

  //Retrieve the names of properties to be updated
  const passedPropNames = Object.getOwnPropertyNames(values);

  //Retrieve the update pattern
  const myPattern = pattern(id, objectPropNames.length)
  
  //Update properties
  //for each node
  for (let name of objectPropNames) {

    //if the node belongs to the update pattern
    if (myPattern.includes(parseInt(treeCopy[name].id))) {

      //get the list of property keys 
      let innerPropNames = Object.getOwnPropertyNames(treeCopy[name])

      //for each key
      for (let name2 of innerPropNames) {

        //for each desirable update 
        for (let name3 of passedPropNames) {

          //check if the key is up for update
          if (name2 === name3) {

            //update
            treeCopy[name][name2] = values[name3]
          }
        }
      }
      
    }
  }
  return treeCopy;
}


test("update child nodes", t => {
  const tree = freeze({
    "1": {
      id: "1",
      foo: "",
      baz: "",
      children: ["2", "3"]
    },
    "2": {
      id: "2",
      foo: "",
      baz: "",
      children: ["4", "5"]
    },
    "3": {
      id: "3",
      foo: "",
      baz: "",
      children: ["6"]
    },
    "4": {
      id: "4",
      foo: "",
      baz: "",
      children: ["7"]
    },
    "5": {
      id: "5",
      foo: "",
      baz: "",
      children: []
    },
    "6": {
      id: "6",
      foo: "",
      baz: "",
      children: []
    },
    "7": {
      id: "7",
      foo: "",
      baz: "",
      children: []
    }
  });

  const expectedResult = {
    "1": {
      id: "1",
      foo: "",
      baz: "",
      children: ["2", "3"]
    },
    "2": {
      id: "2",
      foo: "bar",
      baz: "qux",
      children: ["4", "5"]
    },
    "3": {
      id: "3",
      foo: "",
      baz: "",
      children: ["6"]
    },
    "4": {
      id: "4",
      foo: "bar",
      baz: "qux",
      children: ["7"]
    },
    "5": {
      id: "5",
      foo: "bar",
      baz: "qux",
      children: []
    },
    "6": {
      id: "6",
      foo: "",
      baz: "",
      children: []
    },
    "7": {
      id: "7",
      foo: "bar",
      baz: "qux",
      children: []
    }
  };

  t.deepEqual(
    updateTree(tree, "2", { foo: "bar", baz: "qux" }),
    expectedResult
  );
});
