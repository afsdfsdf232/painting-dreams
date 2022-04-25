export interface AxiosResponse<T> {
  code: number
  data: T
  msg?: string
}

export type HttpPromise<T = any> = Promise<AxiosResponse<T>>

export interface LoginRequestProps {
  account: string
  password: string
}

export interface LoginResponseProps {
  token?: string
}

export interface UserInfoProps {
  managePostName: string
  name: string
  permission: string
  phone: string
  type: number
}

export interface UersssyListItemProps {
  createTime: string
  id: string | number
  managePostId: string | number
  managePostName: string
  name: string
  percentagePoints: string
  phone: string
  status: string | number
}
export interface UersssyListProps {
  list: Array<UersssyListItemProps>
  total?: number
}

export interface ManagerPostProps {
  id: number | string
  name: string
  percentagePoints: string
  permission: string
}

export interface SysUserRequestProps {
  id: string | number
  managePostId: string
  name: string
  password: string
  phone: string
}
