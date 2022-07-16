const adventure = require('express').Router();
const {Campaign} = require('../models/campaign');
const themeCreation = require('../rules/mythic/adventurecrafter').themeCreation;
const themeList = require('../rules/mythic/adventurecrafter').themeList;
const characterRandom = require('../rules/mythic/adventurecrafter').characterRandom;
const plotRandom = require('../rules/mythic/adventurecrafter').plotRandom;
const characterList = require('../rules/mythic/adventurecrafter').characterList;
const plotList = require('../rules/mythic/adventurecrafter').plotList;
const characterInformation = require('../rules/mythic/adventurecrafter').characterInformation;
const plotInformation = require('../rules/mythic/adventurecrafter').plotInformation;
const characterAdd = require('../rules/mythic/adventurecrafter').characterAdd;
const plotAdd = require('../rules/mythic/adventurecrafter').plotAdd;
const characterUpdate = require('../rules/mythic/adventurecrafter').characterUpdate;
const plotUpdate = require('../rules/mythic/adventurecrafter').plotUpdate;
const characterDelete = require('../rules/mythic/adventurecrafter').characterDelete;
const plotDelete = require('../rules/mythic/adventurecrafter').plotDelete;
const themeRandom = require('../rules/mythic/adventurecrafter').themeRandom;
const plotPoints = require('../rules/mythic/adventurecrafter').plotPoints;
const needsRandom = require('../rules/mythic/adventurecrafter').needsRandom;
const plotPointsRead = require('../rules/mythic/adventurecrafter').plotPointsRead;
const plotPointsUpdate = require('../rules/mythic/adventurecrafter').plotPointsUpdate;
const characterCreation = require('../rules/mythic/adventurecrafter').characterCreation;

const adventurecrafter = (req, res) => {
  Campaign.find({campaignID: req.body.campaignID}).exec()
    .then(campaign => {
      let adventureres = "";

      console.log(req.body);
      
      if (req.body.action === "themeCreation") {
        adventureres = themeCreation(campaign, themes);
      } else if (req.body.action === "themeList") {
        adventureres = themeList(campaign);
      } else if (req.body.action === "characterRandom") {
        adventureres = characterRandom(campaign);
      } else if (req.body.action === "plotRandom") {
        adventureres = plotRandom(campaign, req.body.add);
      } else if (req.body.action === "characterList") {
        adventureres = characterList(campaign);
      } else if (req.body.action === "plotList") {
        adventureres = plotList(campaign);
      } else if (req.body.action === "characterInformation") {
        adventureres = characterInformation(campaign, req.body.character);
      } else if (req.body.action === "plotInformation") {
        adventureres = plotInformation(campaign, req.body.plot);
      } else if (req.body.action === "characterAdd") {
        adventureres = characterAdd(campaign, req.body.character);
      } else if (req.body.action === "plotAdd") {
        adventureres = plotAdd(campaign, req.body.plot);
      } else if (req.body.action === "characterUpdate") {
        adventureres = characterUpdate(campaign, req.body.characterOld, req.body.characterNew);
      } else if (req.body.action === "plotUpdate") {
        adventureres = plotUpdate(campaign, req.body.plotOld, req.body.plotNew);
      } else if (req.body.action === "characterDelete") {
        adventureres = characterDelete(campaign, req.body.character);
      } else if (req.body.action === "plotDelete") {
        adventureres = plotDelete(campaign, req.body.plot);
      } else if (req.body.action === "themeRandom") {
        adventureres = themeRandom(campaign);
      } else if (req.body.action === "plotPoints") {
        adventureres = plotPoints(campaign);
      } else if (req.body.action === "needsRandom") {
        adventureres = needsRandom(campaign, req.body.needs);
      } else if (req.body.action === "plotPointsRead") {
        adventureres = plotPointsRead(campaign);
      } else if (req.body.action === "plotPointsUpdate") {
        adventureres = plotPointsUpdate(campaign, req.body.plotPoint, req.body.need, req.body.characterPlot);
      } else if (req.body.action === "characterCreation") {
        adventureres = characterCreation(campaign, req.body.needs, req.body.name);
      }
      
      if (adventureres.hasOwnProperty('error')) {
        res.status(400).send(adventureres.error);
      }
      else {
        res.status(200).json(adventureres);
      }
    })
    .catch(error => {console.log(error)});
}

adventure.post('/', adventurecrafter);

module.exports = adventure;