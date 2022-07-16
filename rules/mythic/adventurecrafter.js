const dice = require('../dice');
const adventureData = require('../../data/adventurecrafter');
const plotPointsData = require('../../data/plotPoints');

const themeCreation = (campaign, themesPlayer) => {
  let themeName = "";
  let themeDescription = "";
  let themes = [];
  let values = [
    [1,4],
    [5,7],
    [8,9],
    [10,10],
    [10,10]
  ];
  let isExisted = false;
  
  if (campaign[0].themes === undefined || campaign[0].themes.length === 0) {
    campaign[0].themes = [];

    if (themesPlayer.length > 0) {
      for (let i = 0 ; i <= themesPlayer.length ; i++) {
        for (let j = 1 ; j <= Object.keys(adventureData.randomThemesTable).length ; j++) {
          if (themesPlayer[i] === adventureData.randomThemesTable[j].name) {
            // console.log(themesPlayer.length);

            themes.push({"name": adventureData.randomThemesTable[j].name, "description": adventureData.randomThemesTable[j].description, "values": values[themes.length]});

            campaign[0].themes.push({"name": adventureData.randomThemesTable[j].name, "description": adventureData.randomThemesTable[j].description, "values": values[themes.length-1], "alternated": false});

            // console.log("campaign[0].themes: " + campaign[0].themes);
          }
        }
      } 
    }

    while (themes.length < 5) {
      let themesDice = dice.die(10);

      for (let i = 1 ; i <= Object.keys(adventureData.randomThemesTable).length ; i++) {
        if (themesDice >= adventureData.randomThemesTable[i].value[0] && themesDice <= adventureData.randomThemesTable[i].value[1]) {
          themeName = adventureData.randomThemesTable[i].name;
          themeDescription = adventureData.randomThemesTable[i].description;

          if (themes.length > 0) {
            while (themes.find(theme => theme.name === themeName) !== undefined) {
              if (i === 5) {
                i = 1;
              } else {
                i++;
              }
              
              themeName = adventureData.randomThemesTable[i].name;
              themeDescription = adventureData.randomThemesTable[i].description;
            }
          }

          themes.push({"name": themeName, "description": themeDescription, "values": values[themes.length]});

          campaign[0].themes.push({"name": themeName, "description": themeDescription, "values": values[themes.length-1], "alternated": false});

          // console.log("campaign[0].themes: " + campaign[0].themes);
        }
      }
    }
    
    campaign[0].themes[3].alternated = true;

    console.log(themes);

    campaign[0].save(function (err) {
      if (err) return handleError(err);
    });
  } else {
    themes = campaign[0].themes;

    console.log("themes: " + campaign[0].themes);

    isExisted = true;
  }

  return {
    themes: themes,
    isExisted: isExisted
  }
}

const themeList = (campaign) => {
  let themes = [];
  let isExisted = false;

  if (campaign[0].themes.length !== 0 && campaign[0].themes !== undefined) {
    themes = campaign[0].themes;

    console.log("themes: " + campaign[0].themes);

    isExisted = true;
  }

  return {
    themes: themes,
    isExisted: isExisted
  }
}

const characterRandom = (campaign) => {
  let characterDice = dice.die(100);
  let characterName = "";

  for (let i = 0 ; i < campaign[0].characters.length ; i++) {
    if (characterDice >= campaign[0].characters[i].value[0] && characterDice <= campaign[0].characters[i].value[1]) {
      characterName = campaign[0].characters[i].name;
    }
  }

  return {
    name: characterName
  }
}

const plotRandom = (campaign, add) => {
  let plotDice = dice.die(100);
  let plotName = "";

  for (let i = 0 ; i < campaign[0].plots.length ; i++) {
    if (plotDice >= campaign[0].plots[i].value[0] && plotDice <= campaign[0].plots[i].value[1]) {
      plotName = campaign[0].plots[i].name;
    }
  }

  if (add === true && (plotName !== "Nouvelle intrigue" && plotName !== "Choisissez l'intrigue la plus logique")) {
    let nbPlots = 0;

    if (campaign[0].plots.find (plot => plot.name === plotName)) {
      for (let i = 0 ; i < campaign[0].plots.length ; i++) {
        if (campaign[0].plots[i].name === plotName) {
          nbPlots++;
        }
      }
    }
    
    if (nbPlots < 3) {
      for (let i = 0 ; i < campaign[0].plots.length ; i++) {
        if (campaign[0].plots[i].name === "Nouvelle intrigue" || campaign[0].plots[i].name === "Choisissez l'intrigue la plus logique") {
          campaign[0].plots[i].name = plotName;
          break;
        }
      }
    }
  }

  if (add === true) {
    campaign[0].currentPlot[0] = plotName;
  }

  return {
    name: plotName
  }
}

const characterList = (campaign) => {
  let characterNames = [];
  
  for (let i = 0 ; i < campaign[0].characters.length ; i++) {
    characterNames.push(campaign[0].characters[i].name);
  }
  
  return {
    names: characterNames
  }
}

const plotList = (campaign) => {
  let plotNames = [];
  
  for (let i = 0 ; i < campaign[0].plots.length ; i++) {
    plotNames.push(campaign[0].plots[i].name);
  }
  
  return {
    names: plotNames
  }
}

const characterInformation = (campaign, character) => {
  let numberOf = 0;
  
  for (let i = 0 ; i < campaign[0].characters.length ; i++) {
    if (campaign[0].characters[i].name === character) {
      numberOf++;
    }
  }
  
  return {
    numberOf: numberOf
  }
}

const plotInformation = (campaign, plot) => {
  let numberOf = 0;
  
  for (let i = 0 ; i < campaign[0].plots.length ; i++) {
    if (campaign[0].plots[i].name === plot) {
      numberOf++;
    }
  }
  
  return {
    numberOf: numberOf
  }
}

