<template>
  <div class="employee-info-container">
    <div class="fillter-header-content d-flex d-f-row-bet d-f-col-center">
      <div class="fillter-header-content-left d-flex">
        <template v-for="tab in tabs" :key="tab.id">
          <d-tab
            :active="tabActiveIndex === tab.id"
            :mr="10"
            @click="changeTab(tab.id)"
            v-if="tab.id === 0"
          >
            <div class="content">
              <p class="t-c f16">{{ tab.text }}</p>
              <p class="t-c f12 t-tips-color">{{ tab.subTitle }}</p>
            </div>
          </d-tab>
          <d-tab
            :active="tabActiveIndex === tab.id"
            :text="tab.text"
            :mr="10"
            @click="changeTab(tab.id)"
            v-else
          />
        </template>
      </div>
      <div class="fillter-header-content-right">
        <d-add text="添加职员" />
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
                上传附件
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
  { name: '姓名', prop: 'name', width: 100 },
  { name: '职位', prop: 'name', width: 100 },
  { name: '提成比例', prop: 'name', width: 120 },
  { name: '身份证', prop: 'name', width: 120 },
  { name: '联系方式', prop: 'name', width: 120 },
  { name: '银行账号', prop: 'name', width: 120 },
  { name: '合同地址', prop: 'name', width: 120 },
  { name: '人员状态', prop: 'name', width: 120 },
  { name: '入职时间', prop: 'name', width: 120 },
  { name: '转正时间', prop: 'name', width: 120 },
  { name: '基本工资', prop: 'name', width: 120 },
  { name: '历史调薪', prop: 'name', width: 120 },
  { name: '状态', prop: 'name', width: 100 },
  { name: '合同扫描件', prop: 'file', width: 120 },
  { name: '备注', prop: 'name', width: 160 }
]

export default defineComponent({
  setup () {
    const tabActiveIndex: Ref<number> = ref(0)
    const height: Ref<number> = ref(300)
    const tabs = ref([
      {
        text: '全部人员',
        id: 0,
        subTitle: '(不显示离职人员)'
      },
      {
        text: '行政管理岗位',
        id: 1
      },
      {
        text: '技术岗',
        id: 2
      },
      {
        text: '已离职人员',
        id: 3
      }
    ])
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

    const changeTab = (id: number): void => {
      if (id !== tabActiveIndex.value) {
        tabActiveIndex.value = id
      }
    }
    onMounted(() => {
      nextTick(() => {
        height.value = document.documentElement.clientHeight - 160
      })
    })
    return {
      tabs,
      tabActiveIndex,
      changeTab,
      tableHeaderData,
      tableData,
      height
    }
  }
})
</script>

<style lang="less" scoped>
.employee-info-container {
  box-sizing: border-box;
  .fillter-header-content {
    margin-bottom: 10px;
    &-left .content {
      div,
      p {
        margin: 0;
        padding: 0;
      }
    }
  }
}
</style>
