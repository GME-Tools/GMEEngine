const event = require('express').Router();
const eventCheck = require('../rules/mythic/eventcheck');

const eventcheck = (req, res) => {
  const eventres = eventCheck();

  if (eventres.hasOwnProperty('error')) {
    res.status(400).send(eventres.error);
  }
  else {
    res.status(200).json(eventres);
  }
}
event.get('/', eventcheck);

module.exports = event;