const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://azmeerhassanammad_db_user:QNsB0ktVSxFuDJhJ@cluster0.qokui0a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(()=>console.log('✅ MongoDB Connected Successfully'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err))

app.get('/', (req, res) => {
  res.send('Exercise Tracker Microservice 🏋️‍♂️ <br> MongoDB connection is live!');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
