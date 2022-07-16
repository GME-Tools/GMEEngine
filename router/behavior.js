const behavior = require('express').Router();
const {Campaign} = require('../models/campaign');
const behaviorDescriptors = require('../rules/mythic/behaviorcheck').behaviorDescriptors;
const behaviorDisposition = require('../rules/mythic/behaviorcheck').behaviorDisposition;
const behaviorAction = require('../rules/mythic/behaviorcheck').behaviorAction;
const behaviorTheme = require('../rules/mythic/behaviorcheck').behaviorTheme;

const behaviorcheck = (req, res) => {
  Campaign.find({campaignID: req.body.campaignID}).exec()
    .then(campaign => {
      let behaviorres = "";

      if (req.body.action === "descriptors") {
        behaviorres = behaviorDescriptors(req.body.campaignID, req.body.character, req.body.activatedDescriptors, campaign);
      } else if (req.body.action === "disposition") {
        behaviorres = behaviorDisposition(req.body.campaignID, req.body.character, campaign);
      } else if (req.body.action === "action") {
        behaviorres = behaviorAction(req.body.campaignID, req.body.character, campaign);
      } else if (req.body.action === "theme") {
        behaviorres = behaviorTheme(req.body.campaignID, req.body.theme, campaign);
      }

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