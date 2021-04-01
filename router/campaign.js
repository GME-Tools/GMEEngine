const campaign = require('express').Router();
const Campaign = require('../models/campaign');
const campaignCreation = require('../rules/campaign/campaign').campaignCreation;
const campaignDeleting = require('../rules/campaign/campaign').campaignDeleting;

const campaignPost = (req, res) => {
  Campaign.find({campaignID: req.body.campaignID}).exec()
    .then(campaign => {
      console.log(req.body);

      let campaignID = "";
      let isNew = false;

      if (campaign.length !== 0) {
        campaignID = campaign[0].campaignID;
      } else {
        campaignID = req.body.campaignID;
        isNew = true;
      }

      const campaignres = campaignCreation(campaignID, isNew);

      if (campaignres.hasOwnProperty('error')) {
        res.status(400).send(campaignres.error);
      }
      else {
        res.status(200).json(campaignres);
      }
    })
    .catch(error => {console.log(error)});
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

campaign.post('/create', campaignPost);
campaign.delete('/delete', campaignDelete);

module.exports = campaign;