require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server)
const path = require('path')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectID;
const todoRoutes = require('./routes/todo.js')
const todosRoutes = require('./routes/todos.js')
const port = process.env.PORT || 3001
const staticDir = process.env.STATIC_DIR || 'build'

app.use(express.static(path.resolve(__dirname, 'client', staticDir)));
app.use(bodyParser.json())

io.on('connection', function (socket) {
  console.log('there was a connection')

  socket.on('todo added remotely', (todo) => {
    socket.broadcast.emit('todo added remotely', todo)
  })
})

MongoClient.connect(process.env.MONGODB_URI, (err, db) => {
  if (err) return console.log(err)
  server.listen(port)

  app.use('/todo', todoRoutes(db, ObjectId))
  app.use('/todos', todosRoutes(db))
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', staticDir, 'index.html'))
  });
})

