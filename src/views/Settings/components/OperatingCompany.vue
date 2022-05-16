<template>
  <div class="operating-company-container">
    <el-table
      border
      :stripe="true"
      v-loading="operatingCompany.tableLoading"
      height="250"
      size="large"
      :data="operatingCompany.tableData"
      style="width: 100%"
    >
      <el-table-column
        align="center"
        v-for="(head, index) in headerData"
        :key="index"
        :prop="head.key"
        :label="head.name"
      />
                <el-table-column fixed="right" label="操作" width="160">
            <template #default="scope">
              <el-button type="text" size="small" @click="openOperatingCompany(scope.row)"
                >编辑</el-button
              >
              <el-button type="text" @click="deleteOperatingCompany(scope.row.id)" size="small">删除</el-button>
            </template>
          </el-table-column>
    </el-table>
    <div class="d-flex">
      <!-- 职位分工 -->
      <div class="job-division w100 mr40">
        <div class="job-division-header">
          <div class="tab-item">职位分工</div>
          <el-button
            size="large"
            @click="openDesignPostsModal"
            :icon="CirclePlus"
            >新增分工</el-button
          >
        </div>
        <el-table
          border
          :stripe="true"
          height="250"
          size="large"
          v-loading="designPosts.tableLoading"
          :data="designPosts.tableData"
        >
          <el-table-column
            v-for="(head, index) in jobHeaderData"
            :key="index"
            :prop="head.key"
            :label="head.name"
            :width="head.width"
          />
          <el-table-column fixed="right" label="操作" width="100">
            <template  #default="scope">
              <el-button type="text" size="small" @click="openDesignPostsModal(scope.row)"
                >编辑</el-button
              >
              <el-button type="text" size="small" @click="deleteDesignPosts(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 部门管理 -->
      <div class="job-division w50" v-if="false">
        <div class="job-division-header">
          <div class="tab-item">部门管理</div>
          <el-button
            size="large"
            @click="addDepartmentModal = true"
            :icon="CirclePlus"
            >新建部门</el-button
          >
        </div>
        <el-table
          border
          :stripe="true"
          height="250"
          size="large"
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            v-for="(head, index) in departmentHeaderData"
            :key="index"
            :prop="head.key"
            :label="head.name"
            :width="head.width"
          />
          <el-table-column fixed="right" label="操作" width="100">
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

    <!-- 后台人员 -->
    <div class="job-division">
      <div class="job-division-header">
        <div class="tab-item">后台人员</div>
        <el-button size="large" @click="addPersonnelClick" :icon="CirclePlus"
          >新建人员</el-button
        >
      </div>
      <el-table
        border
        v-loading="peopleTable.loading"
        :stripe="true"
        height="250"
        size="large"
        :data="peopleTable.data"
        style="width: 100%"
      >
        <el-table-column
          v-for="(head, index) in peopleHeaderData"
          :key="index"
          :prop="head.key"
          :label="head.name"
          :width="head.width"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              type="text"
              size="small"
              @click="handlePeopleEditClick(scope.row)"
              >编辑</el-button
            >
            <el-button
              @click="handlePeopleUpdatePwdlick(scope.row)"
              type="text"
              size="small"
              >修改密码</el-button
            >
            <el-button
              @click="handlePeopleDeletelick(scope.row)"
              type="text"
              size="small"
              >删除人员</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 查看规则弹窗 -->
    <el-dialog
      v-model="showRuleModal"
      top="55px"
      title="后台设置说明"
      width="60%"
      center
    >
      <div class="rule-modal scrollbar">
        <p>
          {画师薪水+公司支出五险一金+{（总房租+总水电费+总管理成本）÷在职画师数量}]÷画师该月过稿收入
          说明：指数越小画师效率越高，指数越大画师效率越低，
        </p>
        <p>指数0.7以下正常，</p>
        <p>0.7~0.8背景框为警示色，</p>
        <p>0.8~0.9提示画师留职察看，</p>
        <p>0.9~1，PM会找画师谈话，连续两个月负数就会劝退画师，。</p>
        <p>指数大于1，公司亏损，公司可以当月辞退画师。</p>
        <p>
          初始公司纯利润率：【10】% （只能填10-90整数数字） 那么初始指数就是0.9
        </p>
        <p>【外发画师】绩效指数核算公式： 画师外发价 ÷ 税后接价</p>
        <p>画师年终奖核算公式：</p>
        <p>（0.9-1月绩效指数）x1月薪水</p>
        <p>+（0.9-2月绩效指数）x2月薪水</p>
        <p>+（0.9-3月绩效指数）x3月薪水</p>
        <p>+（0.9-4月绩效指数）x4月薪水</p>
        <p>+（0.9-5月绩效指数）x5月薪水</p>
        <p>+（0.9-6月绩效指数）x6月薪水</p>
        <p>+（0.9-7月绩效指数）x7月薪水</p>
        <p>+（0.9-8月绩效指数）x8月薪水</p>
        <p>+（0.9-9月绩效指数）x9月薪水</p>
        <p>+（0.9-10月绩效指数）x10月薪水</p>
        <p>+（0.9-11月绩效指数）x11月薪水</p>
        <p>+（0.9-12月绩效指数）x12月薪水</p>

        <p>
          薪水是指：工资表一栏的【实发工资】的最终金额。（比如有全勤或者其他奖金填进去了，那么也要加进去计算）
        </p>
        <p>
          例：也就是说，如果画师某个月的0.9减去绩效指数为负，那么这个月的月奖励也是负数。
          PM会找画师谈话，连续两个月负数就会劝退画师。
        </p>
        <p>商务奖金率：【5】% （只能填1-10数字,最多到小数点后1位）</p>
        <p>项目经理监督奖金率：【2.5】% （只能填1-10数字,最多到小数点后1位）</p>
        <p>主美监督奖金率：【1】% （只能填1-10数字,最多到小数点后1位）</p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="showRuleModal = false"
            >我知道了</el-button
          >
        </span>
      </template>
    </el-dialog>

    <!-- 新增运营公司弹窗 -->
    <el-dialog
      v-model="operatingCompany.addModal"
      top="55px"
      :title="operatingCompany.modal.id?'编辑运营公司':'新增运营公司'"
      width="35%"
      @close="closeModal"
      center
    >
      <div class="rule-modal modal scrollbar">
        <el-form ref="operatingCompanyFormRef" size="large" :model="operatingCompany.modal" :rules="operatingCompany.addmodalRule" label-width="120px">
          <el-form-item label="简称" prop="shortName">
            <el-input placeholder="请输入简称"  v-model="operatingCompany.modal.shortName" />
          </el-form-item>
          <el-form-item label="公司全名" prop="fullName">
             <el-input placeholder="请输入公司全名" v-model="operatingCompany.modal.fullName" />
          </el-form-item>
          <el-form-item label="邮寄合同地址" prop="contractAddress">
            <el-input placeholder="请输入邮寄合同地址" v-model="operatingCompany.modal.contractAddress" />
          </el-form-item>
          <el-form-item label="税号"  prop="taxId">
            <el-input placeholder="请输入税号" v-model="operatingCompany.modal.taxId" />
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input placeholder="请输入联系电话" type="number" v-model="operatingCompany.modal.phone" />
          </el-form-item>
          <el-form-item label="银行账号/名称" prop="blank">
            <el-input placeholder="请输入银行账号/名称" v-model="operatingCompany.modal.blank" />
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input
              placeholder="请输入备注"
              type="textarea"
              v-model="operatingCompany.modal.remark"
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
            @click="operatingCompanySubmit(operatingCompanyFormRef)"
            >保存</el-button
          >
        </div>
      </template>
    </el-dialog>

    <!-- 新增分工弹窗 -->
    <el-dialog
      v-model="designPosts.addModal"
      top="55px"
      title="新增岗位"
      width="35%"
      center
    >
      <div class="rule-modal modal scrollbar">
        <el-form size="large"
          ref="designPostsFormRef"
          :rules="designPosts.modals.addModalRules"
          :model="designPosts.modals"
          label-width="120px">
          <el-form-item label="岗位名称" prop="name">
            <el-input placeholder="请输入岗位名称" v-model="designPosts.modals.name" />
          </el-form-item>
          <el-form-item label="提成点数" prop="percentagePoints">
            <el-select
              style="width: 100%"
              v-model="designPosts.modals.percentagePoints"
              placeholder="请选择提成点数"
            >
              <el-option v-for="item in percentagePointss"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
            </el-select>
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
            @click="submitDesignPosts(designPostsFormRef)"
            >保存</el-button
          >
        </div>
      </template>
    </el-dialog>

    <!-- 新建部门弹窗 -->
    <el-dialog
      v-model="addDepartmentModal"
      top="55px"
      title="新建部门"
      width="35%"
      center
    >
      <div class="rule-modal modal scrollbar">
        <el-form size="large" :model="form" label-width="120px">
          <el-form-item label="部门名称">
            <el-input placeholder="请输入部门名称" v-model="form.name" />
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

    <!-- 新建后台人员弹窗 -->
    <el-dialog
      v-loading="peopleTable.addModal.loading"
      v-model="peopleTable.addPersonnelModal"
      top="55px"
      :title="peopleTable.addModal.id ? '编辑后台人员信息' : '新建后台人员'"
      width="35%"
      center
    >
      <div class="rule-modal modal scrollbar">
        <el-form
          size="large"
          ref="peopleTableFormRef"
          :rules="peopleTable.addModalRules"
          :model="peopleTable.addModal"
          label-width="120px"
        >
          <el-form-item label="姓名" prop="name">
            <el-input
              placeholder="请输入姓名"
              v-model="peopleTable.addModal.name"
            />
          </el-form-item>
          <el-form-item label="岗位" prop="managePostId">
            <el-select
              style="width: 100%"
              v-model="peopleTable.addModal.managePostId"
              placeholder="请选择岗位"
            >
              <el-option
                v-for="manage in peopleTable.managerPosts"
                :key="manage.id"
                :label="manage.name"
                :value="manage.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="提成点数">
            <el-input
              disabled
              placeholder="和岗位绑定(岗位改变点数也改变)"
              :value="modalPostPoints"
            />
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input
              type="number"
              placeholder="请输入联系电话"
              v-model="peopleTable.addModal.phone"
            />
          </el-form-item>
          <el-form-item label="设置密码" prop="password">
            <el-input
              auto-complete="on"
              placeholder="请输入密码"
              type="password"
              v-model="peopleTable.addModal.password"
            />
          </el-form-item>
          <el-form-item label="确定密码" prop="password2">
            <el-input
              auto-complete="on"
              placeholder="请输入确定密码"
              type="password"
              v-model="peopleTable.addModal.password2"
            />
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button
            :loading="loading"
            class="btn"
            type="primary"
            style="width: 200px"
            size="large"
            @click="submitAddPersonnelModal(peopleTableFormRef)"
            >保存</el-button
          >
        </div>
      </template>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog
      v-loading="peopleTable.updatePwdModals.loading"
      v-model="peopleTable.updatePwdModal"
      top="55px"
      title="修改密码"
      width="35%"
      center
    >
      <div class="rule-modal modal scrollbar">
        <el-form
          size="large"
          ref="peopleTableUpdatePwdFormRef"
          :rules="peopleTable.updatePwdModalRules"
          :model="peopleTable.updatePwdModals"
          label-width="120px"
        >
          <el-form-item label="设置密码" prop="password">
            <el-input
              auto-complete="on"
              placeholder="请输入密码"
              type="password"
              v-model="peopleTable.updatePwdModals.password"
            />
          </el-form-item>
          <el-form-item label="确定密码" prop="password2">
            <el-input
              auto-complete="on"
              placeholder="请输入确定密码"
              type="password"
              v-model="peopleTable.updatePwdModals.password2"
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
            @click="submitUpdatePersonnelPwdModal(peopleTableUpdatePwdFormRef)"
            >保存</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, computed } from 'vue'
