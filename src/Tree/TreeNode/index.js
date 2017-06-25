import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'

import { DNDType } from '../constants'

import './index.css'

const treeNodeDragSpec = {
  beginDrag (props, monitor, component) {
    return {
      props,
      monitor,
      component
    }
  },
  endDrag (props, monitor, component) {
    if (monitor.didDrop()) {
      const item = monitor.getItem()
      const dropResult = monitor.getDropResult()

      // window.console.log('props', props, 'monitor', monitor, 'component', component, 'item', item, 'dropResult', dropResult)
    }
  }
}

const treeNodeDragCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const treeNodeDropSpec = {
  drop (props, monitor, component) {
    if (monitor.didDrop()) {
      return undefined
    } else {
      const item = monitor.getItem()
      const dropResult = { item }

      const onNodeDrop = props.onNodeDrop

      // debugger // eslint-disable-line no-debugger

      onNodeDrop && onNodeDrop(item.component, component)
      !onNodeDrop && console.error('fail')

      // window.console.log('props', props)

      // window.console.log('monitor', monitor)
      // debugger // eslint-disable-line no-debugger

      return dropResult
    }
  },

  hover (props, monitor, component) {

  },

  canDrop (props, monitor) {
    return true
  }
}

const treeNodeDropCollect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  }
}

const TreeNode = DropTarget(DNDType, treeNodeDropSpec, treeNodeDropCollect)(
  DragSource(DNDType, treeNodeDragSpec, treeNodeDragCollect)(
    class extends Component {
      constructor (props) {
        super(props)

        this.renderChildren = this.renderChildren.bind(this)
      }

      componentWillReceiveProps (nextProps) {
        if (!this.props.isOver && nextProps.isOver) {
          //window.console.log('onEnterNested')
        } else if (this.props.isOver && !nextProps.isOver) {
          //window.console.log('onLeaveNested')
        }

        if (!this.props.isOverCurrent && nextProps.isOverCurrent) {
          //window.console.log('onEnter')
        } else if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
          //window.console.log('onLeave')
        }
      }

      renderChildren () {
        if (this.props.node.children.length) {
          return (
            <div className='tree-node__children-container'>
              {
                this.props.node.children.map((child, childIndex) => {
                  return (
                    <TreeNode
                      key={childIndex}
                      node={child}
                      nodeIndex={childIndex}
                      onNodeDrop={this.props.onNodeDrop}
                    />
                  )
                })
              }
            </div>
          )
        } else {
          return null
        }
      }

      render () {
        return this.props.connectDropTarget(
          this.props.connectDragSource(
            <div className='tree-node__container'>
              <div className='tree-node__data'>{this.props.node.data} [{this.props.nodeIndex}]</div>
              {this.renderChildren()}
            </div>
          )
        )
      }
    }
  )
)

export default TreeNode
