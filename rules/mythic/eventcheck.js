const dice = require('../dice');
const eventData = require('../../data/event');

const eventCheck = function() {
  let eventFocusName = "";
  let eventFocusDescription = "";
  let eventFocusNeed = "";

  let eventFocusRoll = dice.die(100);
  let eventActionRoll = dice.die(100);
  let eventSubjectRoll = dice.die(100);

  let eventAction = eventData.eventAction[eventActionRoll].name;
  let eventSubject = eventData.eventSubject[eventSubjectRoll].name;

  for (let i = 1; i <= Object.keys(eventData.eventFocus).length; i++) {
    if (eventFocusRoll >= eventData.eventFocus[i].value[0] && eventFocusRoll <= eventData.eventFocus[i].value[1]) {
      eventFocusName = eventData.eventFocus[i].name;
      eventFocusDescription = eventData.eventFocus[i].description;
      eventFocusNeed = eventData.eventFocus[i].need;
    }
  }

  return {
    eventFocusName: eventFocusName,
    eventFocusDescription: eventFocusDescription,
    eventAction: eventAction,
    eventSubject: eventSubject
  }
}

module.exports = eventCheck;