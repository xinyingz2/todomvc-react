import React from 'react'

const TodoFooter = ({ hash, count, hasCompleted, clearCompleted }) => {
  return (
    <footer className="footer">
      {/* <!-- This should be `0 items left` by default --> */}
      <span className="todo-count"><strong>{count()}</strong> item left</span>
      {/* <!-- Remove this if you don't implement routing --> */}
      <ul className="filters">
        <li>
          <a className={hash === '#/' ? "selected" : ''} href="#/">All</a>
        </li>
        <li>
          <a className={hash === '#/active' ? "selected" : ''} href="#/active">Active</a>
        </li>
        <li>
          <a className={hash === '#/completed' ? "selected" : ''} href="#/completed">Completed</a>
        </li>
      </ul>
      {/* <!-- Hidden if no completed items are left ↓ --> */}
      {hasCompleted() && <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>}
  </footer>
  )
}

export default TodoFooter