import Vue from 'vue'
import Component from 'vue-class-component'
import MarkdownIt from 'markdown-it'
import { mapState } from 'vuex'
import {
  ArticleDetail, getArticleDetail,
  unFavoriteArticle, favoriteArticle
} from '@/api/article'
import { followUser, unFollowUser } from '@/api/profile'
import ArticleMeta from './components/article-meta'
import ArticleComments from './components/article-comments'
import { User } from '@/api/user'

@Component({
  computed: {
    ...mapState(['user'])
  },
  components: {
    ArticleMeta,
    ArticleComments
  }
})
export default class Article extends Vue {
  article: ArticleDetail = {
    author: {
      bio: '',
      following: false,
      image: '',
      username: ''
    },
    title: '',
    body: '',
    favorited: false,
    favoritesCount: 0,
    slug: '',
  }
  user!: User
  disabledFavorite = false
  disabledFollow = false

  async mounted () {
    const { data } = await getArticleDetail(this.$route.params.slug)
    this.article = data.article
    const md = new MarkdownIt()
    this.article.body = md.render(this.article.body)
  }

  // 文章点赞
  async likeHandler () {
    if (!this.user) {
      this.$router.push('/register')
      return
    }
    this.disabledFavorite = true
    if (this.article.favorited) {
      await unFavoriteArticle(this.article.slug)
      this.article.favorited = false
      this.article.favoritesCount--
    } else {
      await favoriteArticle(this.article.slug)
      this.article.favorited = true
      this.article.favoritesCount++
    }
    this.disabledFavorite = false
  }

  // 关注作者
  async followHandler () {
    if (!this.user) {
      this.$router.push('/register')
      return
    }

    this.disabledFollow = true
    if (this.article.author.following) {
      await unFollowUser(this.article.author.username)
      this.article.author.following = false
    } else {
      await followUser(this.article.author.username)
      this.article.author.following = true
    }
    this.disabledFollow = false
  }

  render () {
    const { article, user, disabledFavorite, disabledFollow } = this

    return (
      <div class="article-page">

        <div class="banner">
          <div class="container">

            <h1>{ article && article.title }</h1>

            <article-meta
              article = { article }
              user = { user }
              disabledFavorite = { disabledFavorite }
              disabledFollow = { disabledFollow }
              likeHandler = { this.likeHandler }
              followHandler = { this.followHandler } />

          </div>
        </div>

        <div class="container page">

          <div class="row article-content">
            <div class="col-md-12" domPropsInnerHTML = { article.body }></div>
          </div>

          <hr />

          <div class="article-actions">
            <article-meta
              article = { article }
              user = { user }
              disabledFavorite = { disabledFavorite }
              disabledFollow = { disabledFollow }
              likeHandler = { this.likeHandler }
              followHandler = { this.followHandler } />
          </div>

          <div class="row">

            <article-comments
              article = { article }
              user = { user } />

          </div>

        </div>

      </div>
    )
  }
}
