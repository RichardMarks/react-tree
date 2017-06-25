import React, { Component } from 'react'

import TreeNode from '../Tree/TreeNode'

import './index.css'

class ExternalContainer extends Component {
  render () {
    return (
      <div className='external-container__container'>
        <TreeNode node={{ data: 'ext type a', children: [] }} nodeIndex={0} />
        <TreeNode node={{ data: 'ext type b', children: [] }} nodeIndex={2} />
        <TreeNode node={{ data: 'ext type c', children: [] }} nodeIndex={3} />
      </div>
    )
  }
}

export default ExternalContainer
