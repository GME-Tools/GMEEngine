const {Campaign} = require('../../models/campaign');
const dice = require('../dice');

const threadCreation = (campaignID, name, campaign) => {
  let isExisted = false;

  if (campaign[0].threads === undefined) {
    campaign[0].threads = [];

    campaign[0].threads.push({"name": name});
  } else if (campaign[0].threads.find(thread => thread.name === name)) {
    isExisted = true;
  } else {
    campaign[0].threads.push({"name": name});
  }

  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });

  return {
    isExisted: isExisted
  }
}

const threadDeleting = (campaignID, name, campaign) => {
  let isExisted = false;

  if (campaign[0].threads.find(thread => thread.name === name)) {
    for(let i = 0 ; i < campaign[0].threads.length ; i++) {
      if (campaign[0].threads[i].name === name) {
          campaign[0].threads.splice(i, 1);

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

const threadInformation = (campaignID, name, campaign) => {
  let sName = "";
  let isExisted = true;

  if (campaign[0].threads.find(thread => thread.name === name)) {
    const thread = campaign[0].threads.find(thread => thread.name === name);

    sName = thread.name;
  } else {
    isExisted = false;
  }

  return {
    name: sName,
    isExisted: isExisted
  }
}

const threadList = (campaignID, campaign) => {
  let threads = [];
  let isExisted = true;

  if (campaign[0].threads.length > 0) {
    for(let i = 0 ; i < campaign[0].threads.length ; i++) {
      threads.push(campaign[0].threads[i].name);
    }
  } else {
    isExisted = false;
  }

  return {
    threads: threads,
    isExisted: isExisted
  }
}

const threadUpdate = (campaignID, name, category, modification, campaign) => {
  let isExisted = false;

  if (campaign[0].threads.find(thread => thread.name === name)) {
    for(let i = 0 ; i < campaign[0].threads.length ; i++) {
      if (campaign[0].threads[i].name === name) {
        campaign[0].threads[i][category] = modification;
        
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

const threadRandomAll = (campaignID, campaign) => {
  let isExisted = true;
  let name = "";
  let numberThreads = 0;

  let threadRoll = 0;

  if (campaign[0].threads.length > 0) {
    numberThreads = campaign[0].threads.length;

    threadRoll = dice.die(numberThreads) - 1;

    name = campaign[0].threads[threadRoll].name;
  } else {
    isExisted = false;
  }

  return {
    name: name,
    isExisted: isExisted
  }
}

exports.threadCreation = threadCreation;
exports.threadDeleting = threadDeleting;
exports.threadInformation = threadInformation;
exports.threadList = threadList;
exports.threadUpdate = threadUpdate;
exports.threadRandomAll = threadRandomAll;