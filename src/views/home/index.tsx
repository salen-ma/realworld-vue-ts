import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { User } from '@/api/user'
import {
  getArticles,
  getTags,
  getFeedArticles,
  ArticleDetail
} from '@/api/article'
import ArticleItem from '@/components/article-item'

@Component({
  computed: mapState(['user']),
  components: {
    ArticleItem
  }
})
export default class Home extends Vue {
  page = 1
  limit = 20
  totalPage = 0
  tab = 'global_feed'
  tag = ''
  articles: ArticleDetail[] = []
  tags: string[] = []
  user!: User

  mounted () {
    this.getArticlesHandler()
  }

  @Watch('$route.query', { immediate: true, deep: true })
  onQueryChange () {
    this.getArticlesHandler()
  }

  async getArticlesHandler () {
    this.page = Number.parseInt(this.$route.query.page as string) || 1
    this.tab = this.$route.query.tab as string || 'global_feed'
    this.tag = this.$route.query.tag as string || ''

    const getArticleApi = this.tab === 'your_feed' ? getFeedArticles : getArticles
    const [ articleRes, tagRes ] = await Promise.all([
      getArticleApi({
        limit: this.limit,
        offset: (this.page - 1) * this.limit,
        tag: this.tag,
      }),
      getTags()
    ])

    const { articles, articlesCount } = articleRes.data
    const { tags } = tagRes.data

    this.totalPage = Math.ceil(articlesCount / this.limit)
    this.articles = articles
    this.tags = tags
  }

  render () {
    const { page, totalPage, tab, tag, articles, tags, user } = this
    console.log(tags)
    return (
      <div class="home-page">

        <div class="banner">
          <div class="container">
            <h1 class="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div class="container page">
          <div class="row">

            <div class="col-md-9">
              <div class="feed-toggle">
                <ul class="nav nav-pills outline-active">
                  {user &&
                    <li class="nav-item">
                      <router-link to={{
                          name: 'home',
                          query: {
                            tab: 'your_feed'
                          }
                        }}
                        exact
                        class={{
                          'nav-link': true,
                          active: tab === 'your_feed'
                        }}>Your Feed</router-link>
                    </li>
                  }
                  <li class="nav-item">
                    <router-link to={{
                        name: 'home',
                        query: {
                          tab: 'global_feed'
                        }
                      }}
                      exact
                      class={{
                        'nav-link': true,
                        active: tab === 'global_feed'
                      }}>Global Feed</router-link>
                  </li>
                  {tab === 'popular_tag' &&
                    <li class="nav-item">
                      <router-link to={{
                          name: 'home',
                          query: {
                            tab: 'global_feed'
                          }
                        }}
                        exact
                        class={{
                          'nav-link': true,
                          active: tab === 'popular_tag'
                        }}><i class="ion-pound"></i> { tag }</router-link>
                    </li>
                  }
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

              {/* 分页列表 */}
              {totalPage > 1 &&
                <nav>
                  <ul class="pagination">
                    {
                      Array.from({ length: totalPage - 1 }, (v, i) => i + 1).map(pageNumber => (
                        <li
                          class={{
                            'page-item': true,
                            active: pageNumber === page
                          }}
                          key={ pageNumber }
                        >
                          <router-link to={{
                              name: 'home',
                              query: {
                                page: pageNumber,
                                tab: tab,
                                tag: tag
                              }
                            }}
                            class="page-link">{ pageNumber }</router-link>
                        </li>
                      ))
                  }
                  </ul>
                </nav>
              }
            </div>

            <div class="col-md-3">
              <div class="sidebar">
                <p>Popular Tags</p>

                <div class="tag-list">
                  {
                    tags.map(tag => (
                      <router-link
                        key={ tag }
                        to={{
                          name: 'home',
                          query: {
                            tab: 'popular_tag',
                            tag: tag,
                          }
                        }}
                        class="tag-pill tag-default">{ tag }
                      </router-link>)
                    )
                  }
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    )
  }
}
