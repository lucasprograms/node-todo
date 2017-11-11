require('dotenv').config()
const express = require('express')
const path = require('path')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectID;
let db

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json())

MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3001)
})

app.get('/todos', (req, res) => {
  const cursor = db.collection('todos').find().toArray((err, results) => {
    res.send(results)
  })
})

app.post('/todos', (req, res) => {
  db.collection('todos').save(req.body, (err, results) => {
    if (err) { res.status(500).send(err) }

    res.status(200).send(results.ops)
  })
})

app.delete('/todo', (req, res) => {
  db.collection('todos').deleteOne({ "_id": ObjectId(req.body.id) }, (err, results) => {
    if (err) { res.status(500).send(err) }

    res.sendStatus(200)
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});