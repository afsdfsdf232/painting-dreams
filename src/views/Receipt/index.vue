<template>
  <div class="receipt-container">
    <div class="filtter-content d-flex d-f-row-bet">
      <div class="filtter-content-left d-flex">
        <el-date-picker
          style="margin-right: 10px"
          type="month"
          placeholder="请选择年月"
          @change="changeYear"
          v-model="year"
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
        <d-add text="添加发票" @click="openModal" />
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
        v-loading="tableLoading"
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
    <!-- 新增编辑 -->
    <el-drawer
      size="50%"
      v-model="addReceiptModal"
      :title="form.id? '编辑合同': '新增合同'"
      :with-header="true"
    >
      <template #title>
        <p class="t-c t-main-color f20">{{form.id? '编辑合同': '新增合同'}}</p>
      </template>
      <div class="drawer-content d-flex d-f-row-bet">
        <div class="drawer-content-left">
          <el-form size="large" :rules="formRuls" :model="form" ref="leftModalRef" label-width="110px">
            <el-form-item label="姓名" prop="name">
              <el-input placeholder="请输入姓名" v-model="form.name" />
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
              <el-input placeholder="请输入电话号码" v-model="form.phone" />
            </el-form-item>
            <el-form-item label="合同地址" prop="contractAddress">
              <el-input placeholder="请输入合同地址" v-model="form.contractAddress" />
            </el-form-item>
            <el-form-item label="转正日期" prop="positiveTime">
               <el-date-picker
                style="width:100%"
                v-model="form.positiveTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                type="date"
                placeholder="请选择转正日期"
              />
            </el-form-item>
            <el-form-item label="历史调薪" prop="historyWageList">
              <div class="history-wage-list">
                <div class="list" v-for="(item,index) in form.historyWageList" :key="index">
                  <el-date-picker
                    class="list-item left"
                    v-model="item.changeTime"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    type="date"
                    placeholder="选择时间"
                  />
                  <el-input class="list-item right" placeholder="金额" v-model="item.wage" />
                </div>
                <d-add style="width:120px" text="添加" @click="addHistoryWage"/>
              </div>
            </el-form-item>
            <el-form-item label="合同扫描件" prop="contractFileUrl">
              <div class="upload-content" v-if="!form.contractFileUrl">
                <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
                <input class="file-input" type="file" @change="uploadFileChange">
              </div>
              <div v-else class="invoice-file">
                <img :src="form.contractFileUrl" alt="" srcset="">
                <el-icon :size="24" @click="deleteImg" class="delete"><CircleCloseFilled color="#F56C6C"/></el-icon>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="drawer-content-right">
          <el-form size="large" :model="form" :rules="formRuls" ref="rightModalRef" label-width="100px">
            <el-form-item label="职位" prop="designPostId">
              <el-select
                style="width: 100%"
                v-model="form.designPostId"
                placeholder="请选择职位"
              >
                <el-option v-for="design in designPosts" :key="design.id" :label="design.name" :value="design.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="银行名称" prop="bankName">
              <el-input placeholder="请输入银行名称" v-model="form.bankName" />
            </el-form-item>
            <el-form-item label="银行账号" prop="bankAccount">
              <el-input placeholder="请输入银行账号" v-model="form.bankAccount" />
            </el-form-item>
            <el-form-item label="入职时间" prop="entryTime">
               <el-date-picker
               style="width:100%"
                v-model="form.entryTime"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                type="date"
                placeholder="请选择入职时间"
              />
            </el-form-item>
            <el-form-item label="基本工资" prop="basicWage">
              <el-input placeholder="请输入基本工资" v-model="form.basicWage" />
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select
                style="width: 100%"
                v-model="form.status"
                placeholder="请选择状态"
              >
                <el-option label="未合作" value="0" />
                <el-option label="合作中" value="1" />
              </el-select>
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
      </div>
      <template #footer>
        <div class="t-c">
          <el-button
            class="btn"
            type="primary"
            style="width: 200px"
            size="large"
            @click="saveEmployeeClick(leftModalRef,rightModalRef)"
            >保存</el-button
          >
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, nextTick } from 'vue'
import { getInvoiceReceiptList } from '@/request/index'
import { Plus, CircleCloseFilled } from '@element-plus/icons-vue'
const tableHeaderData = [
  { name: '发票编号', prop: 'invoiceNumber', width: 120 },
  { name: '开票日期', prop: 'billingDate', width: 150 },
  { name: '甲方(付款)公司简称', prop: 'partyACompanyShortName', width: 160 },
  { name: '运营(收款)公司简称', prop: 'operatingCompanyShortName', width: 160 },
  { name: '付款银行名称', prop: 'paymentBankName', width: 160 },
  { name: '付款银行账号', prop: 'paymentBankAccount', width: 150 },
  { name: '收款银行名称', prop: 'collectionBankName', width: 160 },
  { name: '收款银行账号', prop: 'collectionBankAccount', width: 150 },
  { name: '包含项目', prop: 'projectList', width: 120 },
  { name: '阶段总价', prop: 'name', width: 130 },
  { name: '阶段单价', prop: 'name', width: 130 },
  { name: '收款状态', prop: 'name', width: 120 },
  // { name: '收款账号/名称', prop: 'name', width: 150 },
  { name: '收款凭证', prop: 'fileList', width: 120 },
  { name: '发票扫描件', prop: 'fileList', width: 120 },
  { name: '备注', prop: 'remark', width: 180 }
]
const tableData:any = ref([])

export default defineComponent({
  components: {
    Plus,
    CircleCloseFilled
  },
  setup () {
    const activeTabIndex: Ref<number> = ref(0)
    const height: Ref<number> = ref(300)
    const year: any = ref(new Date()) // 日期
    const tableLoading = ref(false)
    const addReceiptModal = ref(false)
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
        getInvoiceReceiptLists()
      }
    }
    // 选择年月，获取列表
    const changeYear = () => {
      getInvoiceReceiptLists()
    }
    // 列表
    const getInvoiceReceiptLists = async () => {
      tableLoading.value = true
      const query = {
        limit: -1,
        month: new Date(year.value).getMonth() + 1,
        page: 1,
        partyACompanyId: '',
        year: new Date(year.value).getFullYear()
      }
      const { code, data } = await getInvoiceReceiptList({
        ...query
      })
      if (code === 200) {
        tableData.value = data?.list
      }
      tableLoading.value = false
    }
    // 弹窗内容
    const form = ref({
      id: ''
    })
    // 打开弹窗
    const openModal = () => {
      addReceiptModal.value = true
    }
    onMounted(() => {
      getInvoiceReceiptLists()
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
      year,
      changeYear,
      tableLoading,
      addReceiptModal,
      form,
      openModal
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
  .history-wage-list {
    .list {
      display: flex;
      align-items: center;
      margin-bottom: 6px;
      .list-item {
        width: 50%;
      }
      .left {
        margin-right: 10px;
      }
      .right {
        margin-left: 10px;
      }
    }
  }
}
</style>
