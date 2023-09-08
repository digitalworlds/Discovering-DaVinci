var creator = require('../controllers/creator.controller.js'),
    express = require('express'),
    router = express.Router();

router.route('/').get(creator.sign)

module.exports = router;