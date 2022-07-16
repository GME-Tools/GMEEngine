const dice = require('../dice');
const campingData = require('../../data/camping');

const setCamping = function(campaign, terrain) {
  let dcCamping = 0;
  let findRoll = dice.die(20);
  let findCamping = false;
  let dcBivouac = 0;
  let bivouacRoll = 0;
  let bivouacSuccess = false;
  let disturbanceTrueRoll = 0;
  let disturbanceRoll = 0;
  let disturbanceName = "";

  for (let i = 1 ; i <= Object.keys(campingData.findCamping).length ; i++) {
    if (campingData.findCamping[i].terrain.includes(terrain)) {
      dcCamping = campingData.findCamping[i].dcCamping;
      dcBivouac = campingData.findCamping[i].dcBivouac;
    }
  }

  if (findRoll >= dcCamping) {
    findCamping = true;
    bivouacSuccess = true;
  }

  if (campaign[0].weather.includes("Neige") || campaign[0].weather.includes("neige")) {
    bivouacRoll = dice.die(20);

    if (bivouacRoll < dcBivouac) {
      bivouacSuccess = false;
    }
  } else if (campaign[0].weather.includes("Pluvieux") || campaign[0].weather.includes("Pluie")) {
    bivouacRoll = dice.die(20);

    if (bivouacRoll < dcBivouac) {
      bivouacSuccess = false;
    }
  }

  if (findCamping === true && bivouacSuccess === true) {
    disturbanceTrueRoll = dice.die(100);

    if (disturbanceTrueRoll > 75) {
      disturbanceRoll = dice.die(100);

      for (let i = 1 ; i <= Object.keys(campingData.wakesYou).length ; i++) {
        if (disturbanceRoll >= campingData.wakesYou[i].value[0] && disturbanceRoll <= campingData.wakesYou[i].value[1]) {
          disturbanceName = campingData.wakesYou[i].name;
        }
      }
    }
  } else if ((findCamping === true && bivouacSuccess === false) || (findCamping === false && bivouacSuccess === true))  {
    disturbanceTrueRoll = dice.die(100);

    if (disturbanceTrueRoll > 50) {
      disturbanceRoll = dice.die(100);

      for (let i = 1 ; i <= Object.keys(campingData.wakesYou).length ; i++) {
        if (disturbanceRoll >= campingData.wakesYou[i].value[0] && disturbanceRoll <= campingData.wakesYou[i].value[1]) {
          disturbanceName = campingData.wakesYou[i].name;
        }
      }
    }
  } else {
    disturbanceTrueRoll = dice.die(100);

    if (disturbanceTrueRoll > 25) {
      disturbanceRoll = dice.die(100);

      for (let i = 1 ; i <= Object.keys(campingData.wakesYou).length ; i++) {
        if (disturbanceRoll >= campingData.wakesYou[i].value[0] && disturbanceRoll <= campingData.wakesYou[i].value[1]) {
          disturbanceName = campingData.wakesYou[i].name;
        }
      }
    }
  }

  if (campaign[0].camping === undefined || campaign[0].camping.length === 0) {
    campaign[0].camping = [];
    campaign[0].camping.push({"findCamping": findCamping, "bivouacSuccess": bivouacSuccess, "disturbanceName": disturbanceName});
  } else {
    campaign[0].camping[0].findCamping = findCamping;
    campaign[0].camping[0].bivouacSuccess = bivouacSuccess;
    campaign[0].camping[0].disturbanceName = disturbanceName;
  }

  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });

  return {
    findCamping: findCamping,
    bivouacSuccess: bivouacSuccess,
    disturbanceName: disturbanceName
  }
}

exports.setCamping = setCamping;