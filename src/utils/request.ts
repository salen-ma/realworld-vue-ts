import axios from 'axios'
import Cookie from 'js-cookie'
import { User } from '@/api/user'

const userString = Cookie.get('user')
let user: User = null
try {
  user = JSON.parse(userString as string)
} catch (err) {}

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (user && user.token) {
    config.headers.Authorization = `Token ${user.token}`
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
