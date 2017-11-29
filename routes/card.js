const express = require('express')
const router = express.Router()

const cardRoutes = (db, ObjectId) => {
  router.delete('/', (req, res) => {
    db.collection('cards').deleteOne({ "_id": ObjectId(req.body.id) }, (err, results) => {
      if (err) { res.status(500).send(err) }
  
      res.sendStatus(200)
    })
  })

  router.put('/', (req, res) => {
    db.collection('cards').findOneAndUpdate(
      { "_id": ObjectId(req.body.id) },
      { $set:
        { ...req.body.toUpdate }
      },
      {
        returnNewDocument: true
      },
      (err, results, newValue) => {
      if (err) { res.status(500).send(err) }
  
      res.send(newValue)
    })
  })

  return router
}

module.exports = cardRoutes
