require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server)
const path = require('path')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectID;
const cardRoutes = require('./routes/card.js')
const listsRoutes = require('./routes/lists.js')
const cardsRoutes = require('./routes/cards.js')
const port = process.env.PORT || 3001
const staticDir = process.env.STATIC_DIR || 'build'

app.use(express.static(path.resolve(__dirname, 'client', staticDir)));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

io.on('connection', function (socket) {
  socket.on('card added remotely', (card) => {
    socket.broadcast.emit('card added remotely', card)
  })
})

mongoose.Promise = global.Promise;
const mongooseConnection = mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

mongooseConnection.then(function (db) {
  server.listen(port)

  const cardSchema = new mongoose.Schema({
    text: String,
    isCompleted: Boolean,
    date: Date,
    listId: String,
    ordinalValue: Number
  })

  const listSchema = new mongoose.Schema({
    title: String,
    cards: Array,
    date: Date,
    boardId: String
  })

  const Card = mongoose.model('Card', cardSchema)
  const List = mongoose.model('List', listSchema)
  
  app.use('/card', cardRoutes(db, ObjectId))
  app.use('/cards', cardsRoutes(db, Card))
  app.use('/lists', listsRoutes(db, List))
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', staticDir, 'index.html'))
  });
})
