const dice = require('../dice');
const behaviorData = require('../../data/behavior');
const detailData = require('../../data/detail');
const eventData = require('../../data/event');

const behaviorDescriptors = (campaignID, name, activatedDescriptors, campaign) => {
  let isExisted = false;

  if (campaign[0].characters.find(character => character.name === name)) {
    for(let i = 0 ; i < campaign[0].characters.length ; i++) {
      if (campaign[0].characters[i].name === name) {
        campaign[0].characters[i].activatedDescriptors = activatedDescriptors;
      }
    }

    isExisted = true;
  }

  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });

  return {
    isExisted: isExisted
  }
}  

const behaviorDisposition = (campaignID, name, campaign) => {
  let isExisted = false;
  let activatedDescriptors = 0;
  let dispositionName = "";
  let dispositionDescription = "";
  let dispositionModifier = "";

  const disposition1 = dice.die(10);
  const disposition2 = dice.die(10);

  if (campaign[0].characters.find(character => character.name === name)) {
    for(let i = 0 ; i < campaign[0].characters.length ; i++) {
      if (campaign[0].characters[i].name === name) {
        activatedDescriptors = campaign[0].characters[i].activatedDescriptors;

        isExisted = true;
      }
    }
  }

  const sum = disposition1 + disposition2 + activatedDescriptors;

  for (let i = 1 ; i <= Object.keys(behaviorData.disposition).length ; i++) {
    if (sum >= behaviorData.disposition[i].value[0] && sum <= behaviorData.disposition[i].value[1]) {
      dispositionName = behaviorData.disposition[i].name;
      dispositionDescription = behaviorData.disposition[i].description;
      dispositionModifier = behaviorData.disposition[i].modifier;
    }
  }

  if (campaign[0].characters.find(character => character.name === name)) {
    for(let i = 0 ; i < campaign[0].characters.length ; i++) {
      if (campaign[0].characters[i].name === name) {
        campaign[0].characters[i].dispositionName = dispositionName;
        campaign[0].characters[i].dispositionModifier = dispositionModifier;
        campaign[0].characters[i].dispositionScore = sum;
      }
    }
  }

  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });

  return {
    dispositionName: dispositionName,
    dispositionDescription: dispositionDescription,
    dispositionModifier: dispositionModifier,
    isExisted: isExisted
  }
}

