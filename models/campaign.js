const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  // _id: { type: mongoose.ObjectId, required: true },
  chaosFactor: { type: Number, required: true },
  campaignID: { type: String, required: false },
  theme: { type: String, required: false },
  /* characters: { type: [{
    name: { type: String, required: true },
    player: { type: Boolean, required: true },
    activatedDescriptors: { type: Number, required: false },
    dispositionName: { type: String, required: false },
    dispositionModifier: { type: Number, required: false },
    dispositionScore: { type: Number, required: false },
    activity: { type: Array, required: false },
    identity: { type: Array, required: false },
    personality: { type: Array, required: false },
    action1ModifierAction: { type: Number, required: false }
    }]
  }, */
  /* threads: { type: [{
    name: { type: String, required: true }
    }]
  }, */
  characters: { type: [{
    value: { type: Array, required: true },
    name: { type: String, required: true },
    player: { type: Boolean, required: false },
    travel: { type: [{
      travelMode : { type: String, required: false },
      KMPerDay : { type: Number, required: false },
      KMPerDay2 : { type: Number, required: false },
      comments : { type: String, required: false },
        }]
      },
    piecesOr: { type: Number, required: false },
    specialTraitName : { type: String, required: false },
    specialTraitDescription : { type: String, required: false },
    identity: { type: Array, required: false },
    descriptor: { type: Array, required: false }
    }]
  },
  archivedCharacters: { type: [{
    value: { type: Array, required: true },
    name: { type: String, required: true },
    player: { type: Boolean, required: false },
    travel: { type: [{
      travelMode : { type: String, required: false },
      KMPerDay : { type: Number, required: false },
      KMPerDay2 : { type: Number, required: false },
      comments : { type: String, required: false },
        }]
      },
    piecesOr: { type: Number, required: false }
    }]
  },
  plots: { type: [{
    value: { type: Array, required: true },
    name: { type: String, required: true }
    }]
  },
  themes: { type: [{
    name: { type: String, required: false },
    description: { type: String, required: false },
    values: { type: Array, required: false },
    alternated: { type: Boolean, required: false }
    }]
  },
  plotPoints: { type: [{
    name: { type: String, required: false },
    description: { type: String, required: false },
    needs:  { type: [{
      name: { type: String, required: false }
      }]
    }
  }]
  },
  currentPlot: { type: [{
    name: { type: String, required: false }
    }]
  },
  season: { type: String, required: false },
  weather: { type: String, required: false },
  camping: { type : [{
    findCamping: { type: Boolean, required: false },
    bivouacSuccess: { type: Boolean, required: false },
    disturbanceName: { type: String, required: false },
  }]
  },
  encounters: { type: Array, required: false },
  inventory: { type : [{
    lootItem: { type: String, required: false },
    lootCategory: { type: String, required: false }
  }]
  },
  settlements: { type : [{
    settlementsName: { type: String, required: false },
    settlementType: { type: String, required: false },
    settlementPopulation: { type: String, required: false }
  }]
  },
  taverns: { type : [{
    tavernName: { type: String, required: false },
    tavernRooms: { type: Number, required: false },
    tavernQuality: { type: String, required: false },
    tavernInnkeep: { type: String, required: false },
    tavernRumours: { type: Number, required: false },
    tavernCustomerService: { type: String, required: false },
    tavernRumoursGenerate: { type: Array, required: false },
    tavernRumoursLocation: { type: Array, required: false }
  }]
  },
  dungeons: { type : [{
    dungeonName: { type: String, required: false },
    dungeonSize: { type: String, required: false },
    dungeonRoomsNumber: { type: Number, required: false },
    dungeonType: { type: String, required: false },
    encountersNumber: { type: Number, required: false },
    encountersName: { type: Array, required: false },
    dungeonRoomsNumberDiscovered: { type: Number, required: false },
    dungeonCurrentRoom: { type: String, required: false },
    dungeonElementsCounter: { type: Number, required: false },
    dungeonRooms: { type: [{
      dungeonRoomName: { type: String, required: false },
      dungeonRoomAround: { type: [{
        dungeonRoomAroundName: { type: String, required: false },
        dungeonRoomAroundLink: { type: String, required: false }
      }]
      },
      dungeonRoomType: { type: String, required: false },
      dungeonRoomDescription: { type: String, required: false },
      dungeonRoomContent: { type: String, required: false },
      dungeonRoomExplored: { type: Boolean, required: false },
      dungeonRoomContentModifier: { type: Number, required: false },
      dungeonRoomExitsExplored: { type: Number, required: false }
    }]
    }
  }]
  },
  quests: { type : [{
    questProblem: { type: String, required: false },
    questResultant: { type: String, required: false },
    questSource: { type: String, required: false }
  }]
  },
  nature: { type : [{
    terrainType: { type: String, required: false },
    wildernessEncounters: { type: Array, required: false },
    minorFeature: { type : [{
      minorFeatureName: { type: String, required: false },
      size: { type: Number, required: false },
      minorType: { type: String, required: false },
      minorDescription: { type: String, required: false }
    }]
    }
  }]
  }
});

