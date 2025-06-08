<script setup lang="ts">
import { onMounted } from 'vue';
onMounted(() => {
  setTimeout(() => window.HSStaticMethods.autoInit(), 100)
});
</script>

<template>

  <aside id="default-sidebar" class="max-w-14 md:max-w-64 h-screen bg-base-200 transition-[max-width] duration-700">
    <div class="md:px-2 pt-4 h-full transition-[padding] duration-300">
      <ul class="menu p-0 bg-base-200">
        <li>
          <a href="#">
            <div class="indicator">
              <span class="indicator-item status status-primary"></span>
              <span class="icon-[tabler--home] size-6"></span>
            </div>
            <span class="transition-all duration-700 opacity-0 md:opacity-100">Home</span>
          </a>
        </li>
        <li>
          <a href="#"  class="menu-active w-14 md:w-auto">
            <span class="icon-[tabler--user] size-6"></span>
            <span class="transition-all duration-700 opacity-0 md:opacity-100 overflow-hidden origin-left scale-0 md:scale-100">Account</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon-[tabler--message] size-6"></span>
            <span class="transition-all duration-700 opacity-0 md:opacity-100">Notifications</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon-[tabler--mail] size-6"></span>
            <span class="transition-all duration-700 opacity-0 md:opacity-100">Email</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon-[tabler--calendar] size-6"></span>
            <span class="transition-all duration-700 opacity-0 md:opacity-100">Calendar</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon-[tabler--shopping-bag] size-6"></span>
            <span class="transition-all duration-700 opacity-0 md:opacity-100">Product</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon-[tabler--login] size-6"></span>
            <span class="transition-all duration-700 opacity-0 md:opacity-100">Sign In</span>
          </a>
        </li>

      </ul>
    </div>
  </aside>
</template>
