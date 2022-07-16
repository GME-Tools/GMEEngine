const thread = require('express').Router();
const {Campaign} = require('../models/campaign');
const threadCreation = require('../rules/mythic/thread').threadCreation;
const threadDeleting = require('../rules/mythic/thread').threadDeleting;
const threadInformation = require('../rules/mythic/thread').threadInformation;
const threadList = require('../rules/mythic/thread').threadList;
const threadUpdate = require('../rules/mythic/thread').threadUpdate;
const threadRandomAll = require('../rules/mythic/thread').threadRandomAll;

const threadPost = (req, res) => {
  Campaign.find({campaignID: req.body.campaignID}).exec()
    .then(campaign => {
      console.log(req.body);

      let threadres;

      if (req.body.action === "add") {
        threadres = threadCreation(req.body.campaignID, req.body.name, campaign);
      } else if (req.body.action === "thread") {
        threadres = threadInformation(req.body.campaignID, req.body.name, campaign);
      } else if (req.body.action === "threads") {
        threadres = threadList(req.body.campaignID, campaign);
      } else if (req.body.action === "update") {
        threadres = threadUpdate(req.body.campaignID, req.body.name, req.body.category, req.body.modification, campaign);
      } else {
        threadres = threadRandomAll(req.body.campaignID, campaign);
      }

      if (threadres.hasOwnProperty('error')) {
        res.status(400).send(threadres.error);
      }
      else {
        res.status(200).json(threadres);
      }
    })
    .catch(error => {console.log(error)});
}

const threadDelete = (req, res) => {
  Campaign.find({campaignID: req.body.campaignID}).exec()
    .then(campaign => {
      console.log(req.body);

      const threadres = threadDeleting(req.body.campaignID, req.body.name, campaign);

      if (threadres.hasOwnProperty('error')) {
        res.status(400).send(threadres.error);
      }
      else {
        res.status(200).json(threadres);
      }
    })
    .catch(error => {console.log(error)});
}

thread.post('/post', threadPost);
thread.delete('/delete', threadDelete);

module.exports = thread;