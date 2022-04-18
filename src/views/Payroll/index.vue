<template>
  <div class="payroll-container">
    <div class="header-filter d-flex d-f-row-bet">
      <div class="header-filter-left d-flex d-f-col-center">
        <el-date-picker type="month" placeholder="请选择年月" />
        <div class="month-data d-flex d-f-col-center d-f-row-center">
          <i class="iconfont d-tishi"></i>

          <span>该月未更新 </span>
        </div>
      </div>
      <div class="header-filter-right">
        <d-add @click="addPayrollModal = true" text="新增工资表" />

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
    <!-- 表格 -->
    <div class="table-content">
      <el-table
        border
        :stripe="true"
        :height="height"
        :data="tableData"
        :cell-style="setCellStyle"
        style="width: 100%"
      >
        <template v-for="(head, index) in tableHeaderData" :key="index">
          <el-table-column
            :prop="head.prop"
            :label="head.name"
            :width="head.width"
          />
        </template>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default>
            <el-button type="text" size="small" @click="handleClick"
              >编辑</el-button
            >
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增工资表弹窗 -->
    <el-drawer
      size="50%"
      v-model="addPayrollModal"
      title="新增工资表"
      :with-header="true"
    >
      <template #title>
        <p class="t-c t-main-color f20">新增工资表</p>
      </template>
      <div class="drawer-content d-flex d-f-row-bet">
        <div class="drawer-content-left">
          <el-form size="large" :model="form" label-width="110px">
            <el-form-item label="姓名">
              <el-input placeholder="请输入姓名" v-model="form.name" />
            </el-form-item>
            <el-form-item label="入职时间">
              <el-date-picker
                v-model="form.name"
                type="dates"
                placeholder="请选择入职时间"
              />
            </el-form-item>
            <el-form-item label="计薪基数">
              <el-input placeholder="请输入计薪基数" v-model="form.name" />
            </el-form-item>
            <el-form-item label="基本工资">
              <el-input placeholder="请输入基本工资" v-model="form.name" />
            </el-form-item>
            <el-form-item label="全勤">
              <el-input placeholder="请输入全勤" v-model="form.name" />
            </el-form-item>
            <el-form-item label="考勤扣款">
              <el-input placeholder="请输入考勤扣款" v-model="form.name" />
            </el-form-item>
            <el-form-item label="养老保险">
              <el-input placeholder="请输入养老保险" v-model="form.name" />
            </el-form-item>
            <el-form-item label="失业保险">
              <el-input placeholder="请输入失业保险" v-model="form.name" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                placeholder="请输入备注"
                v-model="form.name"
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="drawer-content-right">
          <el-form size="large" :model="form" label-width="100px">
            <el-form-item label="职位">
              <el-select
                style="width: 100%"
                v-model="form.region"
                placeholder="请选择职位"
              >
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>

            <el-form-item label="出勤天数">
              <el-input placeholder="请输入出勤天数" v-model="form.name" />
            </el-form-item>
            <el-form-item label="状态">
              <el-select
                style="width: 100%"
                v-model="form.region"
                placeholder="请选择职位"
              >
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="加班/绩效">
              <el-input placeholder="请输入加班/绩效" v-model="form.name" />
            </el-form-item>
            <el-form-item label="实际应付">
              <el-input placeholder="请输入实际应付" v-model="form.name" />
            </el-form-item>
            <el-form-item label="应发工资">
              <el-input placeholder="请输入应发工资" v-model="form.name" />
            </el-form-item>
            <el-form-item label="医疗保险">
              <el-input placeholder="请输入医疗保险" v-model="form.name" />
            </el-form-item>
            <el-form-item label="公积金">
              <el-input
                placeholder="请输入公积金
