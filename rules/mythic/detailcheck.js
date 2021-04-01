const dice = require('../dice');
const detailData = require('../../data/detail');
const eventData = require('../../data/event');

const detailCheck = (chaos) => {
  const chaosmod = -2 * Math.trunc(chaos-4.5);
  const roll1 = dice.die(10);
  const roll2 = dice.die(10);
  const sum = roll1 + roll2 + chaosmod;

  let detailName = "";
  let detailDescription = "";
  let detailNeed = "";

  for (let i = 1 ; i <= Object.keys(detailData.detailCheck).length ; i++) {
    if (sum >= detailData.detailCheck[i].value[0] && sum <= detailData.detailCheck[i].value[1]) {
      detailName = detailData.detailCheck[i].name;
      detailDescription = detailData.detailCheck[i].description;
      detailNeed = detailData.detailCheck[i].need;
    }
  }

  return {
    detailName: detailName,
    detailDescription: detailDescription
  }
}

module.exports = detailCheck;