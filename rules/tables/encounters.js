const dice = require('../dice');
const encountersData = require('../../data/encounters');

const wildernessEncounters = function(campaign, density, dayNight) {
  let encountersNumbers = 0;
  let encountersDoneRoll = 0;
  let encountersRoll = 0;
  let encountersNameTemp = [];
  let encountersSpeRoll = 0;
  let encountersName = [];

  for (let i = 1 ; i <= Object.keys(encountersData.wildernessEncountersNumbers).length ; i++) {
    if (density === encountersData.wildernessEncountersNumbers[i].populationDensity) {
      encountersNumbers = encountersData.wildernessEncountersNumbers[i][dayNight];
    }
  }

  for (let i = 1 ; i <= encountersNumbers ; i++) {
    encountersDoneRoll = dice.die(100);

    if (encountersDoneRoll <= 25) {
      encountersRoll = dice.die(100);

      for (let j = 1 ; j <= Object.keys(encountersData.wildernessEncounters).length ; j++) {
        if (encountersRoll >= encountersData.wildernessEncounters[j].value[0] && encountersRoll <= encountersData.wildernessEncounters[j].value[1]) {
          if (encountersRoll === 5) {
            encountersSpeRoll = dice.die(100);

            if (encountersSpeRoll <= 50) {
              encountersNameTemp = encountersData.wildernessEncounters[j].name + ". Habité";
            } else {
              encountersNameTemp = encountersData.wildernessEncounters[j].name + ". Non Habité";
            }

            encountersName.push(encountersNameTemp);
          } else if (encountersRoll === 19) {
            encountersSpeRoll = dice.die(100);

            if (encountersSpeRoll <= 50) {
              encountersNameTemp = encountersData.wildernessEncounters[j].name + ". Preque vide";
            } else {
              encountersNameTemp = encountersData.wildernessEncounters[j].name + ". Vide";
            }

            encountersName.push(encountersNameTemp);
          } else if (encountersRoll === 40) {
            encountersSpeRoll = dice.die(100);

            if (encountersSpeRoll <= 50) {
              encountersNameTemp = encountersData.wildernessEncounters[j].name + ". Humains";
            } else {
              encountersNameTemp = encountersData.wildernessEncounters[j].name + ". Non humains";
            }

            encountersName.push(encountersNameTemp);
          } else if (encountersRoll === 44) {
            encountersSpeRoll = dice.die(100);

            if (encountersSpeRoll <= 50) {
              encountersNameTemp = encountersData.wildernessEncounters[j].name + ". Accompagné par une personne";
            } else {
              encountersNameTemp = encountersData.wildernessEncounters[j].name + ". Pas accompagné";
            }

            encountersName.push(encountersNameTemp);
          } else if (encountersRoll === 52) {
            encountersSpeRoll = dice.die(100);

            if (encountersSpeRoll <= 50) {
              encountersNameTemp = encountersData.wildernessEncounters[j].name + ". Humanoïde";
            } else {
              encountersNameTemp = encountersData.wildernessEncounters[j].name + ". Monstre";
            }

            encountersName.push(encountersNameTemp);
          } else if (encountersRoll === 78) {
            encountersSpeRoll = dice.die(100);

            if (encountersSpeRoll <= 80) {
              encountersNameTemp = encountersData.wildernessEncounters[j].name + ". Amicaux";
            } else {
              encountersNameTemp = encountersData.wildernessEncounters[j].name + ". Hostile";
            }

            encountersName.push(encountersNameTemp);
          } else {
            encountersName.push(encountersData.wildernessEncounters[j].name);
          }
        }
      }
    }
  }

  if (campaign[0].encounters === undefined) {
    campaign[0].encounters = encountersName;
  } else {
    campaign[0].encounters = encountersName;
  }

  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });

  return {
    encountersName: encountersName
  }
}

