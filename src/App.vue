<script setup lang="ts">
import { onMounted, ref } from 'vue';
onMounted(() => {
  setTimeout(() => window.HSStaticMethods.autoInit(), 100)
});

import MyMenu from './components/MyMenu.vue';
import Radio from './components/Radio.vue';

// Radio组件示例的数据
const tabOptions = ['首页', '分类', '关于', '关于关于关于', '关于3'];
const currentTab = ref(1); // 默认选中"分类"选项

const handleTabChange = (index: number) => {
  console.log(`切换到选项: ${tabOptions[index]}`);
};
</script>

<template>
  <div class="flex">
    <MyMenu />
    <div class="p-4 space-y-6">
      <!-- 基本用法 -->
      <div>
        <h3 class="mb-2 text-sm font-medium">基本用法:</h3>
        <Radio />
      </div>
      <!-- 自定义选项用法 -->
      <div>
        <h3 class="mb-2 text-sm font-medium">自定义选项:</h3>
        <Radio :options="tabOptions" :default-active="currentTab" @update:tab="currentTab = $event"
          @change="handleTabChange" />
        <div class="mt-2 text-sm">当前选中: {{ tabOptions[currentTab] }}</div>
      </div>
    </div>
  </div>
</template>
