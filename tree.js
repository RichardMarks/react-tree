const createTree = () => {
  const tree = {
    depth: 0,
    data: 'root',
    children: [],

    add (data, parent) {
      const target = parent || tree
      const depth = target.depth + 1

      target.children.push({ data, children: [], depth })
    },

    remove (data) {
      if (tree.data === data) {
        tree.children.length = []
      } else {
        const queue = [tree]

        while (queue.length) {
          const node = queue.shift()

          for (let i = 0; i < node.children.length; i += 1) {
            if (node.children[i].data === data) {
              node.children.splice(i, 1)
            } else {
              queue.push(node.children[i])
            }
          }
        }
      }
    },

    find (data) {
      const queue = [tree]

      while (queue.length) {
        const node = queue.shift()

        if (node.data === data) {
          return node
        } else {
          for (let i = 0; i < node.children.length; i += 1) {
            queue.push(node.children[i])
          }
        }
      }

      return null
    },

    walkBFS (visitor) {
      const queue = [tree]

      while (queue.length) {
        const node = queue.shift()

        visitor && visitor(node, tree)

        for (let i = 0; i < node.children.length; i += 1) {
          queue.push(node.children[i])
        }
      }
    },

    walkDFS (visitor, method = 'pre') {
      if (method === 'pre') {
        const pre = node => {
          if (node) {
            visitor && visitor(node, tree)

            for (let i = 0; i < node.children.length; i += 1) {
              pre(node.children[i])
            }
          }
        }

        pre(tree)

      } else if (method === 'post') {
        const post = node => {
          if (node) {
            for (let i = 0; i < node.children.length; i += 1) {
              post(node.children[i])
            }

            visitor && visitor(node, tree)
          }
        }

        post(tree)
      }
    },

    print () {
      const newline = { data: '|', children: [] }
      const queue = [tree, newline]
      const display = []

      while (queue.length) {
        const node = queue.shift()

        display.push(`${node.data} `)

        if (node === newline && queue.length) {
          queue.push(newline)
        }

        for (let i = 0; i < node.children.length; i += 1) {
          queue.push(node.children[i])
        }
      }

      console.log(display.join('').slice(0, -2).trim())
    },

    printx () {
      const newline = { data: '\n', children: [], depth: 0 }
      const queue = [tree, newline]
      const display = []

      while (queue.length) {
        const node = queue.shift()

        if (node !== newline) {
          if (node === tree) {
            display.push('[Root]\n')
            if (node.children.length) {
              display.push('|')
            }
          } else {
            const line = '-'.repeat(1 + (node.depth * 2))
            const inset = ' '.repeat(3 + (node.depth * 2))
            display.push(`${inset}+${line}`)
            if (node.children.length) {
              // has children render as
              // + [data] (children.length) @depth
              display.push(` [${node.data}] (${node.children.length})\n${inset}|`)
            } else {
              // no children render as
              // [data] @depth
              display.push(` [${node.data}]\n`)
            }
          }

        } else {
          display.push('\n')
        }

        if (node === newline && queue.length) {
          queue.push(newline)
        }

        for (let i = 0; i < node.children.length; i += 1) {
          queue.push(node.children[i])
        }
      }

      console.log(display.join('').trim())
    }
  }

  return tree
}

const tree = createTree()

tree.add('child', tree.find('root'))
tree.add('grandchild one', tree.find('child'))
tree.add('grandchild two', tree.find('child'))
tree.add('grandchild three', tree.find('child'))

tree.printx()
