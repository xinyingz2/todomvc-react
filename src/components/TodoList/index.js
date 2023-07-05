import React, { useCallback, useEffect, useMemo, useState } from 'react'
import '../../../node_modules/todomvc-common/base.css'
import '../../../node_modules/todomvc-app-css/index.css'
import TodoItem from '../TodoItem'
import TodoHeader from '../TodoHeader'
import TodoFooter from '../TodoFooter'

// mock
// const data = [
//   { id: 1, title: 'test for react', completed: false },
//   { id: 2, title: 'buy a unicorn', completed: true },
//   { id: 3, title: 'buy an ice cream', completed: false },
// ]

const TodoList = () => {
  // console.log('TodoList is rendered');
  const [data, setData] = useState({
    todos: []
  })
  const [hash, setHash] = useState('')

  const todos = useMemo(() => {
    return data.todos.filter(todo => {
      if (hash === '#/') {
        return true 
      } else if (hash === '#/active') {
        return !todo.completed
      } else if (hash === '#/completed') {
        return todo.completed
      } else {
        return true
      }
    })
  }, [data.todos, hash])

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || '#/')
    onHashChange()
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const create = useCallback(e => {
    if (e.key === "Enter" && e.target.value.trim()) {
      setData({
        todos: [{
          id: Date.now(),
          title: e.target.value,
          completed: false,
        }, ...data.todos]
      })
      e.target.value = ''
    }
  }, [data.todos])

  const update = newTodo => {
    const newData = data.todos.map(todo => {
      return todo.id === newTodo.id ? Object.assign({}, todo, newTodo) : todo
    })
    setData({
      todos: [...newData]
    })
  }

  const destroy = id => {
    setData({
      todos: [...data.todos.filter(todo => todo.id !== id)]
    })
  }

  const count = useCallback(() => {
    return data.todos.filter(todo => !todo.completed).length
  }, [data.todos])

  const hasCompleted = useCallback(() => {
    return !!data.todos.find(todo => todo.completed)
  }, [data.todos])

  const clearCompleted = useCallback(() => {
    setData({
      todos: [...data.todos.filter(todo => !todo.completed)]
    })
  }, [data.todos])

  const isAllCompleted = () => {
    return !data.todos.find(todo => !todo.completed)
  }

  const handleToggleAll = e => {
    setData({
      todos: data.todos.map(todo => ({ ...todo, completed: e.target.checked }))
    })
  }

  return (
    <>
      <section className="todoapp">
        <TodoHeader create={create} />
        {data.todos.length > 0 && (
          <>
            <section className="main">
              <input 
                id="toggle-all" 
                className="toggle-all" 
                type="checkbox" 
                checked={isAllCompleted()} 
                onChange={handleToggleAll}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>
              <ul className="todo-list">
                {/* <!-- These are here just to show the structure of the list items --> */}
                {/* <!-- List items should get the className `editing` when editing and `completed` when marked as completed --> */}
                {todos.length > 0 && todos.map(todo => (
                  <TodoItem 
                    key={todo.id} 
                    todo={todo}
                    update={update}
                    destroy={destroy}
                  />
                ))}
              </ul>
            </section>
            <TodoFooter 
              hash={hash}
              count={count}
              hasCompleted={hasCompleted}
              clearCompleted={clearCompleted}
            />
          </>
        )}
		 </section>
		<footer className="info">
			<p>Double-click to edit a todo</p>
			{/* <!-- Remove the below line ↓ --> */}
			<p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
			{/* <!-- Change this out with your name and url ↓ --> */}
			<p>Created by Chloe Zhou</p>
			<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
    </>
  )
}

export default TodoList