import TreeNode from './TreeNode.js';

const ErrorDuplicateKey =  new Error("duplicate key")
const ErrorKeyNoExist = new Error("key doesn't exist")
const ErrorNoRoot = new Error("no root")

// Right > 
// Left <
class Tree {
    root: TreeNode;
    _count: number;

    constructor() {
        this.root = null;
        this._count = 0;
    }

    count(): number {
        return this._count;
    }

    min(startingNode: TreeNode = this.root): TreeNode {
        if(!this.root) {
            return null;
        }

        let current = this.root;

        while(current) {
            if(current.left == null) {
                return current;
            }
            current = current.left;
        }
    }

    max(): TreeNode {
        if(!this.root) {
            return null;
        }

        let current = this.root;
        
        while(current) {
            if(current.right == null) {
                return current
            }

            current = current.right;
        }
    }

    insert(newKey: number, newValue: string) {
        this._count++;
        const newNode = new TreeNode(newKey, newValue)
        // If the root is nil set the root
        if(!this.root) {
            this.root = newNode;
            return this.root;
        }


       let current = this.root;
       while(current) {
            if(newKey === current.key) {
                return ErrorDuplicateKey;
            }

            if(newKey > current.key) {
                if(current.right === null) {
                    current.right = newNode;
                    return this;
                }
                current = current.right
                continue
            }

            if(newKey < current.key) {
                if(current.left === null) {
                    current.left = newNode;
                    return this;
                } 
                current = current.left
            }
       }
    }

    find(key: number): TreeNode {
        if(!this.root) {
            return null
        }

        let current = this.root;
        while(current) {
            if(current.key == key) {
                return current
            }

            if(key > current.key) {
                current = current.right
                continue;
            }

            if (key < current.key) {
                current = current.left
            }
        }

        return null;
    }

    remove(key: number): Tree {
        if (!this.root) {
            return null
        }

        let current = this.root;

        while(current) {
            // is leaf
            if(key === current.key) {
                if (!current.left && !current.right) {
                    console.log("is leaf")
                    current = null;
                    return this;
                }

                if(current.left === null) {
                    current = current.right;
                    return this;
                }

                if(current.right === null) {
                    current = current.left;
                    return this;
                }

                if(current.right && current.left) {
                    console.log("right and left")
                    current = this.min(current.right)
                    continue;
                }
            }

            if(key < current.key) {
                current = current.left;
            }

            if(key > current.key) {
                current = current.right;
            } 
        }

    } 

    dfsInOrder(): Array<number> {
        let nodesToVisit = [this.root];
        let visitedNodes = [];
        while(nodesToVisit.length > 0) {
            let current = nodesToVisit.pop()
            visitedNodes.push(current.key)
            if(current.left) {
                nodesToVisit.push(current.left)
            }
            if(current.right) {
                nodesToVisit.push(current.right)
            }
        }

        return visitedNodes;
    }

    isValidTree(): boolean {
        // Traverse Left
        let isValidLeft = true;
        
        let currentLeft = this.root;
        while(currentLeft) {
            if(currentLeft.left === null) {
                break;
            }
            if(currentLeft.left !== null) {
                // If the current node is less than the child node
                // Then we know that the tree is not valid because the child node 
                // should be greater than the current node because we're going right
                if(currentLeft.key < currentLeft.left.key) {
                    isValidLeft = false;
                }
                currentLeft = currentLeft.left;
            }
        }
        // Traverse Right
        let isValidRight = true;

        let currentRight = this.root;
        while(currentRight) {
            if(currentRight.right === null) {
                break;
            }

            if(currentRight.right !== null) {
                // If the current node is greater than the child node
                // Then we know that the tree is not valid because the child node 
                // should be greater than the current node because we're going right
                if(currentRight.key > currentRight.right.key) {
                    isValidRight = false;
                }
                currentRight = currentRight.right;
            }
        }

        return isValidLeft && isValidRight;
    }
}

export default Tree;