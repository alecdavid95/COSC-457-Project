const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/dummy', (req, res) => {
  let query_result = { rows :[
    ['Sean', 'Male', 'Towson'],
    ['Kevin', 'Male', 'Towson'],
    ['Max', 'Male', 'Towson']
  ],
  columnHeaders: ['name', 'gender','company']};
  res.status(200).json(query_result);
});

module.exports = router;