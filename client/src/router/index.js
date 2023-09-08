import Vue from 'vue'
import Router from 'vue-router'
import Play from '@/components/Play.vue'
import AccountCreation from '@/components/AccountCreation.vue'
import RegisterView from '@/components/register-view.vue'
import EmailVerification from '@/components/EmailVerification.vue'

// Inventory Routes Imports
import InventoryView from '@/components/inventory/inventory-view.vue'
import InventionsView from '@/components/inventory/inventions-view.vue'

// Objectives Routes Imports
import DailyView from '@/components/objectives/daily-view.vue'
import WeeklyView from '@/components/objectives/weekly-view.vue'
import ChallengesView from '@/components/objectives/challenges-view.vue'

// Codex Routes Imports
import PlayerStatsView from '@/components/codex/playerstats-view.vue'
import LedgerView from '@/components/codex/ledger-view.vue'
import CreditsView from '@/components/codex/credits-view.vue'
import FaqView from '@/components/codex/faq-view.vue'

import CollectView from '@/components/social/collect-view.vue'
import GiveView from '@/components/social/give-view.vue'
import ShareView from '@/components/social/share-view.vue'

import HomeView from '@/components/home-view.vue'

import api from '../api'
import store from '../store'

Vue.use(Router)

let router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '*',
      redirect: '/Play'
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/Play',
      name: 'Play',
      component: Play,
      beforeEnter: async (to, from, next) => {
        await store.dispatch('getPower')
        await store.dispatch('getInventory')
        next()
      }
    },
    {
      path: '/login',
      name: 'Login',
      beforeEnter: (to, from, next) => {
        window.location = store.getters.getLoginUrl
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      beforeEnter: (to, from, next) => {
        location.href = "https://ufl.steem.ninja/"
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/verify',
      name: 'EmailVerification',
      component: EmailVerification,
      props: true,
      beforeEnter: (to, from, next) => {
        if (!to.params.user) {
          next({ name: 'Register' })
        }
        next()
      }
    },
    {
      path: '/account/create',
      name: 'AccountCreation',
      component: AccountCreation,
      beforeEnter: (to, from, next) => {
        if (to.params.user.hasSteemAccount) {
          next({ name: 'Home' })
        }
        next()
      }
    },
    {
      path: '/callback',
      name: 'Callback',
      beforeEnter: async (to, from, next) => {
        let route = await store.dispatch('handleCallback', to.query)
        next({ name: route })
      }
    },
    {
      path: '/api/verify/:id',
      name: 'Verify',
      props: true,
      beforeEnter: (to, from, next) => {
        api.verify(to.params.id)
          .then(response => {
            let user = response.data
            next({ name: 'Login'})
          })
      }
    },
    {
      path: '/Inventory',
      name: 'Inventory',
      component: InventoryView,
      beforeEnter: async (to, from, next) => {
        let response = await store.dispatch('getInventory')
        next()
      }
    },
    {
      path: '/Inventions',
      name: 'Inventions',
      component: InventionsView,
      beforeEnter: async (to, from, next) => {
        let response = await store.dispatch('getInventory')
        next()
      }
    },
    {
      path: '/Social/Collect',
      name: 'Collect',
      component: CollectView
    },
    {
      path: '/Social/Give',
      name: 'Give',
      component: GiveView,
      beforeEnter: async (to, from, next) => {
        await store.dispatch('getInventory')
        next()
      }
    },
    {
      path: '/Social/Share',
      name: 'Share',
      component: ShareView
    },
    {
      path: '/Objectives/Daily',
      name: 'Daily',
      component: DailyView,
      beforeEnter: async (to, from, next) => {
        await store.dispatch('getObjectives')
        next()
      }
    },
    {
      path: '/Objectives/Weekly',
      component: WeeklyView
    },
    {
      path: '/Objectives/Challenges',
      component: ChallengesView
    },
    {
      path: '/Codex/PlayerStats',
      component: PlayerStatsView,
      beforeEnter: async (to, from, next) => {
        await store.dispatch('getPlayerStats')
        next()
      }
    },
    {
      path: '/Codex/FAQ',
      component: FaqView
    },
    {
      path: '/Codex/Ledger',
      component: LedgerView,
      beforeEnter: async (to, from, next) => {
        await store.dispatch('getTransactions')
        next()
      }
    },
    {
      path: '/Codex/Credits',
      component: CreditsView
    }
  ]
})

export default router