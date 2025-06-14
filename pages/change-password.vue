<template>
  <div>
    <ChangePassword />
  </div>
</template>

<script setup lang="ts">
import ChangePassword from "@auth/views/account/ChangePassword.vue";

definePageMeta({
  layout: 'admin',
});
</script>
