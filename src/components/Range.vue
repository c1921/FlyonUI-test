<template>
  <div class="w-full py-2">
    <!-- 标签和当前值显示区域 -->
    <div class="flex justify-between mb-2">
      <span class="text-sm">{{ label }}</span>
      <span class="font-semibold text-sm">{{ displayValue }}</span>
    </div>

    <!-- 滑块轨道区域 -->
    <div
      class="relative h-2 bg-neutral/10 rounded cursor-pointer"
      ref="trackRef"
      @mousedown="startDrag"
    >
      <!-- 进度条 -->
      <div
        class="absolute h-full bg-primary rounded pointer-events-none"
        :style="{ width: `${percentage}%` }"
      ></div>

      <!-- 拖拽按钮 -->
      <div
        class="absolute top-1/2 w-4.5 h-4.5 bg-base-100 border-4 border-primary rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-grab transition duration-300"
        :class="{ 'scale-130': isDragging || isHovering }"
        :style="{ left: `${percentage}%` }"
        ref="thumbRef"
        @mouseenter="isHovering = true"
        @mouseleave="isHovering = false"
      >
        <!-- 拖动提示 -->
        <div
          class="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-primary px-2 py-1 rounded text-xs whitespace-nowrap shadow-md transition-opacity duration-200"
          :class="{ 'opacity-0 pointer-events-none': !isDragging, 'opacity-100': isDragging }"
        >
          {{ displayValue }}
          <div
            class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"
          ></div>
        </div>
      </div>
    </div>

    <!-- 最小值和最大值 -->
    <div class="flex justify-between mt-2">
      <span class="text-xs text-neutral">{{ min }}</span>
      <span class="text-xs text-neutral">{{ max }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  label: { type: String, default: 'Range' },
  formatValue: { type: Function, default: value => value }
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

// 格式化显示值
const displayValue = computed(() => props.formatValue(internalValue.value));

// 鼠标拖动
const startDrag = event => {
  event.preventDefault();
  isDragging.value = true;
  updateValueFromEvent(event);

  window.addEventListener('mousemove', handleDrag);
  window.addEventListener('mouseup', stopDrag);
};

// 触摸拖动
const startTouch = event => {
  event.preventDefault();
  isDragging.value = true;
  updateValueFromTouchEvent(event);

  window.addEventListener('touchmove', handleTouch, { passive: false });
  window.addEventListener('touchend', stopTouch);
  window.addEventListener('touchcancel', stopTouch);
};

const handleDrag = event => {
  if (isDragging.value) updateValueFromEvent(event);
};

const handleTouch = event => {
  if (isDragging.value) {
    event.preventDefault(); // 阻止页面滚动
    updateValueFromTouchEvent(event);
  }
};

const stopDrag = () => {
  if (!isDragging.value) return;

  isDragging.value = false;
  window.removeEventListener('mousemove', handleDrag);
  window.removeEventListener('mouseup', stopDrag);
  emit('change', internalValue.value);
};

const stopTouch = () => {
  if (!isDragging.value) return;

  isDragging.value = false;
  window.removeEventListener('touchmove', handleTouch);
  window.removeEventListener('touchend', stopTouch);
  window.removeEventListener('touchcancel', stopTouch);
  emit('change', internalValue.value);
};

// 鼠标位置转值
const updateValueFromEvent = event => {
  if (!trackRef.value) return;

  const track = trackRef.value;
  const rect = track.getBoundingClientRect();
  let posX = event.clientX - rect.left;
  posX = Math.max(0, Math.min(posX, rect.width));

  updateValueFromPosition(posX, rect.width);
};

// 触摸位置转值
const updateValueFromTouchEvent = event => {
  if (!trackRef.value || !event.touches[0]) return;

  const track = trackRef.value;
  const rect = track.getBoundingClientRect();
  let posX = event.touches[0].clientX - rect.left;
  posX = Math.max(0, Math.min(posX, rect.width));

  updateValueFromPosition(posX, rect.width);
};

// 位置转值
const updateValueFromPosition = (posX, width) => {
  const range = props.max - props.min;
  const raw = (posX / width) * range + props.min;
  const stepped = Math.round(raw / props.step) * props.step;
  const newValue = Math.max(props.min, Math.min(stepped, props.max));

  internalValue.value = newValue;
  emit('update:modelValue', newValue);
};

// 生命周期钩子：绑定 touchstart 手动监听器
onMounted(() => {
  if (trackRef.value) {
    trackRef.value.addEventListener('touchstart', startTouch, { passive: false });
  }
});

// 清理事件监听器
onUnmounted(() => {
  window.removeEventListener('mousemove', handleDrag);
  window.removeEventListener('mouseup', stopDrag);
  window.removeEventListener('touchmove', handleTouch);
  window.removeEventListener('touchend', stopTouch);
  window.removeEventListener('touchcancel', stopTouch);

  if (trackRef.value) {
    trackRef.value.removeEventListener('touchstart', startTouch);
  }
});

// 双向绑定同步外部值
watch(
  () => props.modelValue,
  newVal => {
    if (newVal !== internalValue.value) {
      internalValue.value = newVal;
    }
  }
);
</script>
