const dsteem = require('dsteem'),
    steemState = require('steem-state'),
    steem = require('steem'),
    config = require('../config/config'),
    User = require('./Users'),
    Inventory = require('./Inventory'),
    sockets = require('../config/sockets')

const PRIVATE_MEMO_KEY = process.env.PRIVATE_MEMO_KEY || config.PRIVATE_MEMO_KEY,
    STEEM_APP_KEY = process.env.STEEM_APP_KEY || config.STEEM_APP_KEY

var client = new dsteem.Client('https://api.steemit.com');

const createUflProcessor = (result) => {
    var processor = steemState(client, dsteem, result.head_block_number, 100, STEEM_APP_KEY);
    processor.on('reward', async function (json, from) {
        let user_in_database = await User.getUserById(from[0])
        if (user_in_database.length > 0) {
            let user = json.user;
            let rewards = json.rewards;

            for (reward of rewards) {
                console.log(`${new Date()} User ${user} earned an invention piece, ${reward.ip_id}`)
                await Inventory.addInventionPiece(user, [reward])
                    .then(async () => {
                        await User.updatePlayerStats(user, 'invPieces', 'collected', 1)
                            .catch(err => {
                                console.log(err)
                            })
                        await sockets.emitToUser(user, 'newInventionPiece', { invPiece: reward })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
        else {
            console.log(`Someone (${from}) is trying to spoof our rewards`)
        }
    });

    processor.on('give', async function (json, from) {
        let user_in_database = await User.getUserById(from[0])

        if (user_in_database.length > 0) {
            let sender = json.from;
            let recipient = json.to;
            let pieces = json.pieces;

            console.log(`${new Date()} User, ${sender} sent invention pieces, ${pieces.length}, to User, ${recipient} `)
            await Inventory.updateInventoryOnGive(sender, recipient, pieces)
                .then(async () => {
                    // await User.updatePlayerStats(user, 'invPieces', 'collected', 1)
                    // .catch(err => {
                    //     console.log(err)
                    // })
                    for (piece of pieces) {
                        await sockets.emitToUser(recipient, 'newInventionPiece', { invPiece: piece })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            console.log(`Someone (${from}) is trying to spoof our gives`)
        }
    });

    return processor
}

const createNinjaProcessor = (result) => {
    // 37165023: block number starting at jared.crane
    // 37135267: block number for jmarlin accounts
    // 36508514: block number for testing accounts
    // 37944129, 37834902, 37165023, 37167097, 37171845
    // result.head_block_number
    var processor = steemState(client, dsteem, result.head_block_number, 100, 'UFL_DV_');

    let keys = ["oracle-d", "steem.ninja"]
    
    processor.on('create', async function (json, from) {
        if (keys.every(key => from.includes(key))) {
            let user_id = json.account

            let encoded_email = json.email
            let decoded_email = steem.memo.decode(PRIVATE_MEMO_KEY, encoded_email)

            if (decoded_email[0] === '#') decoded_email = decoded_email.substring(1, decoded_email.length)

            let hasSteemAccount = 1
            let isActive = 1

            console.log(`${new Date()} Creating account: ${user_id}`)
            await User.createUser(User.newUser(decoded_email, user_id, hasSteemAccount, isActive))
        }
        else {
            console.log(`${new Date()} Error creating account: Required posting auths not found ${from}`)
        }
    });

    return processor
}

const startProcessor = () => {
    client.database.getDynamicGlobalProperties().then(function (result) {
        var uflProcessor = createUflProcessor(result)
        var stmNinjaProcessor = createNinjaProcessor(result)

        uflProcessor.start();
        console.log(`${new Date()} Started UFL Processor`)

        stmNinjaProcessor.start();
        console.log(`${new Date()} Started Steem Ninja Processor`)

    });
}

module.exports = {
    startProcessor
}