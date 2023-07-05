import React from 'react'
import _ from 'lodash'

const TodoHeader = ({ create }) => {
  const createTodo = _.debounce(create, 150)

  return (
    <header className="header">
      <h1>todos</h1>
      <input 
        autoFocus
        className="new-todo" 
        placeholder="What needs to be done?"  
        onKeyDown={createTodo}
      />
    </header>
  )
}

export default TodoHeader