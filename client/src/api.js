import store from './store'

const axios = require('axios')

const client = axios.create({
  baseURL: process.env.BACKEND_URL,
  json: true
})

export default {
  async execute(method, resource, data) {
    // inject the accessToken for each request
    let accessToken = store.getters.getAccessToken
    return client({
      method,
      url: resource,
      data: data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(res => {
      return res.data
    })
  },
  registerNew(data) {
    return this.execute('post', 'users/', data)
  },
  verify(id) {
    return this.execute('get', `users/status/${id}`)
  },
  getUser(username) {
    return this.execute('get', `users/`)
  },
  getCreator() {
    return this.execute('get', 'creator')
  },
  getPower() {
    return this.execute('get', 'power')
  },
  updatePower(action) {
    return this.execute('patch', 'power', { 'action': action })
  },
  getCard() {
    return this.execute('get', 'trivia')
  },
  checkAnswer(id, response, inventionPiece) {
    return this.execute('post', `trivia/${id}`, { 'response': response, 'invention_piece': inventionPiece })
  },
  fetchInventory() {
    return this.execute('get', '/users/inventory')
  },
  saveCard(reward) {
    return this.execute('patch', '/users/inventory', { 'op': 'SAVE_CARD', 'payload': reward })
  },
  useSavedCard(inventionId) {
    return this.execute('patch', '/users/inventory', { 'op': 'USE_CARD', 'payload': inventionId })
  },
  claimInfiniteInventionPiece(payload) {
    return this.execute('post', '/users/encounter', { 'payload': payload })
  },
  addBuiltInvention(payload) {
    return this.execute('post', '/users/inventory/build', { 'payload': payload })
  },
  getInfiniteInventionPiece() {
    return this.execute('get', '/users/inventions')
  },
  getObjectives() {
    return this.execute('get', '/objectives')
  },
  rewardObjectives(payload) {
    return this.execute('post', '/objectives', { 'payload': payload })
  },
  getPlayerStats() {
    return this.execute('get', '/users/playerstats')
  },
  getTransactions() {
    return this.execute('get', '/users/transactions')
  },
  postGivePieces(payload) {
    return this.execute('post', '/users/give', {'payload': payload})
  },
  updateSettings(payload) {
    return this.execute('post', '/users/settings', {'payload': payload})
  }
}
