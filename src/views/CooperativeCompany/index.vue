<template>
  <div class="cooperative-company-container">
    <div class="filter-header d-flex d-f-row-bet">
      <div class="filter-left d-flex d-f-row-center">
        <d-tab
          v-for="tab in tabs"
          :key="tab.id"
          :text="tab.text"
          :mr="10"
          @click="changeTab(tab.id)"
          :active="activeTab === tab.id"
        />
      </div>
      <div class="filter-right">
        <d-add text="添加公司" @click="addCompanyModal = true" />
      </div>
    </div>
    <!-- 表格 -->
    <div class="table-content">
      <el-table
        border
        :stripe="true"
        :height="height"
        v-loading="tableLoading"
        size="large"
        :data="tableData"
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
            <template v-if="scope.column.property === 'status'">
              {{scope.row[scope.column.property] === '0'? '待合作': '合作中'}}
            </template>
          </template>
        </el-table-column>

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
    <!-- 添加公司弹窗 -->
    <el-drawer
      size="50%"
      v-model="addCompanyModal"
      title="新增公司"
      :with-header="true"
    >
      <template #title>
        <p class="t-c t-main-color f20">新增公司</p>
      </template>
      <div class="drawer-content d-flex d-f-row-bet">
        <div class="drawer-content-left">
          <el-form size="large" :model="form" label-width="110px">
            <el-form-item label="简称">
              <el-input placeholder="请输入简称" v-model="form.name" />
            </el-form-item>
            <el-form-item label="合作状态">
              <el-select
                style="width: 100%"
                v-model="form.region"
                placeholder="请选择合作状态"
              >
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input placeholder="请输入联系电话" v-model="form.name" />
            </el-form-item>
            <el-form-item label="银行账号/名称">
              <el-input placeholder="请输入银行账号/名称" v-model="form.name" />
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
            <el-form-item label="公司全名">
              <el-input placeholder="请输入公司全名" v-model="form.name" />
            </el-form-item>
            <el-form-item label="合同地址">
              <el-input placeholder="请输入合同地址" v-model="form.name" />
            </el-form-item>
            <el-form-item label="税号">
              <el-input placeholder="请输入税号" v-model="form.name" />
            </el-form-item>
            <el-form-item label="客户联系方式">
              <el-input placeholder="请输入客户联系方式" v-model="form.name" />
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
import { defineComponent, ref, Ref, reactive, onMounted, nextTick } from 'vue'
import { getPartyACompanyList } from '@/request/index'
const tableHeaderData = [
  { name: '简称', prop: 'shortName' },
  { name: '公司全名', prop: 'fullName' },
  { name: '合作状态', prop: 'status' },
  { name: '邮寄合同地址', prop: 'contractAddress', width: 160 },
  { name: '联系电话', prop: 'phone' },
  { name: '税号', prop: 'taxId' },
  { name: '银行账号/名称', prop: '', width: 160 },
  { name: '客户联系方式', prop: 'customerContactInfo', width: 160 },
  { name: '备注', prop: 'remark' }
]
export default defineComponent({
  setup () {
    const tabs = reactive([
      { text: '全部公司', id: 2 },
      { text: '合作中公司', id: 1 },
      { text: '待合作公司', id: 0 }
    ])
    const activeTab: Ref<number> = ref(2)
    const tableLoading: Ref<boolean> = ref(false)
    const addCompanyModal: Ref<boolean> = ref(false)
    const changeTab = (id: number): void => {
      if (activeTab.value !== id) {
        activeTab.value = id
        getPartyACompanyLists()
      }
    }
    const height: Ref<number> = ref(500)
    const getPartyACompanyLists = async () => {
      tableLoading.value = true
      try {
        const query = {
          limit: -1,
          page: 1,
          status: activeTab.value === 2 ? '' : activeTab.value
        }
        const { code, data } = await getPartyACompanyList(query)
        if (code === 200) {
          console.log('表格-list:', data)
          tableData.value = data.list
        }
      } finally {
        tableLoading.value = false
      }
    }
    onMounted(() => {
      getPartyACompanyLists()
      nextTick(() => {
        height.value = document.documentElement.clientHeight - 160
      })
    })
    const tableData = ref([])
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
      tabs,
      activeTab,
      changeTab,
      tableData,
      tableHeaderData,
      height,
      addCompanyModal,
      form,
      tableLoading
    }
  }
})
</script>

<style lang="less" scoped>
.cooperative-company-container {
  .table-content {
    margin-top: 20px;
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
}
</style>
