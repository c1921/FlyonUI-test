<script setup lang="ts">
import { onMounted, ref } from 'vue';
onMounted(() => {
  setTimeout(() => window.HSStaticMethods.autoInit(), 100)
});

import MyMenu from './components/MyMenu.vue';
import Radio from './components/Radio.vue';
import ToggleCount from './components/ToggleCount.vue';
import Tables from './components/Table.vue';

// Radio组件示例的数据
const tabOptions = ['Home', 'Account', 'Notifications'];
const currentTab = ref(1); // 默认选中"分类"选项

const handleTabChange = (index: number) => {
  console.log(`切换到选项: ${tabOptions[index]}`);
};
</script>

<template>
  <div class="flex">
    <MyMenu />
    <div>
      <div class="p-4 space-y-6">
        <div>
          <Radio />
        </div>
        <div>
          <Radio :options="tabOptions" :default-active="currentTab" @update:tab="currentTab = $event"
            @change="handleTabChange" />
        </div>
      </div>
      <div>
        <ToggleCount />
      </div>
      <Tables />
    </div>

  </div>
</template>