"
                v-model="form.name"
              />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <template #footer>
        <div class="t-c">
          <el-button
            class="btn"
            type="primary"
            style="width: 200px"
            size="large"
            @click="addCompanyModal = false"
            >保存</el-button
          >
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, Ref, onMounted, nextTick } from 'vue'
const tableHeaderData = [
  { name: '姓名', prop: 'name' },
  { name: '职位', prop: 'name' },
  { name: '入职时间', prop: 'name', width: 100 },
  { name: '出勤天数', prop: 'name', width: 100 },
  { name: '计薪基数', prop: 'name', width: 100 },
  { name: '状态', prop: 'num' },
  { name: '基本工资', prop: 'name', width: 100 },
  { name: '加班/绩效', prop: 'name', width: 100 },
  { name: '全勤', prop: 'name' },
  { name: '实际应付', prop: 'name', width: 100 },
  { name: '考勤扣款', prop: 'name', width: 100 },
  { name: '应发工资', prop: 'name', width: 100 },
  { name: '养老保险', prop: 'name', width: 100 },
  { name: '医疗保险', prop: 'name', width: 100 },
  { name: '失业保险', prop: 'name', width: 100 },
  { name: '公积金', prop: 'name' },
  { name: '扣款小计', prop: 'name', width: 100 },
  { name: '应发小计', prop: 'name', width: 100 },
  { name: '个税', prop: 'name' },
  { name: '实发工资', prop: 'name', width: 100 },
  { name: '发放账号', prop: 'name', width: 100 },
  { name: '历史调薪', prop: 'name', width: 100 },
  { name: '备注', prop: 'name' }
]

export default defineComponent({
  setup () {
    const year = ref('2022')
    const month = ref('')
    const painterName = ref('')
    const addPayrollModal: Ref<boolean> = ref(false)
    const height: Ref<number> = ref(500)
    const form = reactive({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    })

    const tableData = ref([
      { name: '测试数据', num: 20 },
      { name: '测试数据', num: 20 },
      { name: '测试数据', num: 20 },
      { name: '测试数据', num: 60 },
      { name: '测试数据', num: 20 },
      { name: '测试数据', num: 90 },
      { name: '测试数据', num: 20 },
      { name: '测试数据', num: 20 },
      { name: '测试数据', num: 50 },
      { name: '测试数据', num: 70 },
      { name: '测试数据', num: 90 },
      { name: '测试数据', num: 60 },
      { name: '测试数据', num: 20 },
      { name: '测试数据', num: 20 },
      { name: '测试数据', num: 90 },
      { name: '测试数据', num: 90 },
      { name: '测试数据', num: 90 },
      { name: '测试数据', num: 20 }
    ])
    onMounted(() => {
      nextTick(() => {
        height.value = document.documentElement.clientHeight - 180
      })
    })
    const setCellStyle = ({
      row,
      column
    }: {
      row: any
      column: any
      rowIndex: number
      columnIndex: number
    }) => {
      if (column.property === 'num') {
        // 及格 不及格 优秀
        const backgroundObj = {
          0: '#C0C7CC',
          1: '#E0E7EC',
          2: '#F3F5F8'
        }
        const state = row.num >= 90 ? 2 : row.num >= 60 ? 1 : 0
        return {
          backgroundColor: backgroundObj[state],
          borderBottom: backgroundObj[state]
        }
      }
    }
    return {
      year,
      month,
      painterName,
      tableHeaderData,
      tableData,
      height,
      setCellStyle,
      addPayrollModal,
      form
    }
  }
})
</script>

<style lang="less" scoped>
.payroll-container {
  .header-filter {
    margin-bottom: 20px;
    .month-data {
      position: relative;
      margin-left: 20px;
      width: 144px;
      height: 40px;
      border-radius: 6px;
      background-color: rgba(192, 199, 204, 100);
      color: rgba(16, 16, 16, 100);
      font-size: 14px;
      text-align: center;
      .d-tishi {
        font-size: 24px;
        margin-right: 8px;
      }
      &::after {
        position: absolute;
        left: -10px;
        display: inline-block;
        content: '';
        height: 0px;
        width: 0px;
        border-top: 15px solid transparent;
        border-right: 15px solid #c0c7cc;
        border-bottom: 15px solid transparent;
        border-radius: 10px;
      }
    }
  }
  .drawer-content {
    width: 100%;
    &-left {
      width: 50%;
      margin-right: 20px;
    }
    &-right {
      width: 50%;
    }
  }
  &:deep(.el-drawer__body) {
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 10px;
      /*高宽分别对应横竖滚动条的尺寸*/
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
</style>
