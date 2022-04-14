<template>
  <div class="cooperative-company-container">
    <div class="filter-header d-flex d-f-row-bet">
      <div class="filter-left"></div>
      <div class="filter-right">
        <d-add text="添加公司" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  }
})
</script>

<style lang="less" scoped>
.cooperative-company-container {
  .filtter-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left-filter {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      .item {
        width: 140px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        color: rgba(16, 16, 16, 100);
        border-radius: 6px;
        background-color: rgba(243, 245, 248, 100);
        cursor: pointer;
      }
      .active {
        background-color: #e0e7ec;
      }
      & > div {
        margin-right: 10px;
      }
    }
    .right-filter {
      display: flex;
    }
  }
}
</style>
