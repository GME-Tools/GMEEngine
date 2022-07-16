const statistic = require('express').Router();
const statisticCheck = require('../rules/mythic/statisticcheck');

const statisticcheck = (req, res) => {
  const statisticres = statisticCheck(req.body.important, req.body.strength);

  if (statisticres.hasOwnProperty('error')) {
    res.status(400).send(statisticres.error);
  }
  else {
    res.status(200).json(statisticres);
  }
}
statistic.post('/', statisticcheck);

module.exports = statistic;