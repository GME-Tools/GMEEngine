const behavior = require('express').Router();
const Campaign = require('../models/campaign');
const behaviorCheck = require('../rules/mythic/behaviorcheck');

const behaviorcheck = (req, res) => {
  // Campaign.findById(req.body.campaignId).exec()
  Campaign.find({campaignID: req.body.campaignId}).exec()
    .then(campaign => {
      // const chaos = campaign[0].chaosFactor;
      // const odd = req.body.odd;
      // const yesorno = req.body.yesorno;
      const behaviorres = behaviorCheck(chaos, odd, yesorno);

      if (behaviorres.hasOwnProperty('error')) {
        res.status(400).send(behaviorres.error);
      }
      else {
        res.status(200).json(behaviorres);
      }
    })
    .catch(error => {console.log(error)});
}
behavior.post('/', behaviorcheck);

module.exports = behavior;