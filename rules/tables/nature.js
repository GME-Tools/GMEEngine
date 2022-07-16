const dice = require('../dice');
const natureData = require('../../data/nature');
const dungeonData = require('../../data/dungeon');
const encounters = require('./encounters');
const dungeon = require('./dungeon');

const createNature = function(campaign, populationDensity, dayNight) {
  let terrainTypeRoll = dice.die(8);
  let terrainTypeName = "";
  let terrainTypeRollOn = "";
  let globalTerrainRoll = dice.die(100);
  let minorFeatureName = "";
  let minorFeatureSize = 0;
  let minorFeatureRollOn = "";
  let minorFeatureNameRoll = 0;
  let minorTerrainRoll = dice.die(100);
  let minorType = "";
  let minorDescription = "";
  let minorFeature = [];
  let speRoll1 = 0;
  let speRoll2 = 0;
  let speRoll3 = 0;
  let speRoll4 = 0;

  for (let i = 1 ; i <= Object.keys(natureData.terrainTypeTable).length ; i++) {
    if (terrainTypeRoll >= natureData.terrainTypeTable[i].value[0] && terrainTypeRoll <= natureData.terrainTypeTable[i].value[1]) {
      terrainTypeName = natureData.terrainTypeTable[i].terrainType;
      terrainTypeRollOn = natureData.terrainTypeTable[i].rollOn;
    }
  }

  let wildernessEncounters = encounters.wildernessEncounters(campaign, populationDensity, dayNight);

  for (let i = 1 ; i <= Object.keys(natureData[terrainTypeRollOn]).length ; i++) {
    if (globalTerrainRoll >= natureData[terrainTypeRollOn][i].value[0] && globalTerrainRoll <= natureData[terrainTypeRollOn][i].value[1]) {
      if (natureData[terrainTypeRollOn][i].minorFeature.includes("1d6")) {
        minorFeatureNameRoll = dice.die(6);

        if (terrainTypeName === "Forêt / Jungle") {
          if (minorFeatureNameRoll === 1 || minorFeatureNameRoll === 2) {
            minorFeatureName = "Structure";
  
            minorFeatureRollOn = "structureMinorTable";
          } else if (minorFeatureNameRoll === 3 || minorFeatureNameRoll === 4) {
            minorFeatureName = "Monument";
  
            minorFeatureRollOn = "monumentMinorTable";
          } else if (minorFeatureNameRoll === 5 || minorFeatureNameRoll === 6) {
            minorFeatureName = "Repaire de monstre";
  
            minorFeatureRollOn = "monstersTable";
          }
        } else {
          if (minorFeatureNameRoll === 1 || minorFeatureNameRoll === 2) {
            minorFeatureName = "Structure";
  
            minorFeatureRollOn = "structureMinorTable";
          } else if (minorFeatureNameRoll === 3 || minorFeatureNameRoll === 4) {
            minorFeatureName = "Monument";
  
            minorFeatureRollOn = "monumentMinorTable";
          } else if (minorFeatureNameRoll === 5 || minorFeatureNameRoll === 6) {
            minorFeatureName = "Élément paysager intéressant";
  
            minorFeatureRollOn = "landscapeMinorTable";
          }
        }
      } else {
        minorFeatureName = natureData[terrainTypeRollOn][i].minorFeature;

        minorFeatureRollOn = natureData[terrainTypeRollOn][i].rollOn;
      }

      if (natureData[terrainTypeRollOn][i].size === 1) {
        minorFeatureSize = dice.die(6);
      } else {
        minorFeatureSize = natureData[terrainTypeRollOn][i].size;
      }
    }
  }

  if (!minorFeatureRollOn.includes("Global")) {
    for (let i = 1 ; i <= Object.keys(natureData[minorFeatureRollOn]).length ; i++) {
      if (minorTerrainRoll >= natureData[minorFeatureRollOn][i].value[0] && minorTerrainRoll <= natureData[minorFeatureRollOn][i].value[1]) {
        if (minorFeatureRollOn === "clearfelledMinorTable") {
          if (minorTerrainRoll >= 51 && minorTerrainRoll <= 60) {
            speRoll1 = dice.die(100);
  
            if (speRoll1 <= 40) {
              minorType = natureData[minorFeatureRollOn][i].type + ", ce sont des humains";
            } else {
              minorType = natureData[minorFeatureRollOn][i].type + ", ce ne sont pas des humains";
            }

            minorDescription = natureData[minorFeatureRollOn][i].description; 
          } else if (minorTerrainRoll >= 61 && minorTerrainRoll <= 70) {
            speRoll1 = dice.die(20);

            minorType = natureData[minorFeatureRollOn][i].type;
  
            if (speRoll1 >= 12) {
              minorDescription = "Vous arrivez à en discerner la cause. Utilisez les jets de questions/réponses pour connaître la cause exacte (ajoutez un bonus de +2 aux jets)";
            } else {
              minorDescription = "Vous n'arrivez pas à en discerner la cause. Utilisez les jets de questions/réponses pour connaître la cause exacte (ajoutez un malus de -2 aux jets)";
            }
          } else if (minorTerrainRoll >= 71 && minorTerrainRoll <= 80) {
            speRoll1 = dice.die(100);

            for (let i = 1 ; i <= Object.keys(natureData.unmarkedSettlementsTable).length ; i++) {
              if (speRoll1 >= natureData.unmarkedSettlementsTable[i].value[0] && speRoll1 <= natureData.unmarkedSettlementsTable[i].value[1]) {
                minorType = natureData.unmarkedSettlementsTable[i].type;
                minorDescription = natureData.unmarkedSettlementsTable[i].description; 
              }
            }
          } else if (minorTerrainRoll >= 81 && minorTerrainRoll <= 90) {
            speRoll1 = dice.die(100);
  
            if (speRoll1 <= 70) {
              minorType = natureData[minorFeatureRollOn][i].type + ", les travailleurs sont humains, contractés par une grande colonie voisine";
            } else {
              minorType = natureData[minorFeatureRollOn][i].type + ", les travailleurs ne sont pas humains, contractés par une grande colonie voisine";
            }

            minorDescription = natureData[minorFeatureRollOn][i].description; 
          } else if (minorTerrainRoll >= 91 && minorTerrainRoll <= 100) {
            speRoll1 = dice.die(100);
            speRoll2 = dice.die(100);
  
            if (speRoll1 <= 70) {
              minorType = natureData[minorFeatureRollOn][i].type + ", les travailleurs sont humains, le bois ira à la construction d'une nouvelle colonie non marquée";
            } else {
              minorType = natureData[minorFeatureRollOn][i].type + ", les travailleurs ne sont pas humains, le bois ira à la construction d'une nouvelle colonie non marquée";
            }

            minorDescription = natureData[minorFeatureRollOn][i].description;

            for (let i = 1 ; i <= Object.keys(natureData.unmarkedSettlementsTable).length ; i++) {
              if (speRoll1 >= natureData.unmarkedSettlementsTable[i].value[0] && speRoll1 <= natureData.unmarkedSettlementsTable[i].value[1]) {
                minorType = minorType + " (" + natureData.unmarkedSettlementsTable[i].type + ")";
                minorDescription = minorDescription + " (" + natureData.unmarkedSettlementsTable[i].description + ")"; 
              }
            }
          } else {
            minorType = natureData[minorFeatureRollOn][i].type;
            minorDescription = natureData[minorFeatureRollOn][i].description; 
          }
        } else if (minorFeatureRollOn === "clearingMinorTable") {
          if (minorTerrainRoll >= 1 && minorTerrainRoll <= 52) {
            speRoll1 = dice.die(100);
            speRoll2 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;
            
            if (speRoll1 <= 50) {
              minorDescription = "Quelque chose vous regarde depuis les arbres.";

              if (speRoll2 <= 50) {
                minorDescription = minorDescription + "Vous le remarquez. Jets de questions/réponses";
              } else {
                minorDescription = minorDescription + "Vous ne le remarquez pas. Jets de questions/réponses";
              }
            } else {
              minorDescription = "Vous ne remarquez rien de particulier";
            }
          } else if (minorTerrainRoll >= 53 && minorTerrainRoll <= 58) {
            speRoll1 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;
            if (speRoll1 <= 20) {
              speRoll2 = dice.die(100);
              
              minorDescription = "Vous trouvez un incide : ";
              for (let i = 1 ; i <= Object.keys(dungeonData.cluesTable).length ; i++) {
                if (speRoll2 >= dungeonData.cluesTable[i].value[0] && speRoll2 <= dungeonData.cluesTable[i].value[1]) {
                  minorDescription = minorDescription + dungeonData.cluesTable[i].name;
                }
              }
            } else {
              minorDescription = "Vous ne trouvez rien de particulier";
            }
          } else if (minorTerrainRoll >= 59 && minorTerrainRoll <= 65) {
            speRoll1 = dice.die(100);
            speRoll3 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;
            if (speRoll1 <= 40) {
              speRoll2 = dice.die(100);
              
              minorDescription = "Jets de questions/réponses pour en savoir plus. Vous trouvez un incide : ";
              for (let i = 1 ; i <= Object.keys(dungeonData.cluesTable).length ; i++) {
                if (speRoll2 >= dungeonData.cluesTable[i].value[0] && speRoll2 <= dungeonData.cluesTable[i].value[1]) {
                  minorDescription = minorDescription + dungeonData.cluesTable[i].name;
                }
              }
            } else {
              minorDescription = "Jets de questions/réponses pour en savoir plus. Vous ne trouvez rien de particulier";
            }

            if (speRoll3 <= 10) {
              minorDescription = ". Vous faites une rencontre de niveau moyen"
            }
          } else if (minorTerrainRoll >= 66 && minorTerrainRoll <= 71) {
            speRoll1 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;
            
            if (speRoll1 <= 20) {
              minorDescription = "Rencontre facile (bête). S'il est laissé seul, il boira probablement un peu et partira";
            } else {
              minorDescription = "Vous ne trouvez rien de particulier";
            }
          } else if (minorTerrainRoll >= 72 && minorTerrainRoll <= 77) {
            speRoll1 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;
            
            if (speRoll1 <= 50) {
              speRoll2 = dice.die(100);
              
              minorDescription = "Jets de questions/réponses ou jets d'investigation pour en savoir plus. Vous trouvez un incide : ";
              for (let i = 1 ; i <= Object.keys(dungeonData.cluesTable).length ; i++) {
                if (speRoll2 >= dungeonData.cluesTable[i].value[0] && speRoll2 <= dungeonData.cluesTable[i].value[1]) {
                  minorDescription = minorDescription + dungeonData.cluesTable[i].name;
                }
              }
            } else {
              minorDescription = "Jets de questions/réponses ou jets d'investigation pour en savoir plus. Vous ne trouvez rien de particulier";
            }
          } else if (minorTerrainRoll >= 78 && minorTerrainRoll <= 83) {
            speRoll1 = dice.die(20);

            minorType = natureData[minorFeatureRollOn][i].type;
            
            if (speRoll1 >= 8) {
              minorDescription = "Vous entendez que ce campement est occupé";
            } else {
              minorDescription = "Vous n'entendez rien";
            }

            speRoll2 = dice.die(100);

              if (speRoll2 <= 50) {
              minorDescription = minorDescription + ". Les occupants sont amicaux";
            } else {
              minorDescription = minorDescription + ". Les occupants sont hostiles";
            }
          } else if (minorTerrainRoll >= 90 && minorTerrainRoll <= 95) {
            speRoll1 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;
            
            for (let i = 1 ; i <= Object.keys(natureData.structureMinorTable).length ; i++) {
              if (speRoll1 >= natureData.structureMinorTable[i].value[0] && speRoll1 <= natureData.structureMinorTable[i].value[1]) {
                minorDescription = natureData.structureMinorTable[i].name;
              }
            }
          } else if (minorTerrainRoll >= 96 && minorTerrainRoll <= 98) {
            speRoll1 = dice.die(20);

            if (speRoll1 >= 10) {
              minorDescription = "Vous parvenez à interagir avec eux. Jets de questions/réponses pour en savoir plus";
            } else {
              minorDescription = "Les tréants vous ignorent";
            }
          } else if (minorTerrainRoll >= 99 && minorTerrainRoll <= 100) {
            speRoll1 = dice.die(100);

            if (speRoll1 <= 50) {
              minorDescription = "Il/elle est amical(e). Jets de questions/réponses pour déterminer l'interaction. Peut-être qu'ils ont une quête pour vous !";
            } else {
              minorDescription = "Il/elle est hostile. Jets de questions/réponses pour déterminer l'interaction";
            }
          } else {
            minorType = natureData[minorFeatureRollOn][i].type;
            minorDescription = natureData[minorFeatureRollOn][i].description; 
          }
        } else if (minorFeatureRollOn === "gullyMinorTable") {
          if (minorTerrainRoll >= 51 && minorTerrainRoll <= 57) {
            speRoll1 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;
            
            for (let i = 1 ; i <= Object.keys(natureData.waterwayMinorTable).length ; i++) {
              if (speRoll1 >= natureData.waterwayMinorTable[i].value[0] && speRoll1 <= natureData.waterwayMinorTable[i].value[1]) {
                minorDescription = natureData.waterwayMinorTable[i].name;
              }
            }
          } else if (minorTerrainRoll >= 58 && minorTerrainRoll <= 64) {
            speRoll1 = dice.die(100);
            speRoll2 = dice.die(100);
            speRoll3 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;

            if (speRoll1 <= 25) {
              minorDescription = ". Vous faîtes une rencontre de niveau facile";
            }

            if (speRoll2 <= 15) {
              minorDescription = minorDescription + ". Vous pouvez vous aventurer dans les tunnels";
            }

            if (speRoll2 <= 10) {
              minorDescription = minorDescription + ". Vous rencontrez un PNJ";
            }
          } else if (minorTerrainRoll >= 79 && minorTerrainRoll <= 85) {
            speRoll1 = dice.die(100);
            speRoll2 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;

            if (speRoll1 <= 25) {
              minorDescription = ". Vous faîtes une rencontre de niveau facile";
            }

            if (speRoll2 <= 25) {
              speRoll3 = dice.die(100);
              
              minorDescription = minorDescription + ". Vous trouvez un incide : ";
              for (let i = 1 ; i <= Object.keys(dungeonData.cluesTable).length ; i++) {
                if (speRoll3 >= dungeonData.cluesTable[i].value[0] && speRoll3 <= dungeonData.cluesTable[i].value[1]) {
                  minorDescription = minorDescription + dungeonData.cluesTable[i].name;
                }
              }
            }
          } else if (minorTerrainRoll >= 86 && minorTerrainRoll <= 92) {
              speRoll1 = dice.die(100);

              minorType = natureData[minorFeatureRollOn][i].type;
            let dungeonCreated = dungeon.dungeonCreate(campaign, "actif");

            minorDescription = ". Un donjon a été découvert : " + dungeonCreated.dungeonName;
          } else if (minorTerrainRoll >= 93 && minorTerrainRoll <= 100) {
            speRoll1 = dice.die(100);
            speRoll2 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;

            if (speRoll1 <= 50) {
              minorDescription = "Personnage(s) amical(e)(aux)"
            } else {
              minorDescription = "Personnage(s) hostile(s)"
            }
            
            if (speRoll2 <= 50) {
              speRoll3 = dice.die(100);
              
              minorDescription = minorDescription + ". Vous trouvez un incide : ";
              for (let i = 1 ; i <= Object.keys(dungeonData.cluesTable).length ; i++) {
                if (speRoll3 >= dungeonData.cluesTable[i].value[0] && speRoll3 <= dungeonData.cluesTable[i].value[1]) {
                  minorDescription = minorDescription + dungeonData.cluesTable[i].name;
                }
              }
            }
          } else {
            minorType = natureData[minorFeatureRollOn][i].type;
            minorDescription = natureData[minorFeatureRollOn][i].description;
          }
        } else if (minorFeatureRollOn === "hillsMinorTable") {
          if (minorTerrainRoll >= 51 && minorTerrainRoll <= 57) {
            speRoll1 = dice.die(100);
            speRoll3 = dice.die(100);
            speRoll4 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;
            
            if (speRoll1 <= 25) {
              speRoll2 = dice.die(100);
              
              minorDescription = minorDescription + ". Vous trouvez un incide : ";
              for (let i = 1 ; i <= Object.keys(dungeonData.cluesTable).length ; i++) {
                if (speRoll2 >= dungeonData.cluesTable[i].value[0] && speRoll2 <= dungeonData.cluesTable[i].value[1]) {
                  minorDescription = minorDescription + dungeonData.cluesTable[i].name;
                }
              }
            }

            if (speRoll3 <= 50) {
              minorDescription = minorDescription + ". Il y a des tunnels";
            } else {
              minorDescription = minorDescription + ". Il ne semble pas y avoir de tunnels";
            }

            if (speRoll4 <= 50) {
              minorDescription = minorDescription + ". Les tunnels semblent habités";
            } else {
              minorDescription = minorDescription + ". Les tunnels ne semblent pas habités";
            }
          } else if (minorTerrainRoll >= 58 && minorTerrainRoll <= 64) {
            speRoll1 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;

            if (speRoll1 <= 10) {
              minorDescription = minorDescription + ". Vous rencontrez un PNJ";
            }
          } else if (minorTerrainRoll >= 65 && minorTerrainRoll <= 71) {
            speRoll1 = dice.die(20);

            minorType = natureData[minorFeatureRollOn][i].type;

            if (speRoll1 >= 16) {
              minorDescription = "Vous réussissez votre jet d'Athlétisme et vous parvenez à escalader";
            } else {
              minorDescription = "Vous ratez votre jet d'Athlétisme et vous chutez, vous blessant au passage";
            }
          } else if (minorTerrainRoll >= 72 && minorTerrainRoll <= 78) {
            speRoll1 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;

            if (speRoll1 <= 25) {
              speRoll2 = dice.die(100);
              
              for (let i = 1 ; i <= Object.keys(natureData.monumentMinorTable).length ; i++) {
                if (speRoll2 >= natureData.monumentMinorTable[i].value[0] && speRoll2 <= natureData.monumentMinorTable[i].value[1]) {
                  minorDescription = natureData.monumentMinorTable[i].name;
                }
              }
            }
          } else if (minorTerrainRoll >= 79 && minorTerrainRoll <= 85) {
            speRoll1 = dice.die(100);
            speRoll2 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;
            
            for (let i = 1 ; i <= Object.keys(natureData.woodMinorTable).length ; i++) {
              if (speRoll1 >= natureData.woodMinorTable[i].value[0] && speRoll1 <= natureData.woodMinorTable[i].value[1]) {
                minorDescription = natureData.woodMinorTable[i].name;
              }
            }

            if (speRoll2 <= 25) {
              minorDescription = minorDescription + ". Vous faîtes une rencontre de niveau facile";
            } else {
            minorType = natureData[minorFeatureRollOn][i].type;
            minorDescription = natureData[minorFeatureRollOn][i].description; 
          }
        } else if (minorTerrainRoll >= 93 && minorTerrainRoll <= 100) {
          speRoll1 = dice.die(100);

          minorType = natureData[minorFeatureRollOn][i].type;

          if (speRoll1 <= 50) {
            minorDescription = minorDescription + ". Vous tombez sur une colonie humanoïde";
          } else {
            minorDescription = minorDescription + ". Vous tombez sur une colonie de bêtes fouisseuses";
          }
        } else {
          minorType = natureData[minorFeatureRollOn][i].type;
          minorDescription = natureData[minorFeatureRollOn][i].description; 
        }
      } else if (minorFeatureRollOn === "landscapeMinorTable") {
          if (minorTerrainRoll >= 7 && minorTerrainRoll <= 7) {
            if (terrainTypeName === "Côtier") {
              speRoll1 = dice.die(20);

              for (let i = 1 ; i <= Object.keys(natureData.landscapeMinorTable).length ; i++) {
                if (speRoll1 >= natureData.landscapeMinorTable[i].value[0] && speRoll1 <= natureData.landscapeMinorTable[i].value[1]) {
                  minorType = natureData[minorFeatureRollOn][i].type;
                  
                  minorDescription = natureData.landscapeMinorTable[i].name;
                }
              }
            } else {
              minorType = natureData[minorFeatureRollOn][i].type;
              minorDescription = natureData[minorFeatureRollOn][i].description;
            }
          } else if (minorTerrainRoll >= 14 && minorTerrainRoll <= 14) {
            speRoll1 = dice.die(20);

            minorType = natureData[minorFeatureRollOn][i].type;

            if (speRoll1 >= 10) {
            minorDescription = "Vous remarquez les sables mouvants";
            } else {
              minorDescription = "Vous ne remarquez pas les sables mouvants et vous commencez à vous enfoncer";
            }
          } else if (minorTerrainRoll >= 20 && minorTerrainRoll <= 20) {
            speRoll1 = dice.die(4);

            minorType = speRoll1 + " " + natureData[minorFeatureRollOn][i].type;

            minorDescription = natureData[minorFeatureRollOn][i].description;
          } else {
            minorType = natureData[minorFeatureRollOn][i].type;
            minorDescription = natureData[minorFeatureRollOn][i].description;
          }
        } else if (minorFeatureRollOn === "lakeMinorTable") {
          if (minorTerrainRoll >= 51 && minorTerrainRoll <= 55) {
            speRoll1 = dice.die(100);

            for (let i = 1 ; i <= Object.keys(natureData.unmarkedSettlementsTable).length ; i++) {
              if (speRoll1 >= natureData.unmarkedSettlementsTable[i].value[0] && speRoll1 <= natureData.unmarkedSettlementsTable[i].value[1]) {
                minorType = minorType + " (" + natureData.unmarkedSettlementsTable[i].type + ")";
                minorDescription = natureData.unmarkedSettlementsTable[i].description; 
              }
            }
          } else if (minorTerrainRoll >= 61 && minorTerrainRoll <= 65) {
            speRoll1 = dice.die(20);
            speRoll2 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;

            if (speRoll1 >= 19) {
              minorDescription = "Vous réussissez votre jet de Survie et vous arrivez à construire un canoë"; 
            } else {
              minorDescription = "Vous ratez votre jet de Survie et vous n'arrivez pas à construire un canoë"; 
            }

            if (speRoll2 <= 10) {
              minorDescription = minorDescription + ". Vous tombez sur un PNJ"
            }
          } else if (minorTerrainRoll >= 56 && minorTerrainRoll <= 60) {
            speRoll1 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;

            if (speRoll1 <= 30) {
              minorDescription = "Vous faîtes une rencontre de niveau moyen"; 
            }
          } else if (minorTerrainRoll >= 66 && minorTerrainRoll <= 70) {
            speRoll1 = dice.die(100) + 20;

            for (let i = 1 ; i <= Object.keys(natureData.unmarkedSettlementsTable).length ; i++) {
              if (speRoll1 >= natureData.unmarkedSettlementsTable[i].value[0] && speRoll1 <= natureData.unmarkedSettlementsTable[i].value[1]) {
                minorType = minorType + " (" + natureData.unmarkedSettlementsTable[i].type + ")";
                minorDescription = natureData.unmarkedSettlementsTable[i].description; 
              }
            }
          } else if (minorTerrainRoll >= 71 && minorTerrainRoll <= 75) {
            speRoll1 = dice.die(100);

            for (let i = 1 ; i <= Object.keys(natureData.mountainMinorTable).length ; i++) {
              if (speRoll1 >= natureData.mountainMinorTable[i].value[0] && speRoll1 <= natureData.mountainMinorTable[i].value[1]) {
                minorType = minorType + " (" + natureData.mountainMinorTable[i].type + ")";
                minorDescription = natureData.mountainMinorTable[i].description; 
              }
            }
          } else if (minorTerrainRoll >= 76 && minorTerrainRoll <= 80) {
            speRoll1 = dice.die(100);

            for (let i = 1 ; i <= Object.keys(natureData.woodMinorTable).length ; i++) {
              if (speRoll1 >= natureData.woodMinorTable[i].value[0] && speRoll1 <= natureData.woodMinorTable[i].value[1]) {
                minorType = minorType + " (" + natureData.woodMinorTable[i].type + ")";
                minorDescription = natureData.woodMinorTable[i].description; 
              }
            }
          } else if (minorTerrainRoll >= 81 && minorTerrainRoll <= 85) {
            speRoll1 = dice.die(100);
            speRoll2 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;

            if (speRoll1 <= 25) {
              speRoll3 = dice.die(100);
              
              minorDescription = minorDescription + ". Vous trouvez un incide : ";
              for (let i = 1 ; i <= Object.keys(dungeonData.cluesTable).length ; i++) {
                if (speRoll3 >= dungeonData.cluesTable[i].value[0] && speRoll3 <= dungeonData.cluesTable[i].value[1]) {
                  minorDescription = minorDescription + dungeonData.cluesTable[i].name;
                }
              }
            }

            if (speRoll2 <= 40) {
              minorDescription = ". Vous rencontrez un PNJ"; 
            }
          } else if (minorTerrainRoll >= 86 && minorTerrainRoll <= 90) {
            speRoll1 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;

            if (speRoll1 <= 25) {
              speRoll2 = dice.die(100);
              
              minorDescription = minorDescription + ". Vous trouvez un incide : ";
              for (let i = 1 ; i <= Object.keys(dungeonData.cluesTable).length ; i++) {
                if (speRoll2 >= dungeonData.cluesTable[i].value[0] && speRoll2 <= dungeonData.cluesTable[i].value[1]) {
                  minorDescription = minorDescription + dungeonData.cluesTable[i].name;
                }
              }
            }
          } else if (minorTerrainRoll >= 91 && minorTerrainRoll <= 95) {
            speRoll1 = dice.die(20);

            minorType = natureData[minorFeatureRollOn][i].type;

            if (speRoll1 >= 15) {
              minorDescription = "Vous réussissez votre jet de Survie et vous attrapez un poisson"; 
            } else {
              minorDescription = "Vous ratez votre jet de Survie et vous attrapez un poisson"; 
            }
          } else if (minorTerrainRoll >= 96 && minorTerrainRoll <= 100) {
            speRoll1 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;

            if (speRoll1 <= 50) {
              minorDescription = "Des rituels sont en cours ou il y a des PNJ utilisateurs de magie à proximité. Jets de questions/réponses pour en savoir plus"; 
            }
          } else {
            minorType = natureData[minorFeatureRollOn][i].type;
            minorDescription = natureData[minorFeatureRollOn][i].description; 
          }
        } else if (minorFeatureRollOn === "monumentMinorTable") {
          if (minorTerrainRoll >= 1 && minorTerrainRoll <= 1) {
            speRoll1 = dice.die(100);
            speRoll2 = dice.die(200);

            minorType = natureData[minorFeatureRollOn][i].type;

            if (speRoll1 <= 50) {
              minorDescription = ". Vous pouvez voir des runes inscrites"; 
            }

            if (speRoll2 <= 10) {
              minorDescription = ". Vous rencontrez un PNJ"; 
            }
          } else if (minorTerrainRoll >= 3 && minorTerrainRoll <= 3) {
            speRoll1 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;

            if (speRoll1 <= 25) {
              minorDescription = "Vous faites une rencontre de niveau facile. Jets de questions/réponses pour déterminer qui est à proximité"; 
            }
          } else if (minorTerrainRoll >= 4 && minorTerrainRoll <= 4) {
            speRoll1 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;

            if (speRoll1 <= 50) {
              minorDescription = ". Le petit sanctuaire est actuellement fréquenté"; 
            } else {
              minorDescription = ". Le petit sanctuaire est actuellement vide"; 
            }
          } else if (minorTerrainRoll >= 5 && minorTerrainRoll <= 5) {
            speRoll1 = dice.die(100);
            speRoll2 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;

            if (speRoll1 <= 50) {
              minorDescription = "Une des colonies n'est pas référencée sur les cartes"; 
            }

            if (speRoll2 <= 10) {
              speRoll3 = dice.die(100);
              
              minorDescription = minorDescription + ". Vous trouvez un incide : ";
              for (let i = 1 ; i <= Object.keys(dungeonData.cluesTable).length ; i++) {
                if (speRoll3 >= dungeonData.cluesTable[i].value[0] && speRoll3 <= dungeonData.cluesTable[i].value[1]) {
                  minorDescription = minorDescription + dungeonData.cluesTable[i].name;
                }
              }
            }
          } else if (minorTerrainRoll >= 6 && minorTerrainRoll <= 6) {
            speRoll1 = dice.die(100);

            minorType = natureData[minorFeatureRollOn][i].type;

            if (speRoll1 <= 50) {
              minorDescription = ". La falaise est actuellement fréquentée"; 
            } else {
              minorDescription = ". La falaise est actuellement vide"; 
            }
          } else {
            minorType = natureData[minorFeatureRollOn][i].type;
            minorDescription = natureData[minorFeatureRollOn][i].description; 
          }
        } else {
          minorType = natureData[minorFeatureRollOn][i].type;
          minorDescription = natureData[minorFeatureRollOn][i].description; 
        }
      }
    }
  }

  minorFeature.push({"minorFeatureName": minorFeatureName, "size": minorFeatureSize, "minorType": minorType, "minorDescription": minorDescription});

  /* if (campaign[0].nature === undefined || campaign[0].nature.length === 0) {
    campaign[0].nature = [];
  }

  console.log(terrainTypeName);
  console.log(wildernessEncounters);
  console.log(minorFeature);

  campaign[0].nature.push({ "terrainType": terrainTypeName, "wildernessEncounters": wildernessEncounters, "minorFeature": minorFeature });

  campaign[0].save(function (err) {
    if (err) return handleError(err);
  }); */

  return {
    terrainTypeName: terrainTypeName,
    wildernessEncounters: wildernessEncounters,
    minorFeatureName: minorFeatureName,
    minorFeatureSize: minorFeatureSize,
    minorType: minorType,
    minorDescription: minorDescription
  }
}

exports.createNature = createNature;