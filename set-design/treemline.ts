export namespace treemline {
  export namespace describer {
    export interface PathLink {
      key: any;
      value: any;
    }
    // data about a node being visited
    export interface VisitMetadata {
      root: any;
      path: PathLink[];
    }
    export interface VisitorTreeDescriber {
      getChildren(node: any, metadata: VisitorMetadata);
    }
    export class Visitor {
      public visit(node: any, metadata?: VisitorMetadata) {
        var children = describer.getChildren(node);
        visitor.visitBefore(node);
        for (i in children) {
          _this.visit(children[i]);
        }
        visitor.visitAfter(node);
      }
    }
  }
}

