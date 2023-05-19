const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const morgan = require('morgan')
const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

//Connection to Database
mongoose.connect(process.env.DB_CONNECT,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch(console.error);

//Port
const PORT = process.env.PORT || 3005;

const Todo = require('./models/todoItemsModel');

//Routes
// GET
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos)
});

//GET todos by ID
app.get('/todos/:id', async (req, res) => {
    
    try{
        const todos = await Todo.findById({_id: req.params.id});

        if (!todos) {
            return res.status(404).json({ error: 'Todo ID not found' });
        }
        res.json(todos)
    }
    
    catch (error){
        console.error('Error finding the todo:', error);
        res.status(500).json({ error: 'Internal server error' });

    }
});

//POST
app.post('/todo/new', (req, res) => {
    try{
        const todo = new Todo({
            text: req.body.text
        });
        if(!req.body.text){
            return res.status(404).json({ error: 'Invalid request body, Task prop is required' });
        }
        todo.save();
        res.json(todo);
    }
    catch (error){
        console.error('Error posting the todo:', error);
        res.status(500).json({ error: 'Internal server error' });

    }  
});

//DELETE
app.delete('/todo/delete/:id', async (req, res) => {
    try {
        const result = await Todo.deleteOne({ _id: req.params.id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Todo ID not found' });
        }

        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    
});

//UPDATE
app.patch('/todo/update/:id', async (req, res) => {
    const todo = await Todo.findById({ _id: req.params.id });
    try {

        if (!todo) {
            return res.status(404).json({ error: 'Todo ID not found' });
        }
        if(typeof req.body.complete !== 'boolean'){
            return res.status(400).json({ error: 'Invalid request body, Task prop is required' });
        }

    todo.complete = !todo.complete;
    
    await todo.save()
    res.json(todo);

    } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal server error' });
}});



//Connection to Server
app.listen(PORT, () => 
    console.log("Server connected"));