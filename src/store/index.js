import Vue from 'vue'
import Vuex from 'vuex'

import { Cars } from './cars'
import { Alerts } from './alerts'
import { Routes } from './routes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Cars,
    Alerts,
    Routes
  }
})
