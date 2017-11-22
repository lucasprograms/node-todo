const express = require('express')
const router = express.Router()

const cardsRoutes = (db, Card) => {
  router.get('/', (req, res) => {
    db.collection('cards').find(
      { "listId": { $eq: req.query.listId } }
    ).toArray((err, results) => {
      res.send(results)
    })
  })
  
  router.post('/', (req, res) => {
    const card = new Card(req.body)
    card.save((err, card) => {
      if (err) { res.status(500).send(err) }
      
      res.status(200).send(card)
    })
  })

  return router
}

module.exports = cardsRoutes


