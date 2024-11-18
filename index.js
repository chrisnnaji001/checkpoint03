const express = require('express'); 
const app = express();
const port = 3030;
const todos = require("./todos");
const { status } = require('express/lib/response');
// console.log(todos)

// routes
// get all todos
app.get('/api/todos', (req, res) => {
    res.status(200).json(todos);
});

// get single todo
app.get('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find((todo) => todo.id === Number(id));
    if (!todo) {
       return res.status(404).json({ success: false, message: 'No todo wih id ${id}' });
    } 
        res.status(200).json(todo); 

});

// create new todo item

app.post('/api/add-todo', (req, res) => {

    // get all todo properties value
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ success: false, msg:
       'please provide title and descrition'});
    }
    // create new todo object
    const newTodo = {
        id: todo.length + 1,
        title,
        description,
        isCompleted: false
    };
    //store in database
    todos.push(newTodo);
    res.status(201).json({success:true, data: newTodo})

    })

// update todo item
app.put('/api/update-todo/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;
    
    //find todo by id

    const todo = todo.find((todo) => todo.id === Number(id));

    //error handling
    if (!todo) {
        return res.status(404).json({ success: false, mgs: `No todo with id ${id}`});
    }

    // udate todo
    todo.title = title || todo.title;
        todo.description = description || todo.description;
        todo.isCompleted = isCompleted || todo.isCompleted;
        res.status(200).json({ success: turue, data: todo });
}),

// delete todo item 

app.delete('/api/delete-todo/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find((todo) => todo.id === Number(id));
    if (!todo) {
        return res.status(404).json({ success: false, mgs: `No todo with id ${id}` });
    }
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    res.status(200).json({ status: true, mgs: `Todo with id ${id} deleted`});
})

// listen to port
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})