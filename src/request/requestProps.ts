export interface LoginRequestProps {
  account: string
  password: string
}

export interface LoginResponseProps {
  code: number
  data: {
    token: string
  }
  msg?: string
}

export interface UserInfoProps {
  managePostName: string
  name: string
  permission: string
  phone: string
  type: number
}
export interface UserInfoResponseProps {
  code: number
  data: UserInfoProps
  msg?: string
}
