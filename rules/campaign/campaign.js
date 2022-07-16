const {Campaign, defaultCampaign, createCampaign} = require('../../models/campaign');

const campaignCreation = (campaignID) => {
  let res = {};

  if (campaignID) {
    Campaign.find({campaignID: campaignID}).exec()
      .then(campaign => {
        console.log(campaign);
        
        if (campaign.length === 0) {
          res = createCampaign({...defaultCampaign, campaignID: campaignID});
        }
      })
      .catch(error => {console.log(error)});
  }
  else {
    res = createCampaign(defaultCampaign);
  }

  return res;
}

const campaignDeleting = (campaignID, isDeleted) => {
  Campaign.deleteOne({ campaignID: campaignID }, function (err) {
    if (err) console.log(err);
  });

  return {
    isDeleted: isDeleted
  }
}

exports.campaignCreation = campaignCreation;
exports.campaignDeleting = campaignDeleting;