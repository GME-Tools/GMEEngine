const Campaign = require('../../models/campaign');

const campaignCreation = (campaignID, isNew) => {
  if (isNew === true) {
    const campaignCreated = new Campaign({
      chaosFactor: 4,
      campaignID: campaignID
    });

    console.log(campaignCreated);

    campaignCreated.save(function (err) {
      if (err) return handleError(err);
    });
  }

  return {
    isNew: isNew
  }
}

module.exports = campaignCreation;