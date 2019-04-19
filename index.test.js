import test from "ava";
import freeze from "deep-freeze";

/**
 * Write a function to recursively update a given node and its children inside a tree structure.
 * We added tests to help you, run them by using `yarn test`.
 */
function updateTree(tree, id, values) {}

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
