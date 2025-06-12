<template>
  <!-- 滑块组件容器 -->
  <div class="w-full py-2">
    <!-- 标签和当前值显示区域 -->
    <div class="flex justify-between mb-2">
      <span class="text-sm">{{ label }}</span>
      <span class="font-semibold text-sm">{{ displayValue }}</span>
    </div>
    <!-- 滑块轨道区域 - 用户可点击或触摸此区域改变值 -->
    <div 
      class="relative h-2 bg-neutral/10 rounded cursor-pointer" 
      ref="trackRef" 
      @mousedown="startDrag"
      @touchstart="startTouch"
    >
      <!-- 已选择部分的填充条 - 根据当前值动态调整宽度 -->
      <div class="absolute h-full bg-primary rounded pointer-events-none" :style="{ width: `${percentage}%` }">
      </div>
      <!-- 可拖动的滑块按钮 - 根据当前值动态调整位置 -->
      <div
        class="absolute top-1/2 w-4.5 h-4.5 bg-base-100 border-4 border-primary rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-grab transition duration-300"
        :class="{ 'scale-130': isDragging || isHovering }"
        :style="{ left: `${percentage}%` }" 
        ref="thumbRef"
        @mouseenter="isHovering = true"
        @mouseleave="isHovering = false"
        @touchstart.stop="startTouch"
      >
        <!-- 跟随滑块的tooltip，只在拖动时显示 -->
        <div 
          class="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-primary px-2 py-1 rounded text-xs whitespace-nowrap shadow-md transition-opacity duration-200"
          :class="{ 'opacity-0 pointer-events-none': !isDragging, 'opacity-100': isDragging }"
        >
          {{ displayValue }}
          <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
        </div>
      </div>
    </div>
    <!-- 最小值和最大值显示区域 -->
    <div class="flex justify-between mt-2">
      <span class="text-xs text-neutral">{{ min }}</span>
      <span class="text-xs text-neutral">{{ max }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  label: {
    type: String,
    default: 'Range'
  },
  formatValue: {
    type: Function,
    default: (value) => value
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

const trackRef = ref(null);
const thumbRef = ref(null);
const isDragging = ref(false);
const isHovering = ref(false);
const internalValue = ref(props.modelValue);

// 计算滑块位置的百分比
const percentage = computed(() => {
  const range = props.max - props.min;
  return ((internalValue.value - props.min) / range) * 100;
});

// 格式化显示的值
const displayValue = computed(() => {
  return props.formatValue(internalValue.value);
});

// 处理鼠标按下事件，开始拖动
const startDrag = (event) => {
  event.preventDefault();
  isDragging.value = true;
  updateValueFromEvent(event);
  
  // 添加拖动相关的事件监听器
  window.addEventListener('mousemove', handleDrag);
  window.addEventListener('mouseup', stopDrag);
};

// 处理触摸开始事件
const startTouch = (event) => {
  event.preventDefault();
  isDragging.value = true;
  updateValueFromTouchEvent(event);
  
  // 添加触摸相关的事件监听器
  window.addEventListener('touchmove', handleTouch, { passive: false });
  window.addEventListener('touchend', stopTouch);
  window.addEventListener('touchcancel', stopTouch);
};

// 处理鼠标移动事件，拖动过程中
const handleDrag = (event) => {
  if (isDragging.value) {
    updateValueFromEvent(event);
  }
};

// 处理触摸移动事件
const handleTouch = (event) => {
  if (isDragging.value) {
    event.preventDefault(); // 防止页面滚动
    updateValueFromTouchEvent(event);
  }
};

// 处理鼠标松开事件，结束拖动
const stopDrag = () => {
  if (!isDragging.value) return;
  
  isDragging.value = false;
  window.removeEventListener('mousemove', handleDrag);
  window.removeEventListener('mouseup', stopDrag);
  emit('change', internalValue.value);
};

// 处理触摸结束事件
const stopTouch = () => {
  if (!isDragging.value) return;
  
  isDragging.value = false;
  window.removeEventListener('touchmove', handleTouch);
  window.removeEventListener('touchend', stopTouch);
  window.removeEventListener('touchcancel', stopTouch);
  emit('change', internalValue.value);
};

// 根据鼠标位置更新值
const updateValueFromEvent = (event) => {
  if (!trackRef.value) return;
  
  const track = trackRef.value;
  const trackRect = track.getBoundingClientRect();
  const trackWidth = trackRect.width;
  
  // 计算相对于轨道的位置
  let positionX = event.clientX - trackRect.left;
  
  // 限制在轨道范围内
  positionX = Math.max(0, Math.min(positionX, trackWidth));
  
  // 将位置转换为值
  updateValueFromPosition(positionX, trackWidth);
};

// 根据触摸位置更新值
const updateValueFromTouchEvent = (event) => {
  if (!trackRef.value || !event.touches[0]) return;
  
  const track = trackRef.value;
  const trackRect = track.getBoundingClientRect();
  const trackWidth = trackRect.width;
  
  // 计算相对于轨道的位置
  let positionX = event.touches[0].clientX - trackRect.left;
  
  // 限制在轨道范围内
  positionX = Math.max(0, Math.min(positionX, trackWidth));
  
  // 将位置转换为值
  updateValueFromPosition(positionX, trackWidth);
};

// 根据位置更新值（共用逻辑）
const updateValueFromPosition = (positionX, trackWidth) => {
  // 将位置转换为值
  const range = props.max - props.min;
  const rawValue = (positionX / trackWidth) * range + props.min;
  
  // 应用步长
  const steppedValue = Math.round(rawValue / props.step) * props.step;
  
  // 限制在最小值和最大值范围内
  const newValue = Math.max(props.min, Math.min(steppedValue, props.max));
  
  // 更新值并触发事件
  internalValue.value = newValue;
  emit('update:modelValue', newValue);
};

// 清理事件监听器
onUnmounted(() => {
  window.removeEventListener('mousemove', handleDrag);
  window.removeEventListener('mouseup', stopDrag);
  window.removeEventListener('touchmove', handleTouch);
  window.removeEventListener('touchend', stopTouch);
  window.removeEventListener('touchcancel', stopTouch);
});

// 监听外部值变化
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== internalValue.value) {
      internalValue.value = newValue;
    }
  }
);
</script>