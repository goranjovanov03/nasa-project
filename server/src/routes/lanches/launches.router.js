const express = require('express');
const { 
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbourtLanch
 } = require('./launches.controller')

const launchesRouter = express.Router();

launchesRouter.get('/',httpGetAllLaunches);
launchesRouter.post('/',httpAddNewLaunch);
launchesRouter.delete('/:id',httpAbourtLanch);
module.exports = launchesRouter;