const characterAdd = (campaign, isPlayer, character) => {
  let isCreated = false;
  let nbCharacters = 0;

  if (campaign[0].characters.find (character => character.name === character)) {
    for (let i = 0 ; i < campaign[0].characters.length ; i++) {
      if (campaign[0].characters[i].name === character) {
        nbCharacters++;
      }
    }
  }

  if (nbCharacters < 3 && (character !== "Nouvelle intrigue" && character !== "Choisissez l'intrigue la plus logique")) {
    for (let i = 0 ; i < campaign[0].characters.length ; i++) {
      if (campaign[0].characters[i].name === "Nouveau personnage" || campaign[0].characters[i].name === "Choisissez le personnage le plus logique") {
        if (campaign[0].characters.find (character => character.name === character)) {
          for (let j = 0 ; j < campaign[0].characters.length ; j++) {
            if (campaign[0].characters[j].name === character) {
              campaign[0].characters[i].name = campaign[0].characters[j].name;
              campaign[0].characters[i].player = campaign[0].characters[j].player;
              campaign[0].characters[i].travel = campaign[0].characters[j].travel;
              campaign[0].characters[i].piecesOr = campaign[0].characters[j].piecesOr;
            }
          }
        } else {
          let travel = {
            "travelMode": "Pieds",
            "KMPerDay": 38,
            "KMPerDay2": 48,
            "comments": "si 48 = -5 pénalité à la perception passive",
          }
        
          campaign[0].characters[i].name = character;
          campaign[0].characters[i].player = isPlayer;
          campaign[0].characters[i].travel = travel;
          campaign[0].characters[i].piecesOr = 100;
        }

        isCreated = true;
        break;
      }
    }
  }

  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });
  
  return {
    isCreated: isCreated
  }
}

const plotAdd = (campaign, plot) => {
  let isCreated = false;
  let nbPlots = 0;

  if (campaign[0].plots.find (plot => plot.name === plot)) {
    for (let i = 0 ; i < campaign[0].plots.length ; i++) {
      if (campaign[0].plots[i].name === plot) {
        nbPlots++;
      }
    }
  }

  if (nbPlots < 3 && (plot !== "Nouvelle intrigue" && plot !== "Choisissez l'intrigue la plus logique")) {
    for (let i = 0 ; i < campaign[0].plots.length ; i++) {
      if (campaign[0].plots[i].name === "Nouvelle intrigue" || campaign[0].plots[i].name === "Choisissez l'intrigue la plus logique") {
        campaign[0].plots[i].name = plot;
        isCreated = true;
        break;
      }
    }
  }
  
  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });
  
  return {
    isCreated: isCreated
  }
}

