<template>
  <div class="layout-wrapper">
    <TheHeader />
    <slot></slot>
    <TheFooter />

    <noscript v-for="(id, index) in data?.GTMs" :key="index">
      <iframe
        :src="`https://www.googletagmanager.com/ns.html?id=${id}`"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
      ></iframe>
    </noscript>

    <vc-toast></vc-toast>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import TheHeader from "~/components/layouts/TheHeader.vue";
import TheFooter from "~/components/layouts/TheFooter.vue";
import useInformationService from "~/modules/master/services/information.service";

const informationService = useInformationService();

const GTMs = ref<string[]>([]);
const route = useRoute();
const config = useRuntimeConfig();

const { data, pending, error } = await useAsyncData("seoDefault", async () => {
  const res = (await informationService.getListSiteSetting({
    page: 1,
    size: Number.MAX_SAFE_INTEGER,
  })) as any;

  const settingMap: Record<string, string> = {};
  res?.data?.siteSettings?.forEach((s: any) => {
    if (s?.key_name && s?.value) {
      settingMap[s.key_name] = s.value;
    }
  });

  const scripts = [];
  const meta = [];

  // Google Analytics
  if (settingMap.google_analytics_id) {
    scripts.push(
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${settingMap.google_analytics_id}`,
        async: true,
      },
      {
        children: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${settingMap.google_analytics_id}');
        `,
      }
    );
  }

  // Google Tag Manager
  if (settingMap.google_tag_manager_id) {
    GTMs.value.push(settingMap.google_tag_manager_id);
    scripts.push({
      children: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${settingMap.google_tag_manager_id}');
      `,
    });
  }

  // Google Search Console
  if (settingMap.search_console_meta_tag) {
    meta.push({
      name: "google-site-verification",
      content: settingMap.search_console_meta_tag,
    });
  }

  return {
    scripts,
    GTMs,
    meta,
  };
});

if (data.value) {
  useHead({
    script: data.value.scripts,
    meta: data.value.meta,
    link: [
      {
        rel: "canonical",
        href: config.public.appUrl + route.fullPath,
      },
    ],
  });
}
</script>

<style>
.layout-wrapper {
  display: flex;
  flex-direction: column;
}
</style>
