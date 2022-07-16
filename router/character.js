const character = require('express').Router();
const {Campaign} = require('../models/campaign');
const characterCreation = require('../rules/mythic/character').characterCreation;
const characterDeleting = require('../rules/mythic/character').characterDeleting;
const characterInformation = require('../rules/mythic/character').characterInformation;
const characterList = require('../rules/mythic/character').characterList;
const characterUpdate = require('../rules/mythic/character').characterUpdate;
const characterRandomPlayer = require('../rules/mythic/character').characterRandomPlayer;
const characterRandomNPC = require('../rules/mythic/character').characterRandomNPC;
const characterRandomAll = require('../rules/mythic/character').characterRandomAll;

const characterPost = (req, res) => {
  Campaign.find({campaignID: req.body.campaignID}).exec()
    .then(campaign => {
      console.log(req.body);

      let characterres;

      if (req.body.action === "add") {
        characterres = characterCreation(req.body.campaignID, req.body.isPlayer, req.body.name, campaign);
      } else if (req.body.action === "character") {
        characterres = characterInformation(req.body.campaignID, req.body.name, campaign);
      } else if (req.body.action === "characters") {
        characterres = characterList(req.body.campaignID, campaign);
      } else if (req.body.action === "update") {
        characterres = characterUpdate(req.body.campaignID, req.body.name, req.body.category, req.body.modification, campaign);
      } else if (req.body.action === "randomPlayer") {
        characterres = characterRandomPlayer(req.body.campaignID, campaign);
      } else if (req.body.action === "randomNPC") {
        characterres = characterRandomNPC(req.body.campaignID, campaign);
      } else {
        characterres = characterRandomAll(req.body.campaignID, campaign);
      }

      if (characterres.hasOwnProperty('error')) {
        res.status(400).send(characterres.error);
      }
      else {
        res.status(200).json(characterres);
      }
    })
    .catch(error => {console.log(error)});
}

const characterDelete = (req, res) => {
  Campaign.find({campaignID: req.body.campaignID}).exec()
    .then(campaign => {
      console.log(req.body);

      const characterres = characterDeleting(req.body.campaignID, req.body.name, campaign);

      if (characterres.hasOwnProperty('error')) {
        res.status(400).send(characterres.error);
      }
      else {
        res.status(200).json(characterres);
      }
    })
    .catch(error => {console.log(error)});
}

character.post('/post', characterPost);
character.delete('/delete', characterDelete);

module.exports = character;