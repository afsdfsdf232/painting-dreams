<template>
  <div class="all-items-container">
    <div class="filtter-box">
      <div class="left-filter">
        <div class="year">
          <el-date-picker
            v-model="year"
            type="datetime"
            size="large"
            placeholder="请选择时间"
          />
        </div>
        <div class="month">
          <el-select
            v-model="month"
            clearable
            style="width: 160px"
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
        <div class="painter">
          <el-select
            v-model="painterName"
            style="width: 160px"
            clearable
            placeholder="请选择负责人"
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
        <div class="2d-painter">
          <el-select
            v-model="painterName"
            clearable
            style="width: 160px"
            placeholder="请选择金额范围"
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
        <div class="2d-painter">
          <el-select
            v-model="painterName"
            clearable
            style="width: 160px"
            placeholder="请选择状态"
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
        <el-button size="large" :icon="CirclePlus">添加项目</el-button>
        <el-popover
          placement="left"
          title="Title"
          :width="200"
          size="large"
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
import { CirclePlus } from '@element-plus/icons-vue'

export default defineComponent({
  setup () {
    const year = ref('')
    const month = ref('')
    const painterName = ref('')
    return {
      year,
      month,
      painterName,
      CirclePlus
    }
  }
})
</script>

<style lang="less" scoped>
.all-items-container {
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