import { CirclePlus } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getSysUser,
  getManagerPost,
  addAddSysUser,
  updateAddSysUser,
  updateSysUserPassword,
  deleteSysUser,
  getOperatingCompanyList,
  getDesignPost,
  designPostSave,
  designPostUpdate,
  designPostDelete,
  operatingCompanySave,
  operatingCompanyUpdate,
  operatingCompanyDelete
} from '@/request/index'
import {
  SysUserRequestProps,
  UersssyListItemProps
} from '@/request/requestProps'
import { md5Encode } from '@/utils/index'
const percentagePointss = [
  {
    label: '0.1',
    value: 0.1
  },
  {
    label: '0.2',
    value: 0.2
  },
  {
    label: '0.3',
    value: 0.3
  },
  {
    label: '0.4',
    value: 0.4
  },
  {
    label: '0.5',
    value: 0.5
  },
  {
    label: '0.6',
    value: 0.6
  },
  {
    label: '0.7',
    value: 0.7
  },
  {
    label: '0.8',
    value: 0.8
  },
  {
    label: '0.9',
    value: 0.9
  }
]
interface peopleTableProps {
  data: Array<UersssyListItemProps>
  managerPosts: Array<any>
  addModal: any
  addPersonnelModal: boolean
  loading: boolean
  updatePwdModal: boolean
  updatePwdModals: any
}
const headerData = [
  { name: '简称', key: 'shortName' },
  { name: '公司全名', key: 'fullName' },
  { name: '邮寄合同地址', key: 'contractAddress' },
  { name: '税号', key: 'taxId' },
  { name: '联系电话', key: 'phone' },
  { name: '银行账号/名称', key: 'name' },
  { name: '备注', key: 'remark' }
]

