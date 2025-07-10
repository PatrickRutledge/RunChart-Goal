<script setup>
import { ref, computed } from 'vue';
import RunChartDisplay from './components/RunChartDisplay.vue';

// Reactive variables for our inputs and chart title
// Initial values are still here, but reset will clear them
const chartTitle = ref('Production Throughput Run Chart');
const unitOfMeasure = ref('Pounds');
const timeScale = ref('Days');
const goalLine = ref(12);
const usl = ref(14);
const lsl = ref(6);

// Reactive variable for the raw text input of data
const rawDataInput = ref('8, 10, 12, 11, 9, 8, 10, 11, 12, 9, 8, 10, 11, 8, 7, 8, 10, 12, 11, 9, 8, 10, 11, 8, 10, 11, 9, 8, 10, 11, 8'); // Pre-fill with your example data

// Reactive variable for input warning message
const inputWarning = ref(null);

// More Apps modal state
const showMoreApps = ref(false);

// Portfolio apps data
const portfolioApps = ref([
  {
    name: "Run Chart Analytics",
    description: "Professional statistical process control charts for manufacturing and quality control",
    category: "Business & Productivity",
    status: "Available",
    platforms: ["Web", "Android", "iOS"],
    url: "https://run-chart-goal-vue.netlify.app"
  },
  {
    name: "Data Analyzer Pro", 
    description: "Advanced data visualization and statistical analysis tools",
    category: "Business & Productivity",
    status: "Coming Soon",
    platforms: ["Web", "Android", "iOS"],
    url: "#"
  },
  {
    name: "Quality Dashboard",
    description: "Real-time manufacturing quality monitoring and reporting", 
    category: "Business & Productivity",
    status: "In Development",
    platforms: ["Web", "Android"],
    url: "#"
  }
]);

// Functions for More Apps
const openMoreApps = () => {
  showMoreApps.value = true;
};

const closeMoreApps = () => {
  showMoreApps.value = false;
};

const openApp = (app) => {
  if (app.url && app.url !== '#') {
    window.open(app.url, '_blank');
  }
};

// --- COMPUTED PROPERTIES FOR CHART ---
// Parse the raw text input into a numeric array
const productionData = computed(() => {
  const rawParts = rawDataInput.value.split(',');
  const parsedNumbers = rawParts.map(s => parseFloat(s.trim()));
  const validNumbers = parsedNumbers.filter(n => !isNaN(n));

  // Check for invalid entries
  if (validNumbers.length !== rawParts.length) {
    inputWarning.value = 'Warning: Some non-numeric values were ignored in the data input.';
  } else {
    inputWarning.value = null; // Clear warning if all are valid
  }

  return validNumbers;
});

// X-axis labels (e.g., 'Day 1', 'Day 2', etc.)
const chartLabels = computed(() => {
  // Only generate labels if there is production data
  if (productionData.value.length === 0) {
    return [];
  }
  // If timeScale is blank, use a generic label
  const scaleText = timeScale.value || 'Unit'; 
  return productionData.value.map((_, index) => `${scaleText} ${index + 1}`);
});

// Mean calculation - only calculate if data exists
const meanThroughput = computed(() => {
  if (productionData.value.length === 0) {
    return 0; // Return 0 or undefined if no data
  }
  const sum = productionData.value.reduce((a, b) => a + b, 0);
  return sum / productionData.value.length;
});

// Chart.js data object
const chartData = computed(() => {
  const labels = chartLabels.value;
  const dataPoints = productionData.value;
  const meanVal = meanThroughput.value;
  const goalVal = goalLine.value;
  const uslVal = usl.value;
  const lslVal = lsl.value;

  // If no data points, return an empty dataset to avoid errors
  if (dataPoints.length === 0) {
    return { labels: [], datasets: [] };
  }

  return {
    labels: labels,
    datasets: [
      {
        label: `${unitOfMeasure.value || 'Throughput'}`, // Use default if blank
        backgroundColor: '#42b983', // Greenish color for the main line
        borderColor: '#42b983',
        data: dataPoints,
        tension: 0.1, // Makes the line slightly curved
        fill: false, // Don't fill area under the line
      },
      {
        label: `Mean (${meanVal.toFixed(2)})`,
        data: Array(labels.length).fill(meanVal), // A horizontal line at the mean
        borderColor: 'red',
        borderDash: [5, 5], // Dashed line
        pointRadius: 0, // No points for the mean line
        fill: false,
        tooltip: { enabled: false } // No tooltip for this line
      },
      {
        label: `Goal (${goalVal !== null ? goalVal : 'N/A'})`, // Show N/A if blank
        data: Array(labels.length).fill(goalVal), // A horizontal line at the goal
        borderColor: 'green', // Green for goal line
        borderDash: [5, 5], // Dashed line as requested
        pointRadius: 0,
        fill: false,
        tooltip: { enabled: false }
      },
      {
        label: `USL (${uslVal !== null ? uslVal : 'N/A'})`, // Show N/A if blank
        data: Array(labels.length).fill(uslVal), // A horizontal line at USL
        borderColor: 'orange',
        borderDash: [], // Solid line
        pointRadius: 0,
        fill: false,
        tooltip: { enabled: false }
      },
      {
        label: `LSL (${lslVal !== null ? lslVal : 'N/A'})`, // Show N/A if blank
        data: Array(labels.length).fill(lslVal), // A horizontal line at LSL
        borderColor: 'orange',
        borderDash: [], // Solid line
        pointRadius: 0,
        fill: false,
        tooltip: { enabled: false }
      }
    ],
  };
});

