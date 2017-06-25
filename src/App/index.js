import React, { Component } from 'react'
import Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import Tree from '../Tree'
import ExternalContainer from '../ExternalContainer'

import './index.css'

class App extends Component {
  render () {
    return (
      <div className='app__container'>
        <div className='app__tree-container'>
          <h2>Tree</h2>
          <Tree />
        </div>
        <div className='app__external-container'>
          <h2>External</h2>
          <ExternalContainer />
        </div>
      </div>
    )
  }
}

export default DragDropContext(Backend)(App)
