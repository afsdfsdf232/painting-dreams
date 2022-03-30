<template>
  <div class="layout-cointainer">
    <div class="main-header">
      <main-header />
    </div>
    <div class="main-content">
      <div class="main-side-bar">
        <side-bar />
      </div>
      <div class="main"><router-view /></div>
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
    margin-top: 13px;
    display: flex;
    flex-wrap: nowrap;
  }
}
</style>
