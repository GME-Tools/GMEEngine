const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
   _id: { type: mongoose.ObjectId, required: true } ,
  chaosFactor: { type: Number, required: true }
});

module.exports = mongoose.model('Campaign', campaignSchema);