import Vue from 'vue'
import Component from 'vue-class-component'
import {
  ArticleDetail,
} from '@/api/article'

const ArticleMetaProps = Vue.extend({
  props: {
    article: {
      type: Object,
      required: true,
      default: function () {
        return {}
      }
    }
  }
})

@Component
export default class ArticleMeta extends ArticleMetaProps {
  article!: ArticleDetail
  isLogin!: boolean

  render () {
    const { article } = this
    return (
      <div class="article-meta">
        <a href="">
          {article.author.image ? <img src={ article.author.image } /> : <img />}
        </a>
        <div class="info">
          <a href="" class="author">{ article.author.username }</a>
          <span class="date">{ article.createdAt }</span>
        </div>
        <button class="btn btn-sm btn-outline-secondary">
          <i class="ion-plus-round"></i> &nbsp;
          Follow { article.author.username }
        </button>
        &nbsp;&nbsp;
        <button class="btn btn-sm btn-outline-primary">
          <i class="ion-heart"></i> &nbsp;
          Favorite Post <span class="counter">{ article.favoritesCount }</span>
        </button>
      </div>
    )
  }
}
