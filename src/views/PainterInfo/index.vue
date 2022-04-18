<template>
  <div class="painter-info-container">
    <div class="filter-header-content d-flex d-f-row-bet">
      <div class="filter-left d-flex d-f-col-center">
        <d-tab
          v-for="tab in tabs"
          :key="tab.id"
          :text="tab.name"
          :active="tab.id === activeTabIndex"
          :mr="10"
          @click="changeTab(tab.id)"
        />
      </div>
      <div class="filter-right">
        <d-add text="添加外发" @click="addOutgoingModal = true" />
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
    <!-- 添加外发弹窗 -->
    <el-drawer
      size="50%"
      v-model="addOutgoingModal"
      title="新增外发"
      :with-header="true"
    >
      <template #title>
        <p class="t-c t-main-color f20">新增外发</p>
      </template>
      <div class="drawer-content d-flex d-f-row-bet">
        <div class="drawer-content-left">
          <el-form size="large" :model="form" label-width="110px">
            <el-form-item label="姓名">
              <el-input placeholder="请输入姓名" v-model="form.name" />
            </el-form-item>
            <el-form-item label="身份证">
              <el-input placeholder="请输入身份证号码" v-model="form.name" />
            </el-form-item>
            <el-form-item label="合同地址">
              <el-input placeholder="请输入合同地址" v-model="form.name" />
            </el-form-item>
            <el-form-item label="合同扫描件">
              <!-- <el-icon :size="24" color="red">
                <Plus />
              </el-icon> -->

              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
                <!-- <el-icon :size="24" color="red">
                  <edit />
                </el-icon> -->
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <div class="drawer-content-right">
          <el-form size="large" :model="form" label-width="100px">
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

            <el-form-item label="联系方式">
              <el-input placeholder="请输入电话号码" v-model="form.name" />
            </el-form-item>
            <el-form-item label="状态">
              <el-select
                style="width: 100%"
                v-model="form.region"
                placeholder="请选择状态"
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
import { defineComponent, ref, onMounted, nextTick, Ref, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const tableHeaderData = [
  { name: '姓名', prop: 'name' },
  { name: '岗位', prop: 'name' },
  { name: '身份证', prop: 'name' },
  { name: '联系方式', prop: 'name', width: 160 },
  { name: '地址', prop: 'name' },
  { name: '合同扫描件', prop: 'file' },
  { name: '备注', prop: 'name', width: 160 }
]

export default defineComponent({
  components: {
    Plus
  },
  setup () {
    const height: Ref<number> = ref(500)
    const addOutgoingModal: Ref<boolean> = ref(false)
    const tabs = ref([
      { name: '全部外发', id: 0 },
      { name: '画师', id: 1 },
      { name: '3D建模师', id: 2 },
      { name: 'UI设计师', id: 3 },
      { name: '已离职外发', id: 4 }
    ])
    const activeTabIndex = ref(0)
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
      if (activeTabIndex.value !== id) {
        activeTabIndex.value = id
      }
    }
    onMounted(() => {
      nextTick(() => {
        height.value = document.documentElement.clientHeight - 160
      })
    })

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
      Plus,
      tabs,
      activeTabIndex,
      changeTab,
      tableHeaderData,
      tableData,
      height,
      addOutgoingModal,
      form
    }
  }
})
</script>

<style lang="less" scoped>
.painter-info-container {
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
</style>
