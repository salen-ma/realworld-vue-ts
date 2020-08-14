import Vue from 'vue'
import Component from 'vue-class-component'
import { mapMutations } from 'vuex'
import { User, register, login } from '@/api/user'

const LoginProps = Vue.extend({
  props: {
    isLogin: Boolean
  }
})

@Component({
  methods: mapMutations(['setUser'])
})
export default class Login extends LoginProps {
  user = {
    username: '',
    email: '',
    password: ''
  }
  errors: {
    [prop: string]: string[]
  } = {}
  disabledSign = false

  setUser!: (payload: User) => void

  async onSubmit (e: Event) {
    e.preventDefault()
    this.disabledSign = true
    try {
      const { data } = this.isLogin ?
        await login({ user: this.user }) :
        await register({ user: this.user })

      this.setUser(data.user)
      this.$router.push('/')
    } catch (err) {
      this.errors = err.response.data.errors
    }
    this.disabledSign = false
  }

  render () {
    const { isLogin, user, errors, disabledSign } = this
    return (
      <div class="auth-page">
        <div class="container page">
          <div class="row">

            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">{ isLogin ? 'Sign in' : 'Sign up' }</h1>
              <p class="text-xs-center">
                {
                  isLogin ?
                  <router-link to="/register">Need an account?</router-link> :
                  <router-link to="/login">Have an account?</router-link>
                }
              </p>

              <ul class="error-messages">
                {
                  Object.keys(errors).map(field => (
                    errors[field].map((message, index) => (
                      <li key={index}>{field} { message }</li>
                    ))
                  ))
                }
              </ul>

              <form onSubmit = { this.onSubmit }>
                {!isLogin &&
                  <fieldset
                    class="form-group">
                    <input v-model = { user.username }
                    class="form-control form-control-lg" type="text" placeholder="Your Name" />
                  </fieldset>
                }
                <fieldset class="form-group">
                  <input v-model = { user.email }
                  class="form-control form-control-lg" type="text" placeholder="Email" />
                </fieldset>
                <fieldset class="form-group">
                  <input v-model = { user.password }
                  class="form-control form-control-lg" type="password" placeholder="Password" />
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right"
                  disabled={ disabledSign }>
                  { isLogin ? 'Sign in' : 'Sign up' }
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
