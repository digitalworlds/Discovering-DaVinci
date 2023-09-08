const StateManager = require('./StateManager'),
  Objectives = require('./Objectives'),
  Users = require('./Users'),
  sql = require('../lib/databaseConnector'),
  promisify = require('util').promisify

const TABLE_NAME = 'power'

var getAllUsers = promisify(function (result) {
  var queryString = "SELECT user_id FROM users"

  sql.query(queryString, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  })
})

module.exports = {
  getPower: promisify(function (userId, result) {
    var queryString = "SELECT power FROM users WHERE user_id = ?"

    sql.query(queryString, userId, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      }
      else {
        result(null, res);
      }
    })
  }),

  async updatePowerByName(name, power, isScheduled = false) {
    var updatedPower = 0

    await this.getPower(name)
      .then(async res => {
        let curr_power = res[0].power
        if (curr_power)
          updatedPower = parseInt(curr_power) + power
        else
          updatedPower = 0 + power

        if (updatedPower > 15000) updatedPower = 15000
        else if (updatedPower < 0) {
          updatedPower = undefined
        }

        if (updatedPower) {
          let updatedFields = {
            "power": updatedPower
          }

          await Users.updateUserById(name, updatedFields)
            .then(async res => {
              if (!isScheduled) {
                await Objectives.updateObjective(name, ['daily', 'weekly', 'challenges'], ['powerUsage', 'bigSpender'], Math.abs(power))
                  .then(async () => {
                    await Users.updatePlayerStats(name, 'coins', 'spent', Math.abs(power))
                      .catch(err => {
                        console.log(err)
                        return undefined
                      })
                  })
                  .catch(err => {
                    console.log(err)
                    return undefined
                  })
              }
            })
            .catch(err => {
              console.log(err)
              return undefined
            })
        }
      })
      .catch(err => {
        console.log(err)
        return undefined
      })

    return updatedPower
  },
  async updateAll() {
    await getAllUsers()
      .then(async (res) => {
        for (let user of res) {
          let power = await this.updatePowerByName(user.user_id, 100, true)
          console.log(`${new Date()} Scheduled: Updated ${user.user_id}'s power to ${power}`)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}