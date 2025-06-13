<script setup lang="ts">
import { onMounted, ref } from 'vue';
onMounted(() => {
  setTimeout(() => window.HSStaticMethods.autoInit(), 100)
});

import Sidebar from './components/Sidebar.vue';
import Radio from './components/Radio.vue';
import ToggleCount from './components/ToggleCount.vue';
import RangeDemo from './components/RangeDemo.vue';
import Tables from './components/Table.vue';

// 当前激活的菜单项
const activeMenu = ref('home'); // 默认激活首页

// 处理菜单切换
const handleMenuChange = (menu: string) => {
  activeMenu.value = menu;
};
</script>

<template>
  <div>
    <Sidebar @menu-change="handleMenuChange" />
    <div class="p-4 space-y-6 ml-14 md:ml-64 transition-all duration-500">
      <!-- 首页内容 -->
      <template v-if="activeMenu === 'home'">
        <Radio />
        <ToggleCount />
        <RangeDemo />
      </template>

      <template v-if="activeMenu === 'transaction'">
        <Tables />
      </template>
    </div>
    <div></div>
  </div>
</template>
