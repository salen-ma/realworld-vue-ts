<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{isLogin ? 'Sign in' : 'Sign up'}}</h1>
          <p class="text-xs-center">
            <router-link v-if="isLogin" to="/register">Need an account?</router-link>
            <router-link v-else to="/login">Have an account?</router-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages"
                :key="index">
                {{field}} {{message}}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin"
              class="form-group">
              <input v-model="user.username"
              class="form-control form-control-lg" type="text" placeholder="Your Name">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email"
              class="form-control form-control-lg" type="text" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password"
              class="form-control form-control-lg" type="password" placeholder="Password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right"
              :disabled="disabledSign">
              {{isLogin ? 'Sign in' : 'Sign up'}}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { register, login } from '@/api/user'

export default Vue.extend({
  name: 'Login',
  props: {
    isLogin: Boolean
  },
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {},
      disabledSign: false
    }
  },
  methods: {
    async onSubmit () {
      this.disabledSign = true
      try {
        const { data } = this.isLogin ?
          await login({ user: this.user }) :
          await register({ user: this.user })

        this.$store.commit('setUser', data.user)
        this.$router.push('/')
      } catch (err) {
        this.errors = err.response.data.errors
      }
      this.disabledSign = false
    }
  }
})
</script>
