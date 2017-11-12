const express = require('express')
const router = express.Router()
  
router.get('/todos', (req, res) => {
  console.log('getting todos')
  const cursor = db.collection('todos').find().toArray((err, results) => {
    res.send(results)
  })
})

router.post('/todos', (req, res) => {
  db.collection('todos').save(req.body, (err, results) => {
    if (err) { res.status(500).send(err) }

    res.status(200).send(results.ops)
  })
})

router.delete('/todo', (req, res) => {
  db.collection('todos').deleteOne({ "_id": ObjectId(req.body.id) }, (err, results) => {
    if (err) { res.status(500).send(err) }

    res.sendStatus(200)
  })
})

module.exports = router


