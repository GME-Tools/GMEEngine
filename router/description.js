const description = require('express').Router();
const descriptionRoll = require('../rules/mythic/descriptionroll');

const descriptionroll = (req, res) => {
  const descriptionres = descriptionRoll();

  if (descriptionres.hasOwnProperty('error')) {
    res.status(400).send(descriptionres.error);
  }
  else {
    res.status(200).json(descriptionres);
  }
}
description.get('/', descriptionroll);

module.exports = description;