const Campaign = require('../../models/campaign');

const campaignDeleting = (campaignID, isDeleted) => {
    Campaign.deleteOne({ campaignID: campaignID }, function (err) {
      if (err) return handleError(err);
    });

  return {
    isDeleted: isDeleted
  }
}

module.exports = campaignDeleting;