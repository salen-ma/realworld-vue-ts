import { request } from '@/utils/request'
import { AxiosPromise } from 'axios'
import { Author } from './article'

interface ProfileResponse {
  profile: Author
}

// 获取用户信息
export const getProfile = (username: string): AxiosPromise<ProfileResponse> => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`
  })
}

// 关注用户
export const followUser = (username: string) => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`
  })
}

// 取消关注用户
export const unFollowUser = (username: string) => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`
  })
}
