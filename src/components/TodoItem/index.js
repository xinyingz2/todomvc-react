// import { includes } from 'lodash'
import React, { memo, useRef, useState } from 'react'

const TodoItem = ({ todo, update, destroy }) => {
  const { title, completed } = todo

  const itemRef = useRef(null)
  const inputRef = useRef(null)
  const [content, setContent] = useState(todo.title)
  // console.log(`Item - ${todo.title} - is rendered`);

  const handleCheckboxChange = e => {
    return update({ ...todo, completed: e.target.checked })
  }

  const edit = e => {
    if (e.target.value.trim()) {
      // editing classname removed
      itemRef.current.className = itemRef.current.className.split(' ').filter(name => name !== "editing").join(' ')
      // save new title
      update({ ...todo, title: e.target.value })
    } else {
      destroy(todo.id)
    }
  }

  const editTitle = () => {
    const classes = itemRef.current.className
    if (classes) {
      itemRef.current.className = ["editing", ...itemRef.current.className.split(' ')].join(' ')
    } else {
      itemRef.current.className = "editing"
    }
    inputRef.current.focus()
  }

  const editClose = e => { // TODO: when editClose is invoked, handleBlur is also invoked
    if (e.key !== "Enter" ) {
      return
    }
    return edit(e)
  }

  const handleBlur = e => edit(e)
  
  return (
    <>
      <li className={completed ? "completed" : ''} ref={itemRef}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={(handleCheckboxChange)}/>
          <label onDoubleClick={editTitle}>{title}</label>
          <button className="destroy" onClick={() => destroy(todo.id)}></button>
        </div>
        <input 
          className="edit" 
          ref={inputRef} 
          value={content} 
          onChange={e => setContent(e.target.value)} 
          onKeyDown={editClose}
          onBlur={handleBlur}
        />
      </li>
    </>
  )
}

export default memo(TodoItem)