const dice = require('../dice');

const skillDifficulties = {
  TF: 5,
  FA: 10,
  MO: 15,
  DI: 20,
  TD: 25,
  PI: 30
}

const skillCheck = function(skill, difficulty, modifier) {
  const roll = dice.die(20);
  let check = false;
  const modifierInt = parseInt(modifier, 10);
  
  console.log(roll);
  console.log(modifierInt);
  console.log(skillDifficulties[difficulty]);
  
  if ((roll + modifierInt) >= skillDifficulties[difficulty]) {
    check = true;
  }
  
  return {
    check: check
  }
}

exports.skillCheck = skillCheck;