const dice = require('../dice');
const creatureData = require('../../data/creaturecrafter');

const creatureCrafter = (action, campaign) => {
  let creaturesNumber = 0;
  let creaturesNumberDice = dice.die(100);
  let potencyModifier = 0;

  if (creaturesNumber === 0) {
    for (let i = 1 ; i <= Object.keys(creatureData.creaturesNumber).length ; i++) {
      if (creaturesNumberDice >= creatureData.creaturesNumber[i].value[0] && creaturesNumberDice <= creatureData.creaturesNumber[i].value[1]) {
        creaturesNumber = creatureData.creaturesNumber[i].number;
        potencyModifier = creatureData.creaturesNumber[i].potencyModifier;
      }
    }
  } else {
    for (let i = 1 ; i <= Object.keys(creatureData.creaturesNumber).length ; i++) {
      if (creaturesNumber === creatureData.creaturesNumber[i].number) {
        potencyModifier = creatureData.creaturesNumber[i].potencyModifier;
      }
    }
  }



  return {

  }
}

module.exports = creatureCrafter;