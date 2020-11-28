import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './authStore'
import { folder } from './folderStore'
import { document } from './documentStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    folder,
    document,
  }
})
