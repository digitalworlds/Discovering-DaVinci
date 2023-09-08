const Objectives = require('../models/Objectives'),
  User = require('../models/Users')

exports.getObjectives = async (req, res) => {
  let user_id = req.body.user

  await Objectives.getObjectives(user_id)
    .then(result => {
      let objectives = JSON.parse(result[0].objectives);
      let message = {
        'status': 200,
        'objectives': objectives,
        'message': 'Successfully retrieved user objectives'
      }
      res.send(message)
    })
    .catch(err => {
      let message = {
        'status': 400,
        'message': 'Failed to retrieve user objectives'
      }
      res.send(message)
    })
}

exports.rewardObjective = async (req, res) => {
  let user_id = req.body.user
  let objective_type = req.body.payload.objective_type
  let objective_title = req.body.payload.objective_title
  let client = req.body.client

  let err = await Objectives.rewardUser(user_id, objective_type, objective_title, client)
  if (!err) {
    await User.updatePlayerStats(user_id, 'objectives', objective_type, 1)
      .then(() => {
        let message = {
          status: 200,
          message: 'Succesfully rewarded user',
        }
        res.send(message)
      })
      .catch(err => {
        console.log(err)
        let message = {
          status: 400,
          message: 'Failed to reward user',
        }
        res.send(message)
      })
  }
  else {
    let message = {
      status: 400,
      message: 'Failed to reward user',
    }
    res.send(message)
  }
}