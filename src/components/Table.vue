<template>
    <div class="w-full overflow-x-auto">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header.key">{{ header.label }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="index" class="row-hover">
                    <td>{{ item.name }}</td>
                    <td>{{ formatNumber(item.sellPrice) }}</td>
                    <td>
                        <div class="flex flex-col">
                            <span>{{ item.ourQuantity }}</span>
                            <span v-if="item.tradeAmount !== 0" class="text-xs text-gray-500">
                                ({{ formatDisplayQuantity(item.originalOurQuantity, item.tradeAmount) }})
                            </span>
                        </div>
                    </td>
                    <td>
                        <div class="flex items-center space-x-2">
                            <button @click="decreaseTradeAmount(item)" class="btn btn-xs btn-circle">-</button>
                            <span>{{ item.tradeAmount }}</span>
                            <button @click="increaseTradeAmount(item)" class="btn btn-xs btn-circle">+</button>
                            <span v-if="item.tradeAmount > 0" class="badge badge-success text-xs">Buy</span>
                            <span v-else-if="item.tradeAmount < 0" class="badge badge-error text-xs">Sell</span>
                        </div>
                    </td>
                    <td>{{ formatNumber(item.buyPrice) }}</td>
                    <td>
                        <div class="flex flex-col">
                            <span>{{ item.theirQuantity }}</span>
                            <span v-if="item.tradeAmount !== 0" class="text-xs text-gray-500">
                                ({{ formatDisplayQuantity(item.originalTheirQuantity, -item.tradeAmount) }})
                            </span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="mt-4 text-center">
            <button @click="executeAllTrades" class="btn btn-primary" :disabled="!hasTradeItems">
                Execute All Trades
            </button>
            <button @click="resetAllTrades" class="btn btn-outline ml-2" :disabled="!hasTradeItems">
                Reset
            </button>
        </div>
        
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Table header definitions
const headers = [
    { key: 'name', label: 'Item Name' },
    { key: 'sellPrice', label: 'Sell Price' },
    { key: 'ourQuantity', label: 'Our Quantity' },
    { key: 'tradeAmount', label: 'Trade Amount' },
    { key: 'buyPrice', label: 'Buy Price' },
    { key: 'theirQuantity', label: 'Their Quantity' }
];

// Item data
const itemsData = [
    {
        name: 'Fine Iron Ore',
        sellPrice: 980,
        ourQuantity: 24,
        tradeAmount: 0,
        buyPrice: 1350,
        theirQuantity: 18
    },
    {
        name: 'Magic Crystal',
        sellPrice: 7800,
        ourQuantity: 6,
        tradeAmount: 0,
        buyPrice: 9200,
        theirQuantity: 3
    },
    {
        name: 'Dragon Scale Armor',
        sellPrice: 38000,
        ourQuantity: 1,
        tradeAmount: 0,
        buyPrice: 52000,
        theirQuantity: 0
    },
    {
        name: 'Healing Potion',
        sellPrice: 280,
        ourQuantity: 32,
        tradeAmount: 0,
        buyPrice: 420,
        theirQuantity: 15
    },
    {
        name: 'Enchantment Scroll',
        sellPrice: 4800,
        ourQuantity: 8,
        tradeAmount: 0,
        buyPrice: 6300,
        theirQuantity: 5
    },
    {
        name: 'Elven Timber',
        sellPrice: 2100,
        ourQuantity: 16,
        tradeAmount: 0,
        buyPrice: 2800,
        theirQuantity: 22
    }
];

// Create items with original quantity tracking
const items = ref([]);

// Initialize items with original quantity properties
onMounted(() => {
    items.value = itemsData.map(item => ({
        ...item,
        originalOurQuantity: item.ourQuantity,
        originalTheirQuantity: item.theirQuantity
    }));
});

// Check if there are any items to trade
const hasTradeItems = computed(() => {
    return items.value.some(item => item.tradeAmount !== 0);
});

// Format numbers with thousands separator
const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Format display quantity with calculation
const formatDisplayQuantity = (original, change) => {
    if (change > 0) {
        return `${original}+${change}`;
    } else if (change < 0) {
        return `${original}${change}`;
    }
    return original;
};

// Increase trade amount (positive for buying)
const increaseTradeAmount = (item) => {
    // For buying, limit to their original quantity
    if (item.tradeAmount < item.originalTheirQuantity) {
        item.tradeAmount++;
        updateQuantities(item);
    }
};

// Decrease trade amount (negative for selling)
const decreaseTradeAmount = (item) => {
    // For selling, limit to our original quantity
    if (item.tradeAmount > -item.originalOurQuantity) {
        item.tradeAmount--;
        updateQuantities(item);
    }
};

// Update quantities based on trade amount
const updateQuantities = (item) => {
    // Update our quantity (add trade amount)
    item.ourQuantity = item.originalOurQuantity + item.tradeAmount;
    
    // Update their quantity (subtract trade amount)
    item.theirQuantity = item.originalTheirQuantity - item.tradeAmount;
};

// Reset all trades
const resetAllTrades = () => {
    items.value.forEach(item => {
        item.tradeAmount = 0;
        item.ourQuantity = item.originalOurQuantity;
        item.theirQuantity = item.originalTheirQuantity;
    });
};

// Execute all trades
const executeAllTrades = () => {
    // Get items with non-zero trade amounts
    const tradingItems = items.value.filter(item => item.tradeAmount !== 0);
    
    if (tradingItems.length === 0) return;
    
    // Build trade summary
    let summary = "Trade Summary:\n";
    let totalBuyValue = 0;
    let totalSellValue = 0;
    
    tradingItems.forEach(item => {
        if (item.tradeAmount > 0) {
            summary += `- Buy ${item.tradeAmount} ${item.name}\n`;
            totalBuyValue += item.tradeAmount * item.buyPrice;
        } else {
            summary += `- Sell ${-item.tradeAmount} ${item.name}\n`;
            totalSellValue += -item.tradeAmount * item.sellPrice;
        }
    });
    
    summary += `\nTotal Buy Value: ${formatNumber(totalBuyValue)}`;
    summary += `\nTotal Sell Value: ${formatNumber(totalSellValue)}`;
    
    // Confirm trade
    if (confirm(`${summary}\n\nProceed with these trades?`)) {
        // Update original quantities
        tradingItems.forEach(item => {
            item.originalOurQuantity = item.ourQuantity;
            item.originalTheirQuantity = item.theirQuantity;
            item.tradeAmount = 0;
        });
        
        // Show success message
        alert("All trades completed successfully!");
    }
};
</script>

<style scoped>
.table {
    width: 100%;
    border-collapse: collapse;
}

.table th, .table td {
    padding: 0.75rem;
    text-align: left;
}

.row-hover:hover {
    background-color: rgba(0, 0, 0, 0.05);
}
</style>