const characterUpdate = (campaign, characterOld, characterNew) => {
  let isExisted = false;
  
  if (campaign[0].characters.find(character => character.name === characterOld)) {
    for(let i = 0 ; i < campaign[0].characters.length ; i++) {
      if (campaign[0].characters[i].name === characterOld) {
        campaign[0].characters[i].name = characterNew;
        
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

const plotUpdate = (campaign, plotOld, plotNew) => {
  let isExisted = false;
  
  if (campaign[0].plots.find(plot => plot.name === plotOld)) {
    for(let i = 0 ; i < campaign[0].plots.length ; i++) {
      if (campaign[0].plots[i].name === plotOld) {
        campaign[0].plots[i].name = plotNew;
        
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

const characterDelete = (campaign, characterName) => {
  let isExisted = false;
  let name = "";
  let player = false;
  let travel = [];
  let piecesOr = 0;
  
  if (campaign[0].characters.find(character => character.name === characterName)) {
    for(let i = 0 ; i < campaign[0].characters.length ; i++) {
      if (campaign[0].characters[i].name === characterName) {
        name = campaign[0].characters[i].name;
        player = campaign[0].characters[i].player;
        travel = campaign[0].characters[i].travel;
        piecesOr = campaign[0].characters[i].piecesOr;

        campaign[0].characters[i].name = "Choisissez le personnage le plus logique";
        
        isExisted = true;
        
        break;
      }
    }
  }

  if (campaign[0].characters.find(character => character.name === characterName) === undefined) {
    if (campaign[0].archivedCharacters === undefined || campaign[0].archivedCharacters.length === 0) {
      campaign[0].archivedCharacters = [];
    }
    
    campaign[0].archivedCharacters.push({"name" : name, "player": player, "travel": travel, "piecesOr": piecesOr});
  }
  
  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });
  
  return {
    isExisted: isExisted
  }
}

const plotDelete = (campaign, plotName) => {
  let isExisted = false;
  
  if (campaign[0].plots.find(plot => plot.name === plotName)) {
    for(let i = 0 ; i < campaign[0].plots.length ; i++) {
      if (campaign[0].plots[i].name === plotName) {
        campaign[0].plots[i].name = "Choisissez l'intrigue la plus logique";
        
        isExisted = true;
        
        break;
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

const themeRandom = (campaign) => {
  let themeName = "";
  let themeDescription = "";
  let themeDice = dice.die(10);

  for (let i = 0 ; i < campaign[0].themes.length ; i++) {
    if (themeDice >= campaign[0].themes[i].values[0] && themeDice <= campaign[0].themes[i].values[1]) {
      if (themeDice === 10) {
        if (campaign[0].themes[3].alternated === true) {
          themeName = campaign[0].themes[3].name;
          themeDescription = campaign[0].themes[3].description;
          campaign[0].themes[3].alternated = false;
          campaign[0].themes[4].alternated = true;
        } else {
          themeName = campaign[0].themes[4].name;
          themeDescription = campaign[0].themes[4].description;
          campaign[0].themes[4].alternated = false;
          campaign[0].themes[3].alternated = true;
        }
        break;
      } else {
        themeName = campaign[0].themes[i].name;
        themeDescription = campaign[0].themes[i].description;
      }
    }
  }
  
  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });
  
  return {
    themeName: themeName,
    themeDescription: themeDescription
  }
}

const plotPoints = (campaign) => {
  let plotPointsName = [];
  let plotPointsDescription = [];
  let plotPointsNeeds = [];
  let plotPointsDice = 0;
  let plotPointsValue = "";
  let none = 0;
  let themeName = "";
  let themeDice = 0;

  if (campaign[0].plotPoints === undefined || campaign[0].plotPoints.length === 0) {
    campaign[0].plotPoints = [];
  }

  while (plotPointsName.length < 5) {
    themeDice = dice.die(10);

    for (let i = 0 ; i < campaign[0].themes.length ; i++) {
      if (themeDice >= campaign[0].themes[i].values[0] && themeDice <= campaign[0].themes[i].values[1]) {
        if (themeDice === 10) {
          if (campaign[0].themes[3].alternated === true) {
            themeName = campaign[0].themes[3].name;
            campaign[0].themes[3].alternated = false;
            campaign[0].themes[4].alternated = true;
          } else {
            themeName = campaign[0].themes[4].name;
            campaign[0].themes[4].alternated = false;
            campaign[0].themes[3].alternated = true;
          }
          break;
        } else {
          themeName = campaign[0].themes[i].name;
        }
      }
    }

    console.log("Theme : " + themeName);

    if (themeName === "ACTION") {
      plotPointsValue = "valueAction";
    } else if (themeName === "TENSION") {
      plotPointsValue = "valueTension";
    } else if (themeName === "MYSTÈRE") {
      plotPointsValue = "valueMystery";
    } else if (themeName === "SOCIAL") {
      plotPointsValue = "valueSocial";
    } else if (themeName === "PERSONNEL") {
      plotPointsValue = "valuePersonal";
    }

    plotPointsDice = dice.die(100);
  
    for (let i = 1 ; i <= Object.keys(plotPointsData.plotPointsTable).length ; i++) {
      if (plotPointsDice >= plotPointsData.plotPointsTable[i][plotPointsValue][0] && plotPointsDice <= plotPointsData.plotPointsTable[i][plotPointsValue][1]) {
        let metaName = "";
        let metaDescription = "";
        
        if (plotPointsData.plotPointsTable[i].name === "META") {
          let nbNPC = 0;

          do {
            let metaDice = dice.die(100);
            
            for (let j = 1 ; j <= Object.keys(plotPointsData.plotPointsTable[i].meta).length ; j++) {
              if (metaDice >= plotPointsData.plotPointsTable[i].meta[j].value[0] && metaDice <= plotPointsData.plotPointsTable[i].meta[j].value[1]) {
                plotPointsName.push(plotPointsData.plotPointsTable[i].meta[j].name);
                metaName = plotPointsData.plotPointsTable[i].meta[j].name;

                plotPointsDescription.push(plotPointsData.plotPointsTable[i].meta[j].description);
                metaDescription = plotPointsData.plotPointsTable[i].meta[j].description;

                let needsTemp = [];

                for (let k = 0 ; k < Object.keys(plotPointsData.plotPointsTable[i].meta[j].need).length ; k++) {
                  needsTemp.push({"name": plotPointsData.plotPointsTable[i].meta[j].need[k]});
                }

                plotPointsNeeds.push(needsTemp);
              }
            }

            for (let j = 0 ; j < campaign[0].characters.length ; j++) {
              if (campaign[0].characters[j].player === false) {
                nbNPC++;
              }
            }

            console.log("metaName : " + metaName);
            console.log("nbNPC : " + metaName);
          } while ((metaName === "LE PERSONNAGE QUITTE L'AVENTURE" && nbNPC > 0) || ((metaName === "LE PERSONNAGE RALENTIT" || metaName === "PERSONNAGE RÉTROGRADÉ") && nbNPC > 0));
        } else if (plotPointsData.plotPointsTable[i].name === "RIEN") {
          if (none < 4) {
            plotPointsName.push(plotPointsData.plotPointsTable[i].name);
            plotPointsDescription.push(plotPointsData.plotPointsTable[i].description);

            let needsTemp = [];

            for (let j = 0 ; j < Object.keys(plotPointsData.plotPointsTable[i].need).length ; j++) {
              needsTemp.push({"name": plotPointsData.plotPointsTable[i].need[j]});
            }
            
            plotPointsNeeds.push(needsTemp);

            none++;
          } else {
            continue;
          }
        } else if (plotPointsData.plotPointsTable[i].name === "CONCLUSION" && plotPointsName.find(name => name === plotPointsData.plotPointsTable[i].name) === undefined) {
          if (campaign[0].plots.find(plot => plot.name === campaign[0].currentPlot[0])) {
            for(let j = 0 ; j < campaign[0].plots.length ; j++) {
              if (campaign[0].plots[j].name === campaign[0].currentPlot[0]) {
                campaign[0].plots[j].name = "Choisissez l'intrigue la plus logique";
              }
            }
          }

          plotPointsName.push(plotPointsData.plotPointsTable[i].name);
          plotPointsDescription.push(plotPointsData.plotPointsTable[i].description);

          let needsTemp = [];

          for (let j = 0 ; j < Object.keys(plotPointsData.plotPointsTable[i].need).length ; j++) {
            needsTemp.push({"name": plotPointsData.plotPointsTable[i].need[j]});
          }
          
          plotPointsNeeds.push(needsTemp);
        } else if (plotPointsName.find(name => name === plotPointsData.plotPointsTable[i].name) === undefined) {
          plotPointsName.push(plotPointsData.plotPointsTable[i].name);
          plotPointsDescription.push(plotPointsData.plotPointsTable[i].description);

          let needsTemp = [];

          for (let j = 0 ; j < Object.keys(plotPointsData.plotPointsTable[i].need).length ; j++) {
            needsTemp.push({"name": plotPointsData.plotPointsTable[i].need[j]});
          }

          plotPointsNeeds.push(needsTemp);
        }

        if (campaign[0].plotPoints.length < 5) {
          if (plotPointsData.plotPointsTable[i].name === "META") {
            campaign[0].plotPoints.push({"name": metaName, "description": metaDescription});
          } else {
            campaign[0].plotPoints.push({"name": plotPointsData.plotPointsTable[i].name, "description": plotPointsData.plotPointsTable[i].description});
          }
        } else {
          if (plotPointsData.plotPointsTable[i].name === "META") {
            console.log("plotPointsName.length - 1 : " + plotPointsName.length - 1);
            console.log("metaName : " + metaName);
            console.log("metaDescription : " + metaDescription);
            
            campaign[0].plotPoints[plotPointsName.length - 1].name = metaName;
            campaign[0].plotPoints[plotPointsName.length - 1].description = metaDescription;
          } else {
            console.log("plotPointsName.length - 1 : " + plotPointsName.length - 1);
            console.log("name : " + plotPointsData.plotPointsTable[i].name);
            console.log("description : " + plotPointsData.plotPointsTable[i].description);

            campaign[0].plotPoints[plotPointsName.length - 1].name = plotPointsData.plotPointsTable[i].name;
            campaign[0].plotPoints[plotPointsName.length - 1].description = plotPointsData.plotPointsTable[i].description;
          }
        }
      }
    }
  }
  
  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });
  
  return {
    plotPointsName: plotPointsName,
    plotPointsDescription: plotPointsDescription,
    plotPointsNeeds: plotPointsNeeds
  }
}

const needsRandom = (campaign, needs) => {
  let nbPlayer = 0;
  let name = "";
  let player = false;
  let travel = [];
  let piecesOr = 0;
  let existedCharacters = [];

  for (let i = 0 ; i < campaign[0].plotPoints.length ; i++) {
    if (campaign[0].plotPoints[i].needs === undefined || campaign[0].plotPoints[i].needs.length === 0) {
      campaign[0].plotPoints[i].needs = [];
    } else {
      campaign[0].plotPoints[i].needs.splice(0, needs.length);
    }
  }

  for (let i = 0 ; i < needs.length ; i++) {
    for (let j = 0 ; j < needs[i].length ; j++) {
      if (needs[i][j].name === "Personnage") {
        let characterDice = dice.die(100);
        let nbCharacters = 0;

        for (let k = 0 ; k < campaign[0].characters.length ; k++) {
          if (characterDice >= campaign[0].characters[k].value[0] && characterDice <= campaign[0].characters[k].value[1]) {
            if (campaign[0].plotPoints[i].name === "LE PERSONNAGE QUITTE L'AVENTURE") {
              if (campaign[0].characters[k].name === "Nouveau personnage" || campaign[0].characters[k].player === true) {
                needs[i][j].name = "Choisissez le personnage le plus logique";
              } else if (campaign[0].characters[k].name !== "Choisissez le personnage le plus logique") {
                for (let l = 0 ; l < campaign[0].characters.length ; l++) {
                  if (campaign[0].characters[l].name === campaign[0].characters[k].name) {
                    name = campaign[0].characters[k].name;
                    player = campaign[0].characters[k].player;
                    travel = campaign[0].characters[k].travel;
                    piecesOr = campaign[0].characters[k].piecesOr;

                    campaign[0].characters[l].name = "Choisissez le personnage le plus logique";
                    campaign[0].characters[l].player = false;
                    campaign[0].characters[l].travel = {
                      "travelMode": "Pieds",
                      "KMPerDay": 38,
                      "KMPerDay2": 48,
                      "comments": "si 48 = -5 pénalité à la perception passive"
                    };
                    campaign[0].characters[l].piecesOr = 100;
                  }
                }

                if (campaign[0].archivedCharacters === undefined || campaign[0].archivedCharacters.length === 0) {
                  campaign[0].archivedCharacters = [];
                }
                
                if (campaign[0].characters.find(character => character.name === characterName) === undefined) {
                  campaign[0].archivedCharacters.push({"name" : name, "player": player, "travel": travel, "piecesOr": piecesOr});
                }
              }
            } else if (campaign[0].plotPoints[i].name === "RETOUR DE PERSONNAGE") {
              if (campaign[0].archivedCharacters === undefined || campaign[0].archivedCharacters.length === 0) {
                needs[i][j].name = "Choisissez le personnage le plus logique";
              } else {
                let characterDice = dice.die(campaign[0].archivedCharacters.length);

                needs[i][j].name = campaign[0].characters[characterDice - 1].name;

                for (let l = 0 ; l < campaign[0].characters.length ; l++) {
                  if (campaign[0].characters[l].name === "Nouveau personnage" || campaign[0].characters[l].name === "Choisissez le personnage le plus logique") {
                    campaign[0].characters[l].name = campaign[0].characters[characterDice - 1].name;
                    campaign[0].characters[l].player = campaign[0].characters[characterDice - 1].player;
                    campaign[0].characters[l].travel = campaign[0].characters[characterDice - 1].travel;
                    campaign[0].characters[l].piecesOr = campaign[0].characters[characterDice - 1].piecesOr;
                    
                    break;
                  }
                }

                campaign[0].archivedCharacters.splice(characterDice - 1, 1);
              }
            } else if (campaign[0].plotPoints[i].name === "LE PERSONNAGE S'INTENSIFIE") {
              if (campaign[0].characters[k].name !== "Nouveau personnage" && campaign[0].characters[k].name !== "Choisissez le personnage le plus logique") {
                for (let l = 0 ; l < campaign[0].characters.length ; l++) {
                  if (campaign[0].characters[l].name === "Nouveau personnage" || campaign[0].characters[l].name === "Choisissez le personnage le plus logique") {
                    campaign[0].characters[l].name = campaign[0].characters[k].name;
                    campaign[0].characters[l].player = campaign[0].characters[k].player;
                    campaign[0].characters[l].travel = campaign[0].characters[k].travel;
                    campaign[0].characters[l].piecesOr = campaign[0].characters[k].piecesOr;

                    break;
                  }
                }
              }
            } else if (campaign[0].plotPoints[i].name === "LE PERSONNAGE RALENTIT") {
              if (campaign[0].characters[k].name !== "Nouveau personnage" || campaign[0].characters[k].name !== "Choisissez le personnage le plus logique") {
                for (let l = 0 ; l < campaign[0].characters.length ; l++) {
                  if (campaign[0].characters[l].name === campaign[0].characters[k].name) {
                    nbPlayer++;
                  }
                }
              }

              if (campaign[0].characters[k].name === "Nouveau personnage" || nbPlayer < 1) {
                needs[i][j].name = "Choisissez le personnage le plus logique";
              } else if (campaign[0].characters[k].name !== "Choisissez le personnage le plus logique") {
                name = campaign[0].characters[k].name;
                player = campaign[0].characters[k].player;
                travel = campaign[0].characters[k].travel;
                piecesOr = campaign[0].characters[k].piecesOr;

                campaign[0].characters[k].name = "Choisissez le personnage le plus logique";
                campaign[0].characters[k].player = false;
                campaign[0].characters[k].travel = {
                  "travelMode": "Pieds",
                  "KMPerDay": 38,
                  "KMPerDay2": 48,
                  "comments": "si 48 = -5 pénalité à la perception passive"
                };
                campaign[0].characters[k].piecesOr = 100;
              }

              if (campaign[0].archivedCharacters === undefined || campaign[0].archivedCharacters.length === 0) {
                campaign[0].archivedCharacters = [];
              }
              
              if (campaign[0].characters.find(character => character.name === characterName) === undefined) {
                campaign[0].archivedCharacters.push({"name" : name, "player": player, "travel": travel, "piecesOr": piecesOr});
              }
            } else if (campaign[0].plotPoints[i].name === "PERSONNAGE RÉTROGRADÉ") {
              let name = "";

              if (campaign[0].characters[k].name !== "Nouveau personnage" || campaign[0].characters[k].name !== "Choisissez le personnage le plus logique") {
                for (let l = 0 ; l < campaign[0].characters.length ; l++) {
                  if (campaign[0].characters[l].name === campaign[0].characters[k].name) {
                    nbPlayer++;
                  }
                }
              }

              if (campaign[0].characters[k].name === "Nouveau personnage" || nbPlayer < 2) {
                needs[i][j].name = "Choisissez le personnage le plus logique";
              } else if (campaign[0].characters[k].name !== "Choisissez le personnage le plus logique") {
                name = campaign[0].characters[k].name;
                player = campaign[0].characters[k].player;
                travel = campaign[0].characters[k].travel;
                piecesOr = campaign[0].characters[k].piecesOr;

                campaign[0].characters[k].name = "Choisissez le personnage le plus logique";
                campaign[0].characters[k].player = false;
                campaign[0].characters[k].travel = {
                  "travelMode": "Pieds",
                  "KMPerDay": 38,
                  "KMPerDay2": 48,
                  "comments": "si 48 = -5 pénalité à la perception passive",
                };
                campaign[0].characters[k].piecesOr = 100;

                for (let l = 0 ; l < campaign[0].characters.length ; l++) {
                  if (campaign[0].characters[l].name === name) {
                    campaign[0].characters[l].name = "Choisissez le personnage le plus logique";
                    campaign[0].characters[l].player = false;
                    campaign[0].characters[l].travel = {
                      "travelMode": "Pieds",
                      "KMPerDay": 38,
                      "KMPerDay2": 48,
                      "comments": "si 48 = -5 pénalité à la perception passive",
                    };
                    campaign[0].characters[l].piecesOr = 100;
                    
                    break;
                  }
                }
              }

              if (campaign[0].archivedCharacters === undefined || campaign[0].archivedCharacters.length === 0) {
                campaign[0].archivedCharacters = [];
              }
              
              if (campaign[0].characters.find(character => character.name === characterName) === undefined) {
                campaign[0].archivedCharacters.push({"name" : name, "player": player, "travel": travel, "piecesOr": piecesOr});
              }
            } else if (campaign[0].plotPoints[i].name === "PERSONNAGE PROMU") {
              if (campaign[0].characters[k].name === "Nouveau personnage")  {
                needs[i][j].name = "Choisissez le personnage le plus logique";
              } else if (campaign[0].characters[k].name !== "Choisissez le personnage le plus logique") {
                for (let l = 0 ; l < campaign[0].characters.length ; l++) {
                  if (campaign[0].characters[l].name === "Nouveau personnage" || campaign[0].characters[l].name === "Choisissez le personnage le plus logique") {
                    campaign[0].characters[l].name = campaign[0].characters[k].name;
                    campaign[0].characters[l].player = campaign[0].characters[k].player;
                    campaign[0].characters[l].travel = campaign[0].characters[k].travel;
                    campaign[0].characters[l].piecesOr = campaign[0].characters[k].piecesOr;
                    
                    isCreated = true;
                    break;
                  }
                }

                for (let l = 0 ; l < campaign[0].characters.length ; l++) {
                  if (campaign[0].characters[l].name === "Nouveau personnage" || campaign[0].characters[l].name === "Choisissez le personnage le plus logique") {
                    campaign[0].characters[l].name = campaign[0].characters[k].name;
                    campaign[0].characters[l].player = campaign[0].characters[k].player;
                    campaign[0].characters[l].travel = campaign[0].characters[k].travel;
                    campaign[0].characters[l].piecesOr = campaign[0].characters[k].piecesOr;
                    
                    isCreated = true;
                    break;
                  }
                }
              }
            } else {
              if (campaign[0].characters[k].name !== "Nouveau personnage" && campaign[0].characters[k].name !== "Choisissez le personnage le plus logique") {
                for (let l = 0 ; l < campaign[0].characters.length ; l++) {
                  if (campaign[0].characters[l].name === campaign[0].characters[k].name) {
                    nbCharacters++;
                  }
                }
              }

              console.log("nbCharacters : " + nbCharacters);

              if (nbCharacters < 3) {
                if (existedCharacters.find(character => character === campaign[0].characters[k].name) === undefined) {
                  for (let l = 0 ; l < campaign[0].characters.length ; l++) {
                    if (campaign[0].characters[l].name === "Nouveau personnage" || campaign[0].characters[l].name === "Choisissez le personnage le plus logique") {
                      campaign[0].characters[l].name = campaign[0].characters[k].name;

                      existedCharacters.push(campaign[0].characters[k].name);

                      break;
                    }
                  }
                }
              }

              console.log("existedCharacters : " + existedCharacters);

              needs[i][j].name = campaign[0].characters[k].name;
            }
          }
        }
      } else if (needs[i][j].name === "Intrigue") {
        let plotDice = dice.die(100);
        let nbPlots = 0;

        for (let k = 0 ; k < campaign[0].plots.length ; k++) {
          if (plotDice >= campaign[0].plots[k].value[0] && plotDice <= campaign[0].plots[k].value[1]) {

            for (let l = 0 ; l < campaign[0].plots.length ; l++) {
              if (campaign[0].plots[l].name !== "Choisissez l'intrigue la plus logique" || campaign[0].plots[l].name !== "Nouvelle intrigue") {
                nbPlots++;
              }
            }

            if (campaign[0].plots[k].name === campaign[0].currentPlot[0]) {
              needs[i][j].name = "Choisissez l'intrigue la plus logique";
            } else if (nbPlots === 0) {
              needs[i][j].name = "Nouvelle intrigue";
            } else {
              needs[i][j].name = campaign[0].plots[k].name;
            }
          }
        }
      }
      campaign[0].plotPoints[i].needs.push(needs[i][j]);
    }
  }

  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });

  return {
    needs: needs
  }
}

const plotPointsRead = (campaign) => {
  let plotPointsName = [];
  let plotPointsDescription = [];
  let plotPointsNeeds = [];
  
  for (let i = 0 ; i < campaign[0].plotPoints.length ; i++) {
    plotPointsName.push(campaign[0].plotPoints[i].name);
    plotPointsDescription.push(campaign[0].plotPoints[i].description);
    plotPointsNeeds.push(campaign[0].plotPoints[i].needs);
  }
  
  return {
    plotPointsName: plotPointsName,
    plotPointsDescription: plotPointsDescription,
    plotPointsNeeds: plotPointsNeeds
  }
}

const plotPointsUpdate = (campaign, plotPoint, need, characterPlot) => {
  let plotPointsName = [];
  let plotPointsDescription = [];
  let plotPointsNeeds = [];

  campaign[0].plotPoints[plotPoint].needs[need].name = characterPlot;
  
  for (let i = 0 ; i < campaign[0].plotPoints.length ; i++) {
    plotPointsName.push(campaign[0].plotPoints[i].name);
    plotPointsDescription.push(campaign[0].plotPoints[i].description);
    plotPointsNeeds.push(campaign[0].plotPoints[i].needs);
  }

  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });
  
  return {
    plotPointsName: plotPointsName,
    plotPointsDescription: plotPointsDescription,
    plotPointsNeeds: plotPointsNeeds
  }
}

const characterCreation = (campaign, needs, name) => {
  let characterSpecialTraitDice = 0;
  let characterIdentityDice = 0;
  let characterDescriptorsDice = 0;
  let nbNewCharacters = 1;
  let characterSpecialTraitName = "";
  let characterSpecialTraitDescription = "";
  let characterIdentityName = [];
  let characterDescriptorsName = [];

  if (needs !== undefined) {
    for (let i = 0 ; i < needs.length ; i++) {
      for (let j = 0 ; j < needs[i].length ; j++) {
        if (needs[i][j].name === "Nouveau personnage") {
          characterSpecialTraitDice = dice.die(100);
          characterIdentityDice = dice.die(100);
          characterDescriptorsDice = dice.die(100);

          campaign[0].plotPoints[i].needs.splice(j, 1);

          needs[i][j].name = needs[i][j].name + " " + nbNewCharacters;
          
          campaign[0].plotPoints[i].needs.push(needs[i][j]);

          for (let k = 1 ; k <= Object.keys(adventureData.characterSpecialTraitTable).length ; k++) {
            if (characterSpecialTraitDice >= adventureData.characterSpecialTraitTable[k].value[0] && characterSpecialTraitDice <= adventureData.characterSpecialTraitTable[k].value[1]) {
              needs[i][j].characterSpecialTraitName = adventureData.characterSpecialTraitTable[k].name;
              needs[i][j].characterSpecialTraitDescription = adventureData.characterSpecialTraitTable[k].description;
            }
          }

          for (let k = 1 ; k <= Object.keys(adventureData.characterIdentityTable).length ; k++) {
            if (characterIdentityDice >= adventureData.characterIdentityTable[k].value[0] && characterIdentityDice <= adventureData.characterIdentityTable[k].value[1]) {
              if (adventureData.characterIdentityTable[k].name === "Jetez les dés pour deux identités") {
                let characterIdentityDice2 = dice.die(67) + 33;

                for (let l = 1 ; l <= Object.keys(adventureData.characterIdentityTable).length ; l++) {
                  if (characterIdentityDice2 >= adventureData.characterIdentityTable[l].value[0] && characterIdentityDice2 <= adventureData.characterIdentityTable[l].value[1]) {
                    if (needs[i][j].characterIdentityName === undefined || needs[i][j].characterIdentityName.length === 0) {
                      needs[i][j].characterIdentityName = [];
                    }

                    needs[i][j].characterIdentityName.push(adventureData.characterIdentityTable[l].name);
                  }
                }

                let characterIdentityDice3 = dice.die(67) + 33;

                for (let l = 1 ; l <= Object.keys(adventureData.characterIdentityTable).length ; l++) {
                  if (characterIdentityDice3 >= adventureData.characterIdentityTable[l].value[0] && characterIdentityDice3 <= adventureData.characterIdentityTable[l].value[1]) {
                    if (needs[i][j].characterIdentityName === undefined || needs[i][j].characterIdentityName.length === 0) {
                      needs[i][j].characterIdentityName = [];
                    }

                    needs[i][j].characterIdentityName.push(adventureData.characterIdentityTable[l].name);
                  }
                }
              } else {
                if (needs[i][j].characterIdentityName === undefined || needs[i][j].characterIdentityName.length === 0) {
                    needs[i][j].characterIdentityName = [];
                  }

                needs[i][j].characterIdentityName.push(adventureData.characterIdentityTable[k].name);
              }
            }
          }

          for (let k = 1 ; k <= Object.keys(adventureData.characterDescriptorsTable).length ; k++) {
            if (characterDescriptorsDice >= adventureData.characterDescriptorsTable[k].value[0] && characterDescriptorsDice <= adventureData.characterDescriptorsTable[k].value[1]) {
              if (adventureData.characterDescriptorsTable[k].name === "Jetez les dés pour deux identités") {
                let characterDescriptorsDice2 = dice.die(67) + 33;

                for (let l = 1 ; l <= Object.keys(adventureData.characterDescriptorsTable).length ; l++) {
                  if (characterDescriptorsDice2 >= adventureData.characterDescriptorsTable[l].value[0] && characterDescriptorsDice2 <= adventureData.characterDescriptorsTable[l].value[1]) {
                    if (needs[i][j].characterDescriptorsName === undefined || needs[i][j].characterDescriptorsName.length === 0) {
                      needs[i][j].characterDescriptorsName = [];
                    }

                    needs[i][j].characterDescriptorsName.push(adventureData.characterDescriptorsTable[l].name);
                  }
                }

                let characterDescriptorsDice3 = dice.die(67) + 33;

                for (let l = 1 ; l <= Object.keys(adventureData.characterDescriptorsTable).length ; l++) {
                  if (characterDescriptorsDice3 >= adventureData.characterDescriptorsTable[l].value[0] && characterDescriptorsDice3 <= adventureData.characterDescriptorsTable[l].value[1]) {
                    if (needs[i][j].characterDescriptorsName === undefined || needs[i][j].characterDescriptorsName.length === 0) {
                      needs[i][j].characterDescriptorsName = [];
                    }

                    needs[i][j].characterDescriptorsName.push(adventureData.characterDescriptorsTable[l].name);
                  }
                }
              } else {
                if (needs[i][j].characterDescriptorsName === undefined || needs[i][j].characterDescriptorsName.length === 0) {
                  needs[i][j].characterDescriptorsName = [];
                }

                needs[i][j].characterDescriptorsName.push(adventureData.characterDescriptorsTable[k].name);
              }
            }
          }
          nbNewCharacters++;

          for (let k = 0 ; k < campaign[0].characters.length ; k++) {
            if (campaign[0].characters[k].name === "Nouveau personnage" || campaign[0].characters[k].name === "Choisissez le personnage le plus logique") {
              let travel = {
                "travelMode": "Pieds",
                "KMPerDay": 38,
                "KMPerDay2": 48,
                "comments": "si 48 = -5 pénalité à la perception passive",
              }
            
              campaign[0].characters[k].name = needs[i][j].name;
              campaign[0].characters[k].player = false;
              campaign[0].characters[k].travel = travel;
              campaign[0].characters[k].piecesOr = 100;

              campaign[0].characters[k].specialTraitName = needs[i][j].characterSpecialTraitName;
              campaign[0].characters[k].specialTraitDescription = needs[i][j].characterSpecialTraitDescription;

              if (campaign[0].characters[k].identity === undefined || campaign[0].characters[k].identity === 0) {
                campaign[0].characters[k].identity = [];
              }

              campaign[0].characters[k].identity = needs[i][j].characterIdentityName;

              if (campaign[0].characters[k].descriptor === undefined || campaign[0].characters[k].descriptor === 0) {
                campaign[0].characters[k].descriptor = [];
              }

              campaign[0].characters[k].descriptor = needs[i][j].characterDescriptorsName;

              break;
            }
          }
        }
      }
    }
  } else {
    characterSpecialTraitDice = dice.die(100);
    characterIdentityDice = dice.die(100);
    characterDescriptorsDice = dice.die(100);

    for (let k = 1 ; k <= Object.keys(adventureData.characterSpecialTraitTable).length ; k++) {
      if (characterSpecialTraitDice >= adventureData.characterSpecialTraitTable[k].value[0] && characterSpecialTraitDice <= adventureData.characterSpecialTraitTable[k].value[1]) {
        characterSpecialTraitName = adventureData.characterSpecialTraitTable[k].name;
        characterSpecialTraitDescription = adventureData.characterSpecialTraitTable[k].description;
      }
    }

    for (let k = 1 ; k <= Object.keys(adventureData.characterIdentityTable).length ; k++) {
      if (characterIdentityDice >= adventureData.characterIdentityTable[k].value[0] && characterIdentityDice <= adventureData.characterIdentityTable[k].value[1]) {
        if (adventureData.characterIdentityTable[k].name === "Jetez les dés pour deux identités") {
          let characterIdentityDice2 = dice.die(67) + 33;

          for (let l = 1 ; l <= Object.keys(adventureData.characterIdentityTable).length ; l++) {
            if (characterIdentityDice2 >= adventureData.characterIdentityTable[l].value[0] && characterIdentityDice2 <= adventureData.characterIdentityTable[l].value[1]) {
              characterIdentityName.push(adventureData.characterIdentityTable[l].name);
            }
          }

          let characterIdentityDice3 = dice.die(67) + 33;

          for (let l = 1 ; l <= Object.keys(adventureData.characterIdentityTable).length ; l++) {
            if (characterIdentityDice3 >= adventureData.characterIdentityTable[l].value[0] && characterIdentityDice3 <= adventureData.characterIdentityTable[l].value[1]) {
              characterIdentityName.push(adventureData.characterIdentityTable[l].name);
            }
          }
        } else {
          characterIdentityName.push(adventureData.characterIdentityTable[k].name);
        }
      }
    }

    for (let k = 1 ; k <= Object.keys(adventureData.characterDescriptorsTable).length ; k++) {
      if (characterDescriptorsDice >= adventureData.characterDescriptorsTable[k].value[0] && characterDescriptorsDice <= adventureData.characterDescriptorsTable[k].value[1]) {
        if (adventureData.characterDescriptorsTable[k].name === "Jetez les dés pour deux identités") {
          let characterDescriptorsDice2 = dice.die(67) + 33;

          for (let l = 1 ; l <= Object.keys(adventureData.characterDescriptorsTable).length ; l++) {
            if (characterDescriptorsDice2 >= adventureData.characterDescriptorsTable[l].value[0] && characterDescriptorsDice2 <= adventureData.characterDescriptorsTable[l].value[1]) {
              characterDescriptorsName.push(adventureData.characterDescriptorsTable[l].name);
            }
          }

          let characterDescriptorsDice3 = dice.die(67) + 33;

          for (let l = 1 ; l <= Object.keys(adventureData.characterDescriptorsTable).length ; l++) {
            if (characterDescriptorsDice3 >= adventureData.characterDescriptorsTable[l].value[0] && characterDescriptorsDice3 <= adventureData.characterDescriptorsTable[l].value[1]) {
              characterDescriptorsName.push(adventureData.characterDescriptorsTable[l].name);
            }
          }
        } else {
          characterDescriptorsName.push(adventureData.characterDescriptorsTable[k].name);
        }
      }
    }
    nbNewCharacters++;

    for (let k = 0 ; k < campaign[0].characters.length ; k++) {
      if (campaign[0].characters[k].name === "Nouveau personnage" || campaign[0].characters[k].name === "Choisissez le personnage le plus logique") {
        let travel = {
          "travelMode": "Pieds",
          "KMPerDay": 38,
          "KMPerDay2": 48,
          "comments": "si 48 = -5 pénalité à la perception passive",
        }
      
        campaign[0].characters[k].name = name;
        campaign[0].characters[k].player = false;
        campaign[0].characters[k].travel = travel;
        campaign[0].characters[k].piecesOr = 100;

        campaign[0].characters[k].specialTraitName = characterSpecialTraitName;
        campaign[0].characters[k].specialTraitDescription = characterSpecialTraitDescription;

        if (campaign[0].characters[k].identity === undefined || campaign[0].characters[k].identity === 0) {
          campaign[0].characters[k].identity = [];
        }

        campaign[0].characters[k].identity = characterIdentityName;

        if (campaign[0].characters[k].descriptor === undefined || campaign[0].characters[k].descriptor === 0) {
          campaign[0].characters[k].descriptor = [];
        }

        campaign[0].characters[k].descriptor = characterDescriptorsName;

        break;
      }
    }
  }

  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });

  return {
    needs: needs,
    name: name,
    74: characterSpecialTraitName,
    characterSpecialTraitDescription: characterSpecialTraitDescription,
    characterIdentityName: characterIdentityName,
    characterDescriptorsName: characterDescriptorsName

  }
}

exports.themeCreation = themeCreation;
exports.themeList = themeList;
exports.characterRandom = characterRandom;
exports.plotRandom = plotRandom;
exports.characterList = characterList;
exports.plotList = plotList;
exports.characterInformation = characterInformation;
exports.plotInformation = plotInformation;
exports.characterAdd = characterAdd;
exports.plotAdd = plotAdd;
exports.characterUpdate = characterUpdate;
exports.plotUpdate = plotUpdate;
exports.characterDelete = characterDelete;
exports.plotDelete = plotDelete;
exports.themeRandom = themeRandom;
exports.plotPoints = plotPoints;
exports.needsRandom = needsRandom;
exports.plotPointsRead = plotPointsRead;
exports.plotPointsUpdate = plotPointsUpdate;
exports.characterCreation = characterCreation;