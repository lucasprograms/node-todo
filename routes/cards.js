const express = require('express')
const router = express.Router()

const cardsRoutes = (db, Card) => {
  router.get('/', (req, res) => {
    Card.find({ listId: req.query.listId  }, (err, cards) => {
      res.send(cards)
    })
  })
  
  router.post('/', (req, res) => {
    Card.findOne({ listId: req.body.listId })
      .sort('-ordinalValue')
      .exec(function (err, maxOrdinalValueCard) {
        const nextOrdinalValue = maxOrdinalValueCard ? maxOrdinalValueCard.ordinalValue + 1 : 0
        const card = new Card({ ...req.body, ordinalValue: nextOrdinalValue })

        card.save((err, card) => {
          if (err) { res.status(500).send(err) }
          
          res.send(card)
        })
      })
  })

  return router
}

module.exports = cardsRoutes


