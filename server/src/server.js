

const http = require('http');

const PORT = process.env.PORT || 8000;
const app = require("./app");

const {loadPlanetsData} = require('./models/planets.model');

const { mongoConnect } = require('../services/mongo');
const {loadLunchData} = require('./models/launches.model')
const server = http.createServer(app);




async function startServer(){
    await mongoConnect();
    await loadPlanetsData();
    await loadLunchData();
    server.listen(PORT, ()=>{
        console.log(`Listineg  on port ${PORT}`);
    });
}

startServer();


