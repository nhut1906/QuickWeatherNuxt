<template>
  <div>
    <PostView />
  </div>
</template>

<script setup lang="ts">
import PostView from "@master/views/post/ListView.vue";

definePageMeta({
  layout: 'admin',
});
</script>
