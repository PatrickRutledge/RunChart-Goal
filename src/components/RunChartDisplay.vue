<script setup>
import { ref, defineProps, watch, nextTick } from 'vue';
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
import jsPDF from 'jspdf';

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
const props = defineProps({
  chartData: {
    type: Object,
    required: true
  },
  chartOptions: {
    type: Object,
    default: () => ({})
  }
});

// Chart and DOM references
const chartRef = ref(null);
const chartContainer = ref(null);

// Watch for chart updates
watch(
  () => [props.chartData, props.chartOptions],
  () => {
    if (chartRef.value?.chart) {
      chartRef.value.chart.update();
    }
  },
  { deep: true }
);

// Print chart to PDF
const printChartToPDF = async () => {
  if (!chartContainer.value) return;

  const button = document.querySelector('.print-button');
  if (button) button.style.visibility = 'hidden';

  await nextTick();

  const canvas = await html2canvas(chartContainer.value, {
    scale: 2,
    useCORS: true
  });

  const imgData = canvas.toDataURL('image/png');
  const pdfWidth = 792;
  const pdfHeight = 612;

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [pdfWidth, pdfHeight]
  });

  const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
  const imgWidth = canvas.width * ratio;
  const imgHeight = canvas.height * ratio;
  const x = (pdfWidth - imgWidth) / 2;
  const y = (pdfHeight - imgHeight) / 2;

  pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

  const title =
    props.chartOptions?.plugins?.title?.text?.trim() || 'run-chart';

  const blob = pdf.output('blob');
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${title}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.open(url, '_blank');

  if (button) button.style.visibility = 'visible';
};

</script>


<template>
  <div>
    <!-- Chart wrapper for PDF export -->
    <div ref="chartContainer">
      <div class="chart-container">
        <Line
          v-if="props.chartData.labels && props.chartData.labels.length > 0"
          :data="props.chartData"
          :options="props.chartOptions"
          ref="chartRef"
        />
        <p v-else class="no-data-message">
          Enter production data to display the run chart.
        </p>
      </div>
    </div>

    <!-- Export button -->
    <button @click="printChartToPDF" class="print-button">
      Print Chart to PDF
    </button>
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

.no-data-message {
  color: #666;
  font-size: 1.1em;
  text-align: center;
}

.print-button {
  margin-top: 20px;
  padding: 10px 16px;
  font-size: 1em;
  background-color: #2f80ed;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.print-button:hover {
  background-color: #1e5cb8;
}

@media print {
  .print-button {
    display: none;
  }
}
</style>

