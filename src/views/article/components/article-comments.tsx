import Vue from 'vue'
import Component from 'vue-class-component'
import { User } from '@/api/user'
import { dateFormat } from '@/utils'
import { CommentDetail, getComments, addComment, delComment } from '@/api/article'
import router from '@/router'

const ArticleCommentsProps = Vue.extend({
  props: {
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
  user!: User
  comments: CommentDetail[] = []
  commentIpt = ''
  disabledAdd = false

  async mounted () {
    const { data } = await getComments(this.$route.params.slug)
    this.comments = data.comments
  }

  onInput (e: Event) {
    this.commentIpt = (e.target as HTMLTextAreaElement).value
  }

  async addCommentHandler () {
    if (!this.commentIpt.trim()) {
      return
    }

    this.disabledAdd = true
    const { data } = await addComment(
      {
        comment: {
          body: this.commentIpt
        }
      },
      this.$route.params.slug
    )
    this.comments.unshift(data.comment)
    this.commentIpt = ''
    this.disabledAdd = false
  }

  async delCommentHandler (id: number) {
    await delComment(this.$route.params.slug, id)
    this.comments = this.comments.filter(comment => comment.id !== id)
  }

  render () {
    const { user, comments, disabledAdd, commentIpt } = this
    return (
      <div class="col-xs-12 col-md-8 offset-md-2">

        {user ?
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                onInput = { this.onInput }
                class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="card-footer">
              {user.image ? <img src={ user.image } class="comment-author-img" /> : <img class="comment-author-img"/>}
              <button class="btn btn-sm btn-primary"
                disabled = { disabledAdd }
                onClick = { this.addCommentHandler } > Post Comment </button>
            </div>
          </form> :
          <p v-else style="display: inherit;">
            <router-link to="/login">Sign in</router-link>
            or
            <router-link to="/register">sign up</router-link>
            to add comments on this article.
          </p>
        }

        {
          comments.map(comment => (
            <div class="card"
              key = {comment.id}>
              <div class="card-block">
                <p class="card-text">{ comment.body }</p>
              </div>
              <div class="card-footer">
                <router-link class="comment-author"
                  to={{
                    name: 'profile',
                    params: {
                      username: comment.author.username
                    }
                  }}>
                  {
                    comment.author.image ?
                      <img src={ comment.author.image } class="comment-author-img" /> :
                      <img class="comment-author-img"/>
                  }
                </router-link>
                &nbsp;
                <router-link class="comment-author"
                  to={{
                    name: 'profile',
                    params: {
                      username: comment.author.username
                    }
                  }}>{ comment.author.username }</router-link>
                <span class="date-posted">{ dateFormat(comment.createdAt, 'MMMM D, YYYY') }</span>
                {user && comment.author.username === user.username &&
                  <span
                    onClick = { () => { this.delCommentHandler(comment.id) } }
                    class="mod-options">
                    <i class="ion-trash-a"></i>
                  </span>
                }
              </div>
            </div>)
          )
        }

      </div>
    )
  }
}
