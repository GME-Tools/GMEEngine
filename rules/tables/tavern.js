const dice = require('../dice');
const tavernData = require('../../data/tavern');

const createTavern = function(campaign) {
  let tavernNameRoll1 = dice.die(20);
  let tavernNameRoll2 = dice.die(20);
  let tavernName = "";
  let tavernRoomsRoll = dice.die(10);
  let tavernRooms = 0;
  let tavernQualityRoll = dice.die(10);
  let tavernQuality = "";
  let tavernInnkeepRoll = dice.die(10);
  let tavernInnkeep = "";
  let tavernRumoursRoll = dice.die(10);
  let tavernRumours = 0;
  let tavernCustomerServiceRoll = dice.die(10);
  let tavernCustomerService = "";
  let tavernRumoursGenerateRoll = 0;
  let tavernRumoursGenerate = [];
  let tavernRumoursLocationRoll = 0;
  let tavernRumoursLocation = [];

  for (let i = 1 ; i <= Object.keys(tavernData.tavernName).length ; i++) {
    if (tavernNameRoll1 >= tavernData.tavernName[i].value[0] && tavernNameRoll1 <= tavernData.tavernName[i].value[1]) {
      tavernName = tavernData.tavernName[i].name1;
    }
  }

  for (let i = 1 ; i <= Object.keys(tavernData.tavernName).length ; i++) {
    if (tavernNameRoll2 >= tavernData.tavernName[i].value[0] && tavernNameRoll2 <= tavernData.tavernName[i].value[1]) {
      tavernName = tavernName + " " + tavernData.tavernName[i].name2;
    }
  }

  for (let i = 1 ; i <= Object.keys(tavernData.tavernDescription).length ; i++) {
    if (tavernRoomsRoll >= tavernData.tavernDescription[i].value[0] && tavernRoomsRoll <= tavernData.tavernDescription[i].value[1]) {
      tavernRooms = tavernData.tavernDescription[i].rooms;
    }
  }

  for (let i = 1 ; i <= Object.keys(tavernData.tavernDescription).length ; i++) {
    if (tavernQualityRoll >= tavernData.tavernDescription[i].value[0] && tavernQualityRoll <= tavernData.tavernDescription[i].value[1]) {
      tavernQuality = tavernData.tavernDescription[i].quality;
    }
  }

  for (let i = 1 ; i <= Object.keys(tavernData.tavernDescription).length ; i++) {
    if (tavernInnkeepRoll >= tavernData.tavernDescription[i].value[0] && tavernInnkeepRoll <= tavernData.tavernDescription[i].value[1]) {
      tavernInnkeep = tavernData.tavernDescription[i].innkeep;
    }
  }

  for (let i = 1 ; i <= Object.keys(tavernData.tavernDescription).length ; i++) {
    if (tavernRumoursRoll >= tavernData.tavernDescription[i].value[0] && tavernRumoursRoll <= tavernData.tavernDescription[i].value[1]) {
      tavernRumours = tavernData.tavernDescription[i].rumours;
    }
  }

  for (let i = 1 ; i <= Object.keys(tavernData.tavernDescription).length ; i++) {
    if (tavernCustomerServiceRoll >= tavernData.tavernDescription[i].value[0] && tavernCustomerServiceRoll <= tavernData.tavernDescription[i].value[1]) {
      tavernCustomerService = tavernData.tavernDescription[i].customerService;
    }
  }

  for (let i = 0 ; i < tavernRumours ; i++) {
    tavernRumoursGenerateRoll = dice.die(4);

    for (let j = 1 ; j <= Object.keys(tavernData.rumoursGenerate).length ; j++) {
      if (tavernRumoursGenerateRoll >= tavernData.rumoursGenerate[j].value[0] && tavernRumoursGenerateRoll <= tavernData.rumoursGenerate[j].value[1]) {
        tavernRumoursGenerate.push(tavernData.rumoursGenerate[j].subject);
      }
    }

    if (tavernRumoursGenerate[i] === "Endroit") {
      tavernRumoursLocationRoll = dice.die(12);

      for (let j = 1 ; j <= Object.keys(tavernData.rumoursLocation).length ; j++) {
        if (tavernRumoursLocationRoll >= tavernData.rumoursLocation[j].value[0] && tavernRumoursLocationRoll <= tavernData.rumoursLocation[j].value[1]) {
          tavernRumoursLocation.push(tavernData.rumoursLocation[j].place);
        }
      }
    } else {
      tavernRumoursLocation.push("");
    }
  }

  if (campaign[0].taverns === undefined || campaign[0].taverns.length === 0) {
    campaign[0].taverns = [];
  }

  campaign[0].taverns.push({"tavernName": tavernName, "tavernRooms": tavernRooms, "tavernQuality": tavernQuality, "tavernInnkeep": tavernInnkeep, "tavernRumours": tavernRumours, "tavernCustomerService": tavernCustomerService, "tavernRumoursGenerate": tavernRumoursGenerate, "tavernRumoursLocation": tavernRumoursLocation});

  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });

  return {
    tavernName: tavernName,
    tavernRooms: tavernRooms,
    tavernQuality: tavernQuality,
    tavernInnkeep: tavernInnkeep,
    tavernRumours: tavernRumours,
    tavernCustomerService: tavernCustomerService,
    tavernRumoursGenerate: tavernRumoursGenerate,
    tavernRumoursLocation: tavernRumoursLocation
  }
}

exports.createTavern = createTavern;