<template>
    <aside id="default-sidebar" class="w-12 md:w-32 h-screen transition-[width] duration-300 delay-150 bg-base-200">
        <div class="px-0 md:px-2 pt-4 h-full transition-[padding] duration-500 delay-150">
            <div class="bg-base-200 flex flex-col w-auto">
                <SidebarItem 
                    v-for="(item, index) in menuItems" 
                    :key="index"
                    :label="item.label" 
                    :icon="item.icon" 
                    :active="activeItemId === item.id"
                    @click="setActiveItem(item.id)" 
                />
            </div>
        </div>
    </aside>
</template>

<script setup>
import { ref } from 'vue';
import SidebarItem from './SidebarItem.vue';

const menuItems = [
    { id: 'home', label: '首页', icon: 'tabler--home' },
    { id: 'account', label: '账户', icon: 'tabler--user' },
    { id: 'notifications', label: '通知', icon: 'tabler--message' },
    { id: 'mail', label: '邮件', icon: 'tabler--mail' },
    { id: 'calendar', label: '日历', icon: 'tabler--calendar' },
    { id: 'product', label: '产品', icon: 'tabler--shopping-bag' },
    { id: 'login', label: '登录', icon: 'tabler--login' },
    { id: 'logout', label: '登出', icon: 'tabler--logout-2' }
];

const activeItemId = ref('home'); // 默认选中账户

const setActiveItem = (id) => {
    activeItemId.value = id;
};
</script>