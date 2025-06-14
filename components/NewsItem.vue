<template>
  <div class="new-item">
    <router-link :to="`/tin-tuc/${data.url_path}`" class="thumb">
      <img :src="getImageUrl(data.image_url)" :alt="data.title" />
    </router-link>
    <div class="text">
      <div class="title">
        <router-link :to="`/tin-tuc/${data.url_path}`">
          {{ data.title }}
        </router-link>
      </div>
      <p class="desc" v-html="data.content"></p>
    </div>
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
