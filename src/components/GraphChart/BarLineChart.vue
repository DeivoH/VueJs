
<script setup lang="ts">
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import { Bar } from 'vue-chartjs';
import { useI18n } from 'vue-i18n';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

const { t } = useI18n()
const { labels, datasets, average, noAverage, indexAxis, noLinearDiagram, legend, height, color, border } = defineProps({
  labels: {
    type: Array<any>
  },
  datasets: {
    type: Array<any>
  },
  average: {
    type: Array<any>
  },
  color: {
    type: Array<any>
  },
  border: {
    type: Array<any>
  },
  noAverage: {
    type: Boolean,
    default: true
  },
  noLinearDiagram: {
    type: Boolean,
    default: true
  },
  legend: {
    type: Boolean,
    default: true
  },
  indexAxis: {
    type: String,
    default: "x"
  },
  height: {
    type: [Number, String],
    default: 400
  },

  labelfirst: {
    type: String,
    default: ""
  },

})

const data = {
  labels: labels,
  datasets: [
    {
      label: '',
      data: datasets,
      backgroundColor: color ?? [
        'rgba(255, 99, 132, 0.2)',
        'rgba(156, 250, 1, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(156, 250, 1, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(156, 250, 1, 0.2)'
      ],
      borderColor: border ?? [
        'rgba(255, 99, 132, 1)',
        'rgba(156, 250, 1, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(156, 250, 1, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(156, 250, 1, 1)'
      ],
      borderWidth: 2
    },
    {
      label: t('Componets.BarLineChart.LinearDiagram'),
      data: datasets,
      backgroundColor: 'transparent',
      borderColor: '#ff6600',
      type: 'line',
      lineTension: 0,
    },
    {
      label: 'Promedio 2.0',
      data: average,
      backgroundColor: 'transparent',
      borderColor: '#000000',
      type: 'line',
      lineTension: 0,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false
}

const dataNew = computed(() => {
  if (!noAverage) {
    data.datasets = data.datasets.splice(0, 2)
  }
  if (!noLinearDiagram) {
    data.datasets = data.datasets.splice(0, 1)
  }
  return data
})
const optionsNew = computed(() => {
  if (!noAverage) {
    return {
      ...options,
      indexAxis: indexAxis, // Cambiar la dirección de las barras al eje Y,
      plugins: {
        legend: {
          display: legend // Ocultar la leyenda
        }
      },
      scales: {
        y: {
          stacked: true, // Apilar en el eje Y
          ticks: {
            precision: 0 // Mostrar valores enteros sin decimales
          }
        }
      }
    }
  }
  return data
})

</script>

<template>
  <Bar :height="height" :data="dataNew" :options="optionsNew" />
</template>
