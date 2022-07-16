const creature = require('express').Router();
const {Campaign} = require('../models/campaign');
const creatureCrafter = require('../rules/mythic/creaturecrafter');

const creaturecrafter = (req, res) => {
  Campaign.find({campaignID: req.body.campaignID}).exec()
    .then(campaign => {
      console.log(req.body);

      const creatureres = creatureCrafter(req.action, campaign);

      if (creatureres.hasOwnProperty('error')) {
        res.status(400).send(creatureres.error);
      }
      else {
        res.status(200).json(creatureres);
      }
    })
    .catch(error => {console.log(error)});
}
creature.post('/', creaturecrafter);

module.exports = creature;