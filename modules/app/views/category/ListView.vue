<template>
  <div v-if="pending || error || pendingPostList" style="height: 100vh"></div>
  <div
    v-else
    :style="{
      visibility: !(pending || error || pendingPostList) ? 'visible' : 'hidden',
    }"
  >
    <main class="news-wrapper">
      <vc-breadcrumb :breadcrumbItems="data?.breadcrumbItems"></vc-breadcrumb>
      <section class="news-content">
        <div class="container">
          <h1 class="news-content-heading">
            {{ data?.category.category_name }}
          </h1>
          <div v-if="postList?.dataGrid?.length > 0" class="news-content-inner">
            <div class="new-list">
              <NewsItem
                v-for="(item, index) in postList?.dataGrid"
                :key="index"
                :data="item"
              />
              <div class="pagenavi">
                <vc-pagination :pageConfig="pageConfig" />
              </div>
            </div>

            <div class="new-sidebar">
              <NewsSideBar />
            </div>
          </div>
          <el-empty v-else description="Dữ liệu trống" />
        </div>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
/**
 * Dependencies injection library
 */
import NewsSideBar from "@/components/NewsSideBar.vue";
import NewsItem from "@/components/NewsItem.vue";
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import useCategoryService from "@master/services/category.service";
import { usePostStore } from "@master/stores/post.store";
import { storeToRefs } from "pinia";
import useInformationService from "@master/services/information.service";

/**
 * Variable define
 */
const categoryService = useCategoryService();
const informationService = useInformationService();
const store = usePostStore();
const { dataGrid, pageConfig } = storeToRefs(store);
const route = useRoute();
const breadcrumbItems = ref<any>([]);
const category = ref<any>({});

/**
 * Function
 */
const res = await categoryService.getDetailByUrlPath(
  route.params.name?.toString() ?? ""
);
category.value = res?.data?.category;

/**
 * Life circle vue js
 */
const { data, pending, error } = await useAsyncData(
  "listViewData",
  async () => {
    let title = "";
    let description = "";
    if (category.value) {
      const meta = await informationService.seo_meta("News");
      if (meta) {
        title = meta?.data?.information?.title?.replace(
          /CATEGORY_NAME/g,
          category.value.category_name
        );
        description = meta?.data?.information?.description?.replace(
          /CATEGORY_NAME/g,
          category.value.category_name
        );
      }
      breadcrumbItems.value = [
        { label: "Trang chủ", link: "/" },
        { label: "Danh mục" },
        {
          label: category.value.category_name,
        },
      ];
    }

    return {
      category: category.value,
      title,
      description,
      breadcrumbItems: breadcrumbItems.value,
    };
  },
  {
    watch: [category], // theo dõi thay đổi
  }
);

const { data: postList, pending: pendingPostList } = await useAsyncData(
  `postList-${route.params.name}`,
  async () => {
    if (route.name == "AllNews") {
      await store.getList(true);
    } else {
      pageConfig.value.category_id = category.value.category_id;
      await store.getList();
      pageConfig.value.category_id = "";
    }
    return {
      dataGrid: dataGrid.value,
    };
  },
  {
    watch: [category], // theo dõi thay đổi
  }
);

if (data.value) {
  const meta = data.value;

  useHead({
    title: meta?.title,
    meta: [
      {
        name: "description",
        content: meta?.description,
      },
    ],
  });
}
</script>

<style scoped></style>
