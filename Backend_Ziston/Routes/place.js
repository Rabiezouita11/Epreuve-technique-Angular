const express = require('express');
const router = express.Router();
const Place = require('../models/place');

// Get all Places

router.get('/', (req, res) => {
  Place.find()
    .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
    .then(places => res.json(places))
    .catch(err => res.status(500).json({ error: err }));
});
// Get a specific Place by ID
router.get('/:id', (req, res) => {
  Place.findById(req.params.id)
    .populate('country', 'name')
    .then(place => {
      if (!place) {
        return res.status(404).json({ message: 'Place not found' });
      }
      res.json(place);
    })
    .catch(err => res.status(500).json({ error: err }));
});

// Create a new Place
router.post('/', async (req, res) => {
  const { name } = req.body;
  console.log(name)
  const place = await Place.create({ name });
    res.json({ place });
});

// Update a Place
router.put('/:id', (req, res) => {
  const { name } = req.body;

  Place.findByIdAndUpdate(req.params.id, { name }, { new: true })
    .then(place => {
      if (!place) {
        return res.status(404).json({ message: 'Place not found' });
      }
      res.json(place);
    }
    )
    .catch(err => res.status(500).json({ error: err }));
});


router.delete('/:id', (req, res) => {
  Place.findByIdAndRemove(req.params.id)

    .then(place => {
      if (!place) {
        return res.status(404).json({ message: 'Place not found' });
      }
      res.json({ message: 'Place deleted' });
    })
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
