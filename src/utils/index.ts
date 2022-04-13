import store from '@/store'
import router from '@/router'
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

/**
 * @description 退出登录，清除数据
 * */
export const logOut = async (): Promise<any> => {
  // 清除store数据
  await store.commit('REMOVE_STROE', ['userInfo'])
  await router.replace('/login')
}
