const express = require('express');
const router = express.Router();
const Category = require('../models/categorie');
const multer = require('multer');
const path = require('path');
const verifyToken = require('../Middleware/verifyToken');
// Route for creating a new category


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define the destination folder to store the uploaded images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Define the filename
  }
});
const upload = multer({ storage: storage });

router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { nom } = req.body;
    const imagePath = req.file.path;

    

    if (!nom) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const category = await Category.create({ nom, imagePath });
    res.json({ category });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});



router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Delete the category
    await category.deleteOne();

    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
