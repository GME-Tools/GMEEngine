const dungeonData = require('../../data/dungeon');
const dice = require('../dice');
const fantasyLootGeneratorTable = require('./fantasyLootGenerator');
const generator = require('../generator');

const dungeonCreate = (campaign, activity) => {
  let dungeonNameRoll = dice.die(2);
  let dungeonName = generator.nameGenerator(dungeonNameRoll);
  let dungeonSizeRoll = dice.die(20);
  let dungeonSize = "";
  let dungeonRoomsNumberRoll = 0;
  let dungeonRoomsNumber = 0;
  let dungeonTypeRoll = dice.die(10);
  let dungeonType = "";
  let encountersNumber = 0;
  let encountersDoneRoll = 0;
  let encountersRoll = 0;
  let encountersName = [];
  let encountersSpeRoll = 0;
  let startingRoll = dice.die(10);
  let startingArea = "";
  let rollOnName = "";
  let tempArea;
  let areaName = "";
  let contentAreaName = "";
  let dungeonRoomsNumberDiscovered = 0;
  let dungeonRoom = [];
  let dungeonRoomAround = [];
  let dungeonRoomAround2 = [];
  let dungeonRoomName = "";
  let rollOnNext = "";
  let doorsCount = 0;
  let exitsRoll = 0;
  let dungeonElementsCounter = 0;
  let secondDungeonRoom = false;
  let roomContentModifier = 0;

  for (let i = 1; i <= Object.keys(dungeonData.dungeonSize).length; i++) {
    if (dungeonSizeRoll >= dungeonData.dungeonSize[i].value[0] && dungeonSizeRoll <= dungeonData.dungeonSize[i].value[1]) {
      dungeonSize = dungeonData.dungeonSize[i].size;

      if (dungeonSize !== "Illimité") {
        for (let j = 0; j < dungeonData.dungeonSize[i].roomsNumber[0]; j++) {
          dungeonRoomsNumberRoll = dice.die(dungeonData.dungeonSize[i].roomsNumber[1]);

          dungeonRoomsNumber = dungeonRoomsNumber + dungeonRoomsNumberRoll;
        }

        dungeonRoomsNumber = dungeonRoomsNumber + dungeonData.dungeonSize[i].roomsNumber[2];
      } else {
        dungeonRoomsNumber = 150;
      }
    }
  }

  for (let i = 1; i <= Object.keys(dungeonData.dungeonTypes).length; i++) {
    if (dungeonTypeRoll >= dungeonData.dungeonTypes[i].value[0] && dungeonTypeRoll <= dungeonData.dungeonTypes[i].value[1]) {
      dungeonType = dungeonData.dungeonTypes[i].type;
    }
  }

  for (let i = 1; i <= Object.keys(dungeonData.encountersNumber).length; i++) {
    if (activity === dungeonData.encountersNumber[i].activity) {
      encountersNumber = dungeonData.encountersNumber[i].rollsNumber;
    }
  }

  for (let i = 1; i <= encountersNumber; i++) {
    encountersDoneRoll = dice.die(100);

    if (encountersDoneRoll <= 25) {
      encountersRoll = dice.die(100);

      for (let j = 1; j <= Object.keys(dungeonData.randomDungeonEncounters).length; j++) {
        if (encountersRoll >= dungeonData.randomDungeonEncounters[j].value[0] && encountersRoll <= dungeonData.randomDungeonEncounters[j].value[1]) {
          if (encountersRoll >= 1 && encountersRoll <= 5) {
            encountersSpeRoll = dice.die(10);
            let encountersCheckRoll = dice.die(20);
            let encountersCheckName = dungeonData.randomDungeonEncounters[j].name + ". Jet ";

            if (encountersSpeRoll === 1) {
              encountersCheckName = encountersCheckName + "d'acrobatie ";
            } else if (encountersSpeRoll === 2) {
              encountersCheckName = encountersCheckName + "de force ";
            } else if (encountersSpeRoll === 3) {
              encountersCheckName = encountersCheckName + "de furtivité ";
            } else if (encountersSpeRoll === 4) {
              encountersCheckName = encountersCheckName + "de tromperie ";
            } else if (encountersSpeRoll === 5) {
              encountersCheckName = encountersCheckName + "d'intelligence ";
            } else if (encountersSpeRoll === 6) {
              encountersCheckName = encountersCheckName + "d'investigation ";
            } else if (encountersSpeRoll === 7) {
              encountersCheckName = encountersCheckName + "d'arcane ";
            } else if (encountersSpeRoll === 8) {
              encountersCheckName = encountersCheckName + "d'histoire ";
            } else if (encountersSpeRoll === 9) {
              encountersCheckName = encountersCheckName + "de nature ";
            } else if (encountersSpeRoll === 10) {
              encountersCheckName = encountersCheckName + "de religion ";
            }

            if (encountersCheckRoll > 10) {
              encountersCheckName = encountersCheckName + "réussi(e) ";
            } else {
              encountersCheckName = encountersCheckName + "raté(e) ";
            }

            encountersName.push(encountersCheckName);
          } else if (encountersRoll >= 6 && encountersRoll <= 10) {
            encountersSpeRoll = dice.die(10);
            let encountersCheckRoll = dice.die(20);
            let encountersCheckName = dungeonData.randomDungeonEncounters[j].name + ". Jet ";

            if (encountersSpeRoll === 1) {
              encountersCheckName = encountersCheckName + "de manipulation des animaux ";
            } else if (encountersSpeRoll === 2) {
              encountersCheckName = encountersCheckName + "de perspicacité ";
            } else if (encountersSpeRoll === 3) {
              encountersCheckName = encountersCheckName + "de survie ";
            } else if (encountersSpeRoll === 4) {
              encountersCheckName = encountersCheckName + "de médecine ";
            } else if (encountersSpeRoll === 5) {
              encountersCheckName = encountersCheckName + "de perception ";
            } else if (encountersSpeRoll === 6) {
              encountersCheckName = encountersCheckName + "de persuasion ";
            } else if (encountersSpeRoll === 7) {
              encountersCheckName = encountersCheckName + "de performance ";
            } else if (encountersSpeRoll === 8) {
              encountersCheckName = encountersCheckName + "de tromperie ";
            } else if (encountersSpeRoll === 9) {
              encountersCheckName = encountersCheckName + "d'intimidation ";
            } else if (encountersSpeRoll === 10) {
              encountersCheckName = encountersCheckName + "de charisme ";
            }

            if (encountersCheckRoll > 10) {
              encountersCheckName = encountersCheckName + "réussi(e) ";
            } else {
              encountersCheckName = encountersCheckName + "raté(e) ";
            }

            encountersName.push(encountersCheckName);
          } else if (encountersRoll === 60) {
            encountersSpeRoll = dice.die(20);
            let encountersCheckName = dungeonData.randomDungeonEncounters[j].name;

            if (encountersSpeRoll >= 14) {
              encountersCheckName = encountersCheckName + " Vous réussissez votre jet de perception, vous vous en rendez compte et vous l'attrapez la main dans le sac";
            } else {
              encountersCheckName = encountersCheckName + " Vous ratez votre jet de perception, vous vous rendez compte que soudain votre sac est plus léger";
            }

            encountersName.push(encountersCheckName);
          } else if (encountersRoll === 65) {
            encountersSpeRoll = dice.die(20);
            let encountersCheckName = dungeonData.randomDungeonEncounters[j].name;

            if (encountersSpeRoll >= 15) {
              encountersCheckName = encountersCheckName + " vous réussissez votre jet de perception, vous voyez la glyphe sur le mur et vous ne déclenchez pas le sort d'alarme";
            } else {
              encountersCheckName = encountersCheckName + " vous ratez votre jet de perception, vous ne voyez pas de glyphe sur le mur et vous déclenchez un sort d'alarme";
            }

            encountersName.push(encountersCheckName);
          } else if (encountersRoll === 71) {
            encountersSpeRoll = dice.die(20);
            let encountersCheckName = "";

            if (encountersSpeRoll >= 14) {
              encountersCheckName = "Vous réussissez votre jet de perception et vous remarquez quelque chose dans votre périphérie. Une pierre dans le mur se ferme avec une éraflure";

              encountersSpeRoll = dice.die(20);

              if (encountersSpeRoll >= 12) {
                encountersCheckName = encountersCheckName + ". Vous réussissez votre jet d'investigation et vous trouvez le mécanisme pour l'ouvrir";
              }
            } else {
              encountersCheckName = "Vous ne remarquez rien de particulier";
            }

            encountersName.push(encountersCheckName);
          } else if (encountersRoll === 73) {
            encountersSpeRoll = dice.die(20);
            let encountersCheckName = dungeonData.randomDungeonEncounters[j].name;

            if (encountersSpeRoll >= 14) {
              encountersCheckName = encountersCheckName + ". Vous réussissez votre jet de furtivité et vous restez caché et regardez comme il déplace une pierre dans le mur, place quelque chose derrière, puis replace la pierre. Puis il part";
            } else {
              encountersCheckName = encountersCheckName + ". Vous ratez votre jet de furtivité et l'humanoïde vous repère";
            }

            encountersName.push(encountersCheckName);
          } else if (encountersRoll === 75) {
            encountersSpeRoll = dice.die(4);
            let encountersCheckName = dungeonData.randomDungeonEncounters[j].name;

            if (encountersSpeRoll === 1) {
              encountersCheckName = encountersCheckName + ". Il vous loue ainsi que vos prouesses évidentes en tant qu'aventurier. Il semble en savoir beaucoup. Le portier spectral admet qu'il vous ouvre la porte";
            } else if (encountersSpeRoll === 2) {
              encountersCheckName = encountersCheckName + ". Il commence à vous insulter, en soulignant à quel point vos vêtements sont horribles, à quel point vous êtes laid, à quel point vous sentez mauvais !";

              encountersSpeRoll = dice.die(20);

              if (encountersSpeRoll >= 15) {
                encountersCheckName = encountersCheckName + ". Vous réussissez votre jet de sagesse et il vous félicite pour votre sang-froid face aux abus et vous laisse passer la porte";
              } else {
                encountersCheckName = encountersCheckName + ". Vous ratez votre jet de sagesse et il ne vous laisse pas passer la porte";
              }
            } else if (encountersSpeRoll >= 3 && encountersSpeRoll <= 4) {
              encountersCheckName = encountersCheckName + ". Il commence à débattre avec vous des raisons pour lesquelles vous ne devriez pas être admis par la porte";

              encountersSpeRoll = dice.die(20);

              if (encountersSpeRoll >= 14) {
                encountersCheckName = encountersCheckName + ". Vous réussissez votre jet d'intelligence, vous gagnez le débat et il vous laisse passer la porte";
              } else {
                encountersCheckName = encountersCheckName + ". Vous ratez votre jet d'intelligence, vous perdez le débat et il ne vous laisse pas passer la porte";
              }
            }

            encountersName.push(encountersCheckName);
          } else if (encountersRoll === 80) {
            encountersSpeRoll = dice.die(8);
            let encountersCheckName = dungeonData.randomDungeonEncounters[j].name + "Ces parchemins sont en ";

            if (encountersSpeRoll === 1) {
              encountersCheckName = encountersCheckName + "Infernal";
            } else if (encountersSpeRoll === 2) {
              encountersCheckName = encountersCheckName + "Abyssal";
            } else if (encountersSpeRoll === 3) {
              encountersCheckName = encountersCheckName + "Céleste";
            } else if (encountersSpeRoll === 4) {
              encountersCheckName = encountersCheckName + "Draconique";
            } else if (encountersSpeRoll === 5) {
              encountersCheckName = encountersCheckName + "Druidique";
            } else if (encountersSpeRoll === 6) {
              encountersCheckName = encountersCheckName + "Géant";
            } else if (encountersSpeRoll === 7) {
              encountersCheckName = encountersCheckName + "Primordial";
            } else if (encountersSpeRoll === 8) {
              encountersCheckName = encountersCheckName + "Sous-Commun";
            }

            encountersName.push(encountersCheckName);
          } else if (encountersRoll === 81) {
            encountersSpeRoll = dice.die(4) - 1;
            let encountersCheckName = "";

            if (encountersSpeRoll === 0) {
              encountersCheckName = "Il ne se passe rien ici";
            } else if (encountersSpeRoll === 1) {
              encountersCheckName = "Un humanoïde se trouve ici";
            } else if (encountersSpeRoll === 2) {
              encountersCheckName = "Deux humanoïdes se disputent et ne remarquent pas votre approche. L'un est un commandant, l'autre subordonné. Le subordonné a échoué dans l'exécution d'une tâche";
            } else if (encountersSpeRoll === 3) {
              encountersCheckName = "Trois humanoïdes se disputent et ne remarquent pas votre approche. L'un est un commandant, les deux autres subordonnés. Les subordonnés ont échoué dans l'exécution d'une tâche";
            }

            encountersCheckName = encountersCheckName + "Si vous choisissez d'attaquer, ce sera une rencontre ";

            encountersSpeRoll = dice.die(4);

            if (encountersSpeRoll === 1) {
              encountersCheckName = encountersCheckName + "facile";
            } else if (encountersSpeRoll >= 2 && encountersSpeRoll <= 3) {
              encountersCheckName = encountersCheckName + "moyenne";
            } else if (encountersSpeRoll === 4) {
              encountersCheckName = encountersCheckName + "difficile";
            }

            encountersName.push(encountersCheckName);
          } else if (encountersRoll === 82) {
            encountersSpeRoll = dice.die(100);
            let encountersCheckName = dungeonData.randomDungeonEncounters[j].name;

            if (encountersSpeRoll <= 30) {
              encountersCheckName = encountersCheckName + "Vous trouvez un butin :";

              let loot = fantasyLootGeneratorTable.fantasyLootGenerator("lo", "valueDungeon");

              for (let j = 0; j < loot.number; j++) {
                encountersCheckName = encountersCheckName + " " + loot.items[j] + "(" + loot.categories[j] + ")";
              }
            }

            encountersName.push(encountersCheckName);
          } else if (encountersRoll === 90) {
            encountersSpeRoll = dice.die(20);
            let encountersCheckName = dungeonData.randomDungeonEncounters[j].name;

            if (encountersSpeRoll > 10) {
              encountersCheckName = encountersCheckName + ". Vous réussissez votre jet de Nature, vous savez ce que c'est (Questions/réponses pour en savoir plus sur leur nature)";
            } else {
              encountersCheckName = encountersCheckName + ". Vous ratez votre jet de Nature, vous ne savez pas ce que c'est";
            }

            encountersName.push(encountersCheckName);
          } else if (encountersRoll === 94) {
            encountersSpeRoll = dice.die(6);
            let encountersCheckName = dungeonData.randomDungeonEncounters[j].name + ". " + encountersSpeRoll + " rats se terrent";

            encountersName.push(encountersCheckName);
          } else {
            encountersName.push(dungeonData.randomDungeonEncounters[j].name);
          }
        }
      }
    }
  }

  for (let i = 1; i <= Object.keys(dungeonData.startingArea).length; i++) {
    if (startingRoll >= dungeonData.startingArea[i].value[0] && startingRoll <= dungeonData.startingArea[i].value[1]) {
      startingArea = dungeonData.startingArea[i].startingArea;

      console.log(dungeonData.startingArea[i].rollOn.length);

      if (dungeonData.startingArea[i].rollOn.length > 1) {
        let startingAreaRoll = dice.die(4) - 1;

        rollOnName = dungeonData.startingArea[i].rollOn[startingAreaRoll];
      } else {
        rollOnName = dungeonData.startingArea[i].rollOn[0];
      }

      if (rollOnName === "Passage") {
        tempArea = this.passageRandom(campaign, 0);
      } else if (rollOnName === "Room") {
        tempArea = this.roomRandom(campaign, 0);
      } else if (rollOnName === "Door") {
        tempArea = this.doorRandom(campaign);
      } else if (rollOnName === "Stairs") {
        tempArea = this.stairsRandom(campaign);
      }

      areaName = tempArea.areaName;
      contentAreaName = tempArea.contentAreaName;
      rollOnNext = tempArea.rollOnName;
      doorsCount = tempArea.doorsCount;
      exitsRoll = tempArea.exitsRoll;

      if (tempArea.roomContentModifier !== undefined && tempArea.roomContentModifier !== "" && tempArea.roomContentModifier !== null) {
        roomContentModifier = tempArea.roomContentModifier;
      } else {
        roomContentModifier = 0;
      }
    }
  }

  if (rollOnName === "Room") {
    dungeonRoomsNumberDiscovered = 1;
  }

  if (rollOnNext === "Room") {
    dungeonRoomsNumberDiscovered = dungeonRoomsNumberDiscovered + 1;
  }

  dungeonRoomName = rollOnName + "1";

  if (rollOnName === "Passage") {
    if (areaName.includes("intersection")) {
      dungeonRoomAround = [{
        "dungeonRoomAroundName": rollOnNext + "2",
        "dungeonRoomAroundLink": ""
      },
      {
        "dungeonRoomAroundName": rollOnNext + "3",
        "dungeonRoomAroundLink": ""
      },
      {
        "dungeonRoomAroundName": rollOnNext + "4",
        "dungeonRoomAroundLink": ""
      }];

      dungeonRoomAround2 = [{
        "dungeonRoomAroundName": dungeonRoomName,
        "dungeonRoomAroundLink": ""
      }];

      dungeonElementsCounter = 4;
      secondDungeonRoom = true;
    } else if (areaName.includes("jonction")) {
      dungeonRoomAround = [{
        "dungeonRoomAroundName": rollOnNext + "2",
        "dungeonRoomAroundLink": ""
      },
      {
        "dungeonRoomAroundName": rollOnNext + "3",
        "dungeonRoomAroundLink": ""
      }];

      dungeonRoomAround2 = [{
        "dungeonRoomAroundName": dungeonRoomName,
        "dungeonRoomAroundLink": ""
      }];

      dungeonElementsCounter = 3;
      secondDungeonRoom = true;
    } else if (rollOnNext === "Passage" || rollOnNext === "Room" || rollOnNext === "Architecture") {
      dungeonRoomAround = [{
        "dungeonRoomAroundName": rollOnNext + "2",
        "dungeonRoomAroundLink": ""
      }];

      dungeonRoomAround2 = [{
        "dungeonRoomAroundName": dungeonRoomName,
        "dungeonRoomAroundLink": ""
      }];

      dungeonElementsCounter = 2;
      secondDungeonRoom = true;
    } else if (rollOnNext === "Door" || rollOnNext === "Stairs" || rollOnNext === "Secret Door") {
      dungeonRoomAround = [{
        "dungeonRoomAroundName": rollOnNext + "2",
        "dungeonRoomAroundLink": rollOnNext + "2"
      }];

      dungeonRoomAround2 = [{
        "dungeonRoomAroundName": dungeonRoomName,
        "dungeonRoomAroundLink": ""
      }];

      dungeonElementsCounter = 2;
      secondDungeonRoom = true;
    } else if (rollOnNext === "Non") {
      dungeonRoomAround = [{
        "dungeonRoomAroundName": "",
        "dungeonRoomAroundLink": ""
      }];

      dungeonElementsCounter = 1;
      secondDungeonRoom = false;
    }
  } else if (rollOnName === "Door") {
    if (rollOnNext === "Passage" || rollOnNext === "Secret Passage" || rollOnNext === "Room" || rollOnNext === "Secret Room") {
      dungeonRoomAround = [{
        "dungeonRoomAroundName": "Entrée du donjon",
        "dungeonRoomAroundLink": rollOnNext + "2"
      }];

      dungeonRoomAround2 = [{
        "dungeonRoomAroundName": "Entrée du donjon",
        "dungeonRoomAroundLink": dungeonRoomName
      }];

      dungeonElementsCounter = 2;
      secondDungeonRoom = true;
      /* } else if (rollOnNext === "Stairs") {
        dungeonRoomAround = [{
          "dungeonRoomAroundName": rollOnNext + "2",
          "dungeonRoomAroundLink": rollOnNext + "2"
        }];
  
        dungeonRoomAround2 = [{
          "dungeonRoomAroundName": dungeonRoomName,
          "dungeonRoomAroundLink": rollOnNext + "2"
        }]; */
    }
  } else if (rollOnName === "Stairs") {
    if (rollOnNext === "Passage" || rollOnNext === "Room") {
      dungeonRoomAround = [{
        "dungeonRoomAroundName": "Entrée du donjon",
        "dungeonRoomAroundLink": rollOnNext + "2"
      }];

      dungeonRoomAround2 = [{
        "dungeonRoomAroundName": "Entrée du donjon",
        "dungeonRoomAroundLink": dungeonRoomName
      }];

      dungeonElementsCounter = 2;
      secondDungeonRoom = true;
    }
  } else if (rollOnName === "Room") {
    for (let i = 0; i < doorsCount; i++) {
      dungeonRoomAround.push({
        "dungeonRoomAroundName": "Door" + (i + 2),
        "dungeonRoomAroundLink": "Door" + (i + 2)
      });
    }

    for (let i = 0; i < exitsRoll - doorsCount; i++) {
      dungeonRoomAround.push({
        "dungeonRoomAroundName": "Exit" + (i + 2),
        "dungeonRoomAroundLink": "Exit" + (i + 2)
      });
    }

    dungeonElementsCounter = exitsRoll + 1;
    secondDungeonRoom = false;
  }

  if (dungeonElementsCounter === 1) {
	  dungeonRoom = [{
  		"dungeonRoomName": dungeonRoomName,
  		"dungeonRoomType": rollOnName,
  		"dungeonRoomDescription": areaName,
  		"dungeonRoomExplored": true
    }];
  } else if (rollOnName === "Room") {
    dungeonRoom = [{
  		"dungeonRoomName": dungeonRoomName,
  		"dungeonRoomAround": dungeonRoomAround,
  		"dungeonRoomType": rollOnName,
  		"dungeonRoomDescription": areaName,
  		"dungeonRoomContent": contentAreaName,
  		"dungeonRoomContentModifier": 0,
  		"dungeonRoomExplored": true,
  		"dungeonRoomExitsExplored": exitsRoll
    }];
  } else if (rollOnName === "Passage") {
    dungeonRoom = [{
  		"dungeonRoomName": dungeonRoomName,
  		"dungeonRoomAround": dungeonRoomAround,
  		"dungeonRoomType": rollOnName,
  		"dungeonRoomDescription": areaName,
  		"dungeonRoomContent": contentAreaName,
  		"dungeonRoomContentModifier": 0,
  		"dungeonRoomExplored": true
    }];
  } else {
    dungeonRoom = [{
  		"dungeonRoomName": dungeonRoomName,
  		"dungeonRoomAround": dungeonRoomAround,
  		"dungeonRoomType": rollOnName,
  		"dungeonRoomDescription": areaName,
  		"dungeonRoomExplored": true
    }];
  }

  if (secondDungeonRoom === true) {
    if (rollOnName === "Room") {
		  dungeonRoom.push({
  			"dungeonRoomName": rollOnNext + "2",
  			"dungeonRoomAround": dungeonRoomAround2,
  			"dungeonRoomType": rollOnNext,
  			"dungeonRoomDescription": "",
  			"dungeonRoomContent": "",
  			"dungeonRoomContentModifier": roomContentModifier,
  			"dungeonRoomExplored": false,
  			"dungeonRoomExitsExplored": 0
		  });
    } else if (rollOnName === "Passage") {
		  dungeonRoom.push({
  			"dungeonRoomName": rollOnNext + "2",
  			"dungeonRoomAround": dungeonRoomAround2,
  			"dungeonRoomType": rollOnNext,
  			"dungeonRoomDescription": "",
  			"dungeonRoomContent": "",
  			"dungeonRoomContentModifier": roomContentModifier,
  			"dungeonRoomExplored": false
		  });
    } else {
		  dungeonRoom.push({
  			"dungeonRoomName": rollOnNext + "2",
  			"dungeonRoomAround": dungeonRoomAround2,
  			"dungeonRoomType": rollOnNext,
  			"dungeonRoomDescription": "",
  			"dungeonRoomExplored": false
      });
    }
  }

  if (areaName.includes("intersection")) {
    dungeonRoom.push({
      "dungeonRoomName": rollOnNext + "3",
      "dungeonRoomAround": dungeonRoomAround2,
      "dungeonRoomType": rollOnNext,
      "dungeonRoomDescription": "",
      "dungeonRoomContent": "",
      "dungeonRoomContentModifier": roomContentModifier,
      "dungeonRoomExplored": false
    });

    dungeonRoom.push({
      "dungeonRoomName": rollOnNext + "4",
      "dungeonRoomAround": dungeonRoomAround2,
      "dungeonRoomType": rollOnNext,
      "dungeonRoomDescription": "",
      "dungeonRoomContent": "",
      "dungeonRoomContentModifier": roomContentModifier,
      "dungeonRoomExplored": false
    });
  } else if (areaName.includes("jonction")) {
    dungeonRoom.push({
      "dungeonRoomName": rollOnNext + "3",
      "dungeonRoomAround": dungeonRoomAround2,
      "dungeonRoomType": rollOnNext,
      "dungeonRoomDescription": "",
      "dungeonRoomContent": "",
      "dungeonRoomContentModifier": roomContentModifier,
      "dungeonRoomExplored": false
    });
  }

  if (campaign[0].dungeons === undefined || campaign[0].dungeons.length === 0) {
    campaign[0].dungeons = [];
  }

  campaign[0].dungeons.push({ "dungeonName": dungeonName, "dungeonSize": dungeonSize, "dungeonRoomsNumber": dungeonRoomsNumber, "dungeonType": dungeonType, "encountersNumber": encountersName.length, "encountersName": encountersName, "dungeonRoomsNumberDiscovered": dungeonRoomsNumberDiscovered, "dungeonCurrentRoom": dungeonRoomName, "dungeonElementsCounter": dungeonElementsCounter, "dungeonRooms": dungeonRoom });

  campaign[0].save(function(err) {
    if (err) return handleError(err);
  });

  return {
    dungeonName: dungeonName,
    dungeonSize: dungeonSize,
    dungeonRoomsNumber: dungeonRoomsNumber,
    dungeonType: dungeonType,
    encountersNumber: encountersName.length,
    encountersName: encountersName,
    startingArea: startingArea,
    areaName: areaName,
    contentAreaName: contentAreaName
  }
}

