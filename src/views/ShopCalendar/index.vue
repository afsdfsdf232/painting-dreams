<template>
  <div class="shop-calendar-container">
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
        <div class="painter">
          <el-select
            v-model="painterName"
            clearable
            placeholder="按照画师名排序"
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
            placeholder="按岗位分工筛选"
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
    <div class="mouth-select">
      <month @change="changeMonth" />
    </div>
    <my-table style="margin-bottom: 20px" />
    <my-table style="margin-bottom: 20px" />
    <my-table />
  </div>
</template>

<script lang="ts">
/**
 * @description 后台设置页面
 * 1-100% 提成点数
 * pdf 预览
 *
 */
import { defineComponent, ref } from 'vue'
import Table from './components/Table.vue'
interface monthEventProps {
  label: string
  value: number
}
export default defineComponent({
  components: {
    'my-table': Table
  },
  setup () {
    const year = ref('2022')
    const painterName = ref('')
    const changeMonth = (mouth: monthEventProps): void => {
      console.log(mouth)
    }
    return {
      changeMonth,
      year,
      painterName
    }
  }
})
</script>

<style lang="less" scoped>
.shop-calendar-container {
  width: 100%;
  .filtter-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    .left-filter {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      & > div {
        margin-right: 10px;
      }
    }
  }
}
</style>
