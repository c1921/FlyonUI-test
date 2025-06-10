<script setup lang="ts">
import { onMounted } from 'vue';
onMounted(() => {
  setTimeout(() => window.HSStaticMethods.autoInit(), 100)
});


// import Sidebar from './components/Sidebar.vue';
import MyMenu from './components/MyMenu.vue';
</script>

<template>
  <div class="flex">
<!--     <Sidebar /> -->
    <MyMenu />
  </div>

</template>
