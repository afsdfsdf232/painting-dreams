<template>
  <div class="payroll-container">
    <div class="header-filter d-flex d-f-row-bet">
      <div class="header-filter-left d-flex d-f-col-center">
        <el-date-picker
          @change="changePicher"
          v-model="year"
          size="large"
          type="month"
          placeholder="请选择年月"
        />
        <div class="month-data d-flex d-f-col-center d-f-row-center">
          <i class="iconfont d-tishi"></i>
          <span v-show="isMonthUpdateStatus === 0 || isMonthUpdateStatus === 1"
            >该月{{ isMonthUpdateStatus === 0 ? '未更新' : '已更新' }}
          </span>
        </div>
      </div>
      <div class="header-filter-right">
        <d-add @click="openModal" v-permission="'add'" text="新增工资表" />
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
        <el-table-column
          v-for="(head, index) in tableHeaderData"
          :key="index"
          :prop="head.prop"
          :label="head.name"
          :width="head.width"
        >
          <template #default="scope">
            <template v-if="scope.column.property === 'historyWageList'">
              <div
                class="history-wageList"
                v-for="(history, index) in scope.row.property"
                :key="index"
              >
                <p>{{ history.changeTime }}</p>
                <p>{{ history.wage }}</p>
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <div style="width: 120px">
              <el-button type="text" v-permission="'edit'" size="small" @click="openModal(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="text"
                size="small"
                v-permission="'delete'"
                @click="deleteWage(scope.row.id)"
                >删除</el-button
              >
            </div>
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
          <el-form
            size="large"
            ref="leftModalRef"
            :model="form"
            :rules="formRules"
            label-width="110px"
          >
            <el-form-item label="员工姓名" prop="employeeId">
              <el-select
                style="width: 100%"
                v-model="form.employeeId"
                @change="changeEmployee"
                placeholder="请选择员工"
              >
                <el-option
                  :label="user.name"
                  :value="user.id"
                  v-for="user in employeeList"
                  :key="user.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="入职时间" prop="entryTime">
              <el-date-picker
                v-model="form.entryTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                type="date"
                placeholder="请选择入职时间"
              />
            </el-form-item>
            <el-form-item label="计薪基数" prop="salaryBase">
              <el-input
                placeholder="请输入计薪基数"
                v-model="form.salaryBase"
              />
            </el-form-item>
            <el-form-item label="基本工资" prop="basicWage">
              <el-input placeholder="请输入基本工资" v-model="form.basicWage" />
            </el-form-item>
            <el-form-item label="全勤" prop="perfectAttendance">
              <el-input
                placeholder="请输入全勤"
                v-model="form.perfectAttendance"
              />
            </el-form-item>
            <el-form-item label="考勤扣款" prop="attendanceDeduction">
              <el-input
                placeholder="请输入考勤扣款"
                v-model="form.attendanceDeduction"
              />
            </el-form-item>
            <el-form-item label="养老保险" prop="endowmentInsurance">
              <el-input
                placeholder="请输入养老保险"
                v-model="form.endowmentInsurance"
              />
            </el-form-item>
            <el-form-item label="失业保险" prop="unemploymentInsurance">
              <el-input
                placeholder="请输入失业保险"
                v-model="form.unemploymentInsurance"
              />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input
                type="textarea"
                placeholder="请输入备注"
                v-model="form.remark"
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="drawer-content-right">
          <el-form
            ref="rightModalRef"
            size="large"
            :model="form"
            :rules="formRules"
            label-width="100px"
          >
            <el-form-item label="职位" prop="designPostName">
              <el-input
                placeholder="请输入人员"
                disabled
                v-model="form.designPostName"
              />
            </el-form-item>
            <el-form-item label="出勤天数" prop="attendanceDays">
              <el-input
                placeholder="请输入出勤天数"
                v-model="form.attendanceDays"
              />
            </el-form-item>
            <el-form-item label="状态" prop="employeeStatusName">
              <el-input
                placeholder="请选择人员"
                disabled
                v-model="form.employeeStatusName"
              />
            </el-form-item>
            <el-form-item label="加班绩效" prop="overtimePerformance">
              <el-input
                placeholder="请输入加班绩效"
                v-model="form.overtimePerformance"
              />
            </el-form-item>
            <el-form-item label="实际应付" prop="actuallyPayable">
              <el-input
                placeholder="请输入实际应付"
                v-model="form.actuallyPayable"
              />
            </el-form-item>
            <el-form-item label="应发工资" prop="payableWage">
              <el-input
                placeholder="请输入应发工资"
                v-model="form.payableWage"
              />
            </el-form-item>
            <el-form-item label="医疗保险" prop="medicalInsurance">
              <el-input
                placeholder="请输入医疗保险"
                v-model="form.medicalInsurance"
              />
            </el-form-item>
            <el-form-item label="公积金" prop="providentFund">
              <el-input
                placeholder="请输入公积金"
                v-model="form.providentFund"
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
            @click="saveWageInfo(leftModalRef, rightModalRef)"
            >保存</el-button
          >
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, Ref, onMounted, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'
import {
  getWageList,
  getWageThisMonthUpdateStatus,
  saveWage,
  getEmployeeList,
  updateWage,
  logicDeleteWage
} from '@/request/index'
const tableHeaderData = [
  { name: '姓名', prop: 'employeeName', width: 120 },
  { name: '职位', prop: 'designPostName', width: 120 },
  { name: '入职时间', prop: 'entryTime', width: 160 },
  { name: '出勤天数', prop: 'attendanceDays', width: 100 },
  { name: '计薪基数', prop: 'salaryBase', width: 100 },
  { name: '状态', prop: 'employeeStatus', width: 120 },
  { name: '基本工资', prop: 'basicWage', width: 100 },
  { name: '加班/绩效', prop: 'overtimePerformance', width: 100 },
  { name: '全勤', prop: 'perfectAttendance', width: 130 },
  { name: '实际应付', prop: 'actuallyPayable', width: 100 },
  { name: '考勤扣款', prop: 'attendanceDeduction', width: 100 },
  { name: '应发工资', prop: 'payableWage', width: 100 },
  { name: '养老保险', prop: 'endowmentInsurance', width: 100 },
  { name: '医疗保险', prop: 'medicalInsurance', width: 100 },
  { name: '失业保险', prop: 'unemploymentInsurance', width: 100 },
  { name: '公积金', prop: 'providentFund', width: 160 },
  { name: '扣款小计', prop: 'deductionSubtotal', width: 100 },
  { name: '应发小计', prop: 'payableSubtotal', width: 100 },
  { name: '个税', prop: 'personalTax', width: 120 },
  { name: '实发工资', prop: 'actuallyWage', width: 100 },
  { name: '银行名称', prop: 'bankName', width: 100 },
  { name: '发放账号', prop: 'bankAccount', width: 100 },
  { name: '历史调薪', prop: 'historyWageList', width: 100 },
  { name: '备注', prop: 'remark', width: 200 }
]
export default defineComponent({
  setup () {
    const year = ref(new Date())
    const month = ref('')
    const painterName = ref('')
    const isMonthUpdateStatus = ref(-1)
    const addPayrollModal: Ref<boolean> = ref(false)
    const tableLoading = ref(false)
    const height: Ref<number> = ref(500)
    const rightModalRef = ref<FormInstance>()
    const leftModalRef = ref<FormInstance>()
    const employeeList: Ref<
      Array<{
        id: string
        name: string
        designPostId: string
        designPostName: string
        status: any
      }>
    > = ref([])
    const formRules = {
      actualSubtotal: [
        { required: true, message: '请输入实发小计', trigger: 'blur' }
      ], // 实发小计
      entryTime: [
        { required: true, message: '请选择职时间', trigger: 'change' }
      ], // 入职时间
      actuallyPayable: [
        { required: true, message: '请输入成本费用', trigger: 'blur' }
      ], // 实际应付
      actuallyWage: [
        { required: true, message: '请输入实际应付', trigger: 'blur' }
      ], // 实发工资
      attendanceDays: [
        { required: true, message: '请输入出勤天数', trigger: 'blur' }
      ], // 出勤天数
      attendanceDeduction: [
        { required: true, message: '请输入考勤扣款', trigger: 'blur' }
      ], // 考勤扣款
      bankAccount: [
        { required: true, message: '请输入银行账号', trigger: 'blur' }
      ], // 银行账号
      bankName: [
        { required: true, message: '请输入银行名称', trigger: 'blur' }
      ], // 银行名称
      basicWage: [
        { required: true, message: '请输入基本工资', trigger: 'blur' }
      ], // 基本工资
      deductionSubtotal: [
        { required: true, message: '请输入扣款小计', trigger: 'blur' }
      ], // 扣款小计
      employeeId: [
        { required: true, message: '请选择员工', trigger: 'change' }
      ], // 员工ID
      employeeStatus: [
        { required: true, message: '请选择员工', trigger: 'change' }
      ], // 员工状态
      endowmentInsurance: [
        { required: true, message: '请输入养老保险', trigger: 'blur' }
      ], // 养老保险
      medicalInsurance: [
        { required: true, message: '请输入医疗保险', trigger: 'blur' }
      ], // 医疗保险
      overtimePerformance: [
        { required: true, message: '请输入加班绩效', trigger: 'blur' }
      ], // 加班绩效
      payableSubtotal: [
        { required: true, message: '请输入应发小计', trigger: 'blur' }
      ], // 应发小计
      employeeStatusName: [
        { required: true, message: '请选择员工', trigger: 'change' }
      ], // 状态名称
      payableWage: [
        { required: true, message: '请输入应付工资', trigger: 'blur' }
      ], // 应付工资
      perfectAttendance: [
        { required: true, message: '请输入全勤', trigger: 'blur' }
      ], // 全勤
      personalTax: [{ required: true, message: '请输入个税', trigger: 'blur' }], // 个税
      providentFund: [
        { required: true, message: '请输入成本费用', trigger: 'blur' }
      ], // 公积金
      remark: [{ required: true, message: '请输入公积金', trigger: 'blur' }], // 备注
      salaryBase: [
        { required: true, message: '请输入成本费用', trigger: 'blur' }
      ], // 计薪基数
      designPostName: [
        { required: true, message: '请输入计薪基数', trigger: 'blur' }
      ], // 职位名称
      unemploymentInsurance: [
        { required: true, message: '请输入失业保险', trigger: 'blur' }
      ] // 失业保险
    }
    const form: any = reactive({
      id: '',
      actualSubtotal: '', // 实发小计
      entryTime: '', // 入职时间
      actuallyPayable: '', // 实际应付
      actuallyWage: '', // 实发工资
      attendanceDays: '', // 出勤天数
      attendanceDeduction: '', // 考勤扣款
      bankAccount: '', // 银行账号
      bankName: '', // 银行名称
      basicWage: '', // 基本工资
      deductionSubtotal: '', // 扣款小计
      designPostId: '', // 设计岗位id，新增可不传
      employeeId: '', // 员工ID
      employeeStatus: '', // 员工状态
      endowmentInsurance: '', // 养老保险
      medicalInsurance: '', // 医疗保险
      overtimePerformance: '', // 加班绩效
      payableSubtotal: '', // 应发小计
      employeeStatusName: '', // 状态名称
      payableWage: '', // 应付工资
      perfectAttendance: '', // 全勤
      personalTax: '', // 个税
      providentFund: '', // 公积金
      remark: '', // 备注
      salaryBase: '', // 计薪基数
      designPostName: '', // 职位名称
      unemploymentInsurance: '' // 失业保险
    })

    const tableData = ref([])
    const getWageLists = async () => {
      tableLoading.value = true
      const query = {
        year: year.value.getFullYear(),
        month: year.value.getMonth() + 1,
        page: 1,
        limit: -1
      }
      const { code, data } = await getWageList({ ...query })
      if (code === 200) {
        tableData.value = data?.list
      }
      getWageThisMonthUpdateStatuss({ year: query.year, month: query.month })
      tableLoading.value = false
    }
    // 员工下拉列表
    const getEmployeeLists = async () => {
      const { code, data } = await getEmployeeList({
        designPostId: '',
        keyword: '',
        limit: -1,
        status: ''
      })
      if (code === 200) {
        employeeList.value = data.list
      }
    }
    // 改月是否更新状态
    const getWageThisMonthUpdateStatuss = async (query: any) => {
      const { code, data } = await getWageThisMonthUpdateStatus(query)
      if (code === 200) {
        isMonthUpdateStatus.value = data.status
      }
    }
    // 选择年月
    const changePicher = () => {
      getWageLists()
    }

    // 下拉选择员工
    const changeEmployee = () => {
      const getStatusName = (num: any) => {
        if (num === '0') return '实习'
        if (num === '1') return '正式'
        if (num === '2') return '已离职'
      }
      const index = employeeList.value.findIndex(
        (item: any) => item.id === form.employeeId
      )
      if (index > -1) {
        form.designPostId = employeeList.value[index].designPostId
        form.designPostName = employeeList.value[index].designPostName
        form.employeeStatusName = getStatusName(
          employeeList.value[index].status
        )
        form.employeeStatus = employeeList.value[index].status
      }
    }

    // 新增编辑保存
    const saveWageInfo = async (
      leftModalRef: FormInstance | undefined,
      rightModalRef: FormInstance | undefined
    ) => {
      // 新增编辑提交
      if (!leftModalRef) return
      if (!rightModalRef) return
      const sucess = (code: number) => {
        if (code === 200) {
          ElMessage({
            type: 'success',
            message: '操作成功'
          })
          // 获取新的列表
          getWageLists()
          // 关闭弹窗
          addPayrollModal.value = false
        }
      }
      leftModalRef.validate(async (valid) => {
        if (valid) {
          const query = {
            ...form
          }
          rightModalRef.validate(async (rightValid) => {
            if (rightValid) {
              if (!form.id) {
                // 新增
                const { code } = await saveWage(query)
                if (code === 200) {
                  sucess(code)
                }
              } else {
                // 编辑
                const { code } = await updateWage(query)
                if (code === 200) {
                  sucess(code)
                }
              }
            }
          })
        } else {
          rightModalRef.validate()
        }
      })
    }

    // 打开弹窗
    const openModal = (row: any) => {
      if (row && row.id) {
        for (const key in form) {
          form[key] = row[key]
        }
        changeEmployee()
      } else {
        for (const key in form) {
          form[key] = ''
        }
      }
      addPayrollModal.value = true
    }

    // 删除
    const deleteWage = async (id: string) => {
      ElMessageBox.confirm('确定删除该项吗?', '删除', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { code } = await logicDeleteWage(id)
        if (code === 200) {
          getWageLists()
        }
      })
    }
    onMounted(() => {
      getWageLists()
      getEmployeeLists()
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
      changePicher,
      form,
      isMonthUpdateStatus,
      openModal,
      saveWageInfo,
      employeeList,
      changeEmployee,
      formRules,
      rightModalRef,
      leftModalRef,
      deleteWage
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
      width: 8px;
      /*高宽分别对应横竖滚动条的尺寸*/
      height: 15px;
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
