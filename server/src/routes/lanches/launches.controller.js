const { 
    getAllLaunches,
    secheduleNewLunch,
    existsLaunchWithId,
    abortLaunchById,
}  = require('../../models/launches.model');

const  {
    getPagination
} = require('../../../services/query');

async function httpGetAllLaunches(req,res){
    const {skip, limit} = getPagination(req.query);

    const launches = await getAllLaunches(skip,limit);
    return res.status(200).json(launches);
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

async function httpAbourtLanch(req,res){
    const launchId = req.params.id;
    const existLaunch = await existsLaunchWithId(launchId);
    if(!existLaunch){
        return res.status(400).json({
            error:'Launch not found',
        })
    }
    const aborted = await abortLaunchById(launchId)
    if(!aborted){
        return res.status(400,{
            error:'Lunch not aborted',
        });
    }
    return res.status(200).json(aborted);
}
module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbourtLanch
}