const campaign = require('express').Router();

const { Campaign } = require('../models/campaign');
const campaignCreation = require('../rules/campaign/campaign').campaignCreation;
const campaignDeleting = require('../rules/campaign/campaign').campaignDeleting;

const campaignGet = (req, res) => {
  Campaign.find({_id: req.params.id}).exec()
    .then(campaign => {
      res.status(200).json(campaign[0]);
    })
}

const campaignPost = (req, res) => {
  const campaignres = campaignCreation(req.body.campaignID);

  if (campaignres.hasOwnProperty('error')) {
    res.status(400).send(campaignres.error);
  }
  else {
    res.status(200).json(campaignres);
  }
}

const campaignDelete = (req, res) => {
  Campaign.find({campaignID: req.body.campaignID}).exec()
    .then(campaign => {
      console.log(req.body);

      let campaignID = "";
      let isDeleted = false;

      if (campaign.length !== 0) {
        campaignID = campaign[0].campaignID;
        isDeleted = true;
      } else {
        campaignID = req.body.campaignID;
      }

      const campaignres = campaignDeleting(campaignID, isDeleted);

      if (campaignres.hasOwnProperty('error')) {
        res.status(400).send(campaignres.error);
      }
      else {
        res.status(200).json(campaignres);
      }
    })
    .catch(error => {console.log(error)});
}

campaign.get('/:id', campaignGet);
campaign.post('/create', campaignPost);
campaign.delete('/delete', campaignDelete);

module.exports = campaign;