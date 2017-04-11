# Treemline
Algorithms for Trees

These algorithms focus on flexibility and safety, less performance.

## On Cycles
While cycles cannot exist in trees by definition, there are many tree-like structures where we would like to use tree-based algorithms. For example, DOM nodes have references to their parent element, but DOM nodes are really trees. As well, there may be tree data structures that co-exist with non-tree structures. One example would be a program that has a hierarchical organization of variable declarations, but has assignments in one scope that reference variables declared in another.

To apply tree algorithms to such structures, we need mappings from 'tree-like' structure to 'tree' structure.

### The index solution to tree algorithms on tree-like graphs

Suppose we define a tree index for a tree-like graph, like so:

    type TreeIndex = {
        function getNode() => any;
        function getChildren() => TreeIndex[];
        function getRoot(): => TreeIndex;
    };

This structure forms a tree, where each element in the tree references an element in a non-tree object.
However, modifications to the `TreeIndex` do not modify the referenced graph.
To make this flexible, the `getChildren()` method can construct `TreeIndex` objects on-demand instead of all at the beginning.

### The describer solution to tree algorithms on tree-like graphs

Suppose we have a describer object, which can gives the keys and values of the children of a node at a given path.

    type Node = {
        [key: any]:  val: any;
    };
    type TreeDescriber = {
        function getChildren(node: any, path: Node[]) => Node;
    };

This provides a lot of flexibility. Unlike the 'index' solution, the 'describer' solution does not store an extra object that we need to take care of. 

### Other solutions

Perhaps there are hybrid solutions.
