// version 0.1.1 -- not efficient -- no tests / broken tests -- unstable -- no type safety

var treemline;

module.exports = treemline = {
  visit_STOP: "visit_STOP", // visit no more nodes and do not do postfn
  visit_SKIP: "visit_SKIP", // do not visit subtree and do not do postfn
  visit_CONTINUE: null, // falsy means visit subtree and do postfn
  visit: function(node, enterFn, exitFn, tree, path) {
    console.log("Visiting " + node);
    // untested
    // unsafe -- does not check cycles
    if (tree == undefined) tree = node;
    if (path == undefined) path = [];
    if (enterFn) {
      var action = enterFn(node, tree, path);
      if (action) {
        return action;
      }
    }
    if (typeof node !== "string") {
      for (var i in node) {
        var action = treemline.visit(
          node[i],
          enterFn,
          exitFn,
          tree,
          path.concat([i])
        );
        if (action === treemline.visit_STOP) {
          return treemline.visit_STOP;
        }
      }
    }
    if (exitFn) {
      var action = exitFn(node, tree, path);
      if (action) {
        return action;
      }
    }
    return false;
  },
  prune: function(tree, filter) {
    // removes subtrees where filter(tree) returns false
    // returns tree
    // untested
    // unsafe -- does not check cycles
    return treemline.visit(
      tree,
      function(_tree) {
        if (!filter(_tree)) {
          for (var i in _tree) {
            delete _tree[i];
          }
        }
    });
  },
  map: function(tree, mapper) {
    // replaces subtree with mapper(subtree)
    // returns tree
    // untested
    // unsafe -- does not check cycles
    return treemline.visit(
      tree,
      function(_tree) {
        if (!filter(_tree)) {
          for (var i in _tree) {
            _tree[i] = mapper(_tree[i]);
          }
        }
    });
  },
  hasCycle: function(tree) {
    // returns true if tree has a cylce, false otherwise
    var nodes = [];
    var cylceFinder = function(x) {
      if (nodes.find(x)) return true;
      nodes.push(x);
    };
    return !!treemline.visit(cycleFinder);
  },
  flatten: function(tree, config) {
    // converts all leafs to an array like [{path: [key list], leaf: any}, ...]
    if (!config) config = {};
    var flatTree = [];
    treemline.visit(tree, function(node, tree, path) {
      if (node == null ||
          Object.keys(node).length === 0 ||
          typeof node === "string"
      ) {
        flatTree.push({path: path, node: node});
      }
    });
    return flatTree;
  },
  deflatten: function(flatTree) {
    var tree = {};
    for (var i in flatTree) {
      var node = flatTree[i];
      var nodeJ = tree;
      for (var j in node.path) {
        if (nodeJ.j === undefined) {
          if (j === node.path.length - 1) {
            nodeJ.J = node;
          } else {
            nodeJ.j = {};
          }
        }
      }
    }
    return tree;
  }
};
