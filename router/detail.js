const detail = require('express').Router();
const {Campaign} = require('../models/campaign');
const detailCheck = require('../rules/mythic/detailcheck');

const detailcheck = (req, res) => {
  Campaign.find({campaignID: req.body.campaignID}).exec()
    .then(campaign => {
      console.log(req.body);
      const chaos = campaign[0].chaosFactor;
      const detailres = detailCheck(chaos);

      if (detailres.hasOwnProperty('error')) {
        res.status(400).send(detailres.error);
      }
      else {
        res.status(200).json(detailres);
      }
    })
    .catch(error => {console.log(error)});
}
detail.post('/', detailcheck);

module.exports = detail;