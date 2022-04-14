<template>
  <div class="administration-cost-container">
    <!-- 固定成本 -->
    <div class="fixed-cost-box">
      <div class="filter-header d-flex d-f-col-center d-f-row-bet">
        <div class="filter-left d-flex d-f-col-center">
          <d-tab :mr="10" text="固定成本" />
          <el-date-picker size="large" type="month" placeholder="请选择年月" />
        </div>
        <div class="filter-right">
          <d-add @click="add" text="添加成本" />
        </div>
      </div>
      <div class="table-content">
        <el-table
          border
          :stripe="true"
          height="250"
          size="large"
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            v-for="(head, index) in fixedCosts.tabHeader"
            :key="index"
            :prop="head.prop"
            :label="head.name"
            :width="head.width"
          >
            <template #default="scope">
              <!-- 最后一行展示图片 -->
              <template v-if="scope.row.img">
                <div>
                  <img :src="scope.row.img" alt="" />
                </div>
              </template>
              <!-- 默认展示内容 -->
              <template v-else>{{ scope.row[scope.column.property] }}</template>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 管理人员成本 -->
    <div class="management-cost-box">
      <div class="filter-header d-flex d-f-col-center d-f-row-bet">
        <div class="filter-left d-flex d-f-col-center">
          <d-tab :mr="10" text="管理人员成本" />
          <el-date-picker size="large" type="month" placeholder="请选择年月" />
        </div>
        <div class="filter-right">
          <d-add @click="add" text="添加成本" />
        </div>
      </div>
      <div class="table-content">
        <vxe-grid
          stripe
          :row-config="{ isCurrent: true, isHover: true }"
          class="reverse-table"
          v-bind="management.tables"
        ></vxe-grid>
      </div>
    </div>

    <!-- 报销 -->
    <div class="reimbursement-cost-box">
      <div class="filter-header d-flex d-f-col-center d-f-row-bet">
        <div class="filter-left d-flex d-f-col-center">
          <d-tab :mr="10" text="报销" />
          <el-date-picker
            style="margin-right: 10px"
            size="large"
            type="month"
            placeholder="请选择年月"
          />
          <d-tab
            v-for="tab in reimbursements.tabs"
            :active="tab.state === reimbursements.tabIndex"
            :key="tab.state"
            :mr="10"
            :width="140"
            @click="changEreimbursementsTab(tab)"
            :text="tab.name"
          />
        </div>
        <div class="filter-right">
          <d-add @click="add" text="添加成本" />
        </div>
      </div>
      <div class="table-content">
        <el-table
          border
          :stripe="true"
          height="250"
          size="large"
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            v-for="(head, index) in reimbursements.tabHeader"
            :key="index"
            :prop="head.prop"
            :label="head.name"
            :width="head.width"
          />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
const tableData = [
  { name: '测试数据' },
  { name: '测试数据' },
  { name: '测试数据ja' },
  {
    name: '测试数据',
    img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  }
]
export default defineComponent({
  setup () {
    const active = ref(false)

    // 固定成本数据
    const fixedCosts = reactive({
      tabHeader: [
        { name: '房租', prop: 'name' },
        { name: '水电费', prop: 'name' },
        { name: '耗材费', prop: 'name' },
        { name: '网络费', prop: 'name' },
        { name: '维修费', prop: 'name' },
        { name: '汽车租赁费', prop: 'name' }
      ]
    })

    // 管理人员成本
    const management = reactive({
      tables: {
        border: true,
        showOverflow: true,
        height: 150,
        showHeader: false,
        columns: [
          { name: '测试数据', fixed: 'left', field: 'name' },
          { name: '测试数据', field: 'name' },
          { name: '测试数据', field: 'name' },
          { name: '测试数据ja', field: 'name' }
        ],
        data: [
          { field: 'name', name: '姓名' },
          { field: 'name', name: '职位' },
          { field: 'name', name: '实际成本' }
        ]
      }
    })

    // 报销数据
    const reimbursements = reactive({
      tabHeader: [
        { name: '报销人', prop: 'name' },
        { name: '时间', prop: 'name' },
        { name: '订单', prop: 'name' },
        { name: '商品', prop: 'name' },
        { name: '购买渠道', prop: 'name' },
        { name: '价格', prop: 'name' },
        { name: '发票', prop: 'name' },
        { name: '录入', prop: 'name' },
        { name: '审核', prop: 'name' },
        { name: '报销状态', prop: 'name' },
        { name: '备注', prop: 'name' }
      ],
      tabIndex: 0, // 默认全部
      tabs: [
        {
          state: 0,
          name: '全部'
        },
        {
          state: 1,
          name: '未报销'
        },
        {
          state: 2,
          name: '已报销'
        }
      ]
    })
    const changeTab = () => {
      active.value = !active.value
    }

    const changEreimbursementsTab = ({ state }: { state: number }) => {
      if (reimbursements.tabIndex !== state) {
        reimbursements.tabIndex = state
      }
    }

    return {
      changeTab,
      reimbursements,
      fixedCosts,
      changEreimbursementsTab,
      tableData,
      management
    }
  }
})
</script>

<style lang="less" scoped>
.administration-cost-container {
  box-sizing: border-box;
  padding-bottom: 20px;
  .management-cost-box,
  .reimbursement-cost-box {
    margin-top: 28px;
  }
  .filter-header {
    margin-bottom: 20px;
  }
}
/*滚动条整体部分*/
.reverse-table ::-webkit-scrollbar {
  width: 8px;
  height: 8px;
} /*滚动条的轨道*/
.reverse-table ::-webkit-scrollbar-track {
  background-color: #ffffff;
} /*滚动条里面的小方块，能向上向下移动*/
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
} /*边角，即两个滚动条的交汇处*/
.reverse-table ::-webkit-scrollbar-corner {
  background-color: #ffffff;
}
</style>
