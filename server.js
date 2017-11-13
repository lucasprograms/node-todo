require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')
const http = require('http').Server(app);
const io = require('socket.io')(http)
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectID;
const todoRoutes = require('./routes/todo.js')
const todosRoutes = require('./routes/todos.js')
const port = process.env.PORT || 3001
const staticDir = process.env.STATIC_DIR || 'build'

app.use(express.static(path.resolve(__dirname, 'client', staticDir)));
app.use(bodyParser.json())

io.on('connection', function(socket) {
  socket.on('new todo', (todo) => {
    socket.broadcast.emit('new todo', todo)
  })
});

MongoClient.connect(process.env.MONGODB_URI, (err, db) => {
  if (err) return console.log(err)
  app.listen(port)

  app.use('/todo', todoRoutes(db, ObjectId))
  app.use('/todos', todosRoutes(db))
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', staticDir, 'index.html'))
  });
})

