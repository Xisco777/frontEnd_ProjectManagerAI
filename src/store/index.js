// src/store.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Estado inicial
    namemain: '',
    nametitle: ''
  }
})
