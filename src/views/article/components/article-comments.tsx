import Vue from 'vue'
import Component from 'vue-class-component'
import { ArticleDetail } from '@/api/article'
import { User } from '@/api/user'

const ArticleCommentsProps = Vue.extend({
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
export default class ArticleComments extends ArticleCommentsProps {
  article!: ArticleDetail
  user!: User

  render () {
    const { user } = this
    return (
      <div class="col-xs-12 col-md-8 offset-md-2">

        {user &&
          <form class="card comment-form">
            <div class="card-block">
              <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="card-footer">
              {user.image ? <img src={ user.image } class="comment-author-img" /> : <img class="comment-author-img"/>}
              <button class="btn btn-sm btn-primary"> Post Comment </button>
            </div>
          </form>
        }

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
    )
  }
}
