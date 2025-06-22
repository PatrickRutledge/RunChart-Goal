<script setup>
import { defineProps, watch, ref } from 'vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'vue-chartjs';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define props that this component expects from its parent (App.vue)
const props = defineProps({
  chartData: {
    type: Object,
    required: true
  },
  chartOptions: {
    type: Object,
    default: () => ({}) // Provide an empty object as default
  }
});

// A ref to hold the chart instance, useful if you need to manipulate the chart directly
const chartRef = ref(null);

// Watch for changes in chartData or chartOptions and update the chart
// This ensures the chart re-renders when data or options change in the parent
watch(() => [props.chartData, props.chartOptions], () => {
  if (chartRef.value && chartRef.value.chart) {
    chartRef.value.chart.update();
  }
}, { deep: true }); // Use deep watch for nested changes in objects
</script>

<template>
  <div class="chart-container">
    <Line v-if="props.chartData.labels && props.chartData.labels.length > 0"
          :data="props.chartData"
          :options="props.chartOptions"
          ref="chartRef"
    />
    <p v-else class="no-data-message">Enter production data to display the run chart.</p>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 400px; /* Fixed height for the chart */
  width: 100%; /* Take full width of its parent */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden; /* Hide anything that overflows */
}

.no-data-message {
  color: #666;
  font-size: 1.1em;
  text-align: center;
}
</style>