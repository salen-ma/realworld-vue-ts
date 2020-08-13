import { request } from '@/utils/request'
import { AxiosPromise } from 'axios'

export interface UserParams {
  user: {
    username?: string
    email: string
    password: string
  }
}

export interface User {
  email: string
  token: string
  username: string
  bio: string
  image: string
  createdAt: string
  id: number
}

export interface UserResponse {
  user: User
}

// 用户注册
export const register = (data: UserParams): AxiosPromise<UserResponse> => {
  return request({
    method: 'post',
    url: '/api/users',
    data
  })
}

// 用户登录
export const login = (data: UserParams): AxiosPromise<UserResponse> => {
  return request({
    method: 'post',
    url: '/api/users/login',
    data
  })
}
