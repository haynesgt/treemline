// version 0.1.0 -- not efficient -- no tests / broken tests -- unstable

var treemline;

module.exports = treemline = {
  visit_STOP: "visit_STOP", // visit no more nodes and do not do postfn
  visit_SKIP: "visit_SKIP", // do not visit subtree and do not do postfn
  visit_CONTINUE: null, // falsy means visit subtree and do postfn
  visit: function(node, prefn, postfn, tree, path) {
    // untested
    // unsafe -- does not check cycles
    if (tree == undefined) tree = node;
    if (path == undefined) path = [];
    if (prefn) {
      var action = prefn(node, tree, path));
      if (action) {
        return action;
      }
    }
    for (var i in tree) {
      var action = treemline.visit(tree[i], prefn, postfn, tree, path.concat([i]));
      if (action === treemline.visit_STOP) {
        return treemline.visit_STOP;
      }
    }
    if (postfn) {
      var action = postfn(node, tree, path));
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
    var cylceFinder = (x) => {
      if (nodes.find(x)) return true;
      nodes.push(x);
    }
    return !!treemline.visit(cycleFinder);
  }
}
