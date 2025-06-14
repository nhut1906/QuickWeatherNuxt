<template>
    <div :style="{ width: width, height: height }">
        <component :is="chartComponent" :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'
import {
    Line,
    Bar,
    Pie,
    Doughnut,
    Radar,
    PolarArea,
    Bubble,
    Scatter
} from 'vue-chartjs'

const chartComponents = {
    line: Line,
    bar: Bar,
    pie: Pie,
    doughnut: Doughnut,
    radar: Radar,
    polarArea: PolarArea,
    bubble: Bubble,
    scatter: Scatter
}

const props = defineProps<{
    chartType: keyof typeof chartComponents
    width?: string | number
    height?: string | number
    chartOptions: any
    chartData: any
}>()

const chartComponent = computed(() => chartComponents[props.chartType] || Line)
</script>

<style scoped></style>