const dungeonMove = (campaign, dungeon, room) => {
  let dungeonName = "";
  let dungeonRoomsNumberDiscovered = "";
  let dungeonCurrentRoom = "";
  let dungeonRoomDescription = "";
  let dungeonRoomContent = "";
  let dungeonRoomAroundName = [];
  let dungeonRoomAroundLink = [];
  let dungeonRoomAroundDescription = [];
  let dungeonRoomAroundContent = [];
  let dungeonRoomAroundExplored = [];
  let tempArea = [];
  let areaName = "";
  let contentAreaName = "";
  let rollOnNext = "";
  let doorsCount = 0;
  let exitsRoll = 0;
  let dungeonRoomContentModifier = 0;
  let dungeonRoomName = "";
  let dungeonRoomType = "";
  let dungeonRoomAround = [];
  let dungeonRoomAround2 = [];
  let dungeonElementsCounter = 0;
  let secondDungeonRoom = false;
  let dungeonRoomExplored = false;
  let dungeonRoom = []
  let noRoomAround = false;
  let tempDungeonRoomName = "";
  let tempDungeonRoomNameJonction = "";
  let tempDungeonRoomNameIntersection = "";
  let dungeonRoomAroundNamePrevious = [];
  let dungeonRoomAroundLinkPrevious = [];
  let dungeonRoomAroundDescriptionPrevious = [];
  let dungeonRoomAroundContentPrevious = [];
  let dungeonRoomAroundExploredPrevious = [];
  let fullyExploredDungeon = false;

  if (room === undefined || room === "") {
    for (let i = 0; i < campaign[0].dungeons.length; i++) {
      if (campaign[0].dungeons[i].dungeonName === dungeon) {
        console.log("Pièce actuelle");

        dungeonName = campaign[0].dungeons[i].dungeonName;
        dungeonRoomsNumberDiscovered = campaign[0].dungeons[i].dungeonRoomsNumberDiscovered;
        dungeonCurrentRoom = campaign[0].dungeons[i].dungeonCurrentRoom;

        if (campaign[0].dungeons[i].dungeonRoomsNumberDiscovered === campaign[0].dungeons[i].dungeonRoomsNumber) {
          fullyExploredDungeon = true;
        }

        for (let j = 0; j < campaign[0].dungeons[i].dungeonRooms.length; j++) {
          if (campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomName === dungeonCurrentRoom) {
            dungeonRoomDescription = campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomDescription;
            dungeonRoomContent = campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomContent;

            for (let k = 0 ; k < campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomAround.length ; k++) {
              dungeonRoomAroundName.push(campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomAround[k].dungeonRoomAroundName);
              console.log("dungeonRoomAroundName : " + campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomAround[k].dungeonRoomAroundName);
              dungeonRoomAroundLink.push(campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomAround[k].dungeonRoomAroundLink);
              console.log("dungeonRoomAroundLink : " + campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomAround[k].dungeonRoomAroundLink);

              for (let l = 0 ; l < campaign[0].dungeons[i].dungeonRooms.length; l++) {
                if (campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomAround[k].dungeonRoomAroundName === campaign[0].dungeons[i].dungeonRooms[l].dungeonRoomName) {

                  console.log("dungeonRoomAroundName : " + campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomAround[k].dungeonRoomAroundName);
                  console.log("dungeonRoomName : " + campaign[0].dungeons[i].dungeonRooms[l].dungeonRoomName);
                  dungeonRoomAroundDescription.push(campaign[0].dungeons[i].dungeonRooms[l].dungeonRoomDescription);
                  console.log("dungeonRoomAroundDescription : " + campaign[0].dungeons[i].dungeonRooms[l].dungeonRoomDescription);
                  dungeonRoomAroundContent.push(campaign[0].dungeons[i].dungeonRooms[l].dungeonRoomContent);
                  console.log("dungeonRoomAroundContent : " + campaign[0].dungeons[i].dungeonRooms[l].dungeonRoomContent);
                  dungeonRoomAroundExplored.push(campaign[0].dungeons[i].dungeonRooms[l].dungeonRoomExplored);
                  console.log("dungeonRoomAroundExplored : " + campaign[0].dungeons[i].dungeonRooms[l].dungeonRoomExplored);
                }
              }
            }
          }
        }
      }
    }
  } else {
    for (let i = 0; i < campaign[0].dungeons.length; i++) {
      if (campaign[0].dungeons[i].dungeonName === dungeon) {
        console.log("Mouvement");

        dungeonName = campaign[0].dungeons[i].dungeonName;
        dungeonRoomsNumberDiscovered = campaign[0].dungeons[i].dungeonRoomsNumberDiscovered;
        dungeonCurrentRoom = campaign[0].dungeons[i].dungeonCurrentRoom;
        dungeonElementsCounter = campaign[0].dungeons[i].dungeonElementsCounter;

        if (campaign[0].dungeons[i].dungeonRoomsNumberDiscovered === campaign[0].dungeons[i].dungeonRoomsNumber) {
          fullyExploredDungeon = true;
        }

        console.log("dungeonName : " + dungeonName);
        console.log("dungeonRoomsNumberDiscovered : " + dungeonRoomsNumberDiscovered);
        console.log("dungeonCurrentRoom : " + dungeonCurrentRoom);
        console.log("dungeonElementsCounter : " + dungeonElementsCounter);

        for (let j = 0; j < campaign[0].dungeons[i].dungeonRooms.length; j++) {
          if (campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomName === room) {
            dungeonRoomName = campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomName;
            dungeonRoomType = campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomType;
            dungeonRoomDescription = campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomDescription;
            dungeonRoomContent = campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomContent;
            dungeonRoomExplored = campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomExplored;
            dungeonRoomContentModifier = campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomContentModifier;

            console.log("dungeonRoomName : " + dungeonRoomName);
            console.log("dungeonRoomType : " + dungeonRoomType);
            console.log("dungeonRoomDescription : " + dungeonRoomDescription);
            console.log("dungeonRoomContent : " + dungeonRoomContent);
            console.log("dungeonRoomExplored : " + dungeonRoomExplored);
            console.log("dungeonRoomContentModifier : " + dungeonRoomContentModifier);

            console.log("dungeonRoomAroundNameLength : " + campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomAround.length);

            for (let k = 0 ; k < campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomAround.length ; k++) {
              dungeonRoomAroundNamePrevious.push(campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomAround[k].dungeonRoomAroundName);
              console.log("dungeonRoomAroundName : " + campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomAround[k].dungeonRoomAroundName);
              dungeonRoomAroundLinkPrevious.push(campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomAround[k].dungeonRoomAroundLink);
              console.log("dungeonRoomAroundLink : " + campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomAround[k].dungeonRoomAroundLink);

              for (let l = 0 ; l < campaign[0].dungeons[i].dungeonRooms.length ; l++) {
                if (campaign[0].dungeons[i].dungeonRooms[l].dungeonRoomName === campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomAround[k].dungeonRoomAroundName) {
                  dungeonRoomAroundDescriptionPrevious.push(campaign[0].dungeons[i].dungeonRooms[l].dungeonRoomDescription);
                  console.log("dungeonRoomDescription : " + campaign[0].dungeons[i].dungeonRooms[l].dungeonRoomDescription);
              dungeonRoomAroundContentPrevious.push(campaign[0].dungeons[i].dungeonRooms[l].dungeonRoomContent);
                  console.log("dungeonRoomContent : " + campaign[0].dungeons[i].dungeonRooms[l].dungeonRoomContent);
              dungeonRoomAroundExploredPrevious.push(campaign[0].dungeons[i].dungeonRooms[l].dungeonRoomExplored);
                  console.log("dungeonRoomExplored : " + campaign[0].dungeons[i].dungeonRooms[l].dungeonRoomExplored);
                }
              }
            }

            if (dungeonRoomDescription === "") {
              if (dungeonRoomType === "Passage") {
                tempArea = this.passageRandom(campaign, dungeonRoomContentModifier);
              } else if (dungeonRoomType === "Room") {
                tempArea = this.roomRandom(campaign, dungeonRoomContentModifier);
              } else if (dungeonRoomType === "Door") {
                tempArea = this.doorRandom(campaign);

                for (let k = 0; k < campaign[0].dungeons[i].dungeonRooms.length; k++) {
                  if (campaign[0].dungeons[i].dungeonRooms[k].dungeonRoomName === dungeonCurrentRoom) {
                    for (let l = 0; l < campaign[0].dungeons[i].dungeonRooms[k].dungeonRoomAround.length; l++) {
                      if (campaign[0].dungeons[i].dungeonRooms[k].dungeonRoomAround[l].dungeonRoomAroundName === dungeonRoomName) {
                        campaign[0].dungeons[i].dungeonRooms[k].dungeonRoomAround[l].dungeonRoomAroundName = tempArea.rollOnName + (dungeonElementsCounter + 1);
                      }
                    }
                  }
                }
              } else if (dungeonRoomType === "Stairs") {
                tempArea = this.stairsRandom(campaign);

                for (let k = 0; k < campaign[0].dungeons[i].dungeonRooms.length; k++) {
                  if (campaign[0].dungeons[i].dungeonRooms[k].dungeonRoomName === dungeonCurrentRoom) {
                    for (let l = 0; l < campaign[0].dungeons[i].dungeonRooms[k].dungeonRoomAround.length; l++) {
                      if (campaign[0].dungeons[i].dungeonRooms[k].dungeonRoomAround[l].dungeonRoomAroundName === dungeonRoomName) {
                        campaign[0].dungeons[i].dungeonRooms[k].dungeonRoomAround[l].dungeonRoomAroundName = tempArea.rollOnName + (dungeonElementsCounter + 1);
                      }
                    }
                  }
                }
              } else if (dungeonRoomType === "Architecture") {
                tempArea = this.architectureRandom(campaign);
              } else if (dungeonRoomType === "Secret Door") {
                tempArea = this.secretDoorRandom(campaign);

                for (let k = 0; k < campaign[0].dungeons[i].dungeonRooms.length; k++) {
                  if (campaign[0].dungeons[i].dungeonRooms[k].dungeonRoomName === dungeonCurrentRoom) {
                    for (let l = 0; l < campaign[0].dungeons[i].dungeonRooms[k].dungeonRoomAround.length; l++) {
                      if (campaign[0].dungeons[i].dungeonRooms[k].dungeonRoomAround[l].dungeonRoomAroundName === dungeonRoomName) {
                        campaign[0].dungeons[i].dungeonRooms[k].dungeonRoomAround[l].dungeonRoomAroundName = tempArea.rollOnName + (dungeonElementsCounter + 1);
                      }
                    }
                  }
                }
              }

              if (fullyExploredDungeon === true) {
                areaName = tempArea.areaName;
                contentAreaName = tempArea.contentAreaName;
                rollOnNext = "";
                doorsCount = 0;
                exitsRoll = 0;
              } else {
                areaName = tempArea.areaName;
                contentAreaName = tempArea.contentAreaName;
                rollOnNext = tempArea.rollOnName;
                doorsCount = tempArea.doorsCount;
                exitsRoll = tempArea.exitsRoll;
              }

              if (tempArea.roomContentModifier !== undefined && tempArea.roomContentModifier !== "" && tempArea.roomContentModifier !== null) {
                dungeonRoomContentModifier = tempArea.roomContentModifier;
              } else {
                dungeonRoomContentModifier = 0;
              }
            } else {
              campaign[0].dungeons[i].dungeonCurrentRoom = room;
              if (campaign[0].dungeons === undefined || campaign[0].dungeons.length === 0) {
                campaign[0].dungeons = [];
              }
            
              campaign[0].save(function(err) {
                if (err) return handleError(err);
              });

              return {
                dungeonName: dungeonName,
                dungeonRoomsNumberDiscovered: dungeonRoomsNumberDiscovered,
                dungeonCurrentRoom: room,
                dungeonRoomDescription: campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomDescription,
                dungeonRoomContent: campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomContent,
                dungeonRoomAroundName: dungeonRoomAroundNamePrevious,
                dungeonRoomAroundLink: dungeonRoomAroundLinkPrevious,
                dungeonRoomAroundDescription: dungeonRoomAroundDescriptionPrevious,
                dungeonRoomAroundContent: dungeonRoomAroundContentPrevious,
                dungeonRoomAroundExplored: dungeonRoomAroundExploredPrevious,
                fullyExploredDungeon: fullyExploredDungeon
              }
            }

            console.log("areaName : " + areaName);
            console.log("contentAreaName : " + contentAreaName);
            console.log("rollOnNext : " + rollOnNext);
            console.log("doorsCount : " + doorsCount);
            console.log("exitsRoll : " + exitsRoll);
            // console.log("dungeonRoomAroundName" + campaign[0].dungeons[i].dungeonRooms[k].dungeonRoomAround[l].dungeonRoomAroundName);
            console.log("dungeonRoomContentModifier : " + dungeonRoomContentModifier);
            console.log("dungeonRoomExplored : " + dungeonRoomExplored);

            if (fullyExploredDungeon === false) {
              if (rollOnNext !== "" && rollOnNext !== undefined && rollOnNext === "Room") {
                dungeonRoomsNumberDiscovered = dungeonRoomsNumberDiscovered + 1;
              }
  
              console.log("dungeonRoomsNumberDiscovered : " + dungeonRoomsNumberDiscovered);
  
              if (rollOnNext !== "" && rollOnNext !== undefined) {
                if (dungeonRoomType === "Passage") {
                  if (areaName.includes("intersection")) {
                    dungeonRoomAround = [{
                      "dungeonRoomAroundName": rollOnNext + (dungeonElementsCounter + 1),
                      "dungeonRoomAroundLink": ""
                    },
                    {
                      "dungeonRoomAroundName": rollOnNext + (dungeonElementsCounter + 2),
                      "dungeonRoomAroundLink": ""
                    },
                    {
                      "dungeonRoomAroundName": rollOnNext + (dungeonElementsCounter + 3),
                      "dungeonRoomAroundLink": ""
                    }];
    
                    dungeonRoomAround2 = [{
                      "dungeonRoomAroundName": dungeonRoomName,
                      "dungeonRoomAroundLink": ""
                    }];
    
                    dungeonElementsCounter = dungeonElementsCounter + 3;
                    secondDungeonRoom = true;
                  } else if (areaName.includes("jonction")) {
                    dungeonRoomAround = [{
                      "dungeonRoomAroundName": rollOnNext + (dungeonElementsCounter + 1),
                      "dungeonRoomAroundLink": ""
                    },
                    {
                      "dungeonRoomAroundName": rollOnNext + (dungeonElementsCounter + 2),
                      "dungeonRoomAroundLink": ""
                    }];
    
                    dungeonRoomAround2 = [{
                      "dungeonRoomAroundName": dungeonRoomName,
                      "dungeonRoomAroundLink": ""
                    }];
    
                    dungeonElementsCounter = dungeonElementsCounter + 2;
                    secondDungeonRoom = true;
                  } else if (rollOnNext === "Passage" || rollOnNext === "Room" || rollOnNext === "Architecture") {
                    dungeonRoomAround = [{
                      "dungeonRoomAroundName": rollOnNext + (dungeonElementsCounter + 1),
                      "dungeonRoomAroundLink": ""
                    }];
    
                    dungeonRoomAround2 = [{
                      "dungeonRoomAroundName": dungeonRoomName,
                      "dungeonRoomAroundLink": ""
                    }];
    
                    dungeonElementsCounter = dungeonElementsCounter + 1;
                    secondDungeonRoom = true;
                  } else if (rollOnNext === "Door" || rollOnNext === "Stairs" || rollOnNext === "Secret Door") {
                    dungeonRoomAround = [{
                      "dungeonRoomAroundName": rollOnNext + (dungeonElementsCounter + 1),
                      "dungeonRoomAroundLink": rollOnNext + (dungeonElementsCounter + 1)
                    }];
                    
                    dungeonRoomAround2 = [{
                      "dungeonRoomAroundName": dungeonRoomName,
                      "dungeonRoomAroundLink": ""
                    }];
    
                    dungeonElementsCounter = dungeonElementsCounter + 1;
                    secondDungeonRoom = true;
                  } else if (rollOnNext === "Non") {
                    dungeonRoomAround = [{
                      "dungeonRoomAroundName": "",
                      "dungeonRoomAroundLink": ""
                    }];
    
                    dungeonElementsCounter = dungeonElementsCounter;
                    secondDungeonRoom = false;
                    noRoomAround = true;
                  }
                } else if (dungeonRoomType === "Door") {
                  if (rollOnNext === "Passage" || rollOnNext === "Secret Passage" || rollOnNext === "Room" || rollOnNext === "Secret Room") {
                    campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomAround[0].dungeonRoomAroundLink = rollOnNext + (dungeonElementsCounter + 1);
    
                    dungeonRoomAround2 = [{
                      "dungeonRoomAroundName": dungeonRoomAroundNamePrevious[0],
                      "dungeonRoomAroundLink": dungeonRoomName
                    }];
    
                    dungeonElementsCounter = dungeonElementsCounter + 1;
                    secondDungeonRoom = true;
                    /* } else if (rollOnNext === "Stairs") {
                      dungeonRoomAround = [{
                        "dungeonRoomAroundName": rollOnNext + "2",
                        "dungeonRoomAroundLink": rollOnNext + "2"
                      }];
                  
                      dungeonRoomAround2 = [{
                        "dungeonRoomAroundName": dungeonRoomName,
                        "dungeonRoomAroundLink": rollOnNext + "2"
                      }]; */
                  }
                } else if (dungeonRoomType === "Stairs") {
                  if (rollOnNext === "Passage" || rollOnNext === "Room") {
                    campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomAround[0].dungeonRoomAroundLink = rollOnNext + (dungeonElementsCounter + 1);
    
                    dungeonRoomAround2 = [{
                      "dungeonRoomAroundName": dungeonRoomAroundNamePrevious[0],
                      "dungeonRoomAroundLink": dungeonRoomName
                    }];
    
                    dungeonElementsCounter = dungeonElementsCounter + 1;
                    secondDungeonRoom = true;
                  }
                } else if (dungeonRoomType === "Room") {
                  for (let i = 0; i < doorsCount; i++) {
                    dungeonRoomAround.push({
                      "dungeonRoomAroundName": "Door" + (dungeonElementsCounter + 1),
                      "dungeonRoomAroundLink": "Door" + (dungeonElementsCounter + 1)
                    });
                  }
    
                  for (let i = 0; i < exitsRoll - doorsCount; i++) {
                    dungeonRoomAround.push({
                      "dungeonRoomAroundName": "Exit" + (dungeonElementsCounter + 1),
                      "dungeonRoomAroundLink": "Exit" + (dungeonElementsCounter + 1)
                    });
                  }
    
                  dungeonElementsCounter = dungeonElementsCounter + exitsRoll;
                  secondDungeonRoom = false;
                } else if (dungeonRoomType === "Architecture") {
                  dungeonRoomAround = [{
                    "dungeonRoomAroundName": "",
                    "dungeonRoomAroundLink": ""
                  }];
    
                  dungeonElementsCounter = dungeonElementsCounter;
                  secondDungeonRoom = false;
                  noRoomAround = true;
                } else if (dungeonRoomType === "Secret Door") {
                  if (rollOnNext === "Passage" || rollOnNext === "Secret Passage" || rollOnNext === "Room" || rollOnNext === "Secret Room") {
                    campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomAround[0].dungeonRoomAroundLink = rollOnNext + (dungeonElementsCounter + 1);
    
                    dungeonRoomAround2 = [{
                      "dungeonRoomAroundName": dungeonRoomAroundNamePrevious[0],
                      "dungeonRoomAroundLink": dungeonRoomName
                    }];
    
                    dungeonElementsCounter = dungeonElementsCounter + 1;
                    secondDungeonRoom = true;
    
                    /* } else if (rollOnNext === "Stairs") {
                      dungeonRoomAround = [{
                        "dungeonRoomAroundName": rollOnNext + "2",
                        "dungeonRoomAroundLink": rollOnNext + "2"
                      }];
                  
                      dungeonRoomAround2 = [{
                        "dungeonRoomAroundName": dungeonRoomName,
                        "dungeonRoomAroundLink": rollOnNext + "2"
                      }]; */
                  }
                }
                console.log("dungeonRoomAround.dungeonRoomAroundName : " + dungeonRoomAround[0].dungeonRoomAroundName);
            console.log("dungeonRoomAround.dungeonRoomAroundLink : " + dungeonRoomAround[0].dungeonRoomAroundLink);

            if (dungeonRoomAround2.length !== 0) {
              console.log("dungeonRoomAround2.dungeonRoomAroundName : " + dungeonRoomAround2[0].dungeonRoomAroundName);
              console.log("dungeonRoomAround2.dungeonRoomAroundLink : " + dungeonRoomAround2[0].dungeonRoomAroundLink);
            }

            console.log("dungeonElementsCounter : " + dungeonElementsCounter);
            console.log("secondDungeonRoom : " + secondDungeonRoom);
              }
            }

            // if (rollOnNext !== "" && rollOnNext !== undefined) {
            if (noRoomAround === true || dungeonRoomType === "Door" || dungeonRoomType === "Stairs" || dungeonRoomType === "Secret Door") {
            	campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomDescription = areaName;
            	campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomExplored = true;
            } else if (dungeonRoomType === "Room") {
            	campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomDescription = areaName;
            	campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomContent = contentAreaName;
            	campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomExplored = true;
            	campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomExitsExplored = exitsRoll;
            
            	for (let k = 0 ; k < dungeonRoomAround.length ; k++) {
            		campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomAround.push(dungeonRoomAround[k]);
            	}
            } else if (dungeonRoomType === "Passage") {
            	campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomDescription = areaName;
            	campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomContent = contentAreaName;
            	campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomExplored = true;
            	
            	for (let k = 0 ; k < dungeonRoomAround.length ; k++) {
            		campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomAround.push(dungeonRoomAround[k]);
            	}
            } else {
            	campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomDescription = areaName;
            	campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomContent = contentAreaName;
            	campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomExplored = true;
            	
            	for (let k = 0 ; k < dungeonRoomAround.length ; k++) {
            		campaign[0].dungeons[i].dungeonRooms[j].dungeonRoomAround.push(dungeonRoomAround[k]);
            	}
            }

            console.log("areaName : " + areaName);
            console.log("contentAreaName : " + contentAreaName);
            console.log("dungeonRoomContentModifier : " + dungeonRoomContentModifier);
            console.log("exitsRoll : " + exitsRoll);
            console.log("dungeonRoomAround[0].dungeonRoomAroundName : " + dungeonRoomAround[0].dungeonRoomAroundName);
            console.log("dungeonRoomAround[0].dungeonRoomAroundLink : " + dungeonRoomAround[0].dungeonRoomAroundLink);

            if (areaName.includes("intersection")) {
              tempDungeonRoomName = rollOnNext + (dungeonElementsCounter - 2);
              tempDungeonRoomNameJonction = rollOnNext + (dungeonElementsCounter - 1);
              tempDungeonRoomNameIntersection = rollOnNext + dungeonElementsCounter;
            } else if (areaName.includes("jonction")) {
              tempDungeonRoomName = rollOnNext + (dungeonElementsCounter - 1);
              tempDungeonRoomNameJonction = rollOnNext + dungeonElementsCounter;
            } else {
              tempDungeonRoomName = rollOnNext + dungeonElementsCounter;
            }

            if (secondDungeonRoom === true) {
            	if (rollOnName === "Room") {
            		dungeonRoom.push({
            			"dungeonRoomName": tempDungeonRoomName,
            			"dungeonRoomAround": dungeonRoomAround2,
            			"dungeonRoomType": rollOnNext,
            			"dungeonRoomDescription": "",
            			"dungeonRoomContent": "",
            			"dungeonRoomContentModifier": dungeonRoomContentModifier,
            			"dungeonRoomExplored": false,
            			"dungeonRoomExitsExplored": 0
            		});
            	} else if (rollOnName === "Passage") {
            		dungeonRoom.push({
            			"dungeonRoomName": tempDungeonRoomName,
            			"dungeonRoomAround": dungeonRoomAround2,
            			"dungeonRoomType": rollOnNext,
            			"dungeonRoomDescription": "",
            			"dungeonRoomContent": "",
            			"dungeonRoomContentModifier": dungeonRoomContentModifier,
            			"dungeonRoomExplored": false
            		});
            	} else {
            		dungeonRoom.push({
            			"dungeonRoomName": tempDungeonRoomName,
            			"dungeonRoomAround": dungeonRoomAround2,
            			"dungeonRoomType": rollOnNext,
            			"dungeonRoomDescription": "",
            			"dungeonRoomExplored": false
            		});
            	}
            }
            
            if (areaName.includes("intersection")) {
            	dungeonRoom.push({
            		"dungeonRoomName": tempDungeonRoomNameJonction,
            		"dungeonRoomAround": dungeonRoomAround2,
            		"dungeonRoomType": rollOnNext,
            		"dungeonRoomDescription": "",
            		"dungeonRoomContent": "",
            		"dungeonRoomContentModifier": dungeonRoomContentModifier,
            		"dungeonRoomExplored": false
            	});
            
            	dungeonRoom.push({
            		"dungeonRoomName": tempDungeonRoomNameIntersection,
            		"dungeonRoomAround": dungeonRoomAround2,
            		"dungeonRoomType": rollOnNext,
            		"dungeonRoomDescription": "",
            		"dungeonRoomContent": "",
            		"dungeonRoomContentModifier": dungeonRoomContentModifier,
            		"dungeonRoomExplored": false
            	});
            } else if (areaName.includes("jonction")) {
            	dungeonRoom.push({
            		"dungeonRoomName": tempDungeonRoomNameJonction,
            		"dungeonRoomAround": dungeonRoomAround2,
            		"dungeonRoomType": rollOnNext,
            		"dungeonRoomDescription": "",
            		"dungeonRoomContent": "",
            		"dungeonRoomContentModifier": dungeonRoomContentModifier,
            		"dungeonRoomExplored": false
            	});
            }
            // }

            if (dungeonRoom.length !== 0) {
              console.log("dungeonRoom.dungeonRoomName : " + dungeonRoom[0].dungeonRoomName);
            console.log("dungeonRoom.dungeonRoomType : " + dungeonRoom[0].dungeonRoomType);
            console.log("dungeonRoom.dungeonRoomDescription : " + dungeonRoom[0].dungeonRoomDescription);
            console.log("dungeonRoom.dungeonRoomContent : " + dungeonRoom[0].dungeonRoomContent);
            console.log("dungeonRoom.dungeonRoomContentModifier : " + dungeonRoom[0].dungeonRoomContentModifier);
            console.log("dungeonRoom.dungeonRoomExplored : " + dungeonRoom[0].dungeonRoomExplored);
            }
            
            dungeonCurrentRoom = room;
            dungeonRoomDescription = areaName;
            dungeonRoomContent = contentAreaName;

            for (let k = 0; k < dungeonRoomAround.length; k++) {
              dungeonRoomAroundNamePrevious.push(dungeonRoomAround[k].dungeonRoomAroundName);
              dungeonRoomAroundLinkPrevious.push(dungeonRoomAround[k].dungeonRoomAroundLink);
              dungeonRoomAroundDescriptionPrevious.push("");
              dungeonRoomAroundContentPrevious.push("");
              dungeonRoomAroundExploredPrevious.push(false);
            }

            dungeonRoomAroundName = dungeonRoomAroundNamePrevious;
            dungeonRoomAroundLink = dungeonRoomAroundLinkPrevious;
            dungeonRoomAroundDescription = dungeonRoomAroundDescriptionPrevious;
            dungeonRoomAroundContent = dungeonRoomAroundContentPrevious;
            dungeonRoomAroundExplored = dungeonRoomAroundExploredPrevious;
            
             campaign[0].dungeons[i].dungeonRoomsNumberDiscovered = dungeonRoomsNumberDiscovered;
            campaign[0].dungeons[i].dungeonCurrentRoom = room;
            campaign[0].dungeons[i].dungeonElementsCounter = dungeonElementsCounter;

            console.log("dungeonRoomsNumberDiscovered : " + dungeonRoomsNumberDiscovered);
            console.log("room : " + room);
            console.log("dungeonElementsCounter : " + dungeonElementsCounter);
            
            for (let k = 0 ; k < dungeonRoom.length ; k++) {
              campaign[0].dungeons[i].dungeonRooms.push(dungeonRoom[k]);
              console.log("dungeonRoom[k].dungeonRoomName : " + dungeonRoom[k].dungeonRoomName);
              
//console.log("dungeonRoom[k].dungeonRoomAround[0].dungeonRoomAroundName : " + dungeonRoom[k].dungeonRoomAround[0].dungeonRoomAroundName);
            //console.log("dungeonRoom[k].dungeonRoomAround[0].dungeonRoomAroundLink : " + dungeonRoom[k].dungeonRoomAround[0].dungeonRoomAroundLink);
              console.log("dungeonRoom[k].dungeonRoomType : " + dungeonRoom[k].dungeonRoomType);
              console.log("dungeonRoom[k].dungeonRoomDescription : " + dungeonRoom[k].dungeonRoomDescription);
              console.log("dungeonRoom[k].dungeonRoomContent : " + dungeonRoom[k].dungeonRoomContent);
              console.log("dungeonRoom[k].dungeonRoomContentModifier : " + dungeonRoom[k].dungeonRoomContentModifier);
              console.log("dungeonRoom[k].dungeonRoomExplored : " + dungeonRoom[k].dungeonRoomExplored);
            }
          }
        }
      }
    }
  }

  if (campaign[0].dungeons === undefined || campaign[0].dungeons.length === 0) {
    campaign[0].dungeons = [];
  }

  campaign[0].save(function(err) {
    if (err) return handleError(err);
  });

  return {
    dungeonName: dungeonName,
    dungeonRoomsNumberDiscovered: dungeonRoomsNumberDiscovered,
    dungeonCurrentRoom: dungeonCurrentRoom,
    dungeonRoomDescription: dungeonRoomDescription,
    dungeonRoomContent: dungeonRoomContent,
    dungeonRoomAroundName: dungeonRoomAroundName,
    dungeonRoomAroundLink: dungeonRoomAroundLink,
    dungeonRoomAroundDescription: dungeonRoomAroundDescription,
    dungeonRoomAroundContent: dungeonRoomAroundContent,
    dungeonRoomAroundExplored: dungeonRoomAroundExplored,
    fullyExploredDungeon: fullyExploredDungeon
  }
}

