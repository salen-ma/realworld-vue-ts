import Vue from 'vue'
import Component from 'vue-class-component'
import MarkdownIt from 'markdown-it'
import { mapState } from 'vuex'
import { ArticleDetail, getArticleDetail } from '@/api/article'
import ArticleMeta from './components/article-meta'
import { User } from '@/api/user'

@Component({
  computed: {
    ...mapState(['user'])
  },
  components: {
    ArticleMeta
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
    description: '',
    body: '',
    tagList: [],
    createdAt: '',
    favorited: false,
    favoritesCount: 0,
    slug: '',
    updatedAt: ''
  }
  user!: User

  async mounted () {
    const { data } = await getArticleDetail(this.$route.params.slug)
    this.article = data.article
    const md = new MarkdownIt()
    this.article.body = md.render(this.article.body)
  }

  render () {
    const { article, user } = this

    return (
      <div class="article-page">

        <div class="banner">
          <div class="container">

            <h1>{ article && article.title }</h1>

            <article-meta article = { article } user = { user } />

          </div>
        </div>

        <div class="container page">

          <div class="row article-content">
            <div class="col-md-12" domPropsInnerHTML = { article.body }></div>
          </div>

          <hr />

          <div class="article-actions">
            <article-meta article = { article } user = { user } />
          </div>

          <div class="row">

            <div class="col-xs-12 col-md-8 offset-md-2">

              <form class="card comment-form">
                <div class="card-block">
                  <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
                </div>
                <div class="card-footer">
                  <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                  <button class="btn btn-sm btn-primary"> Post Comment </button>
                </div>
              </form>

              <div class="card">
                <div class="card-block">
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div class="card-footer">
                  <a href="" class="comment-author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="" class="comment-author">Jacob Schmidt</a>
                  <span class="date-posted">Dec 29th</span>
                </div>
              </div>

              <div class="card">
                <div class="card-block">
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div class="card-footer">
                  <a href="" class="comment-author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="" class="comment-author">Jacob Schmidt</a>
                  <span class="date-posted">Dec 29th</span>
                  <span class="mod-options">
                    <i class="ion-edit"></i>
                    <i class="ion-trash-a"></i>
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    )
  }
}
