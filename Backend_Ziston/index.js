const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const configDB = require('./Config/db.json');
const UserRouter = require('./Routes/users');
const CategoryRouter = require('./Routes/categorie');
const PaysRouter = require('./Routes/Pays');
const placeRouter = require('./Routes/place');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:4200"],
    credentials: true,
  })
);
app.use(express.json());
mongoose.connect(configDB.mongo.uri, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to database:', err);
});
app.use('/login', UserRouter);
app.use('/categories', CategoryRouter);
app.use('/pays', PaysRouter);
app.use('/place', placeRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
