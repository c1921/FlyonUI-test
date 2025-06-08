<script setup lang="ts">
import { onMounted } from 'vue';
onMounted(() => {
  setTimeout(() => window.HSStaticMethods.autoInit(), 100)
});

import DefaultSidebar from './components/DefaultSidebar.vue';
import MySidebar from './components/MySidebar.vue';
</script>

<template>
  <div class="flex">
    <MySidebar />
    <DefaultSidebar />
  </div>

</template>
