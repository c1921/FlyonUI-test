<template>
  <div class="range-demo p-6 rounded shadow">
    <h2 class="text-xl font-bold mb-4">Range Slider Demo</h2>
    
    <!-- Basic Range -->
    <div class="mb-6">
      <Range 
        v-model="basicValue"
        label="Basic Range"
        @change="handleBasicChange"
      />
      <div class="mt-2 text-sm">
        Selected value: {{ basicValue }}
      </div>
    </div>
    
    <!-- Custom Range -->
    <div class="mb-6">
      <Range 
        v-model="priceValue"
        :min="100"
        :max="10000"
        :step="100"
        label="Price Range"
        :formatValue="formatPrice"
        @change="handlePriceChange"
      />
      <div class="mt-2 text-sm">
        Selected price: ${{ formatPrice(priceValue) }}
      </div>
    </div>
    
    <!-- Percentage Range -->
    <div class="mb-6">
      <Range 
        v-model="percentValue"
        :min="0"
        :max="1"
        :step="0.01"
        label="Percentage"
        :formatValue="formatPercent"
        @change="handlePercentChange"
      />
      <div class="mt-2 text-sm">
        Selected percentage: {{ formatPercent(percentValue) }}%
      </div>
    </div>
    
    <!-- Quantity Range -->
    <div class="mb-6">
      <Range 
        v-model="quantityValue"
        :min="0"
        :max="maxQuantity"
        :step="1"
        label="Trade Quantity"
        @change="handleQuantityChange"
      />
      <div class="mt-2 text-sm">
        Selected quantity: {{ quantityValue }} / {{ maxQuantity }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Range from './Range.vue';

// Basic range
const basicValue = ref(50);
const handleBasicChange = (value) => {
  console.log('Basic value changed:', value);
};

// Price range
const priceValue = ref(1000);
const formatPrice = (value) => {
  return value.toLocaleString();
};
const handlePriceChange = (value) => {
  console.log('Price value changed:', value);
};

// Percentage range
const percentValue = ref(0.5);
const formatPercent = (value) => {
  return (value * 100).toFixed(0);
};
const handlePercentChange = (value) => {
  console.log('Percentage value changed:', value);
};

// Quantity range
const maxQuantity = ref(100);
const quantityValue = ref(25);
const handleQuantityChange = (value) => {
  console.log('Quantity value changed:', value);
};
</script>

<style scoped>
.range-demo {
  max-width: 500px;
}
</style> 