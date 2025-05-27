<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { labels, items, height, colors } = defineProps({
  colors: {
    type: Array<String>
  },
  labels: {
    type: Array<String>
  },
  items: {
    type: Array<Number>
  },
  height: {
    type: Number,
    default: 400
  }
})


const getDonutChartConfig = {
  stroke: { width: 0 },
  labels: labels,
  colors: colors,
  dataLabels: {
    enabled: true,
    formatter: (val: string) => `${Number.parseInt(val, 10)}%`,
  },
  legend: {
    show: false, // Oculta la leyenda predeterminada
  },
  // legend: {
  //   position: 'bottom',
  //   markers: { offsetX: -3 },
  //   fontSize: '13px',
  //   // labels: { colors: themeSecondaryTextColor },
  //   itemMargin: {
  //     vertical: 3,
  //     horizontal: 10,
  //   },
  // },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          name: {
            fontSize: '1.125rem',
          },
          value: {
            fontSize: '1.125rem',
            // color: themeSecondaryTextColor,
            formatter: (val: string) => `${Number.parseInt(val, 10)}`,
          },
          total: {
            show: true,
            fontSize: '1.125rem',
            label: t('Componets.GraphDonutApex.General'),
            formatter: () => '100%',
            // color: themePrimaryTextColor,
          },
        },
      },
    },
  },
  responsive: [
    {
      breakpoint: 992,
      options: {
        chart: {
          height: 380,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
    {
      breakpoint: 576,
      options: {
        chart: {
          height: 320,
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  fontSize: '0.9375rem',
                },
                value: {
                  fontSize: '0.9375rem',
                },
                total: {
                  fontSize: '0.9375rem',
                },
              },
            },
          },
        },
      },
    },
  ],
}




</script>

<template>
  <div>
    <VueApexCharts type="donut" :height="height" :options="getDonutChartConfig" :series="items" />
  </div>
</template>

 


