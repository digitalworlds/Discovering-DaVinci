var power = require('../controllers/power.controller.js'),
    express = require('express'),
    authorizer = require('../middleware/authorizer'),
    router = express.Router();

router.route('/')
    .get(power.getPower);

router.route('/')
    .patch(power.updatePower)

module.exports = router;