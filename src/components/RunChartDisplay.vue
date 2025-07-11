<script setup>
import { ref, watch, nextTick } from 'vue';
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
import html2canvas from 'html2canvas';
import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';

// Register Chart.js components once globally
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Props passed from App.vue
const props = defineProps(['chartData', 'chartOptions']);

// Chart and DOM references
const chartRef = ref();
const chartContainer = ref();

// Watch for chart updates
watch(
  () => [props.chartData, props.chartOptions],
  () => {
    // For vue-chartjs v5+, chart instance is available as chartRef.value.chart
    if (chartRef.value && chartRef.value.chart) {
      chartRef.value.chart.update();
    }
  },
  { deep: true }
);




const shareChart = async () => {
  console.log('Share button pressed');
  try {
    if (!chartContainer.value) throw new Error('No chart container');
    const button = document.querySelector('.share-button');
    if (button) button.style.visibility = 'hidden';

    // Disable tooltips before rendering
    let chartInstance = chartRef.value?.chart;
    let originalTooltipEnabled;
    if (chartInstance && chartInstance.options.plugins && chartInstance.options.plugins.tooltip) {
      originalTooltipEnabled = chartInstance.options.plugins.tooltip.enabled;
      chartInstance.options.plugins.tooltip.enabled = false;
      chartInstance.update();
    }
    await nextTick();
    await new Promise(r => setTimeout(r, 100)); // Wait for hover to clear
    const origCanvas = await html2canvas(chartContainer.value, {
      scale: 2,
      useCORS: true
    });
    if (chartInstance && chartInstance.options.plugins && chartInstance.options.plugins.tooltip) {
      chartInstance.options.plugins.tooltip.enabled = originalTooltipEnabled !== undefined ? originalTooltipEnabled : true;
      chartInstance.update();
    }
    // Create a new canvas with extra space for the footer
    const footerHeight = 60;
    const canvas = document.createElement('canvas');
    canvas.width = origCanvas.width;
    canvas.height = origCanvas.height + footerHeight;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(origCanvas, 0, 0);
    const footerText = 'More apps: https://patrickrutledge.github.io/apps/ | © Pat Rutledge';
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#888';
    ctx.textAlign = 'center';
    ctx.fillText(footerText, canvas.width / 2, canvas.height - 20);
    const imgData = canvas.toDataURL('image/png');
    console.log('Image data generated, length:', imgData.length);
    const base64Data = imgData.split(',')[1];
    const fileName = `run_chart_${Date.now()}.png`;
    const result = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Cache,
      recursive: true
    });
    console.log('File written:', result);
    await Share.share({
      title: 'Run Chart',
      text: 'Check out this run chart! Created with Run Chart Analytics.',
      url: result.uri,
      dialogTitle: 'Share your run chart'
    });
    if (button) button.style.visibility = 'visible';
  } catch (err) {
    console.error('Share error:', err);
    alert('Share failed: ' + err.message);
  }
};

</script>


<template>
  <div>
    <!-- Chart wrapper for sharing -->
    <div ref="chartContainer">
      <div class="chart-container debug-border">
        <Line
          v-if="chartData && chartData.labels && chartData.labels.length > 0"
          :data="chartData"
          :options="chartOptions"
          ref="chartRef"
        />
        <p v-else class="no-data-message">
          Enter production data to display the run chart.
        </p>
      </div>
    </div>
    <!-- Share button -->
    <div style="text-align:center; margin-top: 20px;">
      <button @click="shareChart" class="share-button">
        Share Chart
      </button>
    </div>
  </div>
</template>


<style scoped>
.chart-container {
  position: relative;
  height: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.debug-border {
  border: 2px dashed #007bff;
}

.no-data-message {
  color: #666;
  font-size: 1.1em;
  text-align: center;
}


</style>

