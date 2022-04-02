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
import { defineComponent, ref, Ref } from 'vue'
import Header from './components/Header.vue'
import SideBar from './components/SideBar.vue'
export default defineComponent({
  components: {
    'main-header': Header,
    'side-bar': SideBar
  },
  setup () {
    const page: Ref<number> = ref(1)
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
    overflow: hidden;
    // margin: 0 20px 0 0;
    .main {
      height: calc(100vh - 80px);
      width: calc(100vw - 240px);
      overflow: auto;
      box-sizing: border-box;
      padding: 13px 20px 0 20px;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 10px;
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
