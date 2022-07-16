const tavern = require('express').Router();
const {Campaign} = require('../models/campaign');
const createTavern = require('../rules/tables/tavern').createTavern;

const tavernRandom = (req, res) => {
  Campaign.find({campaignID: req.body.campaignID}).exec()
    .then(campaign => {
      console.log(req.body);
      
      let tavernRes = "";

      if (req.body.action === "createTavern") {
        tavernRes = createTavern(campaign);
      }

      if (tavernRes.hasOwnProperty('error')) {
        res.status(400).send(tavernRes.error);
      }
      else {
        res.status(200).json(tavernRes);
      }
    })
    .catch(error => {console.log(error)});
}
tavern.post('/', tavernRandom);

module.exports = tavern;