<template>
  <div class="settings-content">
    <view class="header-content">
      <div class="tabs-content">
        <div
          class="tab-item"
          @click="changeTab(1)"
          :class="[tabIndex === 1 && 'active-tab']"
        >
          营运中公司
        </div>
        <div
          class="tab-item"
          @click="changeTab(2)"
          :class="[tabIndex === 2 && 'active-tab']"
        >
          已注销公司
        </div>
      </div>
      <div class="right-bts">
        <div class="rule-btn" @click="openRule">查看规则</div>
        <el-button size="large" @click="addCompany" :icon="CirclePlus"
          >新建公司</el-button
        >
      </div>
    </view>
    <div class="content">
      <operating-company ref="operating" v-show="tabIndex === 1" />
      <company-cancelled ref="cancelled" v-show="tabIndex === 2" />
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
    const tabIndex: Ref<number> = ref(1)
    const operating: Ref<HTMLElement | null> = ref(null)
    const cancelled = ref(null)
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
        (operating.value as any).addCompanyModal = true
      }
    }
    return {
      CirclePlus,
      tabIndex,
      openRule,
      changeTab,
      operating,
      cancelled,
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
      .active-tab {
        background-color: rgba(224, 231, 236, 100);
      }
      .rule-btn {
        width: 100px;
        margin-right: 20px;
      }
      & > div {
        height: 40px;
        line-height: 40px;
        text-align: center;
        width: 160px;
        border-radius: 6px;
        background-color: rgba(243, 245, 248, 100);
        cursor: pointer;
      }
      & > div:nth-child(2) {
        margin-left: 10px;
      }
    }
  }
  .content {
    margin-top: 20px;
  }
}
</style>
