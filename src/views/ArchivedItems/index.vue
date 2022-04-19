<template>
  <div class="archived-items-container">
    <div class="fillter-content d-flex d-f-row-bet">
      <div class="fillter-content-left d-flex">
        <el-date-picker
          style="margin-right: 10px; width: 160px"
          type="month"
          placeholder="请选择年月"
        />
      </div>
      <div class="fillter-content-right d-flex">
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
    <div class="table-content">
      <vxe-table
        border
        :height="height"
        :column-config="{ resizable: true }"
        :scroll-y="{ enabled: true }"
        :span-method="mergeRowMethod"
        :data="demo3.tableData"
        class="reverse-table"
      >
        <template v-for="(head, index) in tableHeaderData" :key="index">
          <vxe-column :field="head.prop" :title="head.name"></vxe-column>
        </template>
      </vxe-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, reactive, onMounted, nextTick } from 'vue'
import { VxeTablePropTypes } from 'vxe-table'
const tableHeaderData = [
  { name: '编号', prop: 'name', width: 100 },
  { name: '合作公司', prop: 'zw', width: 100 },
  { name: '项目名', prop: 'gs', width: 120 },
  { name: '项目类型', prop: 'img', width: 120 },
  { name: '参考图', prop: 'fg', width: 120 },
  { name: '需求文档', prop: 'startdate', width: 120 },
  { name: '需求地址', prop: 'enddate', width: 120 },
  { name: '项目群组（甲方/设计师）', prop: 'state', width: 120 },
  { name: '分工/天', prop: 'count', width: 120 },
  { name: '总价', prop: 'price', width: 120 },
  { name: '单价', prop: 'endcount', width: 120 },
  { name: '排期', prop: 'bz', width: 160 },
  { name: '设计师', prop: 'sjs', width: 160 },
  { name: '状态', prop: 'zt', width: 160 },
  { name: '收款状态', prop: 'skzt', width: 160 },
  { name: '发票状态', prop: 'skzt', width: 160 },
  { name: '备注', prop: 'bzs', width: 160 }
]

export default defineComponent({
  setup () {
    const height: Ref<number> = ref(300)
    const demo3 = reactive({
      tableData: [
        {
          name: '画师1',
          key: 'app.label.name',
          zw: '开发',
          gs: '测试公司',
          img: '测试图片',
          fg: '分工测试1',
          startdate: '20220419',
          enddate: '20221231',
          state: '完成',
          count: 100,
          price: 1300,
          endcount: 200,
          bz: '备注内容'
        },
        {
          name: '画师1',
          key: 'app.label.name',
          zw: '开发',
          gs: '测试公司',
          img: '测试图片',
          fg: '分工测试1',
          startdate: '20220419',
          enddate: '20221231',
          state: '完成',
          count: 100,
          price: 1300,
          endcount: 200,
          bz: '备注内容'
        },
        {
          name: '画师3',
          zw: '开发',
          gs: '测试公司',
          img: '测试图片',
          fg: '分工测试1',
          startdate: '20220419',
          enddate: '20221231',
          state: '完成',
          count: 100,
          price: 1300,
          endcount: 200,
          bz: '备注内容'
        },
        {
          name: '画师4',
          zw: '开发',
          gs: '测试公司',
          img: '测试图片',
          fg: '分工测试1',
          startdate: '20220419',
          enddate: '20221231',
          state: '完成',
          count: 100,
          price: 1300,
          endcount: 200,
          bz: '备注内容'
        },
        {
          name: '画师5',
          zw: '开发',
          gs: '测试公司',
          img: '测试图片',
          fg: '分工测试1',
          startdate: '20220419',
          enddate: '20221231',
          state: '完成',
          count: 100,
          price: 1300,
          endcount: 200,
          bz: '备注内容'
        },
        {
          name: '画师6',
          zw: '开发',
          gs: '测试公司',
          img: '测试图片',
          fg: '分工测试1',
          startdate: '20220419',
          enddate: '20221231',
          state: '完成',
          count: 100,
          price: 1300,
          endcount: 200,
          bz: '备注内容'
        },
        {
          name: '画师7',
          zw: '开发',
          gs: '测试公司',
          img: '测试图片',
          fg: '分工测试1',
          startdate: '20220419',
          enddate: '20221231',
          state: '完成',
          count: 100,
          price: 1300,
          endcount: 200,
          bz: '备注内容'
        },
        {
          name: '画师8',
          zw: '开发',
          gs: '测试公司',
          img: '测试图片',
          fg: '分工测试1',
          startdate: '20220419',
          enddate: '20221231',
          state: '完成',
          count: 100,
          price: 1300,
          endcount: 200,
          bz: '备注内容'
        },
        {
          name: '画师9',
          zw: '开发',
          gs: '测试公司',
          img: '测试图片',
          fg: '分工测试1',
          startdate: '20220419',
          enddate: '20221231',
          state: '完成',
          count: 100,
          price: 1300,
          endcount: 200,
          bz: '备注内容'
        },
        {
          name: '画师10',
          zw: '开发',
          gs: '测试公司',
          img: '测试图片',
          fg: '分工测试1',
          startdate: '20220419',
          enddate: '20221231',
          state: '完成',
          count: 100,
          price: 1300,
          endcount: 200,
          bz: '备注内容'
        }
      ]
    })

    // 通用行合并函数（将相同多列数据合并为一行）
    const mergeRowMethod: VxeTablePropTypes.SpanMethod = ({
      row,
      _rowIndex,
      column,
      visibleData
    }) => {
      const fields = ['name']
      const cellValue = row[column.property]
      if (cellValue && fields.includes(column.property)) {
        const prevRow = visibleData[_rowIndex - 1]
        let nextRow = visibleData[_rowIndex + 1]
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0, row: 5 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow[column.property] === cellValue) {
            nextRow = visibleData[++countRowspan + _rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    }

    onMounted(() => {
      nextTick(() => {
        height.value = document.documentElement.clientHeight - 160
      })
    })

    return {
      demo3,
      mergeRowMethod,
      height,
      tableHeaderData
    }
  }
})
</script>

<style lang="less" scoped>
.archived-items-container {
  .fillter-content {
    margin-bottom: 20px;
  }
  /*滚动条整体部分*/
  .reverse-table ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  /*滚动条的轨道*/
  .reverse-table ::-webkit-scrollbar-track {
    background-color: #ffffff;
  }
  /*滚动条里面的小方块，能向上向下移动*/
  .reverse-table ::-webkit-scrollbar-thumb {
    background-color: #c0c4cc;
    border-radius: 5px;
    border: 1px solid #f1f1f1;
    // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  }
  .reverse-table ::-webkit-scrollbar-thumb:hover {
    background-color: #909399;
  }
  .reverse-table ::-webkit-scrollbar-thumb:active {
    background-color: #909399;
  }
  /*边角，即两个滚动条的交汇处*/
  .reverse-table ::-webkit-scrollbar-corner {
    background-color: #ffffff;
  }
}
// https://university.legym.cn/
</style>
