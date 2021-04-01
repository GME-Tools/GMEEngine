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

const campaignDeleting = (campaignID, isDeleted) => {
    Campaign.deleteOne({ campaignID: campaignID }, function (err) {
      if (err) return handleError(err);
    });

  return {
    isDeleted: isDeleted
  }
}

exports.campaignCreation = campaignCreation;
exports.campaignDeleting = campaignDeleting;