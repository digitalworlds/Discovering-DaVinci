// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

let BACKEND_URL = process.env.BACKEND_URL
let path = ''

if (process.env.NODE_ENV === 'production') {
  path = '/projects/discover/socket.io/'
  BACKEND_URL = 'https://research.dwi.ufl.edu'
}

Vue.use(new VueSocketIO({
  connection: SocketIO(BACKEND_URL, {autoConnect: false, path: path, transports: ['websocket']}), //options object is Optional
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
})
);

Vue.config.productionTip = false

// global route guard
router.beforeEach(async (to, from, next) => {
  store.commit('SET_IS_LOADING', true)
  await store.dispatch('getUserFromSession')
  if (!store.state.accessToken && to.path !== '/' && to.path !== '/Login' && to.path !== '/SignUp' && to.path !== '/callback' && to.name !== 'Verify') {
    next({ name: 'Home' })
  }
  else {
    await store.dispatch('getPower')
    next()
  }
})

router.afterEach(async (to, from, next) => {
  store.commit('SET_IS_LOADING', false)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
