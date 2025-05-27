
<script setup lang="ts">
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend)

const { labels, results, legend } = defineProps({
  labels: {
    type: Array<any>
  },
  results: {
    type: Array<any>
  },
  legend: {
    type: Boolean,
    default: false
  }
})

const data = {
  labels: labels,
  datasets: [
    {
      backgroundColor: [
        '#ff6600',
        '#555555',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(156, 250, 1, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(156, 250, 1, 0.2)'
      ],
      data: results
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: legend // Set to true if you want to display the legend
    }
  }
}
</script>

<template>
  <Doughnut :data="data" :options="options" />
</template>
