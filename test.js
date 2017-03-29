let treemline = require("./index.js");

let testTree0 = {a: {b: 0, c: {d: 1}, e: 2, f: {g: 3, h: 4}}};
let testTreeOrder0 = [
  testTree0,
  testTree0.a,
  testTree0.a.b,
  testTree0.a.c,
  testTree0.a.c.d,
  testTree0.a.e,
  testTree0.a.f,
  testTree0.a.f.g,
  testTree0.a.f.h
];

describe("treemline", function() {
  describe("visit", function() {
    it("visits everything", function() {
      let nodes = [];
      let revNodes = [];
      treemline.visit(
          testTree0,
          function(tree) {
            nodes.push(tree);
          },
          function(tree) {
            revNodes.push(tree);
          });
      expect(nodes.slice().sort()).toEqual(testTreeOrder0.slice().sort());
      // expect(revNodes.reverse()).toEqual(testTreeOrder0);
    });
  });
});

/*
[ Object({ a: Object({ b: 0, c: Object({ d: 1 }), e: 2, f: Object({ g: 3, h: 4 }) }) }), Object({ b: 0, c: Object({ d: 1 }), e: 2, f: Object({ g: 3, h: 4 }) }), Object({ g: 3, h: 4 }), 4, 3, 2, Object({ d: 1 }), 1, 0 ]
[ Object({ a: Object({ b: 0, c: Object({ d: 1 }), e: 2, f: Object({ g: 3, h: 4 }) }) }), Object({ b: 0, c: Object({ d: 1 }), e: 2, f: Object({ g: 3, h: 4 }) }), 0, Object({ d: 1 }), 1, 2, Object({ g: 3, h: 4 }), 3, 4 ]

*/
