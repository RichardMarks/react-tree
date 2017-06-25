import update from 'immutability-helper'

const updateTree = (state, nextRoot) => {
  return update(
    state,
    {
      root: { $set: nextRoot }
    }
  )
}

const findTreeNode = (tree, node) => {
  const queue = [tree.root]
  while (queue.length) {
    const current = queue.shift()

    if (current.data === node.data) {
      return current
    } else {
      for (let i = 0; i < current.children.length; i += 1) {
        queue.push(current.children[i])
      }
    }
  }

  return null
}

const addTreeNode = (tree, data, parentNode) => {
  const node = { data, children: [] }

  if (parentNode) {
    window.console.log('addTreeNode -> add child node ', node.data, ' to ', parentNode.data)
    parentNode.children.push(node)
    return node
  } else {
    if (!tree.root) {
      window.console.log('addTreeNode -> add root node')
      tree.root = node
      return node
    } else {
      throw new Error('Cannot have multiple root nodes')
    }
  }
}

export {
  updateTree,
  findTreeNode,
  addTreeNode
}
