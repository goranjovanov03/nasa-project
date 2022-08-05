const {lanches}  = require('../../models/launches.model');



function getAllLaunches(req,res){
   
    return res.status(200).json(Array.from(lanches.values()));
}


module.exports = {
    getAllLaunches,
}