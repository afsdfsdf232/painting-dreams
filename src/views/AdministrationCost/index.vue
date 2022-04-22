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
          <d-add
            @click="management.addManagementModal = true"
            text="添加成本"
          />
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
          <d-add
            @click="reimbursements.addReimbursementModal = true"
            text="添加报销"
          />
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
    <!-- 新增管理人员弹窗 -->
    <el-dialog
      v-model="management.addManagementModal"
      top="55px"
      title="新增成本"
      width="35%"
      center
    >
      <div class="rule-modal modal scrollbar">
        <el-form size="large" :model="form" label-width="120px">
          <el-form-item label="姓名">
            <el-input placeholder="请输入姓名" v-model="form.name" />
          </el-form-item>
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
          <el-form-item label="身份证">
            <el-input placeholder="请输入身份证号码" v-model="form.name" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
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
    </el-dialog>

    <!-- 新增报销弹窗 -->
    <el-drawer
      size="50%"
      v-model="reimbursements.addReimbursementModal"
      title="新增报销"
      :with-header="true"
    >
      <template #title>
        <p class="t-c t-main-color f20">新增报销</p>
      </template>
      <div class="drawer-content d-flex d-f-row-bet">
        <div class="drawer-content-left">
          <el-form size="large" :model="form" label-width="110px">
            <el-form-item label="报销人">
              <el-input placeholder="请输入报销人姓名" v-model="form.name" />
            </el-form-item>
            <el-form-item label="订单">
              <el-input placeholder="请输入订单号" v-model="form.name" />
            </el-form-item>
            <el-form-item label="购买渠道">
              <el-input placeholder="请输入购买渠道" v-model="form.name" />
            </el-form-item>
            <el-form-item label="发票">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="审核">
              <el-select
                style="width: 100%"
                v-model="form.region"
                placeholder="请选择审核状态"
              >
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
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
            <el-form-item label="时间">
              <el-date-picker
                style="width: 100%"
                type="dates"
                placeholder="请选择时间"
              />
            </el-form-item>
            <el-form-item label="商品明细">
              <el-input placeholder="请输入商品明细" v-model="form.name" />
            </el-form-item>
            <el-form-item label="价格">
              <el-input placeholder="请输入商品价格" v-model="form.name" />
            </el-form-item>
            <el-form-item label="录入">
              <el-select
                style="width: 100%"
                v-model="form.region"
                placeholder="请选择状态"
              >
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="报销状态">
              <el-select
                style="width: 100%"
                v-model="form.region"
                placeholder="请选择状态"
              >
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
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
import { defineComponent, ref, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'
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
  components: { Plus },

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
      },
      addManagementModal: false
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
      addReimbursementModal: false,
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
      management,
      form
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
  .avatar-uploader {
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #d9d9d9;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  .el-icon.avatar-uploader-icon {
    font-size: 26px;
    color: #8c939d;
    text-align: center;
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
