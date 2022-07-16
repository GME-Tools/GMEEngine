const skill = require('express').Router();
const skillCheck = require('../rules/tables/skillCheck');

const skillcheck = (req, res) => {
  const skillCheckRes = skillCheck(req.body.skill, req.body.difficulty, req.body.modifier);

  if (skillCheckRes.hasOwnProperty('error')) {
    res.status(400).send(skillCheckRes.error);
  }
  else {
    res.status(200).json(skillCheckRes);
  }
}
skill.post('/', skillcheck);

module.exports = skill;