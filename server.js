const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', (req, res) => {
  res.send('Exercise Tracker Microservice 🏋️‍♂️');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
