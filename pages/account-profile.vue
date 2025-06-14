<template>
  <div>
    <AccountProfile />
  </div>
</template>

<script setup lang="ts">
import AccountProfile from "@auth/views/account/AccountProfile.vue";

definePageMeta({
  layout: 'admin',
});
</script>
