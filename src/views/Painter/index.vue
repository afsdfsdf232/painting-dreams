<template>
  <div class="painter-container">
    <div class="fillter-content d-flex d-f-row-bet">
      <div class="fillter-content-left d-flex">
        <el-date-picker
          style="margin-right: 10px"
          type="month"
          placeholder="请选择年月"
        />
        <d-tab
          v-for="tab in tabs"
          :key="tab.id"
          :text="tab.text"
          :mr="10"
          :active="tab.id === activeTabIndex"
          @click="changeTab(tab.id)"
        />
      </div>
      <div class="fillter-content-right"></div>
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

        <!-- <vxe-column field="key" title="Key"></vxe-column>
        <vxe-column field="content" title="Translate"></vxe-column>
        <vxe-column field="language" title="Language"></vxe-column> -->
      </vxe-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, reactive, onMounted, nextTick } from 'vue'
import { VxeTablePropTypes } from 'vxe-table'
const tableHeaderData = [
  { name: '画师', prop: 'name', width: 100 },
  { name: '职位', prop: 'zw', width: 100 },
  { name: '公司-项目', prop: 'gs', width: 120 },
  { name: '缩略图', prop: 'img', width: 120 },
  { name: '分工', prop: 'fg', width: 120 },
  { name: '开始时间', prop: 'startdate', width: 120 },
  { name: '结束时间', prop: 'enddate', width: 120 },
  { name: '状态', prop: 'state', width: 120 },
  { name: '工作量（天）', prop: 'count', width: 120 },
  { name: '外发价格', prop: 'price', width: 120 },
  { name: '完成量', prop: 'endcount', width: 120 },
  { name: '备注/效率指数', prop: 'bz', width: 160 }
]

export default defineComponent({
  setup () {
    const activeTabIndex: Ref<number> = ref(0)
    const height: Ref<number> = ref(300)
    const tabs = ref([
      { text: '全部画师', id: 0 },
      { text: 'UI组', id: 1 },
      { text: '场景原画组', id: 2 },
      { text: '3D建模组', id: 3 },
      { text: '次世代建模组', id: 4 },
      { text: '角色原画组', id: 5 }
    ])
    const demo3 = reactive({
      tableData: [{}]
    })

    // 通用行合并函数（将相同多列数据合并为一行）
    const mergeRowMethod: VxeTablePropTypes.SpanMethod = ({
      row,
      _rowIndex,
      column,
      visibleData
    }) => {
      const fields = ['key']
      const cellValue = row[column.property]
      if (cellValue && fields.includes(column.property)) {
        const prevRow = visibleData[_rowIndex - 1]
        let nextRow = visibleData[_rowIndex + 1]
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 }
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

    const changeTab = (id: number): void => {
      if (id !== activeTabIndex.value) {
        activeTabIndex.value = id
      }
    }
    onMounted(() => {
      nextTick(() => {
        height.value = document.documentElement.clientHeight - 160
      })
    })

    return {
      tabs,
      activeTabIndex,
      changeTab,
      demo3,
      mergeRowMethod,
      height,
      tableHeaderData
    }
  }
})
</script>

<style lang="less" scoped>
.painter-container {
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
</style>
