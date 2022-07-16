const dice = require('../dice');
const statisticData = require('../../data/statistic');

const statisticCheck = function(important, strength) {
  let modifier = 0;
  const statisticCheck1 = dice.die(10);
  const statisticCheck2 = dice.die(10);
  let statisticCheckName = "";
  let statisticCheckDescription = "";
  let statisticCheckModifier = 0;
  
  if (important === true) {
    modifier = statisticData.statisticCheckModifiers[1].modifier;
  }

  for (let i = 1 ; i <= Object.keys(statisticData.statisticCheckModifiers).length ; i++) {
    if (strength === statisticData.statisticCheckModifiers[i].value) {
      modifier = modifier + statisticData.statisticCheckModifiers[i].modifier;
    }
  }

  const sum = statisticCheck1 + statisticCheck2 + modifier;

  console.log(sum);

  for (let i = 1 ; i <= Object.keys(statisticData.statisticCheckTable).length ; i++) {
    if (sum >= statisticData.statisticCheckTable[i].value[0] && sum <= statisticData.statisticCheckTable[i].value[1]) {
      statisticCheckName = statisticData.statisticCheckTable[i].name;
      statisticCheckDescription = statisticData.statisticCheckTable[i].description;
      statisticCheckModifier = statisticData.statisticCheckTable[i].modifier;
    }
  }

  return {
    statisticCheckName: statisticCheckName,
    statisticCheckDescription: statisticCheckDescription,
    statisticCheckModifier: statisticCheckModifier
  }
}

module.exports = statisticCheck;