<template>
    <div class="bg-base-200 rounded-field relative p-0.5 inline-flex">
        <div :style="sliderStyle"
            class="rounded-field bg-base-100 shadow-base-300/20 absolute h-8 w-20 shadow-sm transition-transform duration-300 ease-in-out">
        </div>
        <button v-for="(option, index) in options" :key="index" @click="setActiveTab(index)"
            class="rounded-field text-base-content z-1 h-8 w-20 truncate">
            {{ option }}
        </button>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

// 定义props
const props = defineProps({
    // 可自定义选项列表
    options: {
        type: Array,
        default: () => ['Preview', 'HTML']
    },
    // 默认选中项索引
    defaultActive: {
        type: Number,
        default: 0
    }
});

// 定义事件
const emit = defineEmits(['update:tab', 'change']);

// 响应式状态
const activeTab = ref(props.defaultActive);

// 计算滑块样式，根据当前选中项动态设置transform
const sliderStyle = computed(() => {
    return {
        transform: `translateX(${activeTab.value * 100}%)`
    };
});

// 设置激活选项的方法
const setActiveTab = (tabIndex) => {
    if (tabIndex >= 0 && tabIndex < props.options.length) {
        activeTab.value = tabIndex;
        emit('update:tab', tabIndex);
        emit('change', tabIndex);
    }
};

// 监听props变化
watch(() => props.defaultActive, (newVal) => {
    if (newVal !== activeTab.value) {
        activeTab.value = newVal;
    }
});

// 暴露组件属性和方法
defineExpose({
    activeTab,
    setActiveTab
});
</script>