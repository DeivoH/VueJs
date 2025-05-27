<script setup lang="ts">
import { hexToRgb } from '@layouts/utils';
import { useTheme } from 'vuetify';


const { labels, series, code } = defineProps({
  labels: {
    type: Array<string>
  },
  series: {
    type: Array<number>
  },
  code: {
    type: String,
    default: ''
  },
})

const vuetifyTheme = useTheme()

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables

  return {
    labels: labels,
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        offsetY: 10,
        startAngle: -140,
        endAngle: 130,
        hollow: {
          size: '65%',
        },
        track: {
          background: currentTheme.surface,
          strokeWidth: '100%',
        },
        dataLabels: {
          name: {
            offsetY: -20,
            color: `rgba(${hexToRgb(currentTheme['on-surface'])},${variableTheme['disabled-opacity']})`,
            fontSize: '13px',
            fontWeight: '400',
            fontFamily: 'Public Sans',
          },
          value: {
            offsetY: 10,
            color: `rgba(${hexToRgb(currentTheme['on-background'])},${variableTheme['high-emphasis-opacity']})`,
            fontSize: '38px',
            fontWeight: '400',
            fontFamily: 'Public Sans',
            formatter: function (val) {
              return val.toString() + code
            },
          },
        },
      },
    },
    colors: [currentTheme.primary],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        shadeIntensity: 0.5,
        gradientToColors: [currentTheme.primary],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 0.6,
        stops: [30, 70, 100],
      },
    },
    stroke: {
      dashArray: 10,
    },
    grid: {
      padding: {
        top: -20,
        bottom: 5,
      },
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
      active: {
        filter: {
          type: 'none',
        },
      },
    },
    responsive: [
      {
        breakpoint: 960,
        options: {
          chart: {
            height: 280,
          },
        },
      },
    ],
  }
})
</script>

<template>
  <div>
    <VueApexCharts :options="chartOptions" :series="series" />
  </div>
</template>
