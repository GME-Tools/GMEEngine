const action = require('express').Router();
const actionRoll = require('../rules/mythic/actionroll');

const actionroll = (req, res) => {
  const actionres = actionRoll();

  if (actionres.hasOwnProperty('error')) {
    res.status(400).send(actionres.error);
  }
  else {
    res.status(200).json(actionres);
  }
}
action.get('/', actionroll);

module.exports = action;3