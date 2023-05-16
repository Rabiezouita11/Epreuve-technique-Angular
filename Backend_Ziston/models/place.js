const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // Set the default value to the current date and time
  }
  
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
