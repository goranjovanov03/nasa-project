const launchesDatabase = require('./launches.mongo')

const planets = require('./planets.mongo');

const launches = new Map();


const DEFAULT_FLIGHT_NUMBER = 100;



function existsLaunchWithId(launchId){
    return launches.has(launchId);
}

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


function existsLaunchWithId(launchId){
    return launches.has(launchId)
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
    return launchesDatabase.find({},{'_id':0,'__v':0})
}

async function saveLaunch(launch){
    console.log(launch);
    const planet = await planets.findOne({
        keplerName:launch.target,

    });

    if(!planet){
        throw new Error('No matching planet found');
    }
    await launches.updateOne({
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



function abortLaunchById(launchId){
 const aborted = launch.get(launchId);
 aborted.upcoming = false;
 aborted.success = false;
 return aborted;
}


module.exports = {
    getAllLaunches,
    existsLaunchWithId,
    abortLaunchById,
    secheduleNewLunch,
}