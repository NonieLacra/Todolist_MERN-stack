import React from 'react'

const Todo = ({text, todos, setTodos, todo}) => {
    const deleteHandler = () => {
        setTodos(todos.filter(el => el.id !== todo.id))
    }

const completeHandler = () => {
    setTodos(todos.map(item => {
        if(item.id === todo.id){
           return{
            ...item, completed: !item.completed
           } 
        }
        return item;
    }))
}
  return (
    <div className='todo-container'> 
    <div className='checked'>
        <button onClick={completeHandler} 
            className={`complete-btn ${todo.completed ? "complete-btn" : "uncomplete-btn"}`}>
            <i className='fas fa-check'></i>
        </button>
    </div>
    <div className='todo'>
        <li className={`todo-item ${todo.completed ? "completed" : ""}`}>{text}</li>
    
        <button onClick={deleteHandler} className='trash-btn'>
            <i className='fas fa-trash'></i>
        </button>
      
    </div>
    </div>
  )
}

export default Todo
