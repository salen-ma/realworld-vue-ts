import Vue from 'vue'
import Component from 'vue-class-component'
import {
  ArticleDetail,
} from '@/api/article'
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
    }
  }
})

@Component
export default class ArticleMeta extends ArticleMetaProps {
  article!: ArticleDetail
  user!: User

  render () {
    const { article, user } = this
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
            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-plus-round"></i> &nbsp;
              Follow { article.author.username }
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-primary">
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
              class="btn btn-outline-danger btn-sm">
              <i class="ion-trash-a"></i> Delete Article
            </button>
          </div>
        }
      </div>
    )
  }
}
