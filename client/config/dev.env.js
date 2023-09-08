'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BACKEND_URL: '"https://c1b4e50d.ngrok.io"',
  BACKEND_URL: '"http://localhost:8081"',
  CALLBACK_URL: '"http://localhost:8080/#callback"'
})
