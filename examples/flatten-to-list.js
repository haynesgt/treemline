/*
 * Takes a data structure and prints out all fully qualified keys and values.
 */

var tl = require("../treemline");

var structure = {
  a: {
    b: {
      c: "hi",
      d: 2,
      e: 32
    },
    f: "F"
   },
   g: "G",
   h: {
     i: "I"
   }
};

console.log(
  tl.flatten(structure).map((node) => node.path.join(".") + ": " + JSON.stringify(node.node)).join("\n")
);
