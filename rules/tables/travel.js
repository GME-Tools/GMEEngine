const travelData = require('../../data/travel');

const travelModeBuy = (campaign, travelMode, characterName) => {
  let isModified = false;

  let mode = "";
  let kMPerDay = 0;
  let kMPerDay2 = 0;
  let comments = "";
  let piecesOr = 0;
  
  for (let i = 0 ; i < campaign[0].characters.length ; i++) {
    if (campaign[0].characters[i].name === characterName) {
      if (campaign[0].characters[i].travel[0].travelMode !== travelMode) {
        for (let j = 1 ; j <= Object.keys(travelData.travelMode).length ; j++) {
          if (travelMode === travelData.travelMode[j].mode) {
            campaign[0].characters[i].travel[0].travelMode = travelData.travelMode[j].mode;
            mode = travelData.travelMode[j].mode;

            campaign[0].characters[i].travel[0].KMPerDay = travelData.travelMode[j].KMPerDay;
            kMPerDay = travelData.travelMode[j].KMPerDay;

            campaign[0].characters[i].travel[0].KMPerDay2 = travelData.travelMode[j].KMPerDay2;
            kMPerDay2 = travelData.travelMode[j].KMPerDay2;

            campaign[0].characters[i].travel[0].comments = travelData.travelMode[j].comments;
            comments = travelData.travelMode[j].comments;

            piecesOr = campaign[0].characters[i].piecesOr - travelData.travelMode[j].costPO;
            campaign[0].characters[i].piecesOr = campaign[0].characters[i].piecesOr - travelData.travelMode[j].costPO;
          }
        }
        isModified = true;
      }
    }
  }
  
  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });
  
  return {
    isModified: isModified,
    mode: mode,
    kMPerDay: kMPerDay,
    kMPerDay2: kMPerDay2,
    comments: comments,
    piecesOr: piecesOr
  }
}

const travelModeSell = (campaign, characterName) => {
  let isDeleted = false;

  let mode = "";
  let kMPerDay = 0;
  let kMPerDay2 = 0;
  let comments = "";
  let piecesOr = 0;

  for (let i = 0 ; i < campaign[0].characters.length ; i++) {
    if (campaign[0].characters[i].name === characterName) {
      for (let j = 1 ; j <= Object.keys(travelData.travelMode).length ; j++) {
        if (campaign[0].characters[i].travel[0].travelMode === travelData.travelMode[j].mode) {
          campaign[0].characters[i].travel[0].travelMode = "Pieds";
          mode = "Pieds";

          campaign[0].characters[i].travel[0].KMPerDay = 38;
          kMPerDay = 38;

          campaign[0].characters[i].travel[0].KMPerDay2 = 48;
          kMPerDay2 = 48;

          campaign[0].characters[i].travel[0].comments = "si 48 = -5 pénalité à la perception passive";
          comments = "si 48 = -5 pénalité à la perception passive";

          piecesOr = campaign[0].characters[i].piecesOr + travelData.travelMode[j].costPO;
          campaign[0].characters[i].piecesOr = campaign[0].characters[i].piecesOr + travelData.travelMode[j].costPO;
        }
      } 
      isDeleted = true;
    }
  }

  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });

  return {
    isDeleted: isDeleted,
    mode: mode,
    kMPerDay: kMPerDay,
    kMPerDay2: kMPerDay2,
    comments: comments,
    piecesOr: piecesOr
  }
}

const travelModeInformation = (campaign, characterName) => {
  let mode = "";
  let kMPerDay = 0;
  let kMPerDay2 = 0;
  let comments = "";

  for (let i = 0 ; i < campaign[0].characters.length ; i++) {
    if (campaign[0].characters[i].name === characterName) {
      mode = campaign[0].characters[i].travel[0].travelMode;
      kMPerDay = campaign[0].characters[i] .travel[0].KMPerDay;
      kMPerDay2 = campaign[0].characters[i].travel[0].KMPerDay2;
      comments = campaign[0].characters[i].travel[0].comments;
    }
  }

  return {
    mode: mode,
    kMPerDay: kMPerDay,
    kMPerDay2: kMPerDay2,
    comments: comments
  }
}

const travelModeTravel = (campaign, distance, characterName) => {
  let mode = "";
  let kMPerDay = 0;
  let kMPerDay2 = 0;
  let comments = "";
  let time1;
  let time2;
  let kMToDo = 0;

  for (let i = 0 ; i < campaign[0].characters.length ; i++) {
    if (campaign[0].characters[i].name === characterName) {
      mode = campaign[0].characters[i].travel[0].travelMode;
      kMPerDay = campaign[0].characters[i] .travel[0].KMPerDay;
      kMPerDay2 = campaign[0].characters[i].travel[0].KMPerDay2;
      comments = campaign[0].characters[i].travel[0].comments;

      break;
    }
  }

  if (campaign[0].weather.includes("Neige") || campaign[0].weather.includes("neige")) {
    time1 = Math.ceil(distance / (kMPerDay / 2));
    kMToDo = Math.round(distance - (kMPerDay / 2));

    if (kMPerDay2 !== null) {
      time2 = Math.ceil(distance / (kMPerDay2 / 2));
    } 
  } else if (campaign[0].weather.includes("Pluvieux") || campaign[0].weather.includes("Pluie")) {
    time1 = Math.ceil(distance / (kMPerDay / 1.5));
    kMToDo = Math.round(distance - (kMPerDay / 1.5));

    if (kMPerDay2 !== null) {
      time2 = Math.ceil(distance / (kMPerDay2 / 1.5));
    } 
  } else {
    time1 = Math.ceil(distance / kMPerDay);
    kMToDo = Math.round(distance - KMPerDay);

    if (kMPerDay2 !== null) {
      time2 = Math.ceil(distance / kMPerDay2);
    }
  }

  return {
    mode: mode,
    kMPerDay: kMPerDay,
    kMPerDay2: kMPerDay2,
    comments: comments,
    time1: time1,
    time2: time2,
    kMToDo: kMToDo
  }
}

exports.travelModeBuy = travelModeBuy;
exports.travelModeSell = travelModeSell;
exports.travelModeInformation = travelModeInformation;
exports.travelModeTravel = travelModeTravel;