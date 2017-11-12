const express = require('express')
const router = express.Router()

const todoRoutes = (db, ObjectId) => {
  router.delete('/', (req, res) => {
    db.collection('todos').deleteOne({ "_id": ObjectId(req.body.id) }, (err, results) => {
      if (err) { res.status(500).send(err) }
  
      res.sendStatus(200)
    })
  })

  return router
}

module.exports = todoRoutes
