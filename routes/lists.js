const express = require('express')
const router = express.Router()

const listsRoutes = (db, List) => {
  router.get('/', (req, res) => {
    List.find({}, (err, docs) => {
      res.send(docs)
    })
  })
  
  router.post('/', (req, res) => {
    const list = new List(req.body)
    console.log(list)
    list.save((err, list) => {
      if (err) { res.status(500).send(err) }
      
      res.status(200).send(list)
    })
  })

  return router
}

module.exports = listsRoutes


