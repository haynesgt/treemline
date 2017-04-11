export namespace treemline {
  
  export interface Visitor<M> {
    public function visitBefore(node: any, metadata: M);
    public function visitAfter(node: any, metadata: M);
  }
}

module.exports = {
  describer: new function() {
    var _this = this;
    this.visit = function(node, describer, visitor) {
      var children = describer.getChildren(node);
      visitor.visitBefore(node);
      for (i in children) {
        _this.visit(children[i]);
      }
      visitor.visitAfter(node);
    }
  },
  wrapper: new function() {
    var _this = this;
    this.visit = function(node, visitor) {
      var children = node.
    }
  }
}
