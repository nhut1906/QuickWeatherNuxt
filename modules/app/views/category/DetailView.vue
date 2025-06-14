<template>
  <div :style="{ visibility: !(pending || error) ? 'visible' : 'hidden' }">
    <main class="new-wrapper">
      <vc-breadcrumb :breadcrumbItems="detailData?.breadcrumbItems"></vc-breadcrumb>
      <section class="new-content">
        <div class="container">
          <div class="new-content-inner">
            <div class="new-content-wrap">
              <img :src="getImageUrl(detailData?.data.image_url)" :alt="detailData?.data.title" />
              <div class="new-content-detail">
                <h1 class="title">
                  {{ detailData?.data.title }}
                </h1>
                <div class="entry-content" v-html="detailData?.data.content"></div>
              </div>
              <div class="new-related mt-20">
                <h3 class="new-cate-title">Tin tức liên quan</h3>
                <div class="new-related-inner">
                  <div
                    class="new-item"
                    v-for="(item, index) in detailData?.relatedArticles"
                    :key="index"
                  >
                    <div class="thumb">
                      <router-link
                        :to="`/tin-tuc/${item.url_path}`"
                        class="thumb"
                      >
                        <img
                          :src="getImageUrl(item.image_url)"
                          :alt="item.title"
                        />
                      </router-link>
                    </div>
                    <div class="content">
                      <div class="title">
                        <router-link :to="`/tin-tuc/${item.url_path}`">
                          {{ item.title }}
                        </router-link>
                      </div>
                      <p class="desc" v-html="item.content"></p>
                    </div>
                  </div>
                  <vc-pagination :pageConfig="pageConfig" @changed="changed" />
                </div>
              </div>
            </div>

            <div class="new-sidebar">
              <NewsSideBar />
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
/**
 * Dependencies injection library
 */
import { ref, onMounted } from "vue";
import NewsSideBar from "@/components/NewsSideBar.vue";
import usePostService from "@master/services/post.service";
import { useRoute } from "vue-router";
import { getImageUrl } from "@/utils/getPathImg";
import { usePostStore } from "@master/stores/post.store";
import { storeToRefs } from "pinia";
import useInformationService from "@master/services/information.service";

/**
 * Variable define
 */
const postService = usePostService();
const informationService = useInformationService();
const store = usePostStore();
const { pageConfig } = storeToRefs(store);
const route = useRoute();
const data = ref<any>({});
const relatedArticles = ref<any>([]);

const breadcrumbItems = ref<any>([]);

/**
 * Life circle vue js
 */

onMounted(async () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/**
 * Function
 */
const loadRelated = async () => {
  const res = (await postService.getList({
    category_id: data.value.category_id,
    ...pageConfig.value,
  })) as any;

  relatedArticles.value = res?.data?.posts.filter(
    (post: any) => post.title !== data.value?.title
  );
  pageConfig.value.total = relatedArticles.value.length;
};
const changed = async (page: any) => {
  pageConfig.value = { ...page };
  await loadRelated();
};

const { data: detailData, pending, error } = await useAsyncData(
  "detailViewData",
  async () => {
    let title = "";
    let description = "";
    const res = await postService.getDetailByUrlPath(
      route.params.url_path?.toString() ?? ""
    );
    data.value = res?.data?.post;
    if (data.value) {
      const meta = await informationService.seo_meta("PostDetail");
      if (meta) {
        title = meta?.data?.information?.title?.replace(
          /NEWs_TITLE/g,
          data.value.title
        );
        description = meta?.data?.information?.description?.replace(
          /NEWs_TITLE/g,
          data.value.title
        );
      }
      breadcrumbItems.value = [
        { label: "Trang chủ", link: "/" },
        {
          label: data.value.title,
        },
      ];
      await loadRelated();
    }

    return {
      title,
      description,
      breadcrumbItems: breadcrumbItems.value,
      data: data.value,
      relatedArticles: relatedArticles.value,
    };
  }
);

if (detailData.value) {
  const meta = detailData.value;

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
