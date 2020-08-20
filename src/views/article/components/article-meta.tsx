import Vue from 'vue'
import Component from 'vue-class-component'
import { ArticleDetail, delArticle } from '@/api/article'
import { dateFormat } from '@/utils'
import { User } from '@/api/user'

const ArticleMetaProps = Vue.extend({
  props: {
    article: {
      type: Object,
      required: true,
      default: function () {
        return {}
      }
    },
    user: {
      type: Object,
      required: true,
      default: function () {
        return {}
      }
    },
    disabledFavorite: Boolean,
    disabledFollow: Boolean,
    likeHandler: {
      type: Function,
      required: true
    },
    followHandler: {
      type: Function,
      required: true
    }
  }
})

@Component
export default class ArticleMeta extends ArticleMetaProps {
  article!: ArticleDetail
  likeHandler!: () => Promise<void>
  followHandler!: () => Promise<void>
  user!: User
  disabledDelete = false
  disabledFavorite = false
  disabledFollow = false

  async deleteArticleHandler () {
    this.disabledDelete = true
    await delArticle(this.article.slug)
    this.$router.push({
      name: 'home',
      query: {
        tab: 'your_feed'
      }
    })
  }

  render () {
    const { article, user, disabledDelete, disabledFavorite, disabledFollow } = this
    return (
      <div class="article-meta">
        <a href="">
          {article.author.image ? <img src={ article.author.image } /> : <img />}
        </a>
        <div class="info">
          <a href="" class="author">{ article.author.username }</a>
          <span class="date">{ dateFormat(article.createdAt, 'MMMM D, YYYY') }</span>
        </div>
        {user.username !== article.author.username ?
          <div style="display: inline-block">
            <button onClick = { this.followHandler }
              disabled = { disabledFollow }
              class={`btn btn-sm btn-outline-primary ${article.author.following ? 'active' : ''}`}>
              <i class="ion-plus-round"></i> &nbsp;
              { article.author.following ? 'UnFollow' : 'Follow' } { article.author.username }
            </button>
            &nbsp;&nbsp;
            <button onClick = { this.likeHandler }
              disabled = { disabledFavorite }
              class={`btn btn-sm btn-outline-primary ${article.favorited ? 'active' : ''}`}>
              <i class="ion-heart"></i> &nbsp;
              Favorite Post <span class="counter">{ article.favoritesCount }</span>
            </button>
          </div> :
          <div style="display: inline-block">
            <router-link class="btn btn-outline-secondary btn-sm"
              to={{
                name: 'editor',
                params: {
                  slug: article.slug
                }
              }}>
              <i class="ion-edit"></i> Edit Article
            </router-link>
            &nbsp;&nbsp;
            <button
              onClick = { this.deleteArticleHandler }
              disabled = { disabledDelete }
              class="btn btn-outline-danger btn-sm">
              <i class="ion-trash-a"></i> Delete Article
            </button>
          </div>
        }
      </div>
    )
  }
}
