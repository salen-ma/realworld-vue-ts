import Vue from 'vue'
import Vuex, { StoreOptions, MutationTree } from 'vuex'
import Cookie from 'js-cookie'
import { User } from '@/api/user'

Vue.use(Vuex)

interface RootState {
  user: User
}

const mutations: MutationTree<RootState> = {
  setUser (state: RootState, payload: User) {
    state.user = payload
    Cookie.set('user', payload)
  }
}

const store: StoreOptions<RootState> = {
  state: {
    user: null
  },
  mutations
}

export default new Vuex.Store(store)
