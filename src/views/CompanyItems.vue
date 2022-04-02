<template>
  <div class="company-items-container">
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
          <el-select
            v-model="painterName"
            clearable
            placeholder="请选择公司"
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
.company-items-container {
  .filtter-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left-filter {
      display: flex;
      align-items: center;
      & > div {
        margin-right: 10px;
      }
    }
  }
}
</style>
