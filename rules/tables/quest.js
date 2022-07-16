const dice = require('../dice');
const questData = require('../../data/quest');

const createQuest = function(campaign) {
  let questProblem = "";
  let questResultant = "";
  let questSource = "";
  let questProblemRoll = dice.die(100);
  let questSourceRoll = dice.die(100);

  for (let i = 1 ; i <= Object.keys(questData.questsTable).length ; i++) {
    if (questProblemRoll >= questData.questsTable[i].value[0] && questProblemRoll <= questData.questsTable[i].value[1]) {
      questProblem = questData.questsTable[i].problem;
      questResultant = questData.questsTable[i].resultantQuest;
    }
  }

  for (let i = 1 ; i <= Object.keys(questData.questsSourcesTable).length ; i++) {
    if (questSourceRoll >= questData.questsSourcesTable[i].value[0] && questSourceRoll <= questData.questsSourcesTable[i].value[1]) {
      questSource = questData.questsSourcesTable[i].source;
    }
  }

  if (campaign[0].quests === undefined || campaign[0].quests.length === 0) {
    campaign[0].quests = [];
  }

  campaign[0].quests.push({"questProblem": questProblem, "questResultant": questResultant, "questSource": questSource});

  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });

  return {
    questProblem: questProblem,
    questResultant: questResultant,
    questSource: questSource
  }
}

exports.createQuest = createQuest;