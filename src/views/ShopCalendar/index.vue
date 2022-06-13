<template>
  <div class="shop-calendar-container">
    <div class="filtter-box">
      <div class="left-filter">
        <div class="year">
          <el-date-picker
            size="large"
            @change="getPlanProjectScheduleLists"
            v-model="query.year"
            format="YYYY"
            value-format="YYYY"
            type="year"
            placeholder="请选择年份"
          />
        </div>
        <div class="painter">
          <el-select
            v-model="query.sort"
            placeholder="按照画师名排序"
            @change="getPlanProjectScheduleLists"
            size="large"
          >
            <el-option label="升序" :value="1" />
            <el-option label="降序" :value="2" />
          </el-select>
        </div>
        <div class="2d-painter">
          <el-select
            v-model="query.designPostId"
            @change="getPlanProjectScheduleLists"
            clearable
            placeholder="按岗位分工筛选"
            size="large"
          >
            <el-option
              v-for="item in designPosts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
      </div>
      <div class="right-filter">
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
    <div class="mouth-select">
      <month @change="changeMonth" />
    </div>
    <!-- <my-table style="margin-bottom: 20px" /> -->
    <!-- <my-table style="margin-bottom: 20px" /> -->
    <my-table v-if="false" />
    <vxe-table
      style="width: 100%"
      border
      :height="height"
      :loading="tableLoading"
      :column-config="{ resizable: true }"
      :scroll-y="{ enabled: true }"
      :span-method="mergeRowMethod"
      :data="tableData"
      class="reverse-table"
    >
      <vxe-column field="staffId" fixed="left" title="姓名" :width="120">
        <template #default="{ row }">
          <span>{{ row.staffName }}</span>
        </template>
      </vxe-column>
      <vxe-column
        :field="head.prop"
        :title="head.name"
        v-for="(head, index) in tableHeader"
        :key="index"
        :width="120"
      />
    </vxe-table>

    <!-- <el-table
      :data="tableData"
      border
      style="width: 100%"
      :span-method="objectSpanMethod"
    >
      <el-table-column label="姓名" prop="staffName" fixed />
      <el-table-column
        v-for="day in tableHeader"
        :key="day.prop"
        :prop="day.prop"
        :label="day.name"
        width="100"
      />
    </el-table> -->
  </div>
</template>

<script lang="ts">
/**
 * @description 后台设置页面
 * 1-100% 提成点数
 * pdf 预览
 *
 */
import { defineComponent, ref, onMounted, reactive, nextTick, Ref } from 'vue'
import { VxeTablePropTypes } from 'vxe-table'
import Table from './components/Table.vue'
import { getPlanProjectScheduleList, getDesignPost } from '@/request/index'
const getMonthDay = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}
interface monthEventProps {
  label: string
  value: number
}
export default defineComponent({
  components: {
    'my-table': Table
  },
  setup () {
    const year = ref('2022')
    const painterName = ref('')
    const spanArr: any = ref([])
    const designPosts: any = ref([])
    const tableHeader: any = ref([])
    const tableData: any = ref([])
    const height: Ref<number> = ref(300)
    const demo3: any = reactive({ tableData: [] })

    const query: any = ref({
      year: new Date().getFullYear(), // 年份
      month: new Date().getMonth() + 1, // 月份
      limit: -1,
      page: 1,
      sort: 1, // 画师名排序 1升序 2降序
      designPostId: '' // 职位id
    })
    const changeMonth = (mouth: monthEventProps): void => {
      query.value.month = mouth.value + 1
      getPlanProjectScheduleLists()
    }
    // 列表
    const getPlanProjectScheduleLists = async () => {
      const { code, data } = await getPlanProjectScheduleList({
        ...query.value
      })
      const dates: number = getMonthDay(query.value.year, query.value.month - 1)
      tableHeader.value = []
      for (let i = 0; i < dates; i++) {
        tableHeader.value.push({
          prop: `day-${i + 1}`,
          name: `${query.value.month}月${i + 1}日`
        })
      }

      if (code === 200) {
        const newData: any = []
        if (data && data.list) {
          data.list.map((item: any) => {
            if (item.projectList && item.projectList.length > 0) {
              item.projectList.map((citem: any) => {
                const items = { ...item }
                if (citem.startDate) {
                  // 获取开始时间
                  const start = new Date(citem.startDate).getDate()
                  for (let i = start; i <= dates; i++) {
                    items[`day-${i}`] = citem.projectName
                  }
                }
                newData.push(items)
              })
            } else {
              newData.push(item)
            }
          })
        }
        // rowspan(newData)
        tableData.value = newData
        // demo3.tableData = newData
        console.log('tableHeader.value:', tableHeader.value)
        console.log('tableData:', tableData.value)
      }
    }

    // 职位列表
    const getDesignPosts = async () => {
      const { code, data } = await getDesignPost()
      if (code === 200) {
        designPosts.value = data || []
      }
    }

    // 合并单元格
    const objectSpanMethod = ({ rowIndex, columnIndex }: any) => {
      if (columnIndex === 0) {
        const _row = spanArr.value[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex === 1) {
        const _row = spanArr.value[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    }

    // 通用行合并函数（将相同多列数据合并为一行）
    const mergeRowMethod: VxeTablePropTypes.SpanMethod = ({
      row,
      _rowIndex,
      column,
      visibleData
    }) => {
      const fields = ['staffId']
      const cellValue = row[column.property]
      if (cellValue && fields.includes(column.property)) {
        const prevRow = visibleData[_rowIndex - 1]
        let nextRow = visibleData[_rowIndex + 1]
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0, row: 5 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow[column.property] === cellValue) {
            nextRow = visibleData[++countRowspan + _rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    }
    onMounted(() => {
      nextTick(() => {
        height.value = document.documentElement.clientHeight - 230
      })
      getPlanProjectScheduleLists()
      getDesignPosts()
    })
    return {
      changeMonth,
      year,
      painterName,
      query,
      designPosts,
      tableHeader,
      getPlanProjectScheduleLists,
      tableData,
      objectSpanMethod,
      mergeRowMethod,
      demo3,
      height
    }
  }
})
</script>

<style lang="less" scoped>
.shop-calendar-container {
  /*滚动条整体部分*/
  .reverse-table ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  /*滚动条的轨道*/
  .reverse-table ::-webkit-scrollbar-track {
    background-color: #ffffff;
  }
  /*滚动条里面的小方块，能向上向下移动*/
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
  }
  /*边角，即两个滚动条的交汇处*/
  .reverse-table ::-webkit-scrollbar-corner {
    background-color: #ffffff;
  }
  width: 100%;
  .filtter-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    .left-filter {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      & > div {
        margin-right: 10px;
      }
    }
  }
}
</style>