const jobHeaderData = [
  {
    name: '名称',
    key: 'name'
  },
  { name: '返点', key: 'percentagePoints' }
]

const departmentHeaderData = [
  {
    name: '名称',
    key: 'name'
  },
  {
    name: '人数',
    key: 'name'
  }
]

const peopleHeaderData = [
  { name: '姓名', key: 'name' },
  { name: '岗位', key: 'managePostName' },
  { name: '提成点数', key: 'percentagePoints' },
  { name: '联系电话', key: 'phone' },
  { name: '添加时间', key: 'createTime' }
]
export default defineComponent({
  setup () {
    // 验证2次密码输入
    const validatorPassword2 = (rule: any, value: any, callback: any) => {
      console.log(rule)
      if (!value) {
        callback('请输入确认密码')
      } else {
        if (rule.t === 'updatePwd') {
          // 修改密码
          if (value !== peopleTable.updatePwdModals.password) {
            callback('2次密码不一致')
          } else {
            callback()
          }
        } else {
          if (value !== peopleTable.addModal.password) {
            callback('2次密码不一致')
          } else {
            callback()
          }
        }
      }
    }
    const peopleTable: peopleTableProps = reactive({
      data: [], // 后台人员列表
      managerPosts: [], // 岗位列表
      loading: false, // loading
      addPersonnelModal: false, // 新增编辑弹窗
      updatePwdModal: false,
      updatePwdModals: {
        updatePwdRef: null,
        loading: false,
        id: '',
        password: '',
        password2: ''
      },
      addModalRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        managePostId: [
          { required: true, message: '请输选择岗位', trigger: 'change' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        password2: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validatorPassword2, trigger: 'blur' }
        ],
        phone: [{ required: true, message: '请输入电话号码', trigger: 'blur' }]
      },
      updatePwdModalRules: {
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        password2: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          {
            validator: validatorPassword2,
            trigger: 'blur',
            t: 'updatePwd'
          }
        ]
      },
      addModal: {
        loading: false,
        // 弹窗数据
        id: '', // 新增为空，编辑需要携带
        managePostId: '', // 管理岗位的id
        name: '', // 姓名
        password: '', // 密码，需要 MD5加密
        password2: '', // 再次确认密码
        phone: '' // 电话号码
      }
    })
    const peopleTableFormRef = ref<FormInstance>()
    const peopleTableUpdatePwdFormRef = ref<FormInstance>()
    const designPostsFormRef = ref<FormInstance>()
    const operatingCompanyFormRef = ref<FormInstance>()
    // 弹窗岗位点数
    const modalPostPoints = computed(() => {
      if (peopleTable.managerPosts && peopleTable.addModal.managePostId) {
        const item = peopleTable.managerPosts.find(
          (pe) => pe.id === peopleTable.addModal.managePostId
        )
        return item?.percentagePoints
      }

      return ''
    })
    const setRowStyle = () => {
      return { backgroundColor: 'rgba(255, 255, 255, 100)' }
    }
    // ====================运营中的公司数据===================
    interface OperatingCompanyProps {
      tableData: Array<any>
      tableLoading: boolean
      addModal: boolean
      modal: any
      addmodalRule: any
    }

    const operatingCompany: OperatingCompanyProps = reactive({
      tableData: [],
      tableLoading: false,
      addModal: false,
      addmodalRule: {
        contractAddress: [{ required: true, message: '请输入合同地址', trigger: 'blur' }],
        fullName: [{ required: true, message: '请输入公司全称', trigger: 'blur' }],
        operatingStatus: [{ required: true, message: '请选择提成点数', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        shortName: [{ required: true, message: '请输入简称', trigger: 'blur' }],
        taxId: [{ required: true, message: '请输入税号', trigger: 'blur' }],
        blank: [{ required: true, message: '请输入银行卡账号名称', trigger: 'blur' }]
      },
      modal: {
        id: '',
        contractAddress: '', // 合同地址
        fullName: '', // 公司全称
        operatingStatus: 0, // 运营中状态，营运状态(0营运中 1已注销)
        phone: '', // 联系电话
        remark: '', // 备注(限200字符)
        shortName: '', // 简称
        taxId: '', // 税号
        blank: ''// 银行卡账号名称
      }
    })
    // 编辑打开弹窗
    const openOperatingCompany = (row: any) => {
      const { id, contractAddress, fullName, phone, remark, shortName, taxId, blank } = row
      operatingCompany.modal.id = id
      operatingCompany.modal.contractAddress = contractAddress
      operatingCompany.modal.fullName = fullName
      operatingCompany.modal.phone = phone
      operatingCompany.modal.remark = remark
      operatingCompany.modal.shortName = shortName
      operatingCompany.modal.taxId = taxId
      operatingCompany.modal.blank = blank
      operatingCompany.addModal = true
    }
    // 弹窗关闭
    const closeModal = () => {
      // 清空数据
      operatingCompany.modal.id = ''
      operatingCompany.modal.contractAddress = '' // 合同地址
      operatingCompany.modal.fullName = '' // 公司全称
      operatingCompany.modal.operatingStatus = 0 // 运营中状态，营运状态(0营运中 1已注销)
      operatingCompany.modal.phone = '' // 联系电话
      operatingCompany.modal.remark = '' // 备注(限200字符)
      operatingCompany.modal.shortName = '' // 简称
      operatingCompany.modal.taxId = '' // 税号
      operatingCompany.modal.blank = ''// 银行卡账号名称
    }
    // 新增
    const operatingCompanySubmit = async (FormRef: FormInstance | undefined) => {
      if (!FormRef) return
      FormRef.validate(async (valid) => {
        if (valid) {
          const sucess = (code: number) => {
            if (code === 200) {
              ElMessage({
                type: 'success',
                message: '操作成功'
              })
              // 获取新的列表
              getOperatingCompanyLists()
              // 关闭弹窗
              operatingCompany.addModal = false
            }
          }
          if (operatingCompany.modal.id) {
            const { code } = await operatingCompanyUpdate({
              ...operatingCompany.modal
            })
            sucess(code)
          } else {
            const { code } = await operatingCompanySave({
              ...operatingCompany.modal
            })
            sucess(code)
          }
        }
      })
    }
    const getOperatingCompanyLists = async () => {
      operatingCompany.tableLoading = true
      const { code, data } = await getOperatingCompanyList({
        limit: -1,
        page: 1,
        operatingStatus: 0
      })
      if (code === 200 && data) {
        operatingCompany.tableData = data.list || []
      }
      operatingCompany.tableLoading = false
    }

    // 删除
    const deleteOperatingCompany = async (id: string) => {
      ElMessageBox.confirm('确定删除该项吗?', '删除', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { code } = await operatingCompanyDelete(id)
        if (code === 200) {
          getOperatingCompanyLists()
        }
      })
    }
    // ====================================================

    // ====================职位分工=========================

    const openDesignPostsModal = (row:any) => { // 新增编辑打开弹窗
      if (row && row.id) {
        const { id, name, percentagePoints } = row
        designPosts.modals.id = id
        designPosts.modals.name = name
        designPosts.modals.percentagePoints = percentagePoints
      } else {
        designPosts.modals.id = ''
        designPosts.modals.name = ''
        designPosts.modals.percentagePoints = ''
      }
      designPosts.addModal = true
    }

    // 新增编辑保存
    const submitDesignPosts = async (FormRef: FormInstance | undefined) => {
      if (!FormRef) return
      FormRef.validate(async (valid) => {
        if (valid) {
          const { name, percentagePoints, id } = designPosts.modals
          const sucess = (code: number) => {
            if (code === 200) {
              ElMessage({
                type: 'success',
                message: '操作成功'
              })
              // 获取新的列表
              getDesignPosts()
              // 关闭弹窗
              designPosts.addModal = false
            }
          }
          if (!id) {
            const { code } = await designPostSave({
              name, percentagePoints, id
            })
            sucess(code)
          } else {
            const { code } = await designPostUpdate({
              name, percentagePoints, id
            })
            sucess(code)
          }
        }
      })
    }

    // 职位分工-删除
    const deleteDesignPosts = async (id: string) => {
      ElMessageBox.confirm('确定删除该项吗?', '删除', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { code } = await designPostDelete(id)
        if (code === 200) {
          getDesignPosts()
        }
      })
    }
    const designPosts = reactive({
      tableLoading: false,
      addModal: false,
      tableData: [],
      modals: {
        loading: false,
        name: '',
        id: '',
        percentagePoints: '',
        addModalRules: {
          name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
          percentagePoints: [{ required: true, message: '请选择提成点数', trigger: 'change' }]
        }
      }
    })
    const getDesignPosts = async () => {
      designPosts.tableLoading = true
      const { code, data } = await getDesignPost()
      if (code === 200) {
        designPosts.tableData = data || []
        console.log('职位分工列表:', data)
      }
      designPosts.tableLoading = false
    }

    // ====================后台管理人员交互==================

    // 获取后台管理人员列表
    const getSysUsers = async () => {
      peopleTable.loading = true
      const { code, data } = await getSysUser()
      if (code === 200 && data) {
        peopleTable.data = data.list || []
      } else {
        peopleTable.data = []
      }
      peopleTable.loading = false
    }

    // 获取管理岗位列表
    const getManagerPosts = async () => {
      const { code, data } = await getManagerPost()
      if (code === 200) {
        peopleTable.managerPosts = data || []
      }
    }

    // 新建后台管理人员打开弹窗
    const addPersonnelClick = async () => {
      peopleTable.addPersonnelModal = true
      peopleTable.addModal.loading = true
      await getManagerPosts()
      // 初始化弹窗状态
      peopleTable.addModal.managePostId = ''
      peopleTable.addModal.id = ''
      peopleTable.addModal.name = ''
      peopleTable.addModal.phone = ''
      peopleTable.addModal.password = ''
      peopleTable.addModal.password2 = ''
      peopleTable.addModal.loading = false
    }

    // 新增后台管理人员
    const addAddSysUsers = async (query: SysUserRequestProps) => {
      const { code } = await addAddSysUser(query)
      if (code === 200) {
        ElMessage({
          type: 'success',
          message: '新增成功'
        })
        getSysUsers()
        peopleTable.addModal.loading = false
        peopleTable.addPersonnelModal = false
      }
    }

    // 编辑后台人员
    const updateAddSysUsers = async (query: SysUserRequestProps) => {
      const { code } = await updateAddSysUser(query)
      if (code === 200) {
        ElMessage({ type: 'success', message: '编辑成功' })
        getSysUsers()
        peopleTable.addModal.loading = false
        peopleTable.addPersonnelModal = false
      }
    }
    // 新增/编辑后台管理人员弹窗提交
    const submitAddPersonnelModal = async (
      peopleTableFormRef: FormInstance | undefined
    ) => {
      if (!peopleTableFormRef) return
      peopleTableFormRef.validate(async (valid) => {
        if (valid) {
          console.log('submit!')
          const { id, name, phone, managePostId, password } =
            peopleTable.addModal
          peopleTable.addModal.loading = true
          const query = {
            id,
            name,
            phone,
            managePostId,
            password: md5Encode(password)
          }
          // 新增
          if (!peopleTable.addModal.id) {
            addAddSysUsers(query)
          } else {
            updateAddSysUsers(query)
          }
        }
      })
    }
    // 编辑后台人员弹窗，初始化元数据
    const handlePeopleEditClick = async (row: any) => {
      const { id, managePostId, name, phone } = row
      peopleTable.addPersonnelModal = true
      peopleTable.addModal.loading = true
      peopleTable.addModal.id = id
      peopleTable.addModal.managePostId = managePostId
      peopleTable.addModal.name = name
      peopleTable.addModal.phone = phone
      peopleTable.addModal.password = ''
      peopleTable.addModal.password2 = ''
      if (peopleTable.managerPosts.length === 0) {
        await getManagerPosts()
      }
      peopleTable.addModal.loading = false
    }

    // 修改后台人员密码
    const handlePeopleUpdatePwdlick = (row: any) => {
      const { id } = row
      peopleTable.updatePwdModals.id = id
      peopleTable.updatePwdModal = true
    }

    // 修改密码提交
    const submitUpdatePersonnelPwdModal = async (
      FormRef: FormInstance | undefined
    ) => {
      if (!FormRef) return
      FormRef.validate(async (valid) => {
        if (valid) {
          console.log('submit!')
          const { code } = await updateSysUserPassword({
            id: peopleTable.updatePwdModals.id,
            newPassword: md5Encode(peopleTable.updatePwdModals.password)
          })
          if (code === 200) {
            peopleTable.updatePwdModal = false
            ElMessage({ type: 'success', message: '密码修改成功' })
          }
        }
      })
    }

    // 删除后台人员
    const handlePeopleDeletelick = async (row: any) => {
      ElMessageBox.confirm(`确定删除${row.name}?`, '删除', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { code } = await deleteSysUser({ id: row.id })
        if (code === 200) {
          // 删除改成员
          const index = peopleTable.data.findIndex((item) => item.id === row.id)
          if (index > -1) {
            peopleTable.data.splice(index, 1)
            ElMessage({ type: 'success', message: '删除成功' })
          }
        }
      })
    }

    // ==================================================

    onMounted(() => {
      getOperatingCompanyLists()
      getDesignPosts()
      getSysUsers()
    })

    const showRuleModal = ref(false) // 后台配置说明
    const addCompanyModal = ref(false) // 新增公司弹窗
    const addDivisionModal = ref(false) // 新增分工弹窗
    const addDepartmentModal = ref(false) // 新建部门弹窗

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

    return {
      percentagePointss,
      designPostsFormRef,
      setRowStyle,
      headerData,
      jobHeaderData,
      departmentHeaderData,
      peopleHeaderData,
      CirclePlus,
      showRuleModal,
      addCompanyModal,
      form,
      addDivisionModal,
      addDepartmentModal,
      peopleTable,
      addPersonnelClick,
      submitAddPersonnelModal,
      modalPostPoints,
      peopleTableFormRef,
      handlePeopleEditClick,
      handlePeopleUpdatePwdlick,
      submitUpdatePersonnelPwdModal,
      peopleTableUpdatePwdFormRef,
      handlePeopleDeletelick,
      operatingCompany,
      designPosts,
      openDesignPostsModal,
      submitDesignPosts,
      deleteDesignPosts,
      operatingCompanyFormRef,
      operatingCompanySubmit,
      openOperatingCompany,
      closeModal,
      deleteOperatingCompany
    }
  }
})
</script>

<style lang="less" scoped>
.operating-company-container {
  box-sizing: border-box;
  padding-bottom: 20px;
  width: 100%;
  min-height: 500px;
  .tab-item {
    width: 160px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 6px;
    background-color: rgba(243, 245, 248, 100);
    font-size: 16px;

    color: rgba(16, 16, 16, 100);
  }
  .job-division {
    .job-division-header {
      margin: 20px 0 13px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
.rule-modal {
  max-height: calc(100vh - 300px);
  // overflow-y: auto;
  div {
    margin: 0;
    padding: 0;
  }
  p {
    padding: 0;
  }
}
.modal {
  .el-form-item {
    margin: 20px 0 0 0;
  }
  .dialog-footer {
    .btn {
      width: 200px;
    }
  }
}
.mr40 {
  margin-right: 40px;
}
.w100 {
  width: 100%
}
</style>
