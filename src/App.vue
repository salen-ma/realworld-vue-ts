<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Cookie from 'js-cookie'
import { User } from '@/api/user'

export default Vue.extend({
  created () {
    const userString = Cookie.get('user')
    let user: User = null
    try {
      user = JSON.parse(userString as string)
    } catch (err) {}

    if (user) {
      this.$store.commit('setUser', user)
    }
  }
})
</script>
