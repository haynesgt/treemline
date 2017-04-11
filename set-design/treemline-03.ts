export interface treemline {
  export class Treemline {

    constructor(
      private tree,
      private describer
    ) {
    }

    public setTree(tree) {
      this.tree = tree;
    }

    public setDescriber(describer) {
      this.describer = describer;
    }

    public visit(visitor) {
      this._visit(this.tree, visitor, [], null);
    }

    public findAll(condition) {
      var found = [];
      this.visit((node, path, tree, key) => {
        if (condition) {
          found.push(node);
        }
      });
    }

    private _visit(node, visitor, path, key) {
      visitor.visit(node, path, this.tree, key);
      if (visitor.getSkip && visitor.getSkip()) {
        visitor.clearSkip();
        return;
      }
      if (visitor.getContinue && !visitor.getContinue()) {
        return;
      }
      var children = this.describer.getChildren(node);
      for (i in children) {
        this._visit(children[i], visitor, path.concat([{key: key, value: node}]), this.tree, i);
        if (visitor.getContinue && !visitor.getContinue()) {
          return;
        }
      }
      visitor.visitAfter(node, path, this.tree, key);
    }
  }
}