const urbanEncounters = function(campaign, settlement, dayNight) {
  let encountersNumbers = 0;
  let encountersDoneRoll = 0;
  let encountersRoll = 0;
  let encountersNameTemp = [];
  let encountersSpeRoll = 0;
  let encountersName = [];

  for (let i = 1 ; i <= Object.keys(encountersData.urbanEncountersNumbers).length ; i++) {
    if (settlement === encountersData.urbanEncountersNumbers[i].settlement) {
      encountersNumbers = encountersData.urbanEncountersNumbers[i][dayNight];
    }
  }

  for (let i = 1 ; i <= encountersNumbers ; i++) {
    encountersDoneRoll = dice.die(100);

    if (encountersDoneRoll <= 25) {
      encountersRoll = dice.die(100);

      for (let j = 1 ; j <= Object.keys(encountersData.urbanEncounters).length ; j++) {
        if (encountersRoll >= encountersData.urbanEncounters[j].value[0] && encountersRoll <= encountersData.urbanEncounters[j].value[1]) {
          if (encountersRoll === 27) {
            encountersSpeRoll = dice.die(20);

            if (encountersSpeRoll >= 13) {
              encountersNameTemp = encountersData.urbanEncounters[j].name + ". Vous arrivez à l'esquiver";
            } else {
              encountersNameTemp = encountersData.urbanEncounters[j].name + ". Vous n'arrivez pas à l'esquiver, vous avez désavantage à tous vos prochains jets de Charisme et de Furtivité (jusqu'à ce que vous preniez un bain et changiez de vêtements)";

              encountersSpeRoll = dice.die(20);

              if (encountersSpeRoll >= 13) {
                encountersNameTemp = encountersData.urbanEncounters[j].name + ". Vous êtes malade";
              }
            }

            encountersName.push(encountersNameTemp);
          } else if (encountersRoll >= 60 && encountersRoll <= 62) {
            let encountersSkill = "";
            encountersSpeRoll = dice.die(10);

            if (encountersSpeRoll === 1) {
                encountersSkill = "d'acrobatie/de dextérité";
            } else if (encountersSpeRoll === 2) {
                encountersSkill = "de force/d'athlétisme";
            } else if (encountersSpeRoll === 3) {
                encountersSkill = "de furtivité";
            } else if (encountersSpeRoll === 4) {
                encountersSkill = "de tromperie";
            } else if (encountersSpeRoll === 5) {
                encountersSkill = "d'intelligence";
            } else if (encountersSpeRoll === 6) {
                encountersSkill = "d'investigation";
            } else if (encountersSpeRoll === 7) {
                encountersSkill = "d'arcane";
            } else if (encountersSpeRoll === 8) {
                encountersSkill = "d'histoire";
            } else if (encountersSpeRoll === 9) {
                encountersSkill = "de nature";
            } else if (encountersSpeRoll === 10) {
                encountersSkill = "de religion";
            }

            encountersSpeRoll = dice.die(20);

            if (encountersSpeRoll >= 13) {
                encountersNameTemp = encountersData.urbanEncounters[j].name + ". Vous avez réussi votre jet " + encountersSkill;
            } else {
              encountersNameTemp = encountersData.urbanEncounters[j].name + ". Vous avez raté votre jet " + encountersSkill;
            }

            encountersName.push(encountersNameTemp);
          } else if (encountersRoll >= 63 && encountersRoll <= 65) {
            let encountersSkill = "";
            encountersSpeRoll = dice.die(10);

            if (encountersSpeRoll === 1) {
                encountersSkill = "de manipulation des animaux";
            } else if (encountersSpeRoll === 2) {
                encountersSkill = "de perspicacité";
            } else if (encountersSpeRoll === 3) {
                encountersSkill = "de survie";
            } else if (encountersSpeRoll === 4) {
                encountersSkill = "de médecine";
            } else if (encountersSpeRoll === 5) {
                encountersSkill = "de perception";
            } else if (encountersSpeRoll === 6) {
                encountersSkill = "de persuasion";
            } else if (encountersSpeRoll === 7) {
                encountersSkill = "de performance";
            } else if (encountersSpeRoll === 8) {
                encountersSkill = "de tromperie";
            } else if (encountersSpeRoll === 9) {
                encountersSkill = "d'intimidation";
            } else if (encountersSpeRoll === 10) {
                encountersSkill = "de charisme";
            }

            encountersSpeRoll = dice.die(20);

            if (encountersSpeRoll >= 13) {
                encountersNameTemp = encountersData.urbanEncounters[j].name + ". Vous avez réussi votre jet " + encountersSkill;
            } else {
              encountersNameTemp = encountersData.urbanEncounters[j].name + ". Vous avez raté votre jet " + encountersSkill;
            }

            encountersName.push(encountersNameTemp);
          } else if (encountersRoll === 90) {
            encountersSpeRoll = dice.die(100);

            if (encountersSpeRoll <= 50) {
              encountersNameTemp = encountersData.urbanEncounters[j].name + ". Vous trouvez quelque chose";
            } else {
              encountersNameTemp = encountersData.urbanEncounters[j].name + ". Vous trouvez quelque chose";
            }

            encountersName.push(encountersNameTemp);
          } else {
            encountersName.push(encountersData.urbanEncounters[j].name);
          }
        }
      }
    }
  }

  if (campaign[0].encounters === undefined) {
    campaign[0].encounters = encountersName;
  } else {
    campaign[0].encounters = encountersName;
  }

  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });

  return {
    encountersName: encountersName
  }
}

exports.wildernessEncounters = wildernessEncounters;
exports.urbanEncounters = urbanEncounters;