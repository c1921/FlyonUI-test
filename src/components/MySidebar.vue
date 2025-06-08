<template>
    <aside id="default-sidebar" class="w-12 md:w-64 h-screen transition-[width] duration-300">
        <div class="px-0 md:px-2 pt-4 h-full transition-[padding] duration-300 delay-150">
            <ul class="menu p-0">
                <SidebarItem label="首页" icon="tabler--home" />
                <SidebarItem label="账户" icon="tabler--user" active />
                <SidebarItem label="通知" icon="tabler--message" />
                <SidebarItem label="邮件" icon="tabler--mail" />
                <SidebarItem label="日历" icon="tabler--calendar" />
                <SidebarItem label="产品" icon="tabler--shopping-bag" />
                <SidebarItem label="登录" icon="tabler--login" />
                <SidebarItem label="登出" icon="tabler--logout-2" />
            </ul>
        </div>
    </aside>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue';
</script>