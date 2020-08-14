import Vue from 'vue'
import Component from 'vue-class-component'
import { mapState } from 'vuex'
import { User } from '@/api/user'

@Component({
  computed: mapState(['user'])
})
export default class Layout extends Vue {
  user!: User

  render () {
    const { user } = this
    return (
      <div>
        <nav class="navbar navbar-light">
          <div class="container">
            <router-link to="/"
              class="navbar-brand">conduit</router-link>
            {user &&
              <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                  <router-link to="/"
                    exact
                    class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/editor" class="nav-link">
                    <i class="ion-compose"></i>&nbsp;New Post
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/settings" class="nav-link">
                    <i class="ion-gear-a"></i>&nbsp;Settings
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link"
                    to={{
                      name: 'profile',
                      params: {
                        username: user.username
                      }
                    }}>
                    <img class="user-pic" src={ user.image } />
                    { user.username }
                  </router-link>
                </li>
              </ul>
            }

            {!user &&
              <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                  <router-link to="/login" class="nav-link">Sign in</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/register" class="nav-link">Sign up</router-link>
                </li>
              </ul>
            }
          </div>
        </nav>

        <router-view />

        <footer>
          <div class="container">
            <router-link to="/" class="logo-font">conduit</router-link>
            <span class="attribution">
              An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
            </span>
          </div>
        </footer>
      </div>
    )
  }
}