const behaviorAction = (campaignID, name, campaign) => {
  let isExisted = false;
  let resultat = "";
  const action1 = dice.die(10);
  let dispositionModifier = 0;
  let action1Name = "";
  let action1Description = "";
  let action1ModifierDisposition = 0;
  let action1ModifierAction = 0;
  let action1Action2 = false;
  let dispositionScore = 0;
  let dispositionName = "";
  let dispositionDescription = "";
  let action2Name = "";
  let action2Description = "";
  let action2Need = [];
  let descriptor = "";
  let actionDescriptionDescriptor = "";

  if (campaign[0].characters.find(character => character.name === name)) {
    for(let i = 0 ; i < campaign[0].characters.length ; i++) {
      if (campaign[0].characters[i].name === name) {
        dispositionModifier = campaign[0].characters[i].dispositionModifier;
        dispositionScore = campaign[0].characters[i].dispositionScore;
      }
    }

    isExisted = true;
  }

  const sum = action1 + dispositionModifier;

  for (let i = 1 ; i <= Object.keys(behaviorData.actionTable1).length ; i++) {
    if (sum >= behaviorData.actionTable1[i].value[0] && sum <= behaviorData.actionTable1[i].value[1]) {
      action1Name = behaviorData.actionTable1[i].name;
      action1Description = behaviorData.actionTable1[i].description;
      action1ModifierDisposition = behaviorData.actionTable1[i].modifierDisposition;
      action1ModifierAction = behaviorData.actionTable1[i].modifierAction;
      action1Action2 = behaviorData.actionTable1[i].action2;
    }
  }

  if (action1ModifierDisposition !== 0) {
    dispositionScore = dispositionScore + action1ModifierDisposition;

    resultat = "nouvelle disposition";
    
    for (let i = 1 ; i <= Object.keys(behaviorData.disposition).length ; i++) {
      if (dispositionScore >= behaviorData.disposition[i].value[0] && dispositionScore <= behaviorData.disposition[i].value[1]) {
        dispositionName = behaviorData.disposition[i].name;
        dispositionDescription = behaviorData.disposition[i].description;
        dispositionModifier = behaviorData.disposition[i].modifier;
      }
    }

    if (campaign[0].characters.find(character => character.name === name)) {
      for(let i = 0 ; i < campaign[0].characters.length ; i++) {
        if (campaign[0].characters[i].name === name) {
          campaign[0].characters[i].dispositionName = dispositionName;
          campaign[0].characters[i].dispositionModifier = dispositionModifier;
          campaign[0].characters[i].dispositionScore = dispositionScore;
        }
      }
    }

    campaign[0].save(function (err) {
      if (err) {
        console.log(err);
        return handleError(err);
      }
    });

  } else if (action1Action2 === true) {
    resultat = "action2";

    if (campaign[0].characters.find(character => character.name === name)) {
      for(let i = 0 ; i < campaign[0].characters.length ; i++) {
        if (campaign[0].characters[i].name === name) {
          campaign[0].characters[i].action1ModifierAction = action1ModifierAction;
        }
      }
    }

    const action2Dice1 = dice.die(10);
    const action2Dice2 = dice.die(10);

    const sumAction2 = action2Dice1 + action2Dice2 + dispositionModifier + action1ModifierAction;

    for (let i = 1 ; i <= Object.keys(behaviorData.actionTable2).length ; i++) {
      if (sumAction2 >= behaviorData.actionTable2[i].value[0] && sumAction2 <= behaviorData.actionTable2[i].value[1]) {
        action2Name = behaviorData.actionTable2[i].name;
        action2Description = behaviorData.actionTable2[i].description;

        for (let j = 0 ; j < behaviorData.actionTable2[i].need.length ; j++) {
          action2Need[j] = behaviorData.actionTable2[i].need[j];
        }
      }
    }

    if (action2Need.includes("descripteur")) {
      const descriptorRandom = dice.die(3);

      if (descriptorRandom === 1) {
        descriptor = "identity";
      } else if (descriptorRandom === 2) {
        descriptor = "personality";
      } else {
        descriptor = "activity";
      }

      let actionDescriptionDescriptor1 = dice.die(100);
      let actionDescriptionDescriptor2 = dice.die(100);

      if (descriptor === "identity" || descriptor === "personality") {
        actionDescriptionDescriptor = detailData.descriptionTable1[actionDescriptionDescriptor1].name + " - " + detailData.descriptionTable2[actionDescriptionDescriptor2].name;
      } else if (descriptor === "activity") {
        actionDescriptionDescriptor = eventData.eventAction[actionDescriptionDescriptor1].name + " - " + eventData.eventSubject[actionDescriptionDescriptor2].name;
      }

      if (campaign[0].characters.find(character => character.name === name)) {
        for(let i = 0 ; i < campaign[0].characters.length ; i++) {
          if (campaign[0].characters[i].name === name) {
            if (campaign[0].characters[i][descriptor].length !== 3) {
              campaign[0].characters[i][descriptor].push(actionDescriptionDescriptor);

              campaign[0].characters[i][descriptor][0] = "2";
            } else {
              if (campaign[0].characters[i][descriptor][0] === "1") {
                campaign[0].characters[i][descriptor][0] = "2";
              } else {
                campaign[0].characters[i][descriptor][0] = "1";
              }
            }
          }
        }
      }
    }

    campaign[0].save(function (err) {
      if (err) {
        console.log(err);
        return handleError(err);
      }
    });

  }

  return {
    action1Name: action1Name,
    action1ModifierDisposition: action1ModifierDisposition,
    action1Description: action1Description,
    dispositionScore: dispositionScore,
    dispositionName: dispositionName,
    dispositionModifier: dispositionModifier,
    dispositionDescription: dispositionDescription,
    action2Name: action2Name,
    action2Description: action2Description,
    action2Need: action2Need,
    descriptor: descriptor,
    actionDescriptionDescriptor: actionDescriptionDescriptor,
    resultat: resultat,
    isExisted: isExisted
  }
}

const behaviorTheme = (campaignID, theme, campaign) => {
  let isExisted = false;
  let isModified = false;
  let sTheme = "";

  if (theme !== "") {
    campaign[0].theme = theme;

    isModified = true;

    campaign[0].save(function (err) {
      if (err) return handleError(err);
    });

    return {
      isModified: isModified
    }
  } else {
    sTheme = campaign[0].theme;

    if (sTheme !== undefined) {
      isExisted = true;
    }

    return {
      theme: sTheme,
      isExisted: isExisted
    }
  }
}

exports.behaviorDescriptors = behaviorDescriptors;
exports.behaviorDisposition = behaviorDisposition;
exports.behaviorAction = behaviorAction;
exports.behaviorTheme = behaviorTheme;