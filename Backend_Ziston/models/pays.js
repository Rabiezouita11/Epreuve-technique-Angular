const mongoose = require('mongoose');

const paysSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  listingsCount: {
    type: Number,
    default: 0
  }
});

const Pays = mongoose.model('Pays', paysSchema);

module.exports = Pays;
