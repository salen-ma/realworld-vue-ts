import Vue from 'vue'
import Component from 'vue-class-component'
import { ArticleDetail, getArticleDetail, createArticle, updateArticle } from '@/api/article'

@Component
export default class Editor extends Vue {
  article: ArticleDetail = {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
  }
  tagIpt = ''
  disabledPublish = false

  async mounted () {
    if (this.$route.params.slug) {
      const { data } = await getArticleDetail(this.$route.params.slug)
      const { article } = data
      for (const key in this.article) {
        this.article[key] = article[key]
      }
    }
  }

  addTag (e: KeyboardEvent) {
    if (e.keyCode === 13) {
      if (!this.tagIpt.trim()) {
        return
      }
      if (this.article.tagList.some(tag => tag === this.tagIpt)) {
        return
      }
      if (this.article.tagList.length >= 6) {
        alert('No more than six labels')
        return
      }

      this.article.tagList.push(this.tagIpt)
      this.tagIpt = ''
    }
  }

  removeTag (tag: string) {
    this.article.tagList = this.article.tagList.filter(hasTag => hasTag !== tag)
  }

  async publishArticle () {
    this.disabledPublish = true
    const { data } = !this.article.slug ?
      await createArticle({ article: this.article }) :
      await updateArticle({ article: this.article }, this.article.slug)
    this.$router.push(`/article/${data.article.slug}`)
  }

  render () {
    const { article, disabledPublish } = this

    return (
      <div class="editor-page">
        <div class="container page">
          <div class="row">

            <div class="col-md-10 offset-md-1 col-xs-12">
              <form>
                <fieldset>
                  <fieldset class="form-group">
                    <input v-model = { article.title }
                      type="text" class="form-control form-control-lg" placeholder="Article Title" />
                  </fieldset>
                  <fieldset class="form-group">
                    <input v-model = { article.description }
                      type="text" class="form-control" placeholder="What's this article about?" />
                  </fieldset>
                  <fieldset class="form-group">
                    <textarea v-model = { article.body }
                      class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
                  </fieldset>
                  <fieldset class="form-group">
                    <input v-model = { this.tagIpt }
                      onKeyup = { this.addTag }
                      type="text" class="form-control" placeholder="Enter tags" /><div class="tag-list"></div>
                  </fieldset>
                  <div class="tag-list">
                    {
                      article.tagList.map(tag =>
                        <span key = { tag }
                          class="tag-default tag-pill">
                          <i class="ion-close-round"
                            onClick = { () => { this.removeTag(tag) } }></i>
                          { tag }
                        </span>
                      )
                    }
                  </div>
                  <button disabled = { disabledPublish }
                    onClick = { this.publishArticle }
                    class="btn btn-lg pull-xs-right btn-primary" type="button">
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
