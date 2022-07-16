const {Campaign} = require('../../models/campaign');
const dice = require('../dice');

const characterCreation = (campaignID, isPlayer, name, campaign) => {
  let isExisted = false;

  if (campaign[0].characters === undefined) {
    campaign[0].characters = [];

    campaign[0].characters.push({"name": name, "player": isPlayer});
  } else if (campaign[0].characters.find(character => character.name === name)) {
    isExisted = true;
  } else {
    campaign[0].characters.push({"name": name, "player": isPlayer});
  }

  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });

  return {
    isExisted: isExisted
  }
}

const characterDeleting = (campaignID, name, campaign) => {
  let isExisted = false;

  if (campaign[0].characters.find(character => character.name === name)) {
    for(let i = 0 ; i < campaign[0].characters.length ; i++) {
      if (campaign[0].characters[i].name === name) {
          campaign[0].characters.splice(i, 1);

          isExisted = true;
      }
    }
  }

  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });

  return {
    isExisted: isExisted
  }
}

const characterInformation = (campaignID, name, campaign) => {
  let sName = "";
  let isPlayer = false;
  let isExisted = true;

  if (campaign[0].characters.find(character => character.name === name)) {
    const character = campaign[0].characters.find(character => character.name === name);
    sName = character.name;
    isPlayer = character.player;
  } else {
    isExisted = false;
  }

  return {
    name: sName,
    isPlayer: isPlayer,
    isExisted: isExisted
  }
}

const characterList = (campaignID, campaign) => {
  let names = [];
  let isExisted = true;

  if (campaign[0].characters.length > 0) {
    for(let i = 0 ; i < campaign[0].characters.length ; i++) {
      names.push(campaign[0].characters[i].name);
    }
  } else {
    isExisted = false;
  }

  return {
    names: names,
    isExisted: isExisted
  }
}

const characterUpdate = (campaignID, name, category, modification, campaign) => {
  let isExisted = false;

  if (campaign[0].characters.find(character => character.name === name)) {
    for(let i = 0 ; i < campaign[0].characters.length ; i++) {
      if (campaign[0].characters[i].name === name) {
        campaign[0].characters[i][category] = modification;
        
        isExisted = true;
      }
    }
  }

  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });

  return {
    isExisted: isExisted
  }
}

const characterRandomPlayer = (campaignID, campaign) => {
  let isExisted = true;
  let name = "";
  let numberPlayers = 0;

  const resultPlayers = campaign[0].characters.filter(character => character.player === true);

  let playerRoll = 0;

  if (resultPlayers.length > 0) {
    numberPlayers = resultPlayers.length;

    playerRoll = dice.die(numberPlayers) - 1;

    name = resultPlayers[playerRoll].name;
    console.log(name);
  } else {
    isExisted = false;
  }

  return {
    name: name,
    isExisted: isExisted
  }
}

  const characterRandomNPC = (campaignID, campaign) => {
  let isExisted = true;
  let name = "";
  let numberNPC = 0;

  const resultNPC = campaign[0].characters.filter(character => character.player === false);

  let npcRoll = 0;

  if (resultNPC.length > 0) {
    numberNPC = resultNPC.length;

    npcRoll = dice.die(numberNPC) - 1;

    name = resultNPC[npcRoll].name;
  } else {
    isExisted = false;
  }

  return {
    name: name,
    isExisted: isExisted
  }
}

const characterRandomAll = (campaignID, campaign) => {
  let isExisted = true;
  let name = "";
  let numberCharacters = 0;

  let characterRoll = 0;

  if (campaign[0].characters.length > 0) {
    numberCharacters = campaign[0].characters.length;

    characterRoll = dice.die(numberCharacters) - 1;

    name = campaign[0].characters[characterRoll].name;
  } else {
    isExisted = false;
  }

  return {
    name: name,
    isExisted: isExisted
  }
}

exports.characterCreation = characterCreation;
exports.characterDeleting = characterDeleting;
exports.characterInformation = characterInformation;
exports.characterList = characterList;
exports.characterUpdate = characterUpdate;
exports.characterRandomPlayer = characterRandomPlayer;
exports.characterRandomNPC = characterRandomNPC;
exports.characterRandomAll = characterRandomAll;