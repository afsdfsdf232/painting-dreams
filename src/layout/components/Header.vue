<template>
  <div class="header-content">
    <div class="side-bar">LOGO</div>
    <div class="main-header">
      <div class="left">{{ title }}</div>
      <div class="user-info">
        <el-avatar :size="40" :src="circleUrl" />
        <span class="name">张小红</span>
        <div class="line"></div>
        <div class="logout">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  setup () {
    const circleUrl =
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    const route = useRoute()
    const title = computed(() => route.meta.title)
    return {
      title,
      circleUrl
    }
  }
})
</script>

<style lang="less" scoped>
.header-content {
  width: 100vw;
  height: 80px;
  display: flex;
  align-items: center;
  background-color: rgba(243, 245, 248, 100);
  .side-bar {
    width: 240px;
    text-align: center;
    line-height: 80px;
    font-size: 26px;
    font-weight: bold;
    color: #101010;
    background-color: #e0e7ec;
  }
  .main-header {
    width: calc(100% - 240px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 20px;
    .left {
      color: #101010;
      font-size: 22px;
      text-align: left;
    }
    .user-info {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .name {
        color: rgba(16, 16, 16, 100);
        font-size: 16px;
        margin-left: 19px;
      }
      .line {
        margin: 0 34px;
        width: 1px;
        height: 30px;
        background-color: #9cbbbbbb;
      }
      .logout {
        color: rgba(16, 16, 16, 100);
        font-size: 16px;
        cursor: pointer;
      }
    }
  }
}
</style>
