

const http = require('http');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000;
const app = require("./app");

const {loadPlanetsData} = require('./models/planets.model');


const MONGO_URL = 'mongodb+srv://nasa-api:LlkTRtjA9nnatT4J@nasacluster.dtciu.mnogodb.net/nasa?returyWrites=true&w=majority';

const server = http.createServer(app);


mongoose.connection.once('open', () => {
    console.log('MongoDb connnetion is ready!');
})

async function startServer(){
    await mongoose.connect(MONGO_URL,{
        useNewUrlParser:true,
        useFindAndModify:false,
        useCreateIndex:true,
        useUndifiedTopology:true,

    });
    await loadPlanetsData();
    server.listen(PORT, ()=>{
        console.log(`Listineg  on port ${PORT}`);
    });
}

startServer();


