const dice = require('../dice');
const eventData = require('../../data/event');

const actionCheck = function() {
  let actionRoll = dice.die(100);
  let subjectRoll = dice.die(100);

  let action = eventData.eventAction[actionRoll].name;
  let subject = eventData.eventSubject[subjectRoll].name;

  return {
    action: action,
    subject: subject
  }
}

module.exports = actionCheck;