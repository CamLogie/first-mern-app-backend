const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const todoRoutes = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use('/todos', todoRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/todos', {
  useNewUrlParser: true});
  const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

todoRoutes.route('/').get(function(req, res) {
  Todo.find(function(err, todos){
    if (err) {
      console.log(err)
    } else {
      res.json(todos)
    }
  });
});

todoRoutes.route('/:id').get(function(req, res){
  let id = req.params.id;
  Todo.findById(id, function(err, todo){
    res.json(todo);
  })
})
