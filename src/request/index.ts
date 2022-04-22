import { get, post } from '@/request/axios'
import {
  LoginRequestProps,
  LoginResponseProps,
  UserInfoResponseProps
} from './requestProps'
/**
 *  @description 登录-Login
 */
export const login = (
  query: LoginRequestProps
): Promise<LoginResponseProps> => {
  return post('/api/login', Object.assign({}, query, { json: true }))
}

/**
 * @description 获取用户信息-getUserInfo
 * */
export const getUserInfo = (): Promise<UserInfoResponseProps> =>
  get('/api/getUserInfo')
