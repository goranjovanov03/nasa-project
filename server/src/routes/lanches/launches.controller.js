const { 
    getAllLaunches,
    secheduleNewLunch,
    existsLaunchWithId,
    abortLaunchById,
}  = require('../../models/launches.model');



async function httpGetAllLaunches(req,res){
    return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req,res) {
    const launch = req.body;
    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.destination){
        return res.status(400).json({
            error:'Missing required launch propety',
        })
    }
    launch.launchDate = new Data(launch.launchDate);
    if(isNAN(launch.launchDate)){
        return res.status(400).json({
            error:'Invalid launch date',
        })
    }
    
    await secheduleNewLunch(launch);
    return req.status(201).json(launch);
}

function httpAbourtLanch(req,res){
    const launchId = req.params.id;

    if(!existsLaunchWithId(launchId)){
        return res.status(400).json({
            error:'Launch not found',
        })
    }
    const aborted = abortLaunchById(launchId)
    

    return res.status(200).json(aborted);
}
module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbourtLanch
}