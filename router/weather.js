const weather = require('express').Router();
const {Campaign} = require('../models/campaign');
const seasonSet = require('../rules/tables/weather').seasonSet;
const seasonRead = require('../rules/tables/weather').seasonRead;
const weatherRandom = require('../rules/tables/weather').weatherRandom;
const weatherRead = require('../rules/tables/weather').weatherRead;

const weatherMode = (req, res) => {
  Campaign.find({campaignID: req.body.campaignID}).exec()
    .then(campaign => {
      console.log(req.body);

      let weatherRes = "";

      if (req.body.action === "seasonSet") {
        weatherRes = seasonSet(campaign, req.body.season);
      } else if (req.body.action === "seasonRead") {
        weatherRes = seasonRead(campaign);
      } else if (req.body.action === "weatherRandom") {
        weatherRes = weatherRandom(campaign, req.body.modifier);
      } else if (req.body.action === "weatherRead") {
        weatherRes = weatherRead(campaign);
      }

      if (weatherRes.hasOwnProperty('error')) {
        res.status(400).send(weatherRes.error);
      }
      else {
        res.status(200).json(weatherRes);
      }
    })
    .catch(error => {console.log(error)});
}

weather.post('/', weatherMode);

module.exports = weather;