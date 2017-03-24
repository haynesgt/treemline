// version 0.1.0 -- not efficient -- no tests

var treemline;

module.exports = treemline = {
  visit: function(tree, prefn, postfn) {
    // untested
    // unsafe -- does not check cycles
    if (prefn) {
      prefn(tree);
    }
    for (i in tree) {
      treemline.visit(tree[i], prefn, postfn);
    }
    if (postfn) {
      postfn(tree);
    }
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
          for (i in _tree) {
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
          for (i in _tree) {
            _tree[i] = mapper(_tree[i]);
          }
        }
    });
  }
}
