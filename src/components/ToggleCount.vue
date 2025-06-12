<template>
    <div class="card w-40">
        <div class="text-base-content card-body font-semibold">
            <p class="mb-2 text-center">
                <span ref="countDisplay" class="text-2xl">{{ formattedCount }}</span>
                <span class="block text-xs text-gray-500">{{ formattedOriginal }}</span>
            </p>
            <button 
                @click="incrementCount" 
                class="btn btn-primary btn-sm mx-auto"
            >
                +
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import numeral from 'numeral';

// 定义增量
const increment = 62345615678;

// 科学计数法阈值 - 超过此值才使用科学计数法
const scientificThreshold = 1000000; // 1百万

// 响应式状态
const count = ref(0);
const displayCount = ref(0);
const countDisplay = ref(null);

// 格式化后的计数 - 根据阈值决定使用普通格式还是科学计数法
const formattedCount = computed(() => {
    if (displayCount.value >= scientificThreshold) {
        return numeral(displayCount.value).format('0.00e+0');
    } else {
        return numeral(displayCount.value).format('0,0');
    }
});

// 格式化后的原始数值 - 千位分隔
const formattedOriginal = computed(() => {
    if (displayCount.value >= scientificThreshold) {
        return numeral(displayCount.value).format('0,0');
    } else {
        return '';
    }
});

// 动画持续时间
const animationDuration = 700; // 毫秒

// 增加计数的方法
const incrementCount = () => {
    const startValue = count.value;
    // 增加计数
    count.value = count.value + increment;
    
    // 添加数字变化的动画
    animateCount(startValue, count.value);
};

// 数字变化的动画函数
const animateCount = (start, end) => {
    const startTime = performance.now();
    const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);
        
        // 使用缓动函数使动画更自然
        const easedProgress = easeInOutCubic(progress);
        
        // 计算当前应显示的值
        const currentValue = Math.floor(start + easedProgress * (end - start));
        displayCount.value = currentValue;
        
        // 如果动画未完成，继续请求动画帧
        if (progress < 1) {
            requestAnimationFrame(updateCount);
        }
    };
    
    requestAnimationFrame(updateCount);
};

// 缓动函数 - 三次方缓入缓出
const easeInOutCubic = (x) => {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

// 以下是之前的缓动函数，保留作为参考
// 缓动函数 - 二次方缓出（比三次方缓出弱，更线性）
const easeOutQuad = (x) => {
    return 1 - (1 - x) * (1 - x);
};

// 线性动画（无缓动，匀速变化）
const linear = (x) => {
    return x;
};

// 自定义缓动函数 - 结合线性和二次方缓出，减弱缓出效果
const easeOutCustom = (x) => {
    // 70% 二次方缓出 + 30% 线性
    return 0.7 * easeOutQuad(x) + 0.3 * linear(x);
};
</script>