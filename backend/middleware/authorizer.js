var steemconnect = require('steemconnect')
getUserById = require('../models/Users').getUserById;

var client = new steemconnect.Client({
  app: 'ufl.app',
  callbackURL: `${process.env.API_URL}/callback`,
  scope: ['vote', 'comment', 'custom_json', 'broadcast', 'posting']
});

exports.authorize = (req, res, next) => {
  let bearer = req.headers.authorization
  let token = bearer.split(' ')[1]

  client.setAccessToken([token])
  client.me((err, response) => {
    if (err) res.send(new Error('Steem connect error!'))
    else {
      // if (response.user !== 'squits' && response.user !== 'burge005' && response.user !== 'squits.dev') {
      //   res.status(403).send()
      // }
      // else {
      //   req.body.user = response.user
      //   req.body.client = client
      //   next()
      // }
      req.body.user = response.user
      req.body.client = client
      next()
    }
  })
}

exports.socketAuthorizer = async (accessToken, redisClient, socketId, callback) => {
  let isAuthorized = false
  let authorizedUser = ''
  let error = null

  client.setAccessToken([accessToken])
  await client.me(async (err, response) => {
    if (err) error = err
    else {
      await getUserById(response.user)
        .then(async results => {
          if (results.length > 0 && results[0].user_id) {
            let canConnect = await redisClient.setAsync(`users:${results[0].user_id}`, socketId, 'NX', 'EX', 30);

            if (!canConnect) error = new Error('User already has a connection open.')
            else {
              authorizedUser = results[0].user_id
              isAuthorized = true
              console.log(`${new Date()} User ${authorizedUser} established socket connection.`)
            }
          }
        })
        .catch(err => {
          error = err
        })
    }
  })

  return {
    user: authorizedUser,
    callback: callback(error, isAuthorized)
  }
}