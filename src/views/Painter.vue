<template>
  <div class="painter-container">
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
          <div class="item active">查看全部</div>
        </div>
        <div class="2d-painter">
          <div class="item">角色原画组</div>
        </div>
        <div class="2d-painter">
          <div class="item">UI组</div>
        </div>
        <div class="2d-painter">
          <div class="item">场景原画组</div>
        </div>
        <div class="2d-painter">
          <div class="item">3D建模组</div>
        </div>
        <div class="2d-painter">
          <div class="item">次世代建模组</div>
        </div>
      </div>
      <div class="right-filter">
        <el-popover
          placement="left"
          title="Title"
          :width="200"
          trigger="hover"
          content="this is content, this is content, this is content"
        >
          <template #reference>
            <el-button size="large">颜色状态说明</el-button>
          </template>
        </el-popover>
        <div style="width: 20px; height: 1px"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    const year = ref('2022')
    const month = ref('')
    const painterName = ref('')
    return {
      year,
      month,
      painterName
    }
  }
})
</script>

<style lang="less" scoped>
.painter-container {
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
