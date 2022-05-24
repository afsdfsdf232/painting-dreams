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
        :data="tableDataCopy"
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
    <el-table
      :data="tableDataaa"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="amount1" label="Amount 1" />
      <el-table-column prop="amount2" label="Amount 2" />
      <el-table-column prop="amount3" label="Amount 3" />
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, nextTick } from 'vue'
import { getInvoiceReceiptList } from '@/request/index'
const tableHeaderData = [
  { name: '发票编号', prop: 'invoiceNumber', width: 100 },
  { name: '开票日期', prop: 'billingDate', width: 100 },
  { name: '公司简介', prop: '', width: 120 },
  { name: '付款银行名称', prop: 'paymentBankName', width: 150 },
  { name: '付款银行账号', prop: 'paymentBankAccount', width: 150 },
  { name: '包含项目', prop: 'projectList', width: 120 },
  { name: '阶段总价', prop: '', width: 120 },
  { name: '阶段单价', prop: '', width: 120 },
  { name: '收款状态', prop: 'paymentStatus', width: 120 },
  { name: '收款银行名称', prop: 'collectionBankName', width: 150 },
  { name: '收款银行账号', prop: 'collectionBankAccount', width: 150 },
  { name: '收款凭证', prop: '', width: 120 },
  { name: '发票扫描件', prop: 'fileList', width: 120 },
  { name: '备注', prop: 'remark', width: 160 }
]

export default defineComponent({
  setup () {
    const activeTabIndex: Ref<number> = ref(0)
    const height: Ref<number> = ref(300)
    const pos = ref(0)
    const tabs = ref([
      { text: '所有发票', id: 0 },
      { text: '友塔', id: 1 },
      { text: '西山居', id: 2 },
      { text: '冠游', id: 3 },
      { text: '叠纸', id: 4 }
    ])
    const tableData: any = ref([])
    const tableDataCopy: any = ref([])
    const spanArr: any = ref([])

    const getSpanArr = (data: any) => {
      // data就是我们从后台拿到的数据
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          spanArr.value.push(1)
          pos.value = 0
        } else {
          // 判断当前元素与上一个元素是否相同 if (data[i].id === data[i - 1].id) {
          if (data[i].id === data[i - 1].id) {
            spanArr.value[pos.value] += 1
            spanArr.value.push(0)
          } else {
            spanArr.value.push(1)
            pos.value = i
          }
        }
      }
    }

    const objectSpanMethod = ({ row, column, rowIndex, columnIndex }: any) => {
      if (columnIndex === 0 || columnIndex === 1) {
        const _row = spanArr.value[rowIndex]
        const _col = _row > 0 ? 1 : 0
        console.log(`rowspan:${_row} colspan:${_col}`)
        return {
          // [0,0] 表示这一行不显示， [2,1]表示行的合并数
          rowspan: _row,
          colspan: _col
        }
      }
    }

    const tableDataaa = [
      {
        id: '12987122',
        name: 'Tom',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      },
      {
        id: '12987122',
        name: 'Tom',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      },
      {
        id: '12987124',
        name: 'Tom',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      },
      {
        id: '12987125',
        name: 'Tom',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      },
      {
        id: '12987125',
        name: 'Tom',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }
    ]

    const changeTab = (id: number): void => {
      if (activeTabIndex.value !== id) {
        activeTabIndex.value = id
      }
    }
    // 列表
    const getInvoiceReceiptLists = async () => {
      const { code, data } = await getInvoiceReceiptList({
        limit: -1,
        month: 5,
        page: 1,
        partyACompanyId: '', // 合作甲方公司id
        year: 2022
      })
      if (code === 200) {
        console.log('data:', data)
        // 处理数据
        tableDataCopy.value = []
        ;(data.list || []).map((item: any) => {
          if (item.projectList && item.projectList.length > 0) {
            item.projectList.map((citem: any) => {
              tableDataCopy.value.push({
                ...item,
                projectId: citem.id,
                projectName: citem.name,
                projectPaymentAmount: citem.paymentAmount,
                projectPaymentStatus: citem.paymentStatus,
                projectTotalPrice: citem.totalPrice
              })
            })
          } else {
            tableDataCopy.value.push(item)
          }
        })
        tableData.value = data?.list
      }
    }
    onMounted(() => {
      getInvoiceReceiptLists()
      getSpanArr(tableDataaa)
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
      height,
      tableDataCopy,
      tableDataaa,
      objectSpanMethod
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
