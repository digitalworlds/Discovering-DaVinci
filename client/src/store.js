import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'
const steemconnect = require('steemconnect');

var client = new steemconnect.Client({
  app: 'ufl.app',
  callbackURL: process.env.CALLBACK_URL,
  scope: ['vote', 'comment']
});

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    isWaitingOnApi: false,
    accessToken: '',
    user: {
      name: '',
      power: 0,
      inventory: undefined,
      qrKey: '',
      encountered: [],
      infiniteInventionPiece: undefined,
      objectives: {},
      playerStats: {},
      transactions: [],
      unknownPieces: {},
      settings: {}
    },
    steemconnectClient: client,
    cacheFirst: {
      objectives: false,
      infiniteInventionPiece: false,
      inventory: false,
      power: false,
      playerStats: false,
      transactions: false
    },
    useAr: true
  },
  mutations: {
    UPDATE_SETTINGS(state, payload) {
      Vue.set(state.user.settings, payload.setting, payload.value)
    },
    SET_USE_AR(state, useAr) {
      state.useAr = useAr
    },
    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading
    },
    SET_IS_WAITING_ON_API(state, isWaiting) {
      state.isWaitingOnApi = isWaiting
    },
    ATTACH_ACCESS_TOKEN(state, accessToken) {
      state.accessToken = accessToken;
      state.steemconnectClient.setAccessToken([accessToken])
    },
    ATTACH_USERNAME(state, username) {
      state.user.name = username
    },
    REVOKE_ACCESS_TOKEN(state) {
      state.steemconnectClient.revokeToken(function (err, res) {
        if (err) console.log(err)
        else state.accessToken = ''
      });
    },
    CLEAR_USER(state) {
      state.user.name = ''
    },
    SET_POWER(state, power) {
      state.user.power = power
    },
    ATTACH_INVENTORY(state, inventory) {
      state.user.inventory = inventory
    },
    UPDATE_INVENTORY(state, invPiece) {
      let updatedInventionPieces = JSON.parse(JSON.stringify(state.user.inventory.invention_pieces))

      if (invPiece.length) {
        invPiece.forEach(piece => {
          updatedInventionPieces.push(piece)

        });
      }
      else
        updatedInventionPieces.push(invPiece)

      Vue.set(state.user.inventory, 'invention_pieces', updatedInventionPieces)
    },
    UPDATE_BUILT_INVENTIONS(state, pieces) {
      let updatedInventionPieces = JSON.parse(JSON.stringify(state.user.inventory.invention_pieces))

      for (let piece of pieces) {
        for (let i = 0; i < updatedInventionPieces.length; i++) {
          if (piece.ip_id === updatedInventionPieces[i].ip_id) {
            updatedInventionPieces[i].usedInBuild = 1
          }
        }
      }

      Vue.set(state.user.inventory, 'invention_pieces', updatedInventionPieces)
    },
    REMOVE_PIECES_FROM_INVENTORY(state, pieces) {
      let updatedInventionPieces = JSON.parse(JSON.stringify(state.user.inventory.invention_pieces))

      for (let i = 0; i < pieces.length; i++) {
        for (let j = 0; j < updatedInventionPieces.length; j++) {
          if (pieces[i].ip_id === updatedInventionPieces[j].ip_id) {
            updatedInventionPieces.splice(j, 1)
            continue
          }
        }
      }

      Vue.set(state.user.inventory, 'invention_pieces', updatedInventionPieces)
    },
    ATTACH_QRKEY(state, qrKey) {
      Vue.set(state.user, 'qrKey', qrKey)
    },
    UPDATE_ENCOUNTERED(state, newEncounter) {
      let encountered = state.user.encountered
      encountered.push(newEncounter)
      Vue.set(state.user, 'encountered', encountered)
    },
    UPDATE_UNKNOWN_PIECES(state, unknownPieces) {
      sessionStorage.setItem('unknownPieces', JSON.stringify(unknownPieces))
      Vue.set(state.user, 'unknownPieces', unknownPieces)
    },
    ATTACH_INFINITE_INVENTION_PIECE(state, infinitePiece) {
      Vue.set(state.user, 'infiniteInventionPiece', infinitePiece)
    },
    ATTACH_OBJECTIVES(state, objectives) {
      Vue.set(state.user, 'objectives', objectives)
    },
    ATTACH_PLAYERSTATS(state, playerStats) {
      Vue.set(state.user, 'playerStats', playerStats)
    },
    ATTACH_TRANSACTIONS(state, transactions) {
      Vue.set(state.user, 'transactions', transactions)
    },
    ATTACH_UNKNOWN_PIECES(state, unknownPieces) {
      sessionStorage.setItem('unknownPieces', unknownPieces)
      Vue.set(state.user, 'unknownPieces', JSON.parse(unknownPieces))
    },
    ATTACH_SETTINGS(state, settings) {
      sessionStorage.setItem('settings', settings)
      Vue.set(state.user, 'settings', JSON.parse(settings))
    },
    SET_OBJECTIVE_CACHEFIRST(state, status) {
      Vue.set(state.cacheFirst, 'objectives', status)
    },
    SET_INFINITE_INVENTION_PIECE_CACHEFIRST(state, status) {
      Vue.set(state.cacheFirst, 'infiniteInventionPiece', status)
    },
    SET_INVENTORY_CACHEFIRST(state, status) {
      Vue.set(state.cacheFirst, 'inventory', status)
    },
    SET_POWER_CACHEFIRST(state, status) {
      Vue.set(state.cacheFirst, 'power', status)
    },
    SET_PLAYERSTATS_CACHEFIRST(state, status) {
      Vue.set(state.cacheFirst, 'playerStats', status)
    },
    SET_TRANSACTIONS_CACHEFIRST(state, status) {
      Vue.set(state.cacheFirst, 'transactions', status)
    }
  },
  getters: {
    getUseAr(state) {
      return state.useAr
    },
    isLoading(state) {
      return state.isLoading
    },
    isWaitingOnApi(state) {
      return state.isWaitingOnApi
    },
    getAccessToken(state) {
      return state.accessToken
    },
    getLoginUrl(state) {
      return state.steemconnectClient.getLoginURL('')
    },
    getUser(state) {
      return state.user
    },
    getInventory(state) {
      return state.user.inventory
    },
    getQrKey(state) {
      return state.user.qrKey
    },
    getEncountered(state) {
      return state.user.encountered
    },
    getInfiniteInventionPiece(state) {
      return state.user.infiniteInventionPiece
    },
    getUnknownPieces(state) {
      let unknownPieces = state.user.unknownPieces

      if (!unknownPieces["0"])
        unknownPieces = JSON.parse(sessionStorage.getItem('unknownPieces'))

      return unknownPieces
    },
    getSettings(state) {
      let settings = state.user.settings

      if (!settings["modals"]) {
        settings = JSON.parse(sessionStorage.getItem('settings'))
        Vue.set(state.user, 'settings', settings)
      }

      return settings
    },
  },
  actions: {
    async handleCallback({ commit, dispatch }, query) {
      sessionStorage.setItem('accessToken', query.access_token)
      sessionStorage.setItem('username', query.username)

      commit('ATTACH_ACCESS_TOKEN', query.access_token)
      commit('ATTACH_USERNAME', query.username)

      let response = await api.getUser(query.username)
      if (response.status === 200) {
        // user is registered with UFL email
        sessionStorage.setItem('qrKey', response.user.infInvId)
        sessionStorage.setItem('infiniteInventionPiece', JSON.stringify(response.user.infInv))
        sessionStorage.setItem('inventory', JSON.stringify(response.inventory))
        sessionStorage.setItem('playerStats', response.user.playerStats)
        sessionStorage.setItem('objectives', response.user.objectives)
        sessionStorage.setItem('power', response.power)

        commit('ATTACH_QRKEY', response.user.infInvId)
        commit('ATTACH_INFINITE_INVENTION_PIECE', response.user.infInv)
        commit('ATTACH_INVENTORY', response.inventory)
        commit('ATTACH_OBJECTIVES', JSON.parse(response.user.objectives))
        commit('ATTACH_PLAYERSTATS', JSON.parse(response.user.playerStats))
        commit('ATTACH_UNKNOWN_PIECES', response.user.unknownInventionPieces)
        commit('ATTACH_SETTINGS', response.user.settings)
        commit('SET_POWER', response.power)

        commit('SET_INVENTORY_CACHEFIRST', true)
        commit('SET_INFINITE_INVENTION_PIECE_CACHEFIRST', true)
        commit('SET_OBJECTIVE_CACHEFIRST', true)
        commit('SET_POWER_CACHEFIRST', true)
        commit('SET_PLAYERSTATS_CACHEFIRST', true)

        return 'Play'
      } else if (response.status === 201) {
        // User still has to register their email
        return 'Register'
      }
    },
    logout({ commit }) {
      sessionStorage.removeItem('accessToken')
      sessionStorage.removeItem('username')

      commit('REVOKE_ACCESS_TOKEN')
      commit('CLEAR_USER')


    },
    async getPower({ commit, state }) {
      let power = undefined;

      if (state.cacheFirst.power === true) {
        power = state.user.power;
        if (!power) {
          power = sessionStorage.getItem('power')
        }
      }

      if (!power) {
        let res = await api.getPower()
        if (res.power) {
          power = res.power
          commit('SET_POWER', power)
          sessionStorage.setItem('power', power)
          commit('SET_POWER_CACHEFIRST', true)
        }
        else {
          return -1
        }
      }

      return power
    },
    getUserFromSession({ commit }) {
      try {
        let accessToken = sessionStorage.getItem('accessToken')
        let username = sessionStorage.getItem('username')
        let qrKey = sessionStorage.getItem('qrKey')
        if (accessToken && username) {
          commit('ATTACH_ACCESS_TOKEN', accessToken)
          commit('ATTACH_USERNAME', username)
          commit('ATTACH_QRKEY', qrKey)
          return true
        }
        return false
      } catch (err) {
        console.log(err)
      }
    },
    async updatePower({ commit }, action) {
      let response = await api.updatePower(action)
      if (response.status === 200)
        commit('SET_POWER', response.power)
      return response
    },
    async getCard() {
      let response = await api.getCard()
      return response
    },
    async checkAnswer({ commit }, payload) {
      let res = await api.checkAnswer(payload.id, payload.response, payload.invention_piece)
      return res
    },

    async getPlayerStats({ commit, state }) {
      let playerStats = undefined

      if (state.cacheFirst.playerStats === true) {
        playerStats = state.user.playerStats
        if (!playerStats)
          playerStats = JSON.parse(sessionStorage.getItem('playerStats'))
      }

      if (!playerStats) {
        let res = await api.getPlayerStats()

        if (res.playerStats) {
          playerStats = res.playerStats
          commit('ATTACH_PLAYERSTATS', playerStats)
          sessionStorage.setItem('playerStats', JSON.stringify(playerStats))
          commit('SET_PLAYERSTATS_CACHEFIRST', true)
        }
        else
          return -1
      }

      return playerStats
    },

    async getTransactions({ commit, state }) {
      let transactions = undefined

      if (state.cacheFirst.transactions === true) {
        transactions = state.user.transactions
        if (!transactions)
          transactions = JSON.parse(sessionStorage.getItem('transactions'))
      }

      if (!transactions) {
        let res = await api.getTransactions()

        if (res.transactions) {
          transactions = res.transactions
          commit('ATTACH_TRANSACTIONS', transactions)
          sessionStorage.setItem('transactions', JSON.stringify(transactions))
          commit('SET_TRANSACTIONS_CACHEFIRST', true)
        }
        else
          return -1
      }

      return transactions
    },

    async getInventory({ commit, state }) {
      let inventory = undefined
      if (state.cacheFirst.inventory === true) {
        inventory = state.user.inventory
        if (!inventory)
          inventory = JSON.parse(sessionStorage.getItem('inventory'))
      }

      if (!inventory) {
        let res = await api.fetchInventory()
        if (res.inventory) {
          inventory = res.inventory
          commit('ATTACH_INVENTORY', inventory)
          sessionStorage.setItem('inventory', JSON.stringify(inventory))
          commit('SET_INVENTORY_CACHEFIRST', true)
        }
        else
          return -1
      }

      return inventory
    },
    async addBuiltInvention({ commit }, payload) {
      let response = await api.addBuiltInvention(payload)

      if (response.status === 200)
        commit('UPDATE_BUILT_INVENTIONS', payload)

      return response
    },
    async getInfiniteInventionPiece({ getters, state, commit }) {

      let infiniteInventionPiece = {}

      if (state.cacheFirst.infiniteInventionPiece === true) {
        infiniteInventionPiece = state.user.infiniteInventionPiece
        if (!infiniteInventionPiece)
          infiniteInventionPiece = JSON.parse(sessionStorage.getItem('infiniteInventionPiece') === undefined ? sessionStorage.getItem('infiniteInventionPiece') : "{}")
      }

      if (!infiniteInventionPiece.user_id) {
        let res = await api.getInfiniteInventionPiece()
        if (res.infiniteInventionPiece) {
          infiniteInventionPiece = res.infiniteInventionPiece
          commit('ATTACH_INFINITE_INVENTION_PIECE', infiniteInventionPiece)
          sessionStorage.setItem('infiniteInventionPiece', JSON.stringify(infiniteInventionPiece))
        }
        else
          return -1
      }

      return infiniteInventionPiece
    },
    async getObjectives({ commit, state }) {
      let objectives = {}

      if (state.cacheFirst.objectives === true) {
        objectives = state.user.objectives
        if (!objectives.daily)
          objectives = JSON.parse(sessionStorage.getItem('objectives'))
      }

      if (!objectives.daily) {
        let res = await api.getObjectives()
        if (res.objectives) {
          objectives = res.objectives
          commit('ATTACH_OBJECTIVES', objectives)
          sessionStorage.setItem('objectives', JSON.stringify(objectives))
          commit('SET_OBJECTIVE_CACHEFIRST', true)
        }
        else
          return ''
      }

      return objectives
    },
    async updateSettings({ commit }, payload) {
      let response = await api.updateSettings(payload)

      if (response.status === 200) {
        commit('ATTACH_SETTINGS', response.settings)
      }
      else {
        console.log(response)
      }
    }
  }
})
