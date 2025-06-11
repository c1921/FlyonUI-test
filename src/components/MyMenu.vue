<template>
    <aside class="w-14 md:w-64 h-screen bg-base-200 transition-[width] duration-500">
        <div class="md:px-2 pt-4 h-full transition-all duration-500">
            <ul class="menu bg-base-200 px-0 md:px-2 transition-all duration-500">
                <li class="w-full">
                    <a href="#" :class="{ 'menu-active': activeItem === 'home' }" class="w-full" @click.prevent="setActiveItem('home')">
                        <span class="icon-[tabler--home] size-5"></span>
                        <span
                            class="transition-all duration-500 opacity-0 md:opacity-100 overflow-hidden origin-left scale-0 md:scale-100">
                            Home
                        </span>
                    </a>
                </li>
                <li class="w-full">
                    <a href="#" :class="{ 'menu-active': activeItem === 'account' }" class="w-full" @click.prevent="setActiveItem('account')">
                        <span class="icon-[tabler--user] size-5"></span>
                        <span
                            class="transition-all duration-500 opacity-0 md:opacity-100 overflow-hidden origin-left scale-0 md:scale-100">
                            Account
                        </span>
                    </a>
                </li>
                <li class="w-full">
                    <a href="#" :class="{ 'menu-active': activeItem === 'notifications' }" class="w-full" @click.prevent="setActiveItem('notifications')">
                        <span class="icon-[tabler--message] size-5"></span>
                        <span
                            class="transition-all duration-500 opacity-0 md:opacity-100 overflow-hidden origin-left scale-0 md:scale-100">
                            Notifications
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script setup>
import { ref } from 'vue';

const activeItem = ref('home'); // 默认激活首页

const setActiveItem = (item) => {
    activeItem.value = item;
};
</script>