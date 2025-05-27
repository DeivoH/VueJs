<script lang="ts" setup>
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';

import { Line } from 'vue-chartjs';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const { labels, datasets } = defineProps({
  labels: {
    type: Array<any>
  },
  datasets: {
    type: Array<any>
  },
})



const data = {
  labels: labels,
  datasets: datasets
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      stacked: true, // Apilar en el eje Y
      ticks: {
        precision: 0 // Mostrar valores enteros sin decimales
      }
    }
  }
}


</script>
<template>
  <Line :data="data" :options="options" />
</template>

