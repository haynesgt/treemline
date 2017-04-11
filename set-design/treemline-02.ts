export interface treemline {
  export function visit(node, visitor, describer, path?, tree?, key?) {
    if (!path) {
      path = [];
    }
    if (!tree) {
      tree = node;
    }
    visitor.visit(node, path, tree, key);
      if (visitor.getSkip && visitor.getSkip()) {
        visitor.clearSkip();
        return;
      }
      if (visitor.getContinue && !visitor.getContinue()) {
        return;
      }
    var children = describer.getChildren(tree);
    for (i in children) {
      visit(children[i], visitor, describer, path.concat([{key: key, value: node}]), tree, i);
      if (visitor.getContinue && !visitor.getContinue()) {
        return;
      }
    }
    visitor.visitAfter(node, path, tree, key);
  }
}