const passageRandom = (campaign, modifier) => {
  let areaRoll = dice.die(20);
  let areaName = "";
  let contentAreaRoll = dice.die(100) + modifier;
  let contentAreaName = "";
  let rollOnName = "";
  let speRoll = 0;
  let clueName = "";

  for (let i = 1; i <= Object.keys(dungeonData.passageTable).length; i++) {
    if (areaRoll >= dungeonData.passageTable[i].value[0] && areaRoll <= dungeonData.passageTable[i].value[1]) {
      areaName = dungeonData.passageTable[i].name;

      if (areaRoll === 1) {
        speRoll = dice.die(4) * 3;

        areaName = areaName + speRoll + " m"
      } else if (areaRoll === 6) {
        speRoll = dice.die(100);

        if (speRoll <= 40) {
          speRoll = dice.die(20);
          let speRoll2 = dice.die(10) + 7;

          if (speRoll >= speRoll2) {
            areaName = areaName + " mais vous trouvez une porte secrète en fouillant la pièce";

            rollOnName = "Secret Door";
          } else {
            areaName = areaName + ". Revenez à la dernière pièce que vous souhaitez explorer";
          }
        } else {
          areaName = areaName + ". Revenez à la dernière pièce que vous souhaitez explorer";
        }
      } else if (areaRoll === 7) {
        speRoll = dice.die(4) * 3;

        areaName = areaName + speRoll + " m"
      } else if (areaRoll === 8) {
        speRoll = dice.die(4) * 3;

        areaName = areaName + speRoll + " m"
      } else if (areaRoll === 9) {
        speRoll = dice.die(6) * 3;

        areaName = areaName + speRoll + " m"
      } else if (areaRoll === 10) {
        speRoll = dice.die(6) * 3;

        areaName = areaName + speRoll + " m"
      } else if (areaRoll === 14) {
        speRoll = dice.die(20);

        if (speRoll >= 15) {
          areaName = areaName + "Vous avez réussi votre jet de Perception et vous trouvez une porte secrète";

          rollOnName = "Secret Door";
        } else {
          rollOnName = "Passage";
        }
      } else if (areaRoll === 15 || areaRoll === 16) {
        speRoll = dice.die(3) * 3;

        areaName = areaName + speRoll + " m"
      } else if (areaRoll === 19) {
        speRoll = dice.die(10) * 3;
        let speRoll2 = dice.die(4);

        if (speRoll2 === 1 || speRoll2 === 2) {
          rollOnName = "Passage";
        } else {
          rollOnName = "Room";
        }

        areaName = areaName + speRoll + " m"
      }

      if (rollOnName === "") {
        if (dungeonData.passageTable[i].rollOn.length > 1) {
          let rollOnRoll = dice.die(dungeonData.passageTable[i].rollOn.length);

          rollOnName = dungeonData.passageTable[i].rollOn[rollOnRoll];
        } else {
          rollOnName = dungeonData.passageTable[i].rollOn[0];
        }
      }
    }
  }

  for (let i = 1; i <= Object.keys(dungeonData.contentPassageTable).length; i++) {
    if (contentAreaRoll >= dungeonData.contentPassageTable[i].value[0] && contentAreaRoll <= dungeonData.contentPassageTable[i].value[1]) {
      contentAreaName = dungeonData.contentPassageTable[i].name;

      if (contentAreaRoll >= 70 && contentAreaRoll <= 80) {
        speRoll = dice.die(100);

        if (speRoll <= 10) {
          speRoll = dice.die(20);

          if (speRoll >= 10) {
            contentAreaName = contentAreaName + ". Vous réussissez votre Jet de Perception et vous trouvez un indice. ";

            clueName = this.clueRandom(campaign);
            contentAreaName = contentAreaName + clueName;
          }
        }
      } else if (contentAreaRoll >= 81 && contentAreaRoll <= 84) {
        speRoll = dice.die(100);

        if (speRoll <= 20) {
          contentAreaName = contentAreaName + ". Vous trouvez un indice sur le corps. ";

          clueName = this.clueRandom(campaign);
          contentAreaName = contentAreaName + clueName;
        }
      } else if (contentAreaRoll >= 85 && contentAreaRoll <= 88) {
        speRoll = dice.die(100);

        if (speRoll <= 40) {
          contentAreaName = contentAreaName + ". Vous trouvez un indice sur un des corps. ";

          clueName = this.clueRandom(campaign);
          contentAreaName = contentAreaName + clueName;
        }
      } else if (contentAreaRoll >= 95 && contentAreaRoll <= 98) {
        let trapName = this.trapRandom(campaign);
        contentAreaName = contentAreaName + " " + trapName;
      }
    }
  }

  return {
    areaName: areaName,
    contentAreaName: contentAreaName,
    rollOnName: rollOnName
  }
}

