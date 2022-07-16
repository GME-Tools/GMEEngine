const nature = require('express').Router();
const {Campaign} = require('../models/campaign');
const createNature = require('../rules/tables/nature').createNature;

const natureRandom = (req, res) => {
  Campaign.find({campaignID: req.body.campaignID}).exec()
    .then(campaign => {
      console.log(req.body);
      
    let natureRes = "";
  
    if (req.body.action === "createNature") {
      natureRes = createNature(campaign, req.body.density, req.body.dayNight);
    }
  
    if (natureRes.hasOwnProperty('error')) {
      res.status(400).send(natureRes.error);
    }
    else {
      res.status(200).json(natureRes);
    }
  })
}
nature.post('/', natureRandom);

module.exports = nature;