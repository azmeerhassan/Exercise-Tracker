const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user')

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

app.post('/api/users', async(req, res)=>{
    try {
        const { username } = req.body

        let existingUser = await User.findOne({ username })
        if(existingUser) return res.json(existingUser)
        
        const newUser = new User({ username })
        const savedUser = await newUser.save()
        
        res.json(savedUser)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Server error'})
    }
})

app.post('/api/users/:_id/exercises', async(req, res)=>{
    const { description, duration, date} = req.body
    const userId = req.params._id

    try {
        const user = await User.findById(userId)
        if(!user) return res.json({error: 'User not found'})
        
        const exercise = {
            description,
            duration: parseInt(duration),
            date: date ? new Date(date) : new Date(),
        }
        user.log.push(exercise)
        await user.save()

        res.json({
            _id: user._id,
            username: user.username,
            date: exercise.date.toDateString(),
            duration: exercise.duration,
            description: exercise.description,
        })
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
})

app.get('/api/users/:_id/logs', async(req, res)=>{
    const { _id } = req.params
    const { from, to, limit } = req.query

    try {
        const user = await User.findById(_id)
        if(!user) return res.json({error: 'User not found'})

        let log = [...user.log]
        
        if(from){
            const fromDate = new Date(from)
            log = log.filter(entry => entry.date >= fromDate)
        }
        if (to) {
            const toDate = new Date(to);
            log = log.filter(entry => entry.date <= toDate);
}

        if(limit){
            log = log.slice(0, parseInt(limit))
        }

        const formattedLog = log.map(entry => ({
            description: entry.description,
            duration: entry.duration,
            date: entry.date.toDateString()
        }))
        res.json({
            _id: user._id,
            username: user.username,
            count: log.length,
            log: formattedLog
        })


    } catch (error) {
        console.error('❌ Error fetching logs:', err);
        res.status(500).json({ error: 'Server error' });
    }

})

app.get('/api/users', async(req, res)=>{
    try {
        const users = await User.find({}, '_id username').lean()
        res.json(users)
    } catch (error) {
        console.error('❌ Error fetching users:', error)
        res.status(500).json({ error: 'Server error' });
    }
})

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
