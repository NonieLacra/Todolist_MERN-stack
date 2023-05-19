import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './components/Form';



const API_BASE = "http://localhost:3005";

function App() {
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([])
 


  useEffect(() => {
    getTodos();
    console.log(todos)
  },[]);

  useEffect(() => {
    filterHandler();
  }, [status]);

  const filterHandler = () => {
    switch(status){
      case 'complete' : setFilteredTodos(todos.filter(todo => todo.complete === true))
      break;
      case 'uncomplete' : setFilteredTodos(todos.filter(todo => todo.complete === false))
      break;
      default: setFilteredTodos(todos);
      break;
    }
  }

  const getTodos = () => {

      fetch(API_BASE + "/todos")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error: ", err));
    }


  const completeTodo = async (id, isComplete) => {
    
      const data = await fetch(API_BASE + "/todo/update/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ complete: isComplete}),
      })
      .then(res => res.json());

      
      setTodos(todos => todos.map(todo => {
          if (todo._id === data._id){
              todo.complete = !!data.complete;
          }
          return todo;
      }));
      
  }

  const deleteTodo = async id => {
    const data = await fetch(API_BASE + "/todo/delete/" + id,{
      method: "DELETE"
    }) 
    .then(res => res.json()); 
    setTodos(todos => todos.filter(todo => todo._id !== data._id))

    getTodos()
  }





  return (

    <div className='App'>
      <div className='background'>
      <div className='container'>
      <header>
     <h1>My Todo List</h1>
      </header>
        
      <Form 
      inputText={inputText} 
      setInputText={setInputText} 
      todos={todos} 
      setTodos={setTodos} 
      setStatus={setStatus}
      />

      <div className='todos'>
        {todos.map(todo => (
          <div className={
            'todo ' + (!!todo.complete ? "complete" : "")}
          key={todo._id} onClick={() => completeTodo(todo._id, todo.complete)}>

            <button className='complete-btn'>
            
            </button>

            <div className='text'>{todo.text}</div>
            
            <button className='trash-btn'
            onClick={(e) => {
            e.stopPropagation(); 
            deleteTodo(todo._id);
            }}>
            <i className='fas fa-trash'></i>
            </button>
            
        </div>
        
        
        

        ))}
        

      </div>
      </div>
      </div>
     
    </div>
   
  );
}

export default App;
