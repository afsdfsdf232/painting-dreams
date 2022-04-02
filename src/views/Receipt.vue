<template>
  <div class="receipt-container">
    <div class="filtter-box">
      <div class="left-filter">
        <div class="year">
          <el-date-picker
            size="large"
            v-model="year"
            type="year"
            placeholder="请选择年份"
          />
        </div>
        <div class="month">
          <el-select
            v-model="month"
            clearable
            placeholder="请选择月份"
            size="large"
          >
            <el-option
              v-for="item in 12"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <div class="painter">
          <div class="item active">所有发票</div>
        </div>
        <div class="2d-painter">
          <div class="item">有塔</div>
        </div>
        <div class="2d-painter">
          <div class="item">西山居</div>
        </div>
        <div class="2d-painter">
          <div class="item">冠游</div>
        </div>
        <div class="2d-painter">
          <div class="item">叠纸</div>
        </div>
      </div>
      <div class="right-filter">
        <el-button size="large" :icon="CirclePlus">添加发票</el-button>

        <div style="width: 20px; height: 1px"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CirclePlus } from '@element-plus/icons-vue'

export default defineComponent({
  setup () {
    const year = ref('2022')
    const month = ref('')
    const painterName = ref('')
    return {
      CirclePlus,
      year,
      month,
      painterName
    }
  }
})
</script>

<style lang="less" scoped>
.receipt-container {
  box-sizing: border-box;
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
