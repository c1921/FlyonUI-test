<template>
    <li>
        <a :href="href" :class="{'menu-active': active}" class="h-11 flex items-center px-0 md:px-2 transition-all duration-300 relative">
            <div class="w-12 flex justify-center md:w-auto md:justify-start">
                <span :class="`icon-[${icon}] size-5 transition-all duration-300`"></span>
            </div>
            <span class="overflow-hidden transition-all duration-300 text-[0px] md:text-base opacity-0 md:opacity-100 ml-0 md:ml-2">
                {{ label }}
            </span>
        </a>
    </li>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: 'tabler--user'
    },
    active: {
        type: Boolean,
        default: false
    },
    href: {
        type: String,
        default: '#'
    }
});
</script> 