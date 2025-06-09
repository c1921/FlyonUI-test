<script setup lang="ts">
import { onMounted } from 'vue';
onMounted(() => {
  setTimeout(() => window.HSStaticMethods.autoInit(), 100)
});


import Sidebar from './components/MySidebar.vue';
</script>

<template>
  <div class="flex">
    <Sidebar />
  </div>

</template>
