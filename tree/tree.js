class Tree {
  constructor () {
    this.state = {
      root: null
    }
  }

  setState (nextState, callback) {
    Object.assign(this.state, nextState)
    callback && callback()
  }

  add (data, parentNode) {
    return new Promise((resolve, reject) => {
      const node = new Tree.Node(data)
      const parent = parentNode ? this.findNode(parentNode) : null

      if (parent) {
        parent.children.push(node)
        resolve(node)
      } else {
        if (!this.state.root) {
          this.setState(
            {
              root: node
            },
            () => {
              resolve(node)
            }
          )
        } else {
          return reject(new Error('Cannot have multiple root nodes'))
        }
      }
    })
  }

  remove (node) {
    return new Promise(resolve => {
      if (node === this.state.root) {
        this.setState(
          {
            root: null
          },
          resolve
        )
      } else {
        const queue = [this.state.root]

        while (queue.length) {
          const current = queue.shift()
          for (let i = 0; i < current.children.length; i += 1) {
            if (node === current.children[i]) {
              current.children.splice(i, 1)
            } else {
              queue.push(current.children[i])
            }
          }
        }

        resolve()
      }
    })
  }

  // [] // last in, first out (LIFO)
  // -> [1]
  // -> [2, 1]
  // -> [3, 2, 1]
  // 3 <- [2, 1]
  // 2 <- [1]
  // 1 <- []

  // []   // first in, first out (FIFO)
  // -> [1]
  // -> [2, 1]
  // -> [3, 2, 1]
  // 1 <- [3, 2]
  // 2 <- [3]
  // 3 <- []


  findNode (node) {
    const queue = [this.state.root]

    while (queue.length) {
      const current = queue.shift()

      if (current === node) {
        return current
      } else {
        for (let i = 0; i < current.children.length; i += 1) {
          queue.push(current.children[i])
        }
      }
    }

    return null
  }

  dump () {
    const display = []

    const visitor = node => `${JSON.stringify(node.data)}`

    const walk = () => {
      const queue = [this.state.root]

      while (queue.length) {
        const node = queue.shift()

        display.push(visitor(node))

        for (let i = 0; i < node.children.length; i += 1) {
          queue.push(node.children[i])
        }
      }
    }

    walk()

    return display.join('\n')
  }
}

Tree.Node = class {
  constructor (data) {
    this.data = data
    this.children = []
  }
}

const test = () => {
  const tree = new Tree()

  tree.add('root')
    .then(root => {
      tree.add('child', root)
        .then(child => {
          console.log(tree.dump())
          console.log(JSON.stringify(tree, null, 2))

          tree.add('child2', root)
            .then(child2 => {
              console.log(JSON.stringify(tree, null, 2))
              tree.remove(child)
                .then(() => {
                  console.log(JSON.stringify(tree, null, 2))
                })
            })
        })
    })
}

module.exports = Tree
module.exports.test = test

test()
