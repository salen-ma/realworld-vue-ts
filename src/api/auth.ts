import { request } from '@/utils/request'
import { AxiosPromise } from 'axios'

export interface User {
  user: {
    username: string
    email: string
    password: string
  }
}

export interface RegisterData {
  user: {
    email: string
    token: string
    username: string
    bio: string
    image: string
  }
}

// 用户注册
export const register = (data: User): AxiosPromise<RegisterData> => {
  return request({
    method: 'post',
    url: '/users',
    data
  })
}
