import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import ArticleItem from '../src/components/article-item'
jest.mock('../src/api/article', () => ({
  favoriteArticle: () => Promise.resolve(),
  unFavoriteArticle: () => Promise.resolve()
}));

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe('ArticleItem.tsx', () => {
  it('renders props when passed', async () => {
    const article = {
      title: 'Testing using Cypress',
      slug: 'testing-using-cypress-ijp2iu',
      body: 'To be continued',
      createdAt: '2020-08-24T14:54:02.589Z',
      updatedAt: '2020-08-24T14:54:02.589Z',
      tagList: [],
      description: 'Learning API',
      author: {
        username: 'earlytar@gmail.com',
        bio: null,
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        following: false
      },
      favorited: false,
      favoritesCount: 0
    }
    const wrapper = shallowMount(ArticleItem, {
      localVue,
      router,
      propsData: {
        article,
        isLogin: true
      }
    })
    expect(wrapper.text()).toMatch(article.title)
    expect(wrapper.find('span.date').element.innerHTML).toBe('August 24, 2020')

    await wrapper.find('button').trigger('click', wrapper.vm.article)
    expect(wrapper.vm.article.favorited).toBe(true)
    expect(wrapper.vm.article.favoritesCount).toBe(1)
  })
})
