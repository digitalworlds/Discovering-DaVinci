var users = require('../controllers/users.controller.js'),
    express = require('express'),
    router = express.Router(),
    auth = require('../middleware/authorizer')

router.route('/').all(auth.authorize)

router.route('/')
    .post(users.register)

router.route('/')
    .get(users.login)

router.route('/status/:id')
    .get(users.verify)

router.route('/inventory').all(auth.authorize)

router.route('/inventory')
    .get(users.getInventory)

router.route('/inventory')
    .patch(users.updateInventory)

router.route('/playerstats').all(auth.authorize)

router.route('/playerstats')
    .get(users.getPlayerStats)

router.route('/transactions').all(auth.authorize)

router.route('/transactions')
    .get(users.getTransactions)

router.route('/inventory/build').all(auth.authorize)

router.route('/inventory/build')
    .post(users.addBuildInvention)

router.route('/inventions').all(auth.authorize)

router.route('/inventions')
    .get(users.getInfiniteInventionPiece)

router.route('/encounter').all(auth.authorize)

router.route('/encounter')
    .post(users.claimTriviaCard)

router.route('/give').all(auth.authorize)

router.route('/give')
    .post(users.givePieces)

router.route('/settings').all(auth.authorize)

router.route('/settings')
    .post(users.updateSettings)

module.exports = router;