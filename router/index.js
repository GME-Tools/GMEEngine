const router = require('express').Router();
const fate = require('./fate');
const event = require('./event');
const campaign = require('./campaign');
const detail = require('./detail');
const action = require('./action');
const description = require('./description');
const behavior = require('./behavior');
const character = require('./character');
const thread = require('./thread');
const statistic = require('./statistic');
const adventure = require ('./adventure');
const creature = require('./creaturecrafter');
const fantasyLoot = require('./fantasyLootGenerator');
const skillCheck = require('./skillcheck');
const travel = require('./travel');
const weather = require('./weather');
const encounters = require('./encounters');
const settlements = require('./settlements');
const camping = require('./camping');
const tavern = require('./tavern');
const dungeon = require('./dungeon');
const quest = require('./quest');
const nature = require('./nature');

router.use('/fate', fate);

router.use('/event', event);

router.use('/campaign', campaign);

router.use('/detail', detail);

router.use('/action', action);

router.use('/description', description);

router.use('/behavior', behavior);

router.use('/character', character);

router.use('/thread', thread);

router.use('/statistic', statistic);

router.use('/adventure', adventure);

router.use('/creature', creature);

router.use('/fantasyloot', fantasyLoot);

router.use('/skillcheck', skillCheck);

router.use('/travel', travel);

router.use('/weather', weather);

router.use('/encounters', encounters);

router.use('/settlements', settlements);

router.use('/camping', camping);

router.use('/tavern', tavern);

router.use('/dungeon', dungeon);

router.use('/quest', quest);

router.use('/nature', nature);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'GMEEngine API is online.' });
});

module.exports = router;