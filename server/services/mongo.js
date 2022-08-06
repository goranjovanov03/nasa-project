const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://nasa-api:LlkTRtjA9nnatT4J@nasacluster.bnbcmbr.mongodb.net/nasa?retryWrites=true&w=majority'

mongoose.connection.once('open', () => {
    console.log('MongoDb connnetion is ready!');
})

mongoose.connection.on('error', (err) => {
    console.log(err)
})


async function mongoConnect(){
    await mongoose.connect(MONGO_URL,{
        // useNewUrlParser:true,
        // useFindAndModify:false,
        // useCreateIndex:true,
        // useUndifiedTopology:true,

    });
}


async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}