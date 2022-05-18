<template>
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
    </el-table>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { getOperatingCompanyList } from '@/request/index'
const headerData = [
  { name: '简称', key: 'shortName' },
  { name: '公司全名', key: 'fullName' },
  { name: '邮寄合同地址', key: 'contractAddress' },
  { name: '税号', key: 'taxId' },
  { name: '联系电话', key: 'phone' },
  { name: '银行账号/名称', key: 'name' },
  { name: '备注', key: 'remark' }
]
export default defineComponent({
  setup () {
    interface OperatingCompanyProps {
      tableData: Array<any>
      tableLoading: boolean
    }
    const deleteOperatingCompany = (id: string) => {
      console.log(id)
    }
    const getOperatingCompanyLists = async () => {
      operatingCompany.tableLoading = true
      const { code, data } = await getOperatingCompanyList({
        limit: -1,
        page: 1,
        operatingStatus: 1
      })

      if (code === 200 && data) {
        operatingCompany.tableData = data.list || []
      }
      operatingCompany.tableLoading = false
    }
    onMounted(() => {
      getOperatingCompanyLists()
    })
    const operatingCompany: OperatingCompanyProps = reactive({
      tableData: [],
      tableLoading: false
    })
    return {
      operatingCompany,
      headerData,
      deleteOperatingCompany
    }
  }
})
</script>

<style lang="less" scoped>

</style>
