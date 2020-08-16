import Vue from 'vue'
import Component from 'vue-class-component'
import { mapState } from 'vuex'
import { Watch } from 'vue-property-decorator'
import { getProfile, followUser, unFollowUser } from '@/api/profile'
import { Author, ArticleDetail, GetArticleParams, getArticles } from '@/api/article'
import { User } from '@/api/user'
import ArticleItem from '@/components/article-item'

@Component({
  computed: mapState(['user']),
  components: {
    ArticleItem
  }
})
export default class Profile extends Vue {
  profile: Author = {
    username: '',
    bio: '',
    image: '',
    following: false
  }
  page = 1
  limit = 20
  totalPage = 0
  tab = 'my_articles'
  articles: ArticleDetail[] = []
  user!: User
  disabledFollow = false

  mounted () {
    this.getProfileHandler()
    this.getArticlesHandler()
  }

  @Watch('$route.query', { deep: true })
  onQueryChange () {
    this.getArticlesHandler()
  }

  @Watch('$route.params', { deep: true })
  onParamsChange () {
    this.getProfileHandler()
    this.getArticlesHandler()
  }

  async getProfileHandler () {
    const { username } = this.$route.params
    const { data } = await getProfile(username)
    this.profile = data.profile
  }

  async getArticlesHandler () {
    const { username } = this.$route.params
    this.page = Number.parseInt(this.$route.query.page as string) || 1
    this.tab = this.$route.query.tab as string || 'my_articles'

    const articleParams: GetArticleParams = {
      limit: this.limit,
      offset: (this.page - 1) * this.limit,
    }
    if (this.tab === 'my_articles') {
      articleParams.author = username
    } else {
      articleParams.favorited = username
    }

    const { data } = await getArticles(articleParams)
    const { articles, articlesCount } = data
    this.articles = articles
    this.totalPage = Math.ceil(articlesCount / this.limit)
  }

  // 去设置页
  toEditProfile () {
    this.$router.push('/settings')
  }

  async followHandler (username: string) {
    if (!this.user) {
      this.$router.push('/register')
      return
    }

    this.disabledFollow = true
    if (this.profile.following) {
      await unFollowUser(username)
      this.profile.following = false
    } else {
      await followUser(username)
      this.profile.following = true
    }
    this.disabledFollow = false
  }

  render () {
    const { profile, tab, articles, user, disabledFollow } = this
    return (
      <div class="profile-page">

        <div class="user-info">
          <div class="container">
            <div class="row">

              <div class="col-xs-12 col-md-10 offset-md-1">
                {
                  profile.image ? <img src={ profile.image } class="user-img" /> :
                  <img class="user-img"/>
                }
                <h4>{ profile.username }</h4>
                <p>
                  { profile.bio }
                </p>
                {(user && user.username) === profile.username ?
                  <button onClick = { this.toEditProfile }
                    class="btn btn-sm action-btn btn-outline-secondary">
                    &nbsp; <i class="ion-gear-a"></i> Edit Profile Settings
                  </button> :
                  <button
                    onClick = { () => { this.followHandler(profile.username) } }
                    disabled = { disabledFollow }
                    class={
                      `btn btn-sm btn-outline-secondary action-btn
                      ${profile.following ? 'btn-secondary' : 'btn-outline-secondary'}`
                    }>
                    <i class="ion-plus-round"></i>
                    &nbsp;
                    { profile.following ? 'Unfollow' : 'Follow' } { profile.username }
                  </button>
                }
              </div>

            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">

            <div class="col-xs-12 col-md-10 offset-md-1">
              <div class="articles-toggle">
                <ul class="nav nav-pills outline-active">
                  <li class="nav-item">
                    <router-link
                      to={{
                        name: 'profile',
                        query: {
                          tab: 'my_articles'
                        }
                      }}
                      exact
                      class={{
                        'nav-link': true,
                        active: tab === 'my_articles'
                      }}>My Articles</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to={{
                        name: 'profile',
                        query: {
                          tab: 'favorited_articles'
                        }
                      }}
                      exact
                      class={{
                        'nav-link': true,
                        active: tab === 'favorited_articles'
                      }}>Favorited Articles</router-link>
                  </li>
                </ul>
              </div>

              {
                articles.map(article => (
                  <article-item
                    key = { article.slug }
                    article = { article }
                    isLogin = { Boolean(user) } />
                ))
              }

            </div>

          </div>
        </div>

      </div>
    )
  }
}
