const fantasyloot = require('express').Router();
const {Campaign} = require('../models/campaign');
const fantasyLootGenerator = require('../rules/tables/fantasyLootGenerator').fantasyLootGenerator;

const fantasylootgenerator = (req, res) => {
  Campaign.find({campaignID: req.body.campaignID}).exec()
    .then(campaign => {
      console.log(req.body);
      
      const fantasyLootGeneratorRes = fantasyLootGenerator(campaign, req.body.lootBody, req.body.lootPlace);

      if (fantasyLootGeneratorRes.hasOwnProperty('error')) {
        res.status(400).send(fantasyLootGeneratorRes.error);
      }
      else {
        res.status(200).json(fantasyLootGeneratorRes);
      }
    })
    .catch(error => {console.log(error)});
}
fantasyloot.post('/', fantasylootgenerator);

module.exports = fantasyloot;