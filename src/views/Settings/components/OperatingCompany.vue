<template>
  <div class="operating-company-container">
    <el-table
      border
      :stripe="true"
      height="250"
      size="large"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        align="center"
        v-for="(head, index) in headerData"
        :key="index"
        :prop="head.key"
        :label="head.name"
        width="180"
      />
    </el-table>
    <div class="d-flex">
      <!-- 职位分工 -->
      <div class="job-division w50 mr40">
        <div class="job-division-header">
          <div class="tab-item">职位分工</div>
          <el-button
            size="large"
            @click="addDivisionModal = true"
            :icon="CirclePlus"
            >新增分工</el-button
          >
        </div>
        <el-table
          border
          :stripe="true"
          height="250"
          size="large"
          :data="tableData"
        >
          <el-table-column
            v-for="(head, index) in jobHeaderData"
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

      <!-- 部门管理 -->
      <div class="job-division w50">
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
          <template #default>
            <el-button type="text" size="small" @click="handleClick"
              >编辑</el-button
            >
            <el-button type="text" size="small">修改密码</el-button>
            <el-button type="text" size="small">删除人员</el-button>
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
      v-model="addCompanyModal"
      top="55px"
      title="新增运营公司"
      width="35%"
      center
    >
      <div class="rule-modal modal scrollbar">
        <el-form size="large" :model="form" label-width="120px">
          <el-form-item label="简称">
            <el-input placeholder="请输入简称" v-model="form.name" />
          </el-form-item>
          <el-form-item label="公司全名">
            <el-select
              style="width: 100%"
              v-model="form.region"
              placeholder="请选择公司全名"
            >
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="邮寄合同地址">
            <el-input placeholder="请输入邮寄合同地址" v-model="form.name" />
          </el-form-item>
          <el-form-item label="税号">
            <el-input placeholder="请输入税号" v-model="form.name" />
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input placeholder="请输入联系电话" v-model="form.name" />
          </el-form-item>
          <el-form-item label="银行账号/名称">
            <el-input placeholder="请输入银行账号/名称" v-model="form.name" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              placeholder="请输入备注"
              type="textarea"
              v-model="form.name"
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
            @click="addCompanyModal = false"
            >保存</el-button
          >
        </div>
      </template>
    </el-dialog>

    <!-- 新增分工弹窗 -->
    <el-dialog
      v-model="addDivisionModal"
      top="55px"
      title="新增岗位"
      width="35%"
      center
    >
      <div class="rule-modal modal scrollbar">
        <el-form size="large" :model="form" label-width="120px">
          <el-form-item label="岗位名称">
            <el-input placeholder="请输入岗位名称" v-model="form.name" />
          </el-form-item>
          <el-form-item label="所属部门">
            <el-select
              style="width: 100%"
              v-model="form.region"
              placeholder="请选择所属部门"
            >
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="提成点数">
            <el-select
              style="width: 100%"
              v-model="form.region"
              placeholder="请选择提成点数"
            >
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
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
            @click="addCompanyModal = false"
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
              placeholder="请输入密码"
              type="password"
              v-model="peopleTable.addModal.password"
            />
          </el-form-item>
          <el-form-item label="确定密码" prop="password2">
            <el-input
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, computed } from 'vue'
import { CirclePlus } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { getSysUser, getManagerPost, addAddSysUser } from '@/request/index'
import {
  SysUserRequestProps,
  UersssyListItemProps
} from '@/request/requestProps'
import { md5Encode } from '@/utils/index'
interface peopleTableProps {
  data: Array<UersssyListItemProps>
  managerPosts: Array<any>
  addModal: any
  addPersonnelModal: boolean
  loading: boolean
}
const headerData = [
  { name: '简称', key: 'name' },
  { name: '公司全名', key: 'name' },
  { name: '邮寄合同地址', key: 'name' },
  { name: '税号', key: 'name' },
  { name: '联系电话', key: 'name' },
  { name: '银行账号/名称', key: 'name' },
  { name: '备注', key: 'name' }
]

const jobHeaderData = [
  {
    name: '名称',
    key: 'name'
  },
  { name: '返点', key: 'name' },
  { name: '所属部门', key: 'name' }
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
      if (!value) {
        callback('请输入确认密码')
      } else {
        if (value !== peopleTable.addModal.password) {
          callback('2次密码不一致')
        } else {
          callback()
        }
      }
    }
    const peopleTable: peopleTableProps = reactive({
      data: [], // 后台人员列表
      managerPosts: [], // 岗位列表
      loading: false, // loading
      addPersonnelModal: false, // 新增编辑弹窗
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
    const tableData = ref([
      {
        name: '测试数据'
      },
      { name: '测试数据' },
      { name: '测试数据' },
      { name: '测试数据' },
      { name: '测试数据' }
    ])
    const setRowStyle = () => {
      return { backgroundColor: 'rgba(255, 255, 255, 100)' }
    }

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
      await getManagerPosts()
      peopleTable.addPersonnelModal = true
    }

    // 新增后台管理人员
    const addAddSysUsers = async (query: SysUserRequestProps) => {
      const { code, data } = await addAddSysUser(query)
      if (code === 200) {
        ElMessage({
          type: 'success',
          message: '新增成功'
        })
        getSysUsers()
        peopleTable.addModal.loading = false
        peopleTable.addPersonnelModal = false
      }
      console.log('code:', code)
      console.log('data:', data)
    }
    // 新增/编辑后台管理人员弹窗提交
    const submitAddPersonnelModal = async (
      peopleTableFormRef: FormInstance | undefined
    ) => {
      if (!peopleTableFormRef) return
      peopleTableFormRef.validate(async (valid) => {
        if (valid) {
          console.log('submit!')
          const {
            // id = 0,
            name,
            phone,
            managePostId,
            password
          } = peopleTable.addModal
          peopleTable.addModal.loading = true
          const query = {
            id: 0,
            name,
            phone,
            managePostId,
            password: md5Encode(password)
          }
          // 新增
          console.log('peopleTable.addModal.id:', peopleTable.addModal.id)
          if (!peopleTable.addModal.id) {
            console.log('add')
            addAddSysUsers(query)
          }
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    onMounted(() => {
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
      setRowStyle,
      headerData,
      jobHeaderData,
      tableData,
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
      peopleTableFormRef
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
  overflow-y: auto;
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
</style>
