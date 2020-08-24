import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import ArticleItem from '../src/components/article-item'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe('ArticleItem.tsx', () => {
  test('renders props when passed', () => {
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
        isLogin: false
      }
    })
    expect(wrapper.text()).toMatch(article.title)
  })
})
