import { get, post } from '@/request/axios'
import {
  HttpPromise,
  LoginRequestProps,
  LoginResponseProps,
  UserInfoProps,
  UersssyListProps,
  ManagerPostProps,
  SysUserRequestProps,
  PasswordRequestProps,
  OperatingCompanyRequestProps,
  OperatingCompanyResponseProps
} from './requestProps'
/**
 *  @description 登录-Login
 */
export const login = (
  query: LoginRequestProps
): HttpPromise<LoginResponseProps> => {
  return post('/api/login', query)
}

/**
 * @description 获取用户信息-getUserInfo
 * */
export const getUserInfo = (): HttpPromise<UserInfoProps> =>
  get('/api/getUserInfo')

/**
 * @description 后台设置-获取运营中的公司和已经注销公司列表
 * */
export const getOperatingCompanyList = (
  data: OperatingCompanyRequestProps
): HttpPromise<OperatingCompanyResponseProps> =>
  get('/api/operatingCompany/list', data)

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
): HttpPromise<SysUserRequestProps> => post('/api/sysUser/save', data)

/**
 * @description 后台人员设置-编辑后台管理人员
 */
export const updateAddSysUser = (
  data: SysUserRequestProps
): HttpPromise<SysUserRequestProps> => post('/api/sysUser/update', data)

/**
 * @description 后台人员设置-修改管理人员密码
 * */
export const updateSysUserPassword = (
  data: PasswordRequestProps
): HttpPromise<PasswordRequestProps> =>
  post('/api/sysUser/updatePassword', data)

/**
 * @description 后台人员设置-删除后台人员
 * */

export const deleteSysUser = (data: {
  id: string
}): HttpPromise<{ id: string }> => post('/api/sysUser/logicDelete', data)

/**
 * @description 【后台设置】-获取岗位列表
 * */

export const getManagerPost = (): HttpPromise<Array<ManagerPostProps>> =>
  get('/api/managePost/list')

/**
 * @description 后台人员设置-职位分工列表 /api/Pdeginosst / list
 * */
export const getDesignPost = () => get('/api/designPost/list')

/**
 * @description 后台设置-新增分工
 * */
export const designPostSave = (data: any) => post('/api/designPost/save', data)

/**
 * 后台设置-编辑职位分工
 * */
export const designPostUpdate = (data:any) => post('/api/designPost/update', data)

/**
 * @description 后台设置-删除新增分工
 * */
export const designPostDelete = (id: string) => post('/api/designPost/logicDelete', { id })

/**
 * @description 后台设置-新增运营公司
 * */
export const operatingCompanySave = (data: any) => post('/api/operatingCompany/save', data)

/**
 * @description 后台设置-编辑运营公司
 * */
export const operatingCompanyUpdate = (data: any) => post('/api/operatingCompany/update', data)

/**
 * @description 后台设置-删除运营公司
 * */
export const operatingCompanyDelete = (id: string) => post('/api/operatingCompany/logicDelete', { id })
