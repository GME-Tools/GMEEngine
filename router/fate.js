const fate = require('express').Router();
const Campaign = require('../models/campaign');
const fateCheck = require('../rules/mythic/fatecheck');

const fatecheck = (req, res) => {
  Campaign.findById(req.body.campaignId).exec()
    .then(campaign => {
      const chaos = campaign.chaosFactor;
      const odd = req.body.odd;
      const yesorno = req.body.yesorno;
      const checkres = fateCheck(chaos, odd, yesorno);

      if (checkres.hasOwnProperty('error')) {
        res.status(400).send(checkres.error);
      }
      else {
        res.status(200).json(checkres);
      }
    })
    .catch(error => {console.log(error)});
}
fate.post('/', fatecheck);

module.exports = fate;