const doorRandom = (campaign) => {
  let areaRoll = dice.die(100);
  let areaName = "";
  let rollOnName = "";
  let speRoll = 0;

  for (let i = 1; i <= Object.keys(dungeonData.doorTable).length; i++) {
    if (areaRoll >= dungeonData.doorTable[i].value[0] && areaRoll <= dungeonData.doorTable[i].value[1]) {
      areaName = dungeonData.doorTable[i].name;

      if (areaRoll >= 1 && areaRoll <= 20) {
        speRoll = dice.die(4);

        if (speRoll === 1) {
          rollOnName = "Passage";
        } else if (speRoll === 2) {
          // rollOnName = "Stairs";
          rollOnName = "Passage";
        } else {
          rollOnName = "Room";
        }
      } else if (areaRoll >= 21 && areaRoll <= 25) {
        speRoll = dice.die(4);

        if (speRoll === 1 || speRoll === 2) {
          areaName = areaName + ". La herse est verrouillée. Check des outils de voleur DC 14 pour déverrouiller, check de force DC 19 pour ouvrir. Le levier est-il coincé ? Utilisez Q/A et des jets d'investigation";
        } else {
          areaName = areaName + ". La herse est déverrouillée";
        }
      } else if (areaRoll >= 26 && areaRoll <= 30) {
        speRoll = dice.die(100);

        if (speRoll <= 50) {
          areaName = areaName + ". Mais un piège à glyphes magiques déclenche un sort d'attaque (Fire Bolt ou autre). Faites un jet de questions/réponses avec le modificateur Improbable (-2) pour déterminer";
        }

        speRoll = dice.die(4);

        if (speRoll === 1) {
          rollOnName = "Passage";
        } else if (speRoll === 2) {
          // rollOnName = "Stairs";
          rollOnName = "Passage";
        } else {
          rollOnName = "Room";
        }
      } else if (areaRoll >= 36 && areaRoll <= 40) {
        speRoll = dice.die(4);

        if (speRoll === 1) {
          rollOnName = "Passage";
        } else {
          rollOnName = "Room";
        }
      } else if (areaRoll >= 41 && areaRoll <= 45) {
        speRoll = dice.die(20);

        if (speRoll >= 15) {
          areaName = areaName + ". Vous réussissez votre jet de Perception et vous voyez qu'il y a un piège sur cette porte";
        } else {
          areaName = areaName + ". Vous ratez votre jet de Perception et vous ne voyez pas qu'il y a un piège sur cette porte : ";

          let trapName = this.trapRandom(campaign);
          areaName = areaName + trapName;
        }

        speRoll = dice.die(4);

        if (speRoll === 1) {
          rollOnName = "Passage";
        } else if (speRoll === 2) {
          // rollOnName = "Stairs";
          rollOnName = "Passage";
        } else {
          rollOnName = "Room";
        }
      } else if (areaRoll >= 46 && areaRoll <= 50) {
        speRoll = dice.die(4);

        if (speRoll === 1 || speRoll === 2) {
          rollOnName = "Secret Passage";
        } else {
          rollOnName = "Secret Room";
        }
      } else if (areaRoll >= 56 && areaRoll <= 60) {
        speRoll = dice.die(20);

        if (speRoll >= 14) {
          areaName = areaName + ". Vous réussissez votre jet d'Intelligence, vous résolvez l'énigme et la porte se déverrouille";
        } else {
          areaName = areaName + ". Vous ratez votre jet d'Intelligence, vous ne résolvez pas l'énigme et la porte reste verrouillée";
        }

        speRoll = dice.die(4);

        if (speRoll === 1) {
          rollOnName = "Passage";
        } else {
          rollOnName = "Room";
        }
      } else if (areaRoll >= 61 && areaRoll <= 75) {
        speRoll = dice.die(6);

        if (speRoll === 1 || speRoll === 2) {
          areaName = "Porte en bois";
        } else if (speRoll === 3 || speRoll === 4) {
          areaName = "Porte en pierre";
        } else {
          areaName = "Porte en fer";
        }

        speRoll = dice.die(6);

        if (speRoll >= 1 && speRoll <= 2) {
          areaName = areaName + " verrouillée";
        } else {
          areaName = areaName + " déverrouillée";
        }

        speRoll = dice.die(6);

        if (speRoll === 1) {
          areaName = areaName + " piégée : ";

          let trapName = this.trapRandom(campaign);
          areaName = areaName + trapName;
        } else {
          areaName = areaName + " non piégée";
        }
      } else if (areaRoll >= 76 && areaRoll <= 80) {
        speRoll = dice.die(20);

        if (speRoll >= 15) {
          areaName = areaName + ". Vous réussissez votre jet de Perception et vous voyez qu'il y a un piège sur cette porte";
        } else {
          areaName = areaName + ". Vous ratez votre jet de Perception et vous ne voyez pas qu'il y a un piège sur cette porte : ";

          let trapName = this.trapRandom(campaign);
          areaName = areaName + trapName;
        }

        speRoll = dice.die(4);

        if (speRoll === 1) {
          rollOnName = "Passage";
        } else {
          rollOnName = "Room";
        }
      }

      if (rollOnName === "") {
        if (dungeonData.doorTable[i].rollOn.length > 1) {
          let rollOnRoll = dice(dungeonData.doorTable[i].rollOn.length);

          rollOnName = dungeonData.doorTable[i].rollOn[rollOnRoll];
        } else {
          rollOnName = dungeonData.doorTable[i].rollOn[0];
        }
      }
    }
  }

  return {
    areaName: areaName,
    rollOnName: rollOnName
  }
}

