const weatherData = require('../../data/weather');
const dice = require('../dice');

/* Utilisez le tableau ci-dessous pour déterminer la météo d'un jour ou d'une nuit en particulier. Là où le temps donne l'option Chaud, si le jet est vers le bas de la plage, il fait chaud. Si c'est plus haut, il fait très chaud. Les résultats évoluent vers le haut. Ajuster selon le terrain aussi. Si c'est dans un désert => +5, si c'est dans montagnes ou steppes glacées => -5 */


const seasonSet = (campaign, season) => {
  let seasonDice = dice.die(4);
  let seasonName = "";
  
  if (season !== undefined) {
    campaign[0].season = season;
    seasonName = season;
  } else {
    for (let i = 1 ; i <= Object.keys(weatherData.season).length ; i++) {
      if (seasonDice >= weatherData.season[i].value[0] && seasonDice <= weatherData.season[i].value[1]) {
        campaign[0].season = weatherData.season[i].name;
        seasonName = weatherData.season[i].name;
      }
    }
  }

  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });
  
  return {
    season: seasonName
  }
}

const seasonRead = (campaign) => {
  let season = campaign[0].season;

  return {
    season: season
  }
}

const weatherRandom = (campaign, modifier) => {
  let weatherDice = dice.die(20);
  let weatherName = "";
  let seasonName = "";

  console.log(weatherDice);

  if (modifier === "froid") {
    weatherDice = weatherDice - 5;
  } else if (modifier === "chaud") {
    weatherDice = weatherDice + 5;
  }

  if (campaign[0].season !== undefined) {
    for (let i = 1 ; i <= Object.keys(weatherData.weather).length ; i++) {
      if (weatherDice >= weatherData.weather[i].value[0] && weatherDice <= weatherData.weather[i].value[1]) {
        campaign[0].weather = weatherData.weather[i][campaign[0].season];
        weatherName = weatherData.weather[i][campaign[0].season];
        seasonName = campaign[0].season;
      }
    }
  } else {
    let seasonDice = dice.die(4);

    for (let i = 1 ; i <= Object.keys(weatherData.season).length ; i++) {
      if (seasonDice >= weatherData.season[i].value[0] && seasonDice <= weatherData.season[i].value[1]) {
        campaign[0].season = weatherData.season[i].name;
        seasonName = weatherData.season[i].name;
      }
    }

    for (let i = 1 ; i <= Object.keys(weatherData.weather).length ; i++) {
      if (weatherDice >= weatherData.weather[i].value[0] && weatherDice <= weatherData.weather[i].value[1]) {
        campaign[0].weather = weatherData.weather[i][campaign[0].season];
        weatherName = weatherData.weather[i][campaign[0].season];
      }
    }
  }

  campaign[0].save(function (err) {
    if (err) return handleError(err);
  });
  
  return {
    season: seasonName,
    weather: weatherName
  }
}

const weatherRead = (campaign) => {
  let season = campaign[0].season;
  let weather = campaign[0].weather;

  return {
    season: season,
    weather: weather
  }
}

exports.seasonSet = seasonSet;
exports.seasonRead = seasonRead;
exports.weatherRandom = weatherRandom;
exports.weatherRead = weatherRead;