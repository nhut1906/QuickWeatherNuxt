<template>
  <div>
    <CategoryView />
  </div>
</template>

<script setup lang="ts">
import CategoryView from "@master/views/category/ListView.vue";

definePageMeta({
  layout: 'admin',
});
</script>
