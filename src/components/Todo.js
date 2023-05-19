// import React from 'react'


// const Todo = ({text, todos, setTodos, todo}) => {
//     const deleteHandler = () => {
//         setTodos(todos.filter(el => el.id !== todo.id))
//     }

// const completeHandler = () => {
//     const data = await fetch(API_BASE + "/todo/update/" + id)
//     .then(res => res.json());
    
//     setTodos(todos => todos.map(todo => {
//         if (todo._id === data._id){
//             todo.complete = data.complete;
//         }
//         return todo;
//     }));
    
// }
//   return (
    
//     <div className='todo-container'>
//     <div className='checked'>
//         <button key={todo._id} onClick={completeHandler} 
//             className={`complete-btn ${todo.complete ? "complete-btn" : "uncomplete-btn"}`}>
//             <i className='fas fa-check'></i>
//         </button>
//     </div>
//     <div className='todo'>
//         <li className={`todo-item ${todo.complete ? "completed" : ""}`}>{todo.text}</li>

//         <button onClick={deleteHandler} className='trash-btn'>
//             <i className='fas fa-trash'></i>
//         </button>
      
//     </div>
//     </div>
    
//   )
// }

// export default Todo
