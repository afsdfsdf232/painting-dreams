/*
 * @Description:
 * @Author: Author
 * @Date: 2022-06-13 16:44:32
 * @LastEditTime: 2022-06-13 18:07:28
 * @LastEditors: Author
 */
import store from '@/store/index'
// 指令-控制按钮权限
export default (app: any) => {
  app.directive('permission', {
    mounted (el: any, options: any) {
      let permission: any = [] // 可控权限列表
      const userInfo: any = (store as any).state.userInfo
      const metaValue: any = (store as any).state.metaValue

      if (userInfo.permission && userInfo.permission.length > 0) {
        try {
          permission = JSON.parse(userInfo.permission)
        } catch (err) {
          permission = []
        }
      }

      if (options.value === 'edit') {
        // 编辑按钮
        const index = permission.findIndex(
          (item: any) => item === `${metaValue}-edit`
        )
        if (index > -1) {
          // 有按钮
          el.style.display = 'block'
        } else {
          el.style.display = 'none'
        }
      } else if (options.value === 'add') {
        // 新增按钮
        const index = permission.findIndex(
          (item: any) => item === `${metaValue}-add`
        )
        if (index > -1) {
          // 有按钮
          el.style.display = 'block'
        } else {
          el.style.display = 'none'
        }
      } else if (options.value === 'delete') {
        // 删除按钮
        const index = permission.findIndex(
          (item: any) => item === `${metaValue}-delete`
        )
        if (index > -1) {
          // 有按钮
          el.style.display = 'block'
        } else {
          el.style.display = 'none'
        }
      }
    }
  })
}
