// version 0.1.0 -- not efficient -- no tests

var treemline;

module.exports = treemline = {
  visit: function(tree, prefn, postfn) {
    // untested
    // unsafe -- does not check cycles
    if (prefn) {
      // return true to stop
      if (prefn(tree)) {
        return true;
      }
    }
    for (var i in tree) {
      if (treemline.visit(tree[i], prefn, postfn)) {
        return true;
      }
    }
    if (postfn) {
      if (postfn(tree)) {
        return true;
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