const stairsRandom = (campaign) => {
  let areaRoll = dice.die(20);
  let areaName = "";
  let rollOnName = "";
  let speRoll = 0;
  let roomContentModifier = 0;

  for (let i = 1; i <= Object.keys(dungeonData.stairsTable).length; i++) {
    if (areaRoll >= dungeonData.stairsTable[i].value[0] && areaRoll <= dungeonData.stairsTable[i].value[1]) {
      areaName = dungeonData.stairsTable[i].name;

      if ((areaRoll >= 1 && areaRoll <= 8) || areaRoll === 14 || areaRoll === 20) {
        speRoll = dice.die(4);

        if (speRoll === 1 || speRoll === 2) {
          areaName = areaName + " une salle";
          rollOnName = "Room";
        } else {
          areaName = areaName + " un passage";
          rollOnName = "Passage";
        }
      } else if (areaRoll === 9 || areaRoll === 12 || areaRoll === 15 || areaRoll === 18) {
        roomContentModifier = 15;
      } else if (areaRoll === 10 || areaRoll === 13 || areaRoll === 16 || areaRoll === 19) {
        roomContentModifier = 30;
      }

      if (rollOnName === "") {
        if (dungeonData.stairsTable[i].rollOn.length > 1) {
          let rollOnRoll = dice(dungeonData.stairsTable[i].rollOn.length);

          rollOnName = dungeonData.stairsTable[i].rollOn[rollOnRoll];
        } else {
          rollOnName = dungeonData.stairsTable[i].rollOn[0];
        }
      }
    }
  }

  return {
    areaName: areaName,
    rollOnName: rollOnName,
    roomContentModifier: roomContentModifier
  }
}

