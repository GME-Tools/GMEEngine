const dice = require('../dice');

const odds = {
  LI: 2,
  VL: 4,
  ST: 6,
  HB: 8,
  NS: 0,
  UL: -2,
  VU: -4,
  NW: -6,
  IM: -8
}

const fateCheck = (chaos, odd, yesorno) => {
  if (Object.keys(odds).includes(odd.toString().toUpperCase()) && (yesorno === "Yes" || yesorno === 'No')) {
    const oddmod = odds[odd.toString().toUpperCase()];
    const chaosmod = (yesorno === 'Yes'?-1:1) * 2 * Math.trunc(chaos-4.5);
    const roll1 = dice.die(10);
    const roll2 = dice.die(10);
    const chaosroll = dice.die(10);

    let isYes = roll1 + roll2 + oddmod + chaosmod >= 10;

    /* if (yesorno === "Yes") {
        isYes = roll1 + roll2 + oddmod + chaosmod >= 10;
      } else {
        isYes = roll1 + roll2 + oddmod + chaosmod < 10;
      } */
    
    let isExceptional = false;
    let randomEvent = false;

    if (chaosroll <= chaos) {
      if (roll1 === roll2) {
        isExceptional = true;
        randomEvent = true;
      }
      else {
        if (roll1 % 2 && roll2 % 2) {
          isExceptional = true;
        }
        if (!(roll1 % 2) && !(roll2 % 2)) {
          randomEvent = true;
        }
      }
    }

    return {
      dice: [roll1, roll2, chaosroll],
      mods: [oddmod, chaosmod],
      isYes: isYes,
      isExceptional: isExceptional,
      randomEvent: randomEvent
    }
  }
  else {
    return {
      error: "Invalid arguments"
    }
  }
}

module.exports = fateCheck;