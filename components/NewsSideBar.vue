<template>
  <div class="new-cate" v-if="!(pending || error)">
    <h3 class="new-cate-title">Bài viết mới</h3>
    <div class="new-cate-main">
      <router-link :to="`/tin-tuc/${data?.mainArticle.url_path}`" class="thumb">
        <img
          :src="getImageUrl(data?.mainArticle.image_url)"
          :alt="data?.mainArticle.title"
        />
      </router-link>
      <div class="title">
        <router-link :to="`/tin-tuc/${data?.mainArticle.url_path}`">
          {{ data?.mainArticle.title }}
        </router-link>
      </div>
    </div>
    <div class="new-cate-list">
      <router-link
        v-for="(item, index) in data?.filteredData"
        :key="index"
        :to="`/tin-tuc/${item.url_path}`"
        class="new-cate-item"
      >
        {{ item.title }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Dependencies injection library
 */
import { onMounted, computed, ref } from "vue";
import usePostService from "@master/services/post.service";
import { getImageUrl } from "@/utils/getPathImg";

/**
 * Variable define
 */
const postService = usePostService();
const dataGrid = ref<any>([]);
/**
 * Life circle vue js
 */
const { data, pending, error } = await useAsyncData(
  "newsSideBarData",
  async () => {
    const goSort = "updated_at.desc";
    const page = 1;
    const size = 4;

    const res = (await postService.getList({
      goSort: goSort,
      page: page,
      size: size,
    })) as any;

    dataGrid.value = res?.data?.posts ?? [];
    const hasMainArticle = dataGrid.value && dataGrid.value.length > 0;

    return {
      dataGrid: dataGrid.value,
      mainArticle: hasMainArticle ? dataGrid.value[0] : {},
      filteredData: hasMainArticle ? dataGrid.value.slice(1) : [],
    };
  }
);
/**
 * Function
 */
</script>

<style scoped></style>