const roomRandom = (campaign, modifier) => {
  let areaRoll = dice.die(20);
  let areaName = "";
  let contentAreaRoll = dice.die(100);
  let contentAreaName = "";
  let speRoll = 0;
  let clueName = "";
  let exitsRoll = 0;
  let doorsRoll = 0;
  // let doorsName = [];
  // let doorTemp = "";
  let doorsCount = 0;
  let sizeModifier = 0;

  for (let i = 1; i <= Object.keys(dungeonData.roomTable).length; i++) {
    if (areaRoll >= dungeonData.roomTable[i].value[0] && areaRoll <= dungeonData.roomTable[i].value[1]) {
      areaName = dungeonData.roomTable[i].size;

      if (areaRoll === 1 || areaRoll === 2) {
        speRoll = dice.die(4) * 3;
        let speRoll2 = dice.die(4) * 3;
        exitsRoll = dice.die(6);

        if (speRoll >= ((3 / 4) * 12)) {
          sizeModifier === 30;
        } else if (speRoll >= ((1 / 2) * 12)) {
          sizeModifier === 15;
        }

        areaName = areaName + " de " + speRoll + " m sur " + speRoll2 + " m avec " + exitsRoll + " sortie(s)";
      } else if (areaRoll === 3 || areaRoll === 4) {
        speRoll = (dice.die(4) + 1) * 3;
        exitsRoll = dice.die(4);

        if (speRoll >= ((3 / 4) * 15)) {
          sizeModifier === 30;
        } else if (speRoll >= ((1 / 2) * 15)) {
          sizeModifier === 15;
        }

        areaName = areaName + " de " + speRoll + " m de côtés avec " + exitsRoll + " sortie(s)";
      } else if (areaRoll === 5 || areaRoll === 6) {
        speRoll = (dice.die(6) + 1) * 3;
        exitsRoll = dice.die(6);

        if (speRoll >= ((3 / 4) * 21)) {
          sizeModifier === 30;
        } else if (speRoll >= ((1 / 2) * 21)) {
          sizeModifier === 15;
        }

        areaName = areaName + " de " + speRoll + " m de côtés avec " + exitsRoll + " sortie(s)";
      } else if (areaRoll === 7 || areaRoll === 8) {
        speRoll = (dice.die(8) + 1) * 3;
        exitsRoll = dice.die(8);

        if (speRoll >= ((3 / 4) * 27)) {
          sizeModifier === 30;
        } else if (speRoll >= ((1 / 2) * 27)) {
          sizeModifier === 15;
        }

        areaName = areaName + " de " + speRoll + " m de côtés avec " + exitsRoll + " sortie(s)";
      } else if (areaRoll === 9 || areaRoll === 10) {
        speRoll = (dice.die(4) + 1) * 3;
        let speRoll2 = (dice.die(8) + 1) * 3;
        exitsRoll = dice.die(6);

        if (speRoll >= ((3 / 4) * 15)) {
          sizeModifier === 30;
        } else if (speRoll >= ((1 / 2) * 15)) {
          sizeModifier === 15;
        }

        areaName = areaName + " de " + speRoll + " m sur " + speRoll2 + " m avec " + exitsRoll + " sortie(s)";
      } else if (areaRoll === 11 || areaRoll === 12) {
        speRoll = (dice.die(6) + 1) * 3;
        let speRoll2 = (dice.die(6) + 2) * 3;
        exitsRoll = dice.die(6);

        if (speRoll >= ((3 / 4) * 21)) {
          sizeModifier === 30;
        } else if (speRoll >= ((1 / 2) * 21)) {
          sizeModifier === 15;
        }

        areaName = areaName + " de " + speRoll + " m sur " + speRoll2 + " m avec " + exitsRoll + " sortie(s)";
      } else if (areaRoll === 13 || areaRoll === 14) {
        speRoll = dice.die(4) * 3;
        exitsRoll = dice.die(4);

        if (speRoll >= ((3 / 4) * 12)) {
          sizeModifier === 30;
        } else if (speRoll >= ((1 / 2) * 12)) {
          sizeModifier === 15;
        }

        areaName = areaName + " de " + speRoll + " m de diamètre avec " + exitsRoll + " sortie(s)";
      } else if (areaRoll === 15) {
        speRoll = dice.die(6) * 3;
        exitsRoll = dice.die(4);

        if (speRoll >= ((3 / 4) * 18)) {
          sizeModifier === 30;
        } else if (speRoll >= ((1 / 2) * 18)) {
          sizeModifier === 15;
        }

        areaName = areaName + " de " + speRoll + " m de côtés avec " + exitsRoll + " sortie(s)";
      } else if (areaRoll === 16) {
        speRoll = dice.die(4) * 3;
        exitsRoll = dice.die(2);

        if (speRoll >= ((3 / 4) * 12)) {
          sizeModifier === 30;
        } else if (speRoll >= ((1 / 2) * 12)) {
          sizeModifier === 15;
        }

        areaName = areaName + " de " + speRoll + " m de diamètre avec " + exitsRoll + " sortie(s)";
      } else if (areaRoll === 17) {
        speRoll = dice.die(6) * 3;
        exitsRoll = dice.die(3);

        if (speRoll >= ((3 / 4) * 18)) {
          sizeModifier === 30;
        } else if (speRoll >= ((1 / 2) * 18)) {
          sizeModifier === 15;
        }

        areaName = areaName + " de " + speRoll + " m de diamètre avec " + exitsRoll + " sortie(s)";
      } else if (areaRoll === 18) {
        speRoll = dice.die(6) * 3;
        exitsRoll = dice.die(3);

        if (speRoll >= ((3 / 4) * 18)) {
          sizeModifier === 30;
        } else if (speRoll >= ((1 / 2) * 18)) {
          sizeModifier === 15;
        }

        areaName = areaName + " de " + speRoll + " m de diamètre avec " + exitsRoll + " sortie(s)";
      } else if (areaRoll === 19) {
        speRoll = dice.die(6) * 3;
        exitsRoll = dice.die(3);

        if (speRoll >= ((3 / 4) * 18)) {
          sizeModifier === 30;
        } else if (speRoll >= ((1 / 2) * 18)) {
          sizeModifier === 15;
        }

        areaName = areaName + " de " + speRoll + " m de côtés avec " + exitsRoll + " sortie(s)";
      } else if (areaRoll === 20) {
        speRoll = dice.die(12) * 3;
        exitsRoll = dice.die(3);

        if (speRoll >= ((3 / 4) * 36)) {
          sizeModifier === 30;
        } else if (speRoll >= ((1 / 2) * 36)) {
          sizeModifier === 15;
        }

        areaName = areaName + " de " + speRoll + " m de largeur avec " + exitsRoll + " sortie(s)";
      }

      for (let j = 0; j < exitsRoll; j++) {
        doorsRoll = dice.die(100);

        if (doorsRoll <= 50) {
          // doorTemp = this.doorRandom(campaign);
          // doorsName.push(doorTemp);

          doorsCount++;
        }
      }

      areaName = areaName + " dont " + doorsCount + " porte(s)"
    }
  }

  for (let i = 1; i <= Object.keys(dungeonData.roomContentTable).length; i++) {
    if ((contentAreaRoll + sizeModifier) >= dungeonData.roomContentTable[i].value[0] && (contentAreaRoll + sizeModifier) <= dungeonData.roomContentTable[i].value[1]) {
      contentAreaName = dungeonData.roomContentTable[i].name;

      if ((contentAreaRoll + sizeModifier) >= 13 && (contentAreaRoll + sizeModifier) <= 20) {
        speRoll = dice.die(6);

        if (speRoll === 1) {
          contentAreaName = contentAreaName + "gouffre";
        } else if (speRoll === 2) {
          contentAreaName = contentAreaName + "champignon";
        } else if (speRoll === 3) {
          contentAreaName = contentAreaName + "piège : ";

          let trapName = this.trapRandom(campaign);
          contentAreaName = contentAreaName + trapName;
        } else if (speRoll === 4) {
          contentAreaName = contentAreaName + "effondrement de maçonnerie ou autre danger naturel";
        } else if (speRoll === 5) {
          contentAreaName = contentAreaName + "monstre errant, difficulté moyenne";
        } else if (speRoll === 6) {
          contentAreaName = contentAreaName + "au choix du joueur";
        }
      }
    }
  }

  return {
    areaName: areaName,
    contentAreaName: contentAreaName,
    doorsCount: doorsCount,
    exitsRoll: exitsRoll
  }
}

