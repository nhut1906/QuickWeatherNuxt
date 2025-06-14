<template>
  <div>
    <DashboardView />
  </div>
</template>

<script setup lang="ts">
import DashboardView from "@master/views/static/DashboardView.vue";

definePageMeta({
  layout: 'admin',
});
</script>
