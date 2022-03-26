const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const v1=require("./routes/v1")
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/admin', {
    useNewUrlParser: true,
    useCreateIndex: true,
    poolSize: 10,
    useUnifiedTopology: true,
    useFindAndModify: false

}, function (err, db) {
    mongodb = db;
});



mongoose.connection.on('connected', () => {
    console.log('Connected to the database');
});
mongoose.connection.on('error', (err) => {
    console.error(`Failed to connected to the database: ${err}`);
});

app.use("/api/v1",v1)
app.get('/test', (req, res, next) => {
    try {
        const name = 'aya'
        res.status(200).json({name: name});

    } catch (error) {
        res.status(500).json({error: error})

    }
});
module.exports = app;