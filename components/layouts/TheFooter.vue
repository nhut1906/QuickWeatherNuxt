<template>
  <div v-if="!(pending || error)" v-html="data?.footer_content"></div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import useInformationService from "@master/services/information.service";

const { data, pending, error } = await useAsyncData(
  "theFooterData",
  async () => {
    const informationService = useInformationService();
    const res = await informationService.detail();

    let footer_content = "";
    if (res?.status === "success") {
      footer_content = res.data?.information?.footer_content || "";
    }
    return {
      footer_content,
    };
  }
);
</script>

<style scoped></style>
