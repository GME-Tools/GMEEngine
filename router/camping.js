const camping = require('express').Router();
const {Campaign} = require('../models/campaign');
const setCamping = require('../rules/tables/camping').setCamping;

const CampingRandom = (req, res) => {
  Campaign.find({campaignID: req.body.campaignID}).exec()
    .then(campaign => {
      console.log(req.body);
      
      let campingRes = "";

      if (req.body.action === "setCamping") {
        campingRes = setCamping(campaign, req.body.terrain);
      }

      if (campingRes.hasOwnProperty('error')) {
        res.status(400).send(campingRes.error);
      }
      else {
        res.status(200).json(campingRes);
      }
    })
    .catch(error => {console.log(error)});
}
camping.post('/', CampingRandom);

module.exports = camping;