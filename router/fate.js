const fate = require('express').Router();
const Campaign = require('../models/campaign');
const fateCheck = require('../rules/mythic/fatecheck');

const fatecheck = (req, res) => {
  // Campaign.findById(req.body.campaignId).exec()
  Campaign.find({campaignID: req.body.campaignId}).exec()
    .then(campaign => {
      const chaos = campaign[0].chaosFactor;
      const odd = req.body.odd;
      const yesorno = req.body.yesorno;
      const fateres = fateCheck(chaos, odd, yesorno);

      if (fateres.hasOwnProperty('error')) {
        res.status(400).send(fateres.error);
      }
      else {
        res.status(200).json(fateres);
      }
    })
    .catch(error => {console.log(error)});
}
fate.post('/', fatecheck);

module.exports = fate;