const router = require('express').Router();
const fate = require('./fate');

router.use('/fate',fate);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'GMEEngine API is online.' });
});

module.exports = router;
