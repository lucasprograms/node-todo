const express = require('express')
const router = express.Router()

const todosRoutes = (db) => {
  router.get('/', (req, res) => {
    db.collection('todos').find().toArray((err, results) => {
      res.send(results)
    })
  })
  
  router.post('/', (req, res) => {
    db.collection('todos').save(req.body, (err, results) => {
      if (err) { res.status(500).send(err) }
  
      res.status(200).send(results.ops)
    })
  })

  return router
}

module.exports = todosRoutes


