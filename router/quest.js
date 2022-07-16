const quest = require('express').Router();
const {Campaign} = require('../models/campaign');
const createQuest = require('../rules/tables/quest').createQuest;

const questRandom = (req, res) => {
  Campaign.find({campaignID: req.body.campaignID}).exec()
    .then(campaign => {
      console.log(req.body);
      
    let questRes = "";
  
    if (req.body.action === "createQuest") {
      questRes = createQuest(campaign);
    }
  
    if (questRes.hasOwnProperty('error')) {
      res.status(400).send(questRes.error);
    }
    else {
      res.status(200).json(questRes);
    }
  })
}
quest.post('/', questRandom);

module.exports = quest;