const Campaign = mongoose.model('Campaign', campaignSchema);

const defaultCampaign = {
  chaosFactor: 4,
  characters: [
    { "value": [1,4],
      "name": "Nouveau personnage" },
    { "value": [5,8],
      "name": "Nouveau personnage" },
    { "value": [9,12],
      "name": "Nouveau personnage" },
    { "value": [13,16],
      "name": "Choisissez le personnage le plus logique" },
    { "value": [17,20],
      "name": "Nouveau personnage" },
    { "value": [21,24],
      "name": "Nouveau personnage" },
    { "value": [25,28],
      "name": "Nouveau personnage" },
    { "value": [29,32],
      "name": "Choisissez le personnage le plus logique" },
    { "value": [33,36],
      "name": "Nouveau personnage" },
    { "value": [37,40],
      "name": "Nouveau personnage" },
    { "value": [41,44],
      "name": "Nouveau personnage" },
    { "value": [45,48],
      "name": "Choisissez le personnage le plus logique" },
    { "value": [49,52],
      "name": "Nouveau personnage" },
    { "value": [53,56],
      "name": "Choisissez le personnage le plus logique" },
    { "value": [57,60],
      "name": "Choisissez le personnage le plus logique" },
    { "value": [61,64],
      "name": "Choisissez le personnage le plus logique" },
    { "value": [65,68],
      "name": "Nouveau personnage" },
    { "value": [69,72],
      "name": "Choisissez le personnage le plus logique" },
    { "value": [73,76],
      "name": "Choisissez le personnage le plus logique" },
    { "value": [77,80],
      "name": "Choisissez le personnage le plus logique" },
    { "value": [81,84],
      "name": "Nouveau personnage" },
    { "value": [85,88],
      "name": "Choisissez le personnage le plus logique" },
    { "value": [89,92],
      "name": "Choisissez le personnage le plus logique" },
    { "value": [93,96],
      "name": "Choisissez le personnage le plus logique" },
    { "value": [97,100],
      "name": "Nouveau personnage" }
  ],
  plots: [
    { "value": [1,4],
      "name": "Choisissez l'intrigue la plus logique" },
    { "value": [5,8],
      "name": "Nouvelle intrigue" },
    { "value": [9,12],
      "name": "Choisissez l'intrigue la plus logique" },
    { "value": [13,16],
      "name": "Choisissez l'intrigue la plus logique" },
    { "value": [17,20],
      "name": "Choisissez l'intrigue la plus logique" },
    { "value": [21,24],
      "name": "Nouvelle intrigue" },
    { "value": [25,28],
      "name": "Choisissez l'intrigue la plus logique" },
    { "value": [29,32],
      "name": "Choisissez l'intrigue la plus logique" },
    { "value": [33,36],
      "name": "Choisissez l'intrigue la plus logique" },
    { "value": [37,40],
      "name": "Nouvelle intrigue" },
    { "value": [41,44],
      "name": "Choisissez l'intrigue la plus logique" },
    { "value": [45,48],
      "name": "Choisissez l'intrigue la plus logique" },
    { "value": [49,52],
      "name": "Choisissez l'intrigue la plus logique" },
    { "value": [53,56],
      "name": "Nouvelle intrigue" },
    { "value": [57,60],
      "name": "Choisissez l'intrigue la plus logique" },
    { "value": [61,64],
      "name": "Choisissez l'intrigue la plus logique" },
    { "value": [65,68],
      "name": "Choisissez l'intrigue la plus logique" },
    { "value": [69,72],
      "name": "Nouvelle intrigue" },
    { "value": [73,76],
      "name": "Choisissez l'intrigue la plus logique" },
    { "value": [77,80],
      "name": "Choisissez l'intrigue la plus logique" },
    { "value": [81,84],
      "name": "Choisissez l'intrigue la plus logique" },
    { "value": [85,88],
      "name": "Nouvelle intrigue" },
    { "value": [89,92],
      "name": "Choisissez l'intrigue la plus logique" },
    { "value": [93,96],
      "name": "Choisissez l'intrigue la plus logique" },
    { "value": [97,100],
      "name": "Choisissez l'intrigue la plus logique" }
  ]
}

const createCampaign = (campaign) => {
  console.log(campaign);

  const campaignCreated = new Campaign(campaign);
  console.log(campaignCreated);

  campaignCreated.save(err => {if (err) console.log(err);});

  return campaignCreated;
}

exports.Campaign = Campaign;
exports.defaultCampaign = defaultCampaign;
exports.createCampaign = createCampaign;