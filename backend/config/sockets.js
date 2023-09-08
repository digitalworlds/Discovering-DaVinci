var io = require('socket.io'),
  socketAuth = require('socketio-auth'),
  adapter = require('socket.io-redis'),
  http = require('http'),
  socketAuthorizer = require('../middleware/authorizer').socketAuthorizer;

const redis = require('../lib/redisClient')

exports.emitToUser = async function(user, event, data) {
  let socketId = await redis.getAsync(`users:${user}`)
  io.to(`${socketId}`).emit(event, data)
}

exports.broadcast = async function(event) {
  io.emit(event)
}

exports.createSocketServer = function (app) {
  let server = http.createServer(app)
  io = io(server)

  const redisAdapter = adapter({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  });

  io.adapter(redisAdapter)

  socketAuth(io, {
    authenticate: async function (socket, data, callback) {
      var AccessToken = data.AccessToken;

      let authResults = await socketAuthorizer(AccessToken, redis, socket.id, callback)

      if (authResults.user) socket.user = authResults.user

      return authResults.callback
    },
    postAuthenticate: async (socket, data) => {
      socket.conn.on('packet', async (packet) => {
        if (socket.auth && packet.type === 'ping') {
          await redis.setAsync(`users:${socket.user}`, socket.id, 'XX', 'EX', 30);
        }
      });
    },
    disconnect: async (socket) => {
      if (socket.user) {
        await redis.delAsync(`users:${socket.user}`);
        console.log(`${new Date()} User ${socket.user} disconnected socket connection.`);
      }
    },
    timeout: 3000 // This value might need to grow based on number of entries in Redis users table
  })

  return server
}