const architectureRandom = (campaign) => {
  let areaRoll = dice.die(20);
  let areaName = "";
  let speRoll = 0;

  for (let i = 1; i <= Object.keys(dungeonData.architectureFeatureTable).length; i++) {
    if (areaRoll >= dungeonData.architectureFeatureTable[i].value[0] && areaRoll <= dungeonData.architectureFeatureTable[i].value[1]) {
      areaName = dungeonData.architectureFeatureTable[i].name;

      if (areaRoll === 4) {
        speRoll = dice.die(4);

        areaName = speRoll + " piscines";
      } else if (areaRoll === 9) {
        speRoll = dice.die(20);

        if (speRoll >= 10) {
          areaName = areaName + "Vous réussissez votre jet d'Intelligence et vous comprenez le puzzle";
        } else {
          areaName = areaName + "Vous ratez votre jet d'Intelligence et vous ne comprenez pas le puzzle";
        }
      } else if (areaRoll === 10 || areaRoll === 13 || areaRoll === 16 || areaRoll === 19) {
        roomContentModifier = 30;
      }
    }
  }

  return {
    areaName: areaName,
    roomContentModifier: roomContentModifier
  }
}

const secretDoorRandom = (campaign) => {
  let areaRoll = dice.die(6);
  let areaName = "";
  let speRoll = 0;

  for (let i = 1; i <= Object.keys(dungeonData.secretDoorTable).length; i++) {
    if (areaRoll >= dungeonData.secretDoorTable[i].value[0] && areaRoll <= dungeonData.secretDoorTable[i].value[1]) {
      areaName = dungeonData.secretDoorTable[i].name;

      if (areaRoll >= 1 && areaRoll <= 2) {
        this.roomRandom(campaign, 40);
      } else if (areaRoll >= 3 && areaRoll <= 4) {
        this.passageRandom(campaign, 40);
      } else if (areaRoll >= 5 && areaRoll <= 6) {
        let trapName = this.trapRandom(campaign);

        areaName = areaName + " : " + trapName;

        speRoll = dice.die(4);
      }
    }
  }

  return {
    areaName: areaName
  }
}

