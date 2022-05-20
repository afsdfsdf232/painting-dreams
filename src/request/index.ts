import { get, post, upload } from '@/request/axios'
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
 * @description 后台设置-人员列表
 * */
export const getSysUserList = (data: any) => get('/api/sysUser/list', data)

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

/**
 * @description 管理成本-固定成本列表
 * */
export const getFixedCostsList = (data: any) => get('/api/fixedCosts/list', data)

/**
 * @description 管理成本-管理员成本列表
 * */
export const getManagerCostsList = (data: any) => get('/api/managerCosts/list', { ...data })

/**
 * @description 管理人员成本-新增
 * */
export const saveManagerCosts = (data: any) => post('/api/managerCosts/save', data)

/**
 * @description 管理人员成本-删除
 * */
export const logicDeleteManagerCosts = (id: string) => post('/api/managerCosts/logicDelete', { id })

/**
 * @description 管理人员成本-编辑
 * */
export const updateManagerCosts = (data: any) => post('/api/managerCosts/update', data)
/**
 * @description 管理成本-报销列表
 * */
export const getReimbursementCostsList = (data: any) => get('/api/reimbursementCosts/list', data)

/**
 * @description 管理成本-新增报销
 * */
export const reimbursementCostsSave = (data: any) => post('/api/reimbursementCosts/save', data)

/**
 * @description 管理成本-编辑报销
 * */
export const reimbursementCostsUpdate = (data: any) => post('/api/reimbursementCosts/update', data)

/**
 * @description 管理成本-报销累计
 * */
export const getThisMonthReimbursementCosts = (data: any) => get('/api/reimbursementCosts/thisMonthReimbursementCosts', data)
/**
 * @description 管理成本-删除报销
 * */
export const logicDeleteReimbursementCosts = (id: string) => post('/api/reimbursementCosts/logicDelete', { id })

/**
 *  @description common-文件上传
 * */
export const uploadFileRequest = (data: any) => upload('/api/common/upload', data)

/**
 * @description 合作甲方公司信息
 * */
export const getPartyACompanyList = (data: any) => get('/api/partyACompany/list', data)
