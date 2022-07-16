const travel = require('express').Router();
const {Campaign} = require('../models/campaign');
const travelModeBuy = require('../rules/tables/travel').travelModeBuy;
const travelModeSell = require('../rules/tables/travel').travelModeSell;
const travelModeInformation = require('../rules/tables/travel').travelModeInformation;
const travelModeTravel = require('../rules/tables/travel').travelModeTravel;

const travelmode = (req, res) => {
  Campaign.find({campaignID: req.body.campaignID}).exec()
    .then(campaign => {
      console.log(req.body);

      let travelModeRes = "";

      if (req.body.action === "travelModeInformation") {
        travelModeRes = travelModeInformation(campaign, req.body.character);
      } else if (req.body.action === "travelModeBuy") {
        travelModeRes = travelModeBuy(campaign, req.body.travelMode, req.body.character);
      } else if (req.body.action === "travelModeSell") {
        travelModeRes = travelModeSell(campaign, req.body.character);
      } else if (req.body.action === "travelModeTravel") {
        travelModeRes = travelModeTravel(campaign, req.body.distance, req.body.character);
      }

      if (travelModeRes.hasOwnProperty('error')) {
        res.status(400).send(travelModeRes.error);
      }
      else {
        res.status(200).json(travelModeRes);
      }
    })
    .catch(error => {console.log(error)});
}

travel.post('/', travelmode);

module.exports = travel;