const trapRandom = (campaign) => {
  let areaRoll = dice.die(100);
  let areaName = "";
  let noticeRoll = dice.die(20);
  let saveRoll = dice.die(20);
  let speRoll = 0;
  let damage = 0;
  let levelPlayer = 1;
  let rollsNumber = 0;
  let damageRoll = 0;

  for (let i = 1; i <= Object.keys(dungeonData.trapTable).length; i++) {
    if (areaRoll >= dungeonData.trapTable[i].value[0] && areaRoll <= dungeonData.trapTable[i].value[1]) {
      areaName = dungeonData.trapTable[i].name;

      if (areaRoll >= 51 && areaRoll <= 56) {
        speRoll = dice.die(4);

        if (speRoll === 1) {
          areaName = areaName + " de feu";
        } else if (speRoll === 2) {
          areaName = areaName + " de froid";
        } else if (speRoll === 3) {
          areaName = areaName + " de force";
        } else if (speRoll === 4) {
          areaName = areaName + " de foudre";
        }
      }

      if (noticeRoll >= dungeonData.trapTable[i].noticeDC) {
        areaName = areaName + " : vous réussissez votre jet et vous remarquez le piège";
      } else {
        if (saveRoll >= dungeonData.trapTable[i].saveDC) {
          areaName = areaName + " : vous ratez votre jet, vous ne remarquez pas le piège mais vous arrivez à l'éviter";
        } else {
          areaName = areaName + " : vous ratez votre jet, vous ne remarquez pas le piège et vous n'arrivez pas à l'éviter";

          if (dungeonData.trapTable[i].calcul === "-") {
            rollsNumber = levelPlayer - dungeonData.trapTable[i].level;
          } else if (dungeonData.trapTable[i].calcul === "" || dungeonData.trapTable[i].calcul === "*") {
            rollsNumber = levelPlayer * dungeonData.trapTable[i].level;
          } else if (dungeonData.trapTable[i].calcul === "+") {
            rollsNumber = levelPlayer + dungeonData.trapTable[i].level;
          }

          if (rollsNumber < 1) {
            rollsNumber = 1;
          }

          for (let i = 1; i <= rollsNumber; i++) {
            damageRoll = damageRoll + dice.die(6);
          }

          areaName = areaName + ". Vous prenez " + damageRoll + " de dégâts"
        }
      }
    }
  }

  return {
    areaName: areaName
  }
}

const clueRandom = (campaign) => {
  let areaRoll = dice.die(100);
  let areaName = "";
  let speRoll = 0;

  for (let i = 1; i <= Object.keys(dungeonData.cluesTable).length; i++) {
    if (areaRoll >= dungeonData.cluesTable[i].value[0] && areaRoll <= dungeonData.cluesTable[i].value[1]) {
      areaName = dungeonData.cluesTable[i].name;

      if (areaRoll === 6) {
        speRoll = dice.die(10);

        areaName = speRoll + areaName;
      } else if (areaRoll === 97) {
        speRoll = dice.die(20);

        if (speRoll >= 12) {
          areaName = areaName + ". Vous réussissez votre jet de nature et vous savez que ce sont des plumes de harpies";
        }
      }
    }
  }

  return {
    areaName: areaName
  }
}

exports.dungeonCreate = dungeonCreate;
exports.dungeonMove = dungeonMove;
exports.passageRandom = passageRandom;
exports.doorRandom = doorRandom;
exports.stairsRandom = stairsRandom;
exports.roomRandom = roomRandom;
exports.architectureRandom = architectureRandom;
exports.secretDoorRandom = secretDoorRandom;
exports.trapRandom = trapRandom;
exports.clueRandom = clueRandom;