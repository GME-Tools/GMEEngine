const encounters = require('express').Router();
const {Campaign} = require('../models/campaign');
const wildernessEncounters = require('../rules/tables/encounters').wildernessEncounters;
const urbanEncounters = require('../rules/tables/encounters').urbanEncounters;

const encountersRandom = (req, res) => {
  Campaign.find({campaignID: req.body.campaignID}).exec()
    .then(campaign => {
      console.log(req.body);
      
      let encountersRes = "";

      if (req.body.action === "wildernessEncounters") {
        encountersRes = wildernessEncounters(campaign, req.body.density, req.body.dayNight);
      } else if (req.body.action === "urbanEncounters") {
        encountersRes = urbanEncounters(campaign, req.body.settlement, req.body.dayNight);
      }

      if (encountersRes.hasOwnProperty('error')) {
        res.status(400).send(encountersRes.error);
      }
      else {
        res.status(200).json(encountersRes);
      }
    })
    .catch(error => {console.log(error)});
}
encounters.post('/', encountersRandom);

module.exports = encounters;