<template>
  <div class="card-post">
    <router-link :to="`/tin-tuc/${data.url_path}`" class="thumb">
      <img :src="getImageUrl(data.image_url)" :alt="data.title" />
    </router-link>
    <h4 class="title">
      <router-link :to="`/tin-tuc/${data.url_path}`">
        {{ data.title }}
      </router-link>
    </h4>
  </div>
</template>

<script setup lang="ts">
/**
 * Dependencies injection library
 */
import { getImageUrl } from "@/utils/getPathImg";

/**
 * Variable define
 */
const props = defineProps<{
  data?: any;
}>();

/**
 * Life circle vue js
 */

/**
 * Function
 */
</script>

<style scoped></style>
