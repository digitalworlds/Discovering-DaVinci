var objectives = require('../controllers/objectives.controller.js'),
    express = require('express'),
    router = express.Router()

router.route('/')
  .get(objectives.getObjectives)

router.route('/')
  .post(objectives.rewardObjective)

module.exports = router;