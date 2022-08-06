const launchesDatabase = require('./launches.mongo')

const planets = require('./planets.mongo');
const axios = require('axios');



const DEFAULT_FLIGHT_NUMBER = 100;





const launch = {
    flightNumber:100,
    mission:'Kepler Exploration X',
    rocket: 'Explorerr IS1',
    launchDate: new Date('December 27, 2030'),
    target:'Kepler-442 b',
    customers: ['ZTM','NASA'],
    upcoming:true,
    success:true,
}


saveLaunch(launch);
// launches.set(launch.flightNumber, launch);
const SPACEX_API_URL = 'https://api.sapcexdata.com/v4/launches/query';


async function popilateLaunches(){
    const response = await axios.post(SPACEX_API_URL, {
        query:{},
        options:{
            pagination:false,
            populate:[
                {
                    path:'rocket',
                    select:{
                        name:1,
                    }
                },
                {
                    path:'payloads',
                    select:{
                        'customers':1,
                    }
                }
            ]
        }
    })

    if(response.status !== 200){
        console.log('Problem downloading launch data');
        throw new Error('Launch data downoload data');
    }

    const launchDocs = response.data.docs;
    for(const launchDoc of launchDocs){
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        })

        const launch = {
            flightNumber:launchDoc['filgh_number'],
            mission:launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming:launchDoc['upcoming'],
            success:launchDoc['success'],
            customers,
        }
    }

    await saveLaunch(launch);
}

async function loadLunchesData(){
    const fristLaunch = await findLaunch({
        flightNumber:1,
        rocket:'Falcon 1',
        mission:'FalconSat',
    })

    if(fristLaunch){
        console.log('Launch data alerady loadded');
        
    }else {
       await popilateLaunches();
    }
   
}

async function findLaunch(filter){
    return await launchesDatabase.findOne(filter);
}

async function existsLaunchWithId(launchId){
    return await findLaunch({
        flightNumber:launchId
    })
}


async function getLatestFlightNumber(){
    const latestLunch = await launchesDatabase
        .findOne({})
        .sort('-flightNumber')
        if(!latestLunch){
            return DEFAULT_FLIGHT_NUMBER;
        }
        return latestLunch.flightNumber;
}

async function getAllLaunches(){
    return launchesDatabase.find({},{'_id':0,'__v':0}).sort({flightNumber:1}).skip(20).limit(50);
}

async function saveLaunch(launch){
   
    const planet = await planets.findOne({
        keplerName:launch.target,

    });

    if(!planet){
        throw new Error('No matching planet found');
    }
    await launchesDatabase.findOneAndUpdate({
        flightNumber:launch.flightNumber,
    },launch, {
        upsert:true,
    })
}

async function secheduleNewLunch(){
    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        success:true,
        upcoming:true,
        customers:['Zero to Mastery','NASA'],
        flightNumber:newFlightNumber
    })
    await saveLaunch(newLaunch);
}



async function abortLaunchById(launchId){

    const aborted = await launchesDatabase.updateOne({
        flightNumber:launchId,

    },{
        upcoming:false,
        success:false,
    })

    return aborted.ok === 1 && aborted.nModified === 1;

}


module.exports = {
    loadLunchesData,
    getAllLaunches,
    existsLaunchWithId,
    abortLaunchById,
    secheduleNewLunch,
}