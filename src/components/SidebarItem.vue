<template>
    <div :class="{'bg-primary/10': active, 'hover:bg-neutral/10': !active}" class="transition rounded-box relative overflow-hidden cursor-pointer" @click="handleClick">
        <a :href="href" class="h-11 flex items-center px-0 md:px-2 transition-all duration-300" @click.prevent>
            <div class="w-12 flex justify-center md:w-auto md:justify-start">
                <span
                    :class="`icon-[${icon}] size-5 transition-all duration-300 ${active ? 'text-primary' : ''}`"></span>
            </div>
            <span
                :class="`overflow-hidden truncate transition-all duration-300 text-[0px] md:text-base opacity-0 md:opacity-100 ml-0 md:ml-2 ${active ? 'font-medium text-primary' : ''}`">
                {{ label }}
            </span>
        </a>
        <div v-if="active" class="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
    </div>
</template>

<script setup lang="ts">
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

const emit = defineEmits(['click']);

const handleClick = () => {
    emit('click');
};
</script> 