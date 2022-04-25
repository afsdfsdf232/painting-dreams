import { get, post } from '@/request/axios'
import {
  HttpPromise,
  LoginRequestProps,
  LoginResponseProps,
  UserInfoProps,
  UersssyListProps,
  ManagerPostProps,
  SysUserRequestProps
} from './requestProps'
/**
 *  @description 登录-Login
 */
export const login = (
  query: LoginRequestProps
): HttpPromise<LoginResponseProps> => {
  return post('/api/login', Object.assign({}, query, { json: true }))
}

/**
 * @description 获取用户信息-getUserInfo
 * */
export const getUserInfo = (): HttpPromise<UserInfoProps> =>
  get('/api/getUserInfo')

/**
 * @description 后台设置-获取后台人员列表
 * */
export const getSysUser = (): HttpPromise<UersssyListProps> =>
  get('/api/sysUser/list')

/**
 * @description 后台设置-新增后台管理人员
 * */
export const addAddSysUser = (
  data: SysUserRequestProps
): HttpPromise<SysUserRequestProps> => post('/api/sysUser/save', Object.assign({}, { json: true }, data))

/**
 * @description 【后台设置】-获取岗位列表
 * */

export const getManagerPost = (): HttpPromise<Array<ManagerPostProps>> =>
  get('/api/managePost/list')
