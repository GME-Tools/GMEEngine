const settlements = require('express').Router();
const {Campaign} = require('../models/campaign');
const unmarkedSettlements = require('../rules/tables/settlements').unmarkedSettlements;

const settlementsRandom = (req, res) => {
  Campaign.find({campaignID: req.body.campaignID}).exec()
    .then(campaign => {
      console.log(req.body);
      
      let settlementsRes = "";

      if (req.body.action === "unmarkedSettlements") {
        settlementsRes = unmarkedSettlements(campaign, req.body.density);
      }

      if (settlementsRes.hasOwnProperty('error')) {
        res.status(400).send(settlementsRes.error);
      }
      else {
        res.status(200).json(settlementsRes);
      }
    })
    .catch(error => {console.log(error)});
}
settlements.post('/', settlementsRandom);

module.exports = settlements;