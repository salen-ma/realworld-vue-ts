import { request } from '@/utils/request'
import { AxiosPromise } from 'axios'

export interface GetArticleParams {
  tag?: string
  author?: string
  favorited?: string
  limit: number
  offset: number
}

interface ArticleBody {
  title: string
  description: string
  body: string
  tagList: string[]
}

interface CreateArticleData {
  article: ArticleBody
}

export interface Author {
  bio: string
  following: boolean
  image: string
  username: string
}

export interface ArticleDetail extends ArticleBody {
  author: Author
  createdAt: string
  favorited: boolean
  favoritesCount: number
  slug: string
  updatedAt?: string
}

interface ArticleListResponse {
  articlesCount: number
  articles: ArticleDetail[]
}

interface TagsResponse {
  tags: string[]
}

interface ArticleDetailResponse {
  article: ArticleDetail
}

interface CommentDetail {
  author: Author
  body: string
  createdAt: string
  id: number
  updatedAt: string
}

interface CommentsResponse {
  comments: CommentDetail[]
}

interface AddCommentData {
  comment: {
    body: string
  }
}

interface AddCommentResponse {
  comment: CommentDetail
}

// 文章列表
export const getArticles = (params: GetArticleParams): AxiosPromise<ArticleListResponse> => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 已关注文章列表
export const getFeedArticles = (params: GetArticleParams): AxiosPromise<ArticleListResponse> => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

// 文章标签列表
export const getTags = (): AxiosPromise<TagsResponse> => {
  return request({
    method: 'GET',
    url: '/api/tags'
  })
}

// 点赞文章
export const favoriteArticle = (slug: string) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消点赞文章
export const unFavoriteArticle = (slug: string) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取文章详情
export const getArticleDetail = (slug: string): AxiosPromise<ArticleDetailResponse> => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 创建文章
export const createArticle = (data: CreateArticleData) => {
  return request({
    method: 'POST',
    url: '/api/articles',
    data
  })
}

// 更新文章
export const updateArticle = (data: CreateArticleData, slug: string) => {
  return request({
    method: 'PUT',
    url: `/api/articles/${slug}`,
    data
  })
}

// 删除文章
export const delArticle = (slug: string) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`
  })
}

// 获取文章评论列表
export const getComments = (slug: string): AxiosPromise<CommentsResponse> => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

// 添加评论
export const addComment = (data: AddCommentData, slug: string): AxiosPromise<AddCommentResponse> => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data
  })
}

// 删除评论
export const delComment = (slug: string, id: number) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${id}`
  })
}
