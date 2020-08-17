import Vue from 'vue'
import Component from 'vue-class-component'
import Cookie from 'js-cookie'
import { mapState } from 'vuex'
import { User, UpdateUser, updateUser } from '@/api/user'

@Component({
  computed: {
    ...mapState(['user'])
  }
})
export default class Settings extends Vue {
  user!: User
  newUser: UpdateUser = {
    username: '',
    email: '',
  }
  disabledUpdate = false
  errors: {
    [prop: string]: string[]
  } = {}

  mounted () {
    this.newUser.username = this.user.username
    this.newUser.email = this.user.email
    this.newUser.image = this.user.image
    this.newUser.bio = this.user.bio
  }

  // 更新用户信息
  async updateUserHandler (e: Event) {
    e.preventDefault()

    if (!this.newUser.password) {
      this.newUser.password = undefined
    }

    this.disabledUpdate = true
    try {
      const { data } = await updateUser({ user: this.newUser })

      // 更新 store
      this.$store.commit('setUser', data.user)

      // 更新 cookie
      Cookie.set('user', data.user)
      this.$router.push(`/profile/${data.user.username}`)
    } catch (err) {
      this.errors = err.response.data.errors
    }
    this.disabledUpdate = false
  }

  // 清除登录信息并退出
  logout () {
    Cookie.remove('user')
    this.$store.commit('setUser', null)
    this.$router.push('/')
  }

  render () {
    const { newUser, disabledUpdate, errors } = this

    return (
      <div class="settings-page">
        <div class="container page">
          <div class="row">

            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Your Settings</h1>

              <ul class="error-messages">
                {
                  Object.keys(errors).map(field => (
                    errors[field].map((message, index) => (
                      <li key={index}>{field} { message }</li>
                    ))
                  ))
                }
              </ul>

              <form>
                <fieldset>
                    <fieldset class="form-group">
                      <input v-model = { newUser.image }
                        class="form-control" type="text" placeholder="URL of profile picture" />
                    </fieldset>
                    <fieldset class="form-group">
                      <input v-model = { newUser.username }
                        class="form-control form-control-lg" type="text" placeholder="Your Name" />
                    </fieldset>
                    <fieldset class="form-group">
                      <textarea v-model = { newUser.bio }
                        class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
                    </fieldset>
                    <fieldset class="form-group">
                      <input v-model = { newUser.email }
                        class="form-control form-control-lg" type="text" placeholder="Email" />
                    </fieldset>
                    <fieldset class="form-group">
                      <input v-model = { newUser.password }
                        autocomplete="off"
                        class="form-control form-control-lg" type="password" placeholder="Password" />
                    </fieldset>
                    <button onClick = { this.updateUserHandler }
                      disabled = { disabledUpdate }
                      class="btn btn-lg btn-primary pull-xs-right">
                      Update Settings
                    </button>
                </fieldset>
              </form>

              <hr />
              <button onclick = { this.logout }
                class="btn btn-outline-danger">Or click here to logout.</button>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
