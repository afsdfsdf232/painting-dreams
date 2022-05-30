<template>
  <div class="shop-calendar-container">
    <div class="filtter-box">
      <div class="left-filter">
        <div class="year">
          <el-date-picker
            size="large"
            @change="getPlanProjectScheduleLists"
            v-model="query.year"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
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
    <my-table style="margin-bottom: 20px" />
    <my-table style="margin-bottom: 20px" />
    <my-table />
  </div>
</template>

<script lang="ts">
/**
 * @description 后台设置页面
 * 1-100% 提成点数
 * pdf 预览
 *
 */
import { defineComponent, ref, onMounted } from 'vue'
import Table from './components/Table.vue'
import { getPlanProjectScheduleList, getDesignPost } from '@/request/index'
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
    const designPosts: any = ref([])
    const query: any = ref({
      year: new Date().getFullYear(), // 年份
      month: new Date().getMonth() + 1, // 月份
      limit: -1,
      page: 1,
      sort: 1, // 画师名排序 1升序 2降序
      designPostId: '' // 职位id
    })
    const changeMonth = (mouth: monthEventProps): void => {
      console.log(mouth)
      query.value.month = mouth.value + 1
      getPlanProjectScheduleLists()
    }
    // 列表
    const getPlanProjectScheduleLists = async () => {
      const { code, data } = await getPlanProjectScheduleList({
        ...query.value
      })
      if (code === 200) {
        console.log('data:', data)
        const mocks = [
          {
            projectList: [
              {
                projectId: 0,
                projectName: '项目1',
                startDate: '2022-01-01',
                status: '1'
              },
              {
                projectId: 1,
                projectName: '项目2',
                startDate: '2022-01-01',
                status: '1'
              },
              {
                projectId: 2,
                projectName: '项目3',
                startDate: '2022-01-01',
                status: '1'
              },
              {
                projectId: 3,
                projectName: '项目4',
                startDate: '2022-01-01',
                status: '1'
              }
            ],
            staffId: 0,
            staffName: '人员一'
          }
        ]
      }
    }

    // 职位列表
    const getDesignPosts = async () => {
      const { code, data } = await getDesignPost()
      if (code === 200) {
        console.log('data-d', data)
        designPosts.value = data || []
      }
    }

    onMounted(() => {
      getPlanProjectScheduleLists()
      getDesignPosts()
    })
    return {
      changeMonth,
      year,
      painterName,
      query,
      designPosts,
      getPlanProjectScheduleLists
    }
  }
})
</script>

<style lang="less" scoped>
.shop-calendar-container {
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
