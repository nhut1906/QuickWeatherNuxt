<template>
  <div>
    <LoginView />
  </div>
</template>

<script setup lang="ts">
import LoginView from "@auth/views/LoginView.vue";

definePageMeta({
  layout: 'none',
});
</script>
