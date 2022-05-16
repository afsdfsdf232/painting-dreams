<template>
  <div class="settings-content">
    <view class="header-content">
      <div class="tabs-content">
        <d-tab
          v-for="tab in tabs"
          @click="changeTab(tab.id)"
          :key="tab.id"
          :text="tab.text"
          :active="tab.id === tabIndex"
          :mr="10"
        />
      </div>
      <div class="right-bts">
        <d-tab @click="openRule" text="查看规则" :width="100" :mr="10" />
        <el-button size="large" @click="addCompany" :icon="CirclePlus"
          >新建公司</el-button
        >
      </div>
    </view>
    <div class="content">
      <operating-company ref="operating" v-show="tabIndex === 0" />
      <company-cancelled ref="cancelled" v-show="tabIndex === 1" />
    </div>
  </div>
</template>

<script lang="ts">
import { CirclePlus } from '@element-plus/icons-vue'
import { defineComponent, ref, Ref } from 'vue'
import CompanyCancelled from './components/CompanyCancelled.vue'
import OperatingCompany from './components/OperatingCompany.vue'
export default defineComponent({
  name: 'settings',
  components: {
    'company-cancelled': CompanyCancelled,
    'operating-company': OperatingCompany
  },
  setup () {
    const tabIndex: Ref<number> = ref(0)
    const operating: Ref<HTMLElement | null> = ref(null)
    const cancelled = ref(null)
    const tabs = ref([
      {
        text: '营运中公司',
        id: 0
      },
      {
        text: '已注销公司',
        id: 1
      }
    ])
    const changeTab = (index: number): void => {
      if (tabIndex.value === index) return
      tabIndex.value = index
    }
    const openRule = () => {
      if (operating.value !== null) {
        (operating.value as any).showRuleModal = true
      }
    }
    const addCompany = () => {
      if (operating.value !== null) {
        (operating.value as any).operatingCompany.addModal = true
      }
    }
    return {
      CirclePlus,
      tabIndex,
      openRule,
      changeTab,
      operating,
      cancelled,
      tabs,
      addCompany
    }
  }
})
</script>

<style lang="less" scoped>
.settings-content {
  .header-content {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .tabs-content,
    .right-bts {
      display: flex;
      align-items: center;
    }
  }
  .content {
    margin-top: 20px;
  }
}
</style>
