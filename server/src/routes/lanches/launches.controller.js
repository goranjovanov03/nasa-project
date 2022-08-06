const { 
    getAllLaunches,
    addNewLunch,
    existsLaunchWithId,
    abortLaunchById,
}  = require('../../models/launches.model');



function httpGetAllLaunches(req,res){
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req,res) {
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
    
    addNewLunch(launch);
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