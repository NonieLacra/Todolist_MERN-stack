import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './components/Form';
import Todolist from './components/Todolist';


function App() {
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([])

  useEffect(() => {
    getLocalTodos();
  },[]);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const filterHandler = () => {
    switch(status){
      case 'completed' : setFilteredTodos(todos.filter(todo => todo.completed === true))
      break;
      case 'uncompleted' : setFilteredTodos(todos.filter(todo => todo.completed === false))
      break;
      default: setFilteredTodos(todos);
      break;
    }
  }

  const saveLocalTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
  }

  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null)
    {
      localStorage.setItem("todos", JSON.stringify([]));
    }
    else
    {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  }



  return (
    
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
      <Todolist 
      setTodos={setTodos} 
      todos={todos}
      filteredTodos={filteredTodos} 
      />
    </div>
    </div>
   
  );
}

export default App;
