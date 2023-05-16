const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorieSchema = new Schema(
  {
    nom: String,
    imagePath: String, // Add a new field to store the image path
  },
  { timestamps: true }
);

module.exports = mongoose.model("categorie", categorieSchema);
