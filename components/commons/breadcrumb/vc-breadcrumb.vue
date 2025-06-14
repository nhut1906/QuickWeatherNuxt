<template>
  <nav aria-label="breadcrumb" class="breadcrumb-custom">
    <div class="container">
      <nav aria-label="breadcrumbs" class="rank-math-breadcrumb">
        <p>
          <template v-for="(item, index) in props.breadcrumbItems" :key="index">
            <template v-if="item.link">
              <router-link :to="item.link">{{ item.label }}</router-link>
            </template>
            <template v-else>
              <span class="last">{{ item.label }}</span>
            </template>
            <span v-if="index !== breadcrumbItems.length - 1" class="separator">
              -
            </span>
          </template>
        </p>
      </nav>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  breadcrumbItems?: any;
}>();
</script>

<style scoped></style>
