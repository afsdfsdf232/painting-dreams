import store from '@/store'
interface userInfoProps {
  token: string
  [key: string]: any
}

type userInfoTypes = userInfoProps | null

/**
 * @description 判断是否登录
 * @param userInfo
 * */
export const isLogin = (): boolean => {
  const userInfo: userInfoTypes = store.state.userInfo
  if (userInfo === null) return false
  return true
}