// Chart.js options object
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: chartTitle.value || 'Run Chart', // Use default if blank
      font: {
        size: 20
      }
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
    legend: {
      display: true
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: `Time Period (${timeScale.value || 'Unit'})` // Use default if blank
      }
    },
    y: {
      title: {
        display: true,
        text: unitOfMeasure.value || 'Value' // Use default if blank
      },
      beginAtZero: true
    }
  }
}));

// UPDATED: Function to reset all inputs to their default (blank) values
const resetInputs = () => {
  chartTitle.value = ''; // Blank
  unitOfMeasure.value = ''; // Blank
  timeScale.value = ''; // Blank
  goalLine.value = null; // Blank for number inputs to show placeholder
  usl.value = null; // Blank
  lsl.value = null; // Blank
  rawDataInput.value = ''; // Blank
  inputWarning.value = null; // Clear any warnings
};
</script>

<template>
  <div id="app-container">
    <h1>{{ chartTitle || 'Production Throughput Run Chart' }}</h1> <div class="controls-section">
      <div class="input-group">
        <p class="input-instruction">Paste comma separated values here:</p>
        <textarea id="rawData" v-model="rawDataInput" rows="5" cols="50" placeholder="e.g., 8, 10, 12, 11, 9,..."></textarea>
      </div>

      <p v-if="inputWarning" class="warning-message">{{ inputWarning }}</p>

      <div class="input-group">
        <label for="chartTitle">Chart Title:</label>
        <input type="text" id="chartTitle" v-model="chartTitle" size="40" placeholder="e.g., Production Report" />
      </div>

      <div class="input-group">
        <label for="unitOfMeasure">Unit of Measure:</label>
        <input type="text" id="unitOfMeasure" v-model="unitOfMeasure" placeholder="e.g., Pounds" />
      </div>

      <div class="input-group">
        <label for="timeScale">Unit of Time:</label>
        <input type="text" id="timeScale" v-model="timeScale" placeholder="e.g., Days" />
      </div>

      <div class="input-group">
        <label for="goalLine">Goal:</label>
        <input type="number" id="goalLine" v-model.number="goalLine" placeholder="e.g., 12" />
      </div>

      <div class="input-group">
        <label for="usl">Max Production:</label>
        <input type="number" id="usl" v-model.number="usl" placeholder="e.g., 14" />
      </div>

      <div class="input-group">
        <label for="lsl">Minimum Production:</label>
        <input type="number" id="lsl" v-model.number="lsl" placeholder="e.g., 6" />
      </div>

      <div class="button-group">
        <button @click="resetInputs">Reset All Inputs</button>
        <button @click="openMoreApps" class="more-apps-btn">More Apps by Pat Rutledge</button>
      </div>

    </div>

    <div class="chart-section">
      <RunChartDisplay :chartData="chartData" :chartOptions="chartOptions" />
    </div>

    <!-- More Apps Section -->
    <div class="more-apps-section">
      <h2>More Apps in Our Portfolio</h2>
      <div class="app-list">
        <div v-for="app in portfolioApps" :key="app.name" class="app-item">
          <h3>{{ app.name }}</h3>
          <p>{{ app.description }}</p>
          <p><strong>Category:</strong> {{ app.category }}</p>
          <p><strong>Status:</strong> {{ app.status }}</p>
          <p><strong>Platforms:</strong> {{ app.platforms.join(', ') }}</p>
          <button @click="openApp(app)">Open App</button>
        </div>
      </div>
      <button class="close-more-apps" @click="closeMoreApps">Close</button>
    </div>

    <!-- Overlay for More Apps -->
    <div v-if="showMoreApps" class="overlay" @click="closeMoreApps">
      <div class="overlay-content" @click.stop>
        <span class="close" @click="closeMoreApps">&times;</span>
        <h2>More Apps in Our Portfolio</h2>
        <div class="app-list">
          <div v-for="app in portfolioApps" :key="app.name" class="app-item">
            <h3>{{ app.name }}</h3>
            <p>{{ app.description }}</p>
            <p><strong>Category:</strong> {{ app.category }}</p>
            <p><strong>Status:</strong> {{ app.status }}</p>
            <p><strong>Platforms:</strong> {{ app.platforms.join(', ') }}</p>
            <button @click="openApp(app)">Open App</button>
          </div>
        </div>
        <button class="close-more-apps" @click="closeMoreApps">Close</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* Existing styles */
#app-container {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #333;
}

.controls-section {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.input-instruction {
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
}

.input-group label {
  flex: 0 0 140px;
  margin-right: 10px;
  text-align: right;
  font-weight: bold;
  color: #333;
}

.input-group input[type="text"],
.input-group input[type="number"] {
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1em;
}

.input-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1em;
  vertical-align: top;
  resize: vertical;
}

.warning-message {
  color: red;
  font-weight: bold;
  margin-top: -5px;
  margin-bottom: 15px;
  text-align: center;
}

.button-group {
  margin-top: 20px;
  text-align: center;
}

.button-group button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}

.button-group button:hover {
  background-color: #0056b3;
}

.more-apps-btn {
  background-color: #28a745 !important;
}

.more-apps-btn:hover {
  background-color: #218838 !important;
}

.chart-section {
  border: 1px solid #e0e0e0;
  padding: 20px;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
  background-color: #fff;
  border-radius: 8px;
}

/* More Apps styles */
.more-apps-section {
  margin-top: 30px;
}

.app-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.app-item {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  transition: transform 0.2s;
}

.app-item:hover {
  transform: translateY(-2px);
}

.close-more-apps {
  display: block;
  margin: 20px auto 0;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.close-more-apps:hover {
  background-color: #0056b3;
}

/* Overlay styles */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.overlay-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5em;
  cursor: pointer;
}
</style>