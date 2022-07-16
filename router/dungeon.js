const dungeon = require('express').Router();
const {Campaign} = require('../models/campaign');
const dungeonCreate = require('../rules/tables/dungeon').dungeonCreate;
const dungeonMove = require('../rules/tables/dungeon').dungeonMove;

const dungeonMode = (req, res) => {
  Campaign.find({campaignID: req.body.campaignID}).exec()
    .then(campaign => {
      console.log(req.body);

      let dungeonRes = "";

      if (req.body.action === "dungeonCreate") {
        dungeonRes = dungeonCreate(campaign, req.body.activity);
      } else if (req.body.action === "dungeonMove") {
        dungeonRes = dungeonMove(campaign, req.body.dungeon, req.body.room);
      }

      if (dungeonRes.hasOwnProperty('error')) {
        res.status(400).send(dungeonRes.error);
      }
      else {
        res.status(200).json(dungeonRes);
      }
    })
    .catch(error => {console.log(error)});
}

dungeon.post('/', dungeonMode);

module.exports = dungeon;