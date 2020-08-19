import Vue from 'vue'
import Component from 'vue-class-component'
import {
  ArticleDetail,
  favoriteArticle,
  unFavoriteArticle
} from '@/api/article'
import { dateFormat } from '@/utils'

const ArticleItemProps = Vue.extend({
  props: {
    article: {
      type: Object,
      required: true,
      default: function () {
        return {}
      }
    },
    isLogin: {
      type: Boolean,
      default: false
    }
  }
})

@Component
export default class ArticleItem extends ArticleItemProps {
  article!: ArticleDetail
  isLogin!: boolean
  disabledFavorite = false

  async likeHandler (article: ArticleDetail) {
    if (!this.isLogin) {
      this.$router.push('/register')
      return
    }
    this.disabledFavorite = true
    if (article.favorited) {
      await unFavoriteArticle(article.slug)
      article.favorited = false
      article.favoritesCount--
    } else {
      await favoriteArticle(article.slug)
      article.favorited = true
      article.favoritesCount++
    }
    this.disabledFavorite = false
  }

  render () {
    const { article, disabledFavorite } = this
    return (
      <div class="article-preview">
        <div class="article-meta">
          <router-link to={{
            name: 'profile',
            params: {
              username: article.author.username
            }
          }}>
            {
              article.author.image ? <img src={ article.author.image } /> :
                <img />
            }
          </router-link>
          <div class="info">
            <router-link class="author"
              to={{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }}>
              { article.author.username }
            </router-link>
            <span class="date">{ dateFormat(article.createdAt, 'MMMM D, YYYY') }</span>
          </div>
          <button
            class={
              `btn btn-outline-primary btn-sm pull-xs-right ${article.favorited ? 'active' : ''}`
            }
            disabled={ disabledFavorite }
            onClick={ () => { this.likeHandler(article) } }>
            <i class="ion-heart"></i> { article.favoritesCount }
          </button>
        </div>
        <router-link to={{
          name: 'article',
          params: {
            slug: article.slug
          }
        }} class="preview-link">
          <h1>{ article.title }</h1>
          <p>{ article.description }</p>
          <span>Read more...</span>
          <ul class="tag-list">
            {
              article.tagList.map(tag => (
                <li key = { tag }
                  class="tag-default tag-pill tag-outline">
                  { tag }
                </li>
              ))
            }
          </ul>
        </router-link>
      </div>
    )
  }
}
