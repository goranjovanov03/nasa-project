const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const path = require('path');
const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter  = require('./routes/lanches/launches.router');
app.use(cors({
    origin:'http://localhost:3000'
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..','public')));
app.use('/planets',planetsRouter);
app.use('/launches',launchesRouter);
app.get('/*',(req,res) => {
    res.sendFile(path.join(__dirname, '..', 'public','index.html'))
})
module.exports = app;


// do 15 video turorial 15. Serving React.js Front End In Production