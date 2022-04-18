<template>
  <div class="receipt-container">
    <div class="filtter-content d-flex d-f-row-bet">
      <div class="filtter-content-left d-flex">
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
      <div class="filtter-content-right">
        <d-add text="添加发票" />
      </div>
    </div>
    <!-- 表格 -->
    <div class="table-content">
      <el-table
        border
        :stripe="true"
        :height="height"
        size="large"
        :data="tableData"
        style="width: 100%"
      >
        <template v-for="(head, index) in tableHeaderData" :key="index">
          <!-- 非附件展示 -->
          <el-table-column
            v-if="head.prop !== 'file'"
            :prop="head.prop"
            :label="head.name"
            :width="head.width"
          />
          <el-table-column :label="head.name" :width="head.width" v-else>
            <template #default="scope">
              <el-button
                type="text"
                size="small"
                @click.prevent="deleteRow(scope.$index)"
              >
                点击查看大图
              </el-button>
            </template>
          </el-table-column>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, nextTick } from 'vue'
const tableHeaderData = [
  { name: '发票编号', prop: 'name', width: 100 },
  { name: '开票日期', prop: 'name', width: 100 },
  { name: '公司简介', prop: 'name', width: 120 },
  { name: '付款账号/名称', prop: 'name', width: 150 },
  { name: '包含项目', prop: 'name', width: 120 },
  { name: '阶段总价', prop: 'name', width: 120 },
  { name: '阶段单价', prop: 'name', width: 120 },
  { name: '收款状态', prop: 'name', width: 120 },
  { name: '收款账号/名称', prop: 'name', width: 150 },
  { name: '收款凭证', prop: 'file', width: 120 },
  { name: '发票扫描件', prop: 'file', width: 120 },
  { name: '备注', prop: 'name', width: 160 }
]
const tableData = ref([
  { name: '测试数据' },
  { name: '测试数据' },
  { name: '测试数据' },
  { name: '测试数据' },
  { name: '测试数据' },
  { name: '测试数据' },
  { name: '测试数据' },
  { name: '测试数据' },
  { name: '测试数据' },
  { name: '测试数据' },
  { name: '测试数据' },
  { name: '测试数据' },
  { name: '测试数据' },
  { name: '测试数据' },
  { name: '测试数据' },
  { name: '测试数据' },
  { name: '测试数据' },
  { name: '测试数据' }
])

export default defineComponent({
  setup () {
    const activeTabIndex: Ref<number> = ref(0)
    const height: Ref<number> = ref(300)
    const tabs = ref([
      { text: '所有发票', id: 0 },
      { text: '友塔', id: 1 },
      { text: '西山居', id: 2 },
      { text: '冠游', id: 3 },
      { text: '叠纸', id: 4 }
    ])

    const changeTab = (id: number): void => {
      if (activeTabIndex.value !== id) {
        activeTabIndex.value = id
      }
    }
    onMounted(() => {
      nextTick(() => {
        height.value = document.documentElement.clientHeight - 160
      })
    })

    return {
      activeTabIndex,
      changeTab,
      tabs,
      tableHeaderData,
      tableData,
      height
    }
  }
})
</script>

<style lang="less" scoped>
.receipt-container {
  box-sizing: border-box;
  .filtter-content {
    margin-bottom: 20px;
  }
}
</style>
