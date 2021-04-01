const router = require('express').Router();
const fate = require('./fate');
const event = require('./event');
const campaign = require('./campaign');
const detail = require('./detail');
const action = require('./action');
const description = require('./description');
const behavior = require('./behavior');

router.use('/fate', fate);

router.use('/event', event);

router.use('/campaign', campaign);

router.use('/detail', detail);

router.use('/action', action);

router.use('/description', description);

router.use('/behavior', behavior);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'GMEEngine API is online.' });
});

module.exports = router;
