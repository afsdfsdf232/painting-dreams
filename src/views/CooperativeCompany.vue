<template>
  <div class="cooperative-company-container">
    <div class="filtter-box">
      <div class="left-filter">
        <div class="painter">
          <div class="item active">全部公司</div>
        </div>
        <div class="2d-painter">
          <div class="item">合作中公司</div>
        </div>
        <div class="2d-painter">
          <div class="item">待合作公司</div>
        </div>
      </div>
      <div class="right-filter">
        <el-button size="large" :icon="CirclePlus">添加公司 </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CirclePlus } from '@element-plus/icons-vue'

export default defineComponent({
  setup () {
    return {
      CirclePlus
    }
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
