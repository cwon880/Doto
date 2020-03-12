require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express()
const apiPort = process.env.PORT || 3000
const { DB_CONN, DB_USER, DB_PW } = process.env;
// Mongoose connection
const mongoose = require('mongoose');
mongoose.connect(
    DB_CONN, 
    { auth : { user: DB_USER, password: DB_PW},
     useNewUrlParser: true }).then(() => console.log('success concect to db')).catch(console.error);
const db = mongoose.connection;

// Checking for DB connection
db.once('open', function(){
    console.log("Connected to MongoDB.");
});
db.on('error', function(){
    console.log(err);
});

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

// exporting Routes 
const users = require('./src/routes/router');
app.use('/api', users);

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))