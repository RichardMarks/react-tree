import React, { Component } from 'react'
import cloneDeep from 'lodash/cloneDeep'

import TreeNode from './TreeNode'

import {
  addTreeNode,
  findTreeNode,
  updateTree
} from './Api'

import './index.css'

class Tree extends Component {
  constructor (props) {
    super(props)

    this.onNodeDrop = this.onNodeDrop.bind(this)

    this.renderNode = this.renderNode.bind(this)

    this.state = {
      root: {
        data: 'root',
        children: []
      }
    }
  }

  onNodeDrop (nodeDropped, nodeDroppedOn) {
    window.console.group('onNodeDrop')
    window.console.log('node that was dropped', nodeDropped, nodeDropped.props.node.data)
    window.console.log('node that was dropped on', nodeDroppedOn, nodeDroppedOn.props.node.data)
    window.console.groupEnd()

    const tree = cloneDeep(this.state)

    const parent = findTreeNode(tree, nodeDroppedOn.props.node)

    parent.children.push(cloneDeep(nodeDropped.props.node))

    this.setState(tree, () => console.log('dude'))
  }

  renderNode (node, nodeIndex) {
    return (
      <TreeNode
        node={node}
        nodeIndex={nodeIndex}
        onNodeDrop={this.onNodeDrop}
      />
    )
  }

  render () {
    return (
      <div className='tree'>
        {this.state.root && this.renderNode(this.state.root, 0)}
      </div>
    )
  }
}

export default Tree
