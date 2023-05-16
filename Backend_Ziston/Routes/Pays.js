const express = require('express');
const router = express.Router();
const Pays = require('../models/pays');

// Get all Pays
router.get('/', (req, res) => {
  Pays.find()
    .then(pays => res.json(pays))
    .catch(err => res.status(500).json({ error: err }));
});

// Get a specific Pays by ID
router.get('/:id', (req, res) => {
  Pays.findById(req.params.id)
    .then(pays => {
      if (!pays) {
        return res.status(404).json({ message: 'Pays not found' });
      }
      res.json(pays);
    })
    .catch(err => res.status(500).json({ error: err }));
});

// Create a new Pays
router.post('/', (req, res) => {
  const { name } = req.body;
  const{listingsCount} = req.body;
  const newPays = new Pays({ name , listingsCount});

  newPays.save()
    .then(pays => res.status(201).json(pays))
    .catch(err => res.status(500).json({ error: err }));
});

// Update a Pays
router.put('/:id', (req, res) => {
  const { name, listingsCount } = req.body;

  Pays.findByIdAndUpdate(req.params.id, { name, listingsCount }, { new: true })
    .then(pays => {
      if (!pays) {
        return res.status(404).json({ message: 'Pays not found' });
      }
      res.json(pays);
    })
    .catch(err => res.status(500).json({ error: err }));
});

// Delete a Pays
router.delete('/:id', (req, res) => {
  Pays.findByIdAndRemove(req.params.id)
    .then(pays => {
      if (!pays) {
        return res.status(404).json({ message: 'Pays not found' });
      }
      res.json({ message: 'Pays deleted' });
    })
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
