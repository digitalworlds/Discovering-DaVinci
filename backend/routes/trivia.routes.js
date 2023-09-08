var trivia = require('../controllers/trivia.controller.js'),
    express = require('express'),
    router = express.Router();

router.route('/')
    .get(trivia.getCard)

router.route('/:id')
    .post(trivia.checkAnswer)

module.exports = router;