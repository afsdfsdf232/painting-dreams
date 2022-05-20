<template>
  <div class="administration-cost-container">
    <!-- 固定成本 -->
    <div class="fixed-cost-box">
      <div class="filter-header d-flex d-f-col-center d-f-row-bet">
        <div class="filter-left d-flex d-f-col-center">
          <d-tab :mr="10" text="固定成本" />
          <el-date-picker
            @change="changeFixedCostsList"
            v-model="fixedCosts.query.date"
            size="large"
            type="month"
            placeholder="请选择年月" />
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
          :data="fixedCosts.tableData"
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
              <template v-if="scope.row.payFileUrl">
                <div>
                  <img :src="scope.row.payFileUrl" alt="" />
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
          <el-date-picker size="large" @change="getManagerCostsLists" v-model="management.query.date" type="month" placeholder="请选择年月" />
        </div>
        <div class="filter-right">
          <d-add
            @click="openManagementModal"
            text="添加成本"
          />
        </div>
      </div>
      <div class="table-content">
       <el-table
        border
        v-loading="management.tables.loading"
        :stripe="true"
        height="250"
        size="large"
        :data="management.tables.data"
        style="width: 100%"
      >
        <el-table-column
          v-for="(head, index) in management.tables.columns"
          :key="index"
          :prop="head.key"
          :label="head.name"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              type="text"
              size="small"
              @click="openManagementModal(scope.row)"
              >编辑</el-button
            >
            <el-button
              @click="managementRowDelete(scope.row.id)"
              type="text"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
            v-model="reimbursements.query.date"
            @change="getReimbursementCostsLists"
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
            @click="openEreimbursementsModal"
            text="添加报销"
          />
        </div>
      </div>
      <div class="table-content">
        <el-table
          border
          :stripe="true"
          height="250"
          :cell-class-name="cellClass"
          size="large"
          :data="reimbursements.tableData"
          style="width: 100%"
        >
          <el-table-column
            v-for="(head, index) in reimbursements.tabHeader"
            :key="index"
            :prop="head.prop"
            :label="head.name"
            :width="head.width"
          >
            <template #default="scope">
              <template v-if="scope.column.property === 'invoiceFileUrl'">
                <img style="max-width: 160px; max-height: 160px" :src="scope.row.invoiceFileUrl" alt="" />
              </template>
              <template v-if="scope.column.property === 'auditStatus'">
                {{scope.row[scope.column.property] === '0'? '未审核': '已审核'}}
              </template>
              <template v-if="scope.column.property === 'isInput'">
                {{scope.row[scope.column.property] === '0'? '否': '是'}}
              </template>
              <template v-if="scope.column.property === 'reimbursementStatus'">
                {{scope.row[scope.column.property] === '0'? '未报销': '已报销'}}
              </template>
              <!-- 默认展示内容 -->
              <!-- <template v-else>{{ scope.row[scope.column.property] }}</template> -->
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template  #default="scope">
              <el-button type="text" size="small" @click="openEreimbursementsModal(scope.row)"
                >编辑</el-button
              >
              <el-button type="text" size="small" @click="deleteReimbursements(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <p>本月累计报销金额：{{reimbursementsAmount || 0}} 元</p>
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
        <el-form size="large" ref="managementModalRef" :model="management.modal" :rules="management.rules" label-width="120px">
          <el-form-item label="姓名" prop="managerId">
            <el-select
              style="width: 100%"
              v-model="management.modal.managerId"
              @change="changeManagement"
              placeholder="请选择姓名"
            >
              <el-option v-for="user in userLists" :key="user.id" :label="user.name" :value="user.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="职位" prop="managePostName">
            <el-input  placeholder="请选择姓名" disabled v-model="management.modal.managePostName" />
          </el-form-item>
          <el-form-item label="费用" prop="amount">
            <el-input placeholder="请输入成本费用" v-model="management.modal.amount" />
          </el-form-item>
          <el-form-item label="日期" prop="costsDate">
          <el-date-picker
            style="width: 100%"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            v-model="management.modal.costsDate"
            placeholder="请选择时间"
          />
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
            @click="saveManagementModal(managementModalRef)"
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
          <el-form size="large" ref="reimbursementsLeftRef" :rules="reimbursements.formRules" :model="reimbursements.modal" label-width="110px">
            <el-form-item label="报销人" prop="reimburser">
              <el-input placeholder="请输入报销人姓名" v-model="reimbursements.modal.reimburser" />
            </el-form-item>
            <el-form-item label="订单" prop="orderNumber">
              <el-input placeholder="请输入订单号" v-model="reimbursements.modal.orderNumber" />
            </el-form-item>
            <el-form-item label="购买渠道" prop="buyWay">
              <el-input placeholder="请输入购买渠道" v-model="reimbursements.modal.buyWay" />
            </el-form-item>
            <el-form-item label="发票" prop="invoiceFileUrl">
              <div class="upload-content" v-if="!reimbursements.modal.invoiceFileUrl">
                <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
                <input class="file-input" type="file" @change="uploadFileChange">
              </div>
              <div v-else class="invoice-file">
                <img :src="reimbursements.modal.invoiceFileUrl" alt="" srcset="">
                <el-icon :size="24" @click="deleteImg" class="delete"><CircleCloseFilled color="#F56C6C"/></el-icon>
              </div>

            </el-form-item>
            <el-form-item label="审核" prop="auditStatus">
              <el-select
                style="width: 100%"
                v-model="reimbursements.modal.auditStatus"
                placeholder="请选择审核状态"
              >
                <el-option label="未审核" :value="0" />
                <el-option label="已审核" :value="1" />
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input
                type="textarea"
                placeholder="请输入备注"
                v-model="reimbursements.modal.remark"
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="drawer-content-right">
          <el-form ref="reimbursementsRightRef" size="large" :rules="reimbursements.formRules" :model="reimbursements.modal" label-width="100px">
            <el-form-item label="时间" prop="reimbursementDate">
              <el-date-picker
                style="width: 100%"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                v-model="reimbursements.modal.reimbursementDate"
                placeholder="请选择时间"
              />
            </el-form-item>
            <el-form-item label="商品明细" prop="commodity">
              <el-input placeholder="请输入商品明细" v-model="reimbursements.modal.commodity" />
            </el-form-item>
            <el-form-item label="价格" prop="amount">
              <el-input placeholder="请输入商品价格" v-model="reimbursements.modal.amount" />
            </el-form-item>
            <el-form-item label="录入" prop="isInput">
              <el-select
                style="width: 100%"
                v-model="reimbursements.modal.isInput"
                placeholder="请选择状态"
              >
                <el-option label="已录入" :value="1" />
                <el-option label="未录入" :value="0" />
              </el-select>
            </el-form-item>
            <el-form-item label="报销状态" prop="reimbursementStatus">
              <el-select
                style="width: 100%"
                v-model="reimbursements.modal.reimbursementStatus"
                placeholder="请选择状态"
              >
                <el-option label="未报销" :value="0" />
                <el-option label="已报销" :value="1" />
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
            @click="submitReimbursements(reimbursementsLeftRef,reimbursementsRightRef)"
            >保存</el-button
          >
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, Ref } from 'vue'
import { uploadFile } from '@/utils/index'
import { Plus, CircleCloseFilled } from '@element-plus/icons-vue'
import { getFixedCostsList, getManagerCostsList, getReimbursementCostsList, reimbursementCostsSave, reimbursementCostsUpdate, logicDeleteReimbursementCosts, getSysUserList, saveManagerCosts, logicDeleteManagerCosts, updateManagerCosts, getThisMonthReimbursementCosts } from '@/request/index'
import type { FormInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'

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
  components: { Plus, CircleCloseFilled },

  setup () {
    const active = ref(false)

    const userLists:Ref<any> = ref([])

    // 固定成本数据
    const fixedCosts = reactive({
      query: {
        date: new Date()
      },
      tableData: [],
      tabHeader: [
        { name: '房租', prop: 'name' },
        { name: '水电费', prop: 'name' },
        { name: '耗材费', prop: 'name' },
        { name: '网络费', prop: 'name' },
        { name: '维修费', prop: 'name' },
        { name: '汽车租赁费', prop: 'name' }
      ]
    })
    const getFixedCostsLists = async () => {
      const query = {
        month: new Date().getMonth() + 1,
        limit: -1,
        page: 1,
        year: new Date().getFullYear()
      }
      if (fixedCosts.query.date) {
        const dates = new Date(fixedCosts.query.date as any)
        query.month = dates.getMonth() + 1
        query.year = dates.getFullYear()
      }
      const { code, data } = await getFixedCostsList({
        ...query
      })
      if (code === 200) {
        console.log(data, '固定成本list')
        // 处理头部
        const headers: any = []
        data.list.map((item: any) => {
          headers.push({
            name: item.name || 'test',
            prop: 'amount'
          })
        })
        fixedCosts.tabHeader = headers
        fixedCosts.tableData = data.list
      }
    }
    const changeFixedCostsList = () => {
      // 改变时间
      console.log(fixedCosts.query)
      getFixedCostsLists()
    }
    // ==============================================
    // 管理人员成本
    const managementModalRef = ref<FormInstance>()
    const management = reactive({
      tables: {
        loading: false,
        columns: [
          {
            name: '姓名',
            key: 'managerName'
          }, {
            name: '职位',
            key: 'managePostName'
          },
          {
            name: '实际成本',
            key: 'amount'
          }
        ],
        data: []
      },
      query: {
        date: new Date()
      },
      addManagementModal: false,
      rules: {
        amount: [{ required: true, message: '请输入成本费用', trigger: 'blur' }],
        costsDate: [{ required: true, message: '请选择日期', trigger: 'change' }],
        managerId: [{ required: true, message: '请选择姓名', trigger: 'change' }],
        managePostName: [{ required: true, message: '请选择姓名', trigger: 'change' }]
      },
      modal: {
        id: '', // id
        amount: '', // 费用
        costsDate: '', // 成本日期
        managerId: '',
        managePostName: '' // 职位
      }
    })
    const openManagementModal = async (row: any) => {
      console.log(row)
      // 新增
      management.addManagementModal = true
      if (row && row.id) {
        // 编辑
        for (const key in management.modal) {
          management.modal[key] = row[key]
          changeManagement()
        }
      } else {
        // 新增
        for (const key in management.modal) {
          management.modal[key] = ''
        }
      }
    }
    const saveManagementModal = async (FormRef: FormInstance | undefined) => {
      const sucess = (code: number) => {
        if (code === 200) {
          ElMessage({
            type: 'success',
            message: '操作成功'
          })
          // 获取新的列表
          getManagerCostsLists()
          // 关闭弹窗
          management.addManagementModal = false
        }
      }
      if (!FormRef) return
      FormRef.validate(async valid => {
        if (valid) {
        // 验证成功
          if (management.modal.id) {
          // 编辑
            const { code } = await updateManagerCosts(management.modal)
            sucess(code)
          } else {
          // 新增
            const { code } = await saveManagerCosts(management.modal)
            sucess(code)
          }
        }
      })
    }
    // 删除
    const managementRowDelete = async (id: string) => {
      ElMessageBox.confirm('确定删除该项吗?', '删除', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { code } = await logicDeleteManagerCosts(id)
        if (code === 200) {
          getManagerCostsLists()
        }
      })
    }
    const changeManagement = () => {
      const item = userLists.value.find((item: any) => item.id === management.modal.managerId)
      if (item && item.managePostName) {
        management.modal.managePostName = item.managePostName
      }
    }
    const getManagerCostsLists = async () => {
      management.tables.loading = true
      const query = {
        month: new Date().getMonth() + 1,
        limit: -1,
        page: 1,
        year: new Date().getFullYear()
      }
      if (management.query.date) {
        const dates = new Date(management.query.date as any)
        query.month = dates.getMonth() + 1
        query.year = dates.getFullYear()
      }
      try {
        const { code, data } = await getManagerCostsList({ ...query })
        if (code === 200) {
        // const columns: any = [{ field: 'field', width: 140, fixed: 'left' }]
        // const tableData: any = [{ field: '姓名' }, { field: '职位' }, { field: '实际成本' }]
        // data.list.map((item: any, index: number) => {
        //   columns.push({
        //     field: 'field' + (index + 1),
        //     minWidth: 120
        //   })
        //   tableData[0]['field' + (index + 1)] = item.managerName || 'null'
        //   tableData[1]['field' + (index + 1)] = item.managePostName || '--'
        //   tableData[2]['field' + (index + 1)] = item.amount || '--'
        // })
        // columns[data.list.length - 1].fixed = 'right'
        // management.tables.columns = columns
          management.tables.data = data.list
        }
      } finally {
        management.tables.loading = false
      }
    }
    // 获取人员列表
    const getSysUserLists = async () => {
      const { code, data } = await getSysUserList({
        limit: -1,
        page: 1
      })
      if (code === 200) {
        if (data.list) {
          userLists.value = data.list
        }
      }
    }

    // ===============================
    // 报销数据
    const reimbursementsLeftRef = ref<FormInstance>()
    const reimbursementsRightRef = ref<FormInstance>()
    const reimbursementsAmount = ref(0) // 报销累计
    const reimbursements = reactive({
      tabHeader: [
        { name: '报销人', prop: 'reimburser' },
        { name: '时间', prop: 'reimbursementDate' },
        { name: '订单', prop: 'orderNumber' },
        { name: '商品', prop: 'commodity' },
        { name: '购买渠道', prop: 'buyWay' },
        { name: '价格', prop: 'amount' },
        { name: '发票', width: 180, prop: 'invoiceFileUrl' },
        { name: '录入', prop: 'isInput' },
        { name: '审核', prop: 'auditStatus' },
        { name: '报销状态', prop: 'reimbursementStatus' },
        { name: '备注', prop: 'remark' }
      ],
      tabIndex: 2, // 默认全部
      addReimbursementModal: false,
      query: {
        date: new Date()
      },
      tableData: [],
      tabs: [
        {
          state: 2,
          name: '全部'
        },
        {
          state: 0,
          name: '未报销'
        },
        {
          state: 1,
          name: '已报销'
        }
      ],
      modal: {
        id: '', // id
        amount: '', // 价格
        auditStatus: '', // 审核状态 0 未审核，1 已审核
        buyWay: '', // 购买渠道
        commodity: '', // 商品
        invoiceFileUrl: '', // 发票url
        isInput: '', // 是否录入(0否 1是)
        orderNumber: '', // 订单号
        reimbursementDate: '', // 报销日期(YYYY-MM-dd)
        reimbursementStatus: '', // 报销状态(0未报销 1已报销)
        reimburser: '', // 报销人
        remark: '' // 备注
      },
      formRules: {
        amount: [{ required: true, message: '请输入价格', trigger: 'blur' }],
        auditStatus: [{ required: true, message: '请选择审核状态', trigger: 'change' }],
        buyWay: [{ required: true, message: '请输入购买渠道', trigger: 'blur' }],
        commodity: [{ required: true, message: '请输入商品明细', trigger: 'blur' }],
        invoiceFileUrl: [{ required: true, message: '请上传发票文件', trigger: 'blur' }],
        isInput: [{ required: true, message: '请选择录入状态', trigger: 'change' }],
        orderNumber: [{ required: true, message: '请输入订单号', trigger: 'blur' }],
        reimbursementDate: [{ required: true, message: '请选择报销日期', trigger: 'change' }],
        reimbursementStatus: [{ required: true, message: '请选择报销状态', trigger: 'change' }],
        reimburser: [{ required: true, message: '请输入报销人', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入备注', trigger: 'blur' }]
      }
    })
    const openEreimbursementsModal = (row: any) => {
      if (row && row.id) {
        // 编辑
        for (const key in reimbursements.modal) {
          reimbursements.modal[key] = row[key]
        }
      } else {
        // 新增
        for (const key in reimbursements.modal) {
          reimbursements.modal[key] = ''
        }
      }
      reimbursements.addReimbursementModal = true
    }
    const uploadFileChange = async (e: any) => {
      if (e.target.files && e.target.files[0]) {
        const { code, data } = await uploadFile(e.target.files[0])
        if (code === 200) {
          reimbursements.modal.invoiceFileUrl = data[0].url;
          (reimbursementsLeftRef.value as any).validateField(['invoiceFileUrl'])
        }
      }
    }
    const deleteImg = () => {
      reimbursements.modal.invoiceFileUrl = '';
      (reimbursementsLeftRef.value as any).validateField(['invoiceFileUrl'])
    }
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
    const getReimbursementCostsLists = async () => {
      const query = {
        month: new Date().getMonth() + 1,
        limit: -1,
        page: 1,
        reimbursementStatus: reimbursements.tabIndex === 2 ? '' : reimbursements.tabIndex, // 报销状态(默认空为全部 0未报销 1已报销)
        year: new Date().getFullYear()
      }
      if (reimbursements.query.date) {
        const dates = new Date(reimbursements.query.date as any)
        query.month = dates.getMonth() + 1
        query.year = dates.getFullYear()
      }
      const { code, data } = await getReimbursementCostsList({
        ...query
      })
      if (code === 200) {
        console.log('报销list：', data)
        reimbursements.tableData = data.list
        getThisMonthReimbursementCostss(query)
      }
    }
    const changEreimbursementsTab = ({ state }: { state: number }) => {
      if (reimbursements.tabIndex !== state) {
        reimbursements.tabIndex = state
        getReimbursementCostsLists()
      }
    }
    const submitReimbursements = async (FormLeftRef: FormInstance | undefined, FormRightRef: FormInstance | undefined) => {
      // 新增编辑提交
      if (!FormLeftRef) return
      if (!FormRightRef) return
      const sucess = (code: number) => {
        if (code === 200) {
          ElMessage({
            type: 'success',
            message: '操作成功'
          })
          // 获取新的列表
          getReimbursementCostsLists()
          // 关闭弹窗
          reimbursements.addReimbursementModal = false
        }
      }
      FormLeftRef.validate(async valid => {
        if (valid) {
          FormRightRef.validate(async rightValid => {
            if (rightValid) {
              if (reimbursements.modal.id) {
                // 新增
                const { code } = await reimbursementCostsUpdate(reimbursements.modal)
                if (code === 200) {
                  sucess(code)
                }
              } else {
                // 编辑
                const { code } = await reimbursementCostsSave(reimbursements.modal)
                if (code === 200) {
                  sucess(code)
                }
              }
            }
          })
        } else {
          FormRightRef.validate()
        }
      })
    }

    const deleteReimbursements = async (id: string) => {
      ElMessageBox.confirm('确定删除该项吗?', '删除', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { code } = await logicDeleteReimbursementCosts(id)
        if (code === 200) {
          getReimbursementCostsLists()
        }
      })
    }

    // 报销累计
    const getThisMonthReimbursementCostss = async (query: any) => {
      const { code, data } = await getThisMonthReimbursementCosts({
        ...query
      })
      if (code === 200) {
        console.log('data:', data)
        reimbursementsAmount.value = data.amount
      }
    }

    const cellClass = (row:any):any => {
      if (row.column.property === 'invoiceFileUrl') {
        return 'invoice-img'
      }
    }
    onMounted(() => {
      getFixedCostsLists()
      getManagerCostsLists()
      getReimbursementCostsLists()
      getSysUserLists()
    })
    return {
      changeTab,
      reimbursements,
      fixedCosts,
      changEreimbursementsTab,
      tableData,
      management,
      form,
      changeFixedCostsList,
      getManagerCostsLists,
      getReimbursementCostsLists,
      uploadFileChange,
      deleteImg,
      reimbursementsRightRef,
      reimbursementsLeftRef,
      submitReimbursements,
      openEreimbursementsModal,
      deleteReimbursements,
      cellClass,
      userLists,
      changeManagement,
      managementModalRef,
      openManagementModal,
      saveManagementModal,
      managementRowDelete,
      reimbursementsAmount
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
  .upload-content {
    position: relative;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;
    cursor: pointer;
    border: 1px dashed #d9d9d9;
    .file-input {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      opacity: 0;
      cursor: pointer;
    }
  }
  .invoice-file {
    width: 80px;
    height: 80px;
    position: relative;
    img {
      width: 80px;
      height: 80px;
    }
    .delete {
      position: absolute;
      right: -12px;
      top: -12px;
      z-index: 10;
      cursor: pointer;
    }
  }
  .el-upload {
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

::v-deep(.invoice-img > div){
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
