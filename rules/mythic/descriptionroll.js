const dice = require('../dice');
const detailData = require('../../data/detail');

const descriptionCheck = function() {
  let descriptionRoll1 = dice.die(100);
  let descriptionRoll2 = dice.die(100);

  let description1 = detailData.descriptionTable1[descriptionRoll1].name;
  let description2 = detailData.descriptionTable2[descriptionRoll2].name;

  return {
    description1: description1,
    description2: description2
  }
}

module.exports = descriptionCheck;