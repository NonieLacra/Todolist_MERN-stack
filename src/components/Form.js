import React from "react";

const API_BASE = "http://localhost:3005";

const Form = ({setInputText, todos, setTodos, inputText, setStatus}) => {

    const inputTextHandler = (e) => { 
        setInputText(e.target.value);
    }


    const statusHandler = (e) => {
       setStatus(e.target.value)
    }

    const addTodo = async () => {
        const data = await fetch(API_BASE + '/todo/new', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: inputText
            })
        }).then(res => res.json())
        setTodos([...todos, data])
        setInputText("")
    }

    return (
        <form>
            
            <div className="input-container">
            <input value={inputText} onChange={inputTextHandler}
            type="text" className="todo-input" placeholder="What is your next task ?" />
            <button onClick={addTodo} className="todo-button" type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
            </div>
            
            <div className="select">
                <select onChange={statusHandler} name="todos" className="filter-todo">
                    <option value="all">All</option>
                    <option value="complete">Completed</option>
                    <option value="uncomplete">Uncompleted</option>
                </select>
            </div>
            
        </form>
    )

}

export default Form 