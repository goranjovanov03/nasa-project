// const launches = require('./launches.mongo')

const launches = new Map();


let latestFlightNumber = 100;

function existsLaunchWithId(launchId){
    return launches.has(launchId);
}

const launch = {
    flightNumber:100,
    mission:'Kepler Exploration X',
    rocket: 'Explorerr IS1',
    launchDate: new Date('December 27, 2030'),
    destination:'Kepler-442 b',
    customers: ['ZTM','NASA'],
    upcoming:true,
    success:true,
}

launches.set(launch.flightNumber, launch);

function getAllLaunches(){
    return Array.from(launch.values());
}

function addNewLunch(launch){
    latestFlightNumber++;
    launches.set(
        launch.flightNumber,
        Object.assign(launch,{
            success:true,
            upcoming:true,
            customers:['Zero to Mastery','NASA'],
            flightNumber:latestFlightNumber,
        })
    );
}


function abortLaunchById(launchId){
 const aborted = launch.get(launchId);
 aborted.upcoming = false;
 aborted.success = false;
 return aborted;
}


module.exports = {
    getAllLaunches,
    addNewLunch,
    existsLaunchWithId,
    abortLaunchById,
}