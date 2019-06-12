const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
  console.log('MongoDB database connection established successfully');
});
app.listen(PORT, function() {
  console.log('Server is running on Port: ' + PORT);
});

const todoRoutes = express.Router();

let Todo = require('./models/todo');

app.use('/todos', todoRoutes);

todoRoutes.route('/').get(function(req, res) {
  Todo.find(function(err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

todoRoutes.route('/:id').get(function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    if (err) {
      console.log(err);
    } else {
      res.json(todo);
    }
  });
});

todoRoutes.route('/add').post(function(req, res) {
  let todo = new Todo(req.body);
  todo.save(function(err, data) {
    if (err) {
      res.status(400).send('adding new todo failed');
      console.log(err);
    } else {
      res.status(200).json({ todo: 'todo added successfully' });
    }
  });
});

todoRoutes.route('/update/:id').post(function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    if (err) {
      console.log('haha');
      res.status(404).send('data is not found');
    } else {
      console.log(todo);
      todo.todo_description = req.body.todo_description;
      todo.todo_responsible = req.body.todo_responsible;
      todo.todo_priority = req.body.todo_priority;
      todo.todo_completed = req.body.todo_completed;
      todo.save(function(err, data) {
        if (err) {
          res.status(400).send('Update not possible');
        } else {
          res.status(200).json('Todo updated!');
        }
      });
    }
  });
});
