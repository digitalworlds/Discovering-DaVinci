const Power = require('../models/Power')

const ACTIONS = {
    'DRAW_CARD': -400,
    'USE_SAVED_CARD': -350,
    'CLAIM_OBJECTIVE': -350,
    'GIVE': -350
}

exports.getPower = async (req, res) => {
    let name = req.body.user
    // console.log(`getPower for ${name}`)
    await Power.getPower(name)
        .then(result => {
            let power = result[0].power
            res.send({ 'status': 200, 'message': 'Found User in Database', 'power': power })

        })
        .catch(err => {
            res.send({ 'status': 500, 'message': 'User not found!' })
        })
}

exports.updatePower = async (req, res) => {
    let name = req.body.user,
        action = req.body.action

    try {
        let power = await Power.updatePowerByName(name, ACTIONS[action])
        if (power !== undefined) {
            res.send({ 'status': 200, 'message': 'Found User in Database', 'power': power })
        }
        else res.send({ 'status': 401, 'message': 'User doesnt have enough power to perform that action.' })
    }
    catch (err) {
        console.log(err)
        res.send({ 'status': 500, 'message': 'Failed to update Power' })
    }
}