<!--
 * @Description:
 * @Author: Author
 * @Date: 2022-03-31 09:41:23
 * @LastEditTime: 2022-06-13 18:01:19
 * @LastEditors: Author
-->
<template>
  <div class="layout-cointainer">
    <div class="main-header">
      <main-header />
    </div>
    <div class="main-content">
      <div class="main-side-bar">
        <side-bar />
      </div>
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Header from './components/Header.vue'
import SideBar from './components/SideBar.vue'
export default defineComponent({
  components: {
    'main-header': Header,
    'side-bar': SideBar
  },
  setup () {
    const page: Ref<number> = ref(1)
    const route = computed(() => useRoute())
    const store = useStore()
    watchEffect(() => {
      if (route.value.meta.permission) {
        store.commit('SET_META_VALUE', route.value.meta.permission)
      }
    })
    return {
      page
    }
  }
})
</script>

<style lang="less" scoped>
.layout-cointainer {
  background-color: #fff;
  .main-content {
    display: flex;
    flex-wrap: nowrap;
    flex-shrink: 0;
    .main {
      height: calc(100vh - 80px);
      width: calc(100vw - 240px);
      overflow: auto;
      box-sizing: border-box;
      padding: 13px 20px 0 20px;
      flex-shrink: 0;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 15px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background-color: #c0c7cc;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background-color: #ededed;
      }
    }
  }
}
</style>
