<template>
  <el-container class="v-application">
    <el-container>
      <TheSideBar v-if="isMenuVisibleLocal" :isCollapse="isCollapse" />
      <el-main>
        <TheNavBar
          @toogleSidebar="onCollapse"
          @isMenuVisible="isMenuVisibleLocal"
        />
        <slot></slot>
      </el-main>
    </el-container>
    <vc-confirm ref="logoutPopup"></vc-confirm>
  </el-container>
  <vc-toast></vc-toast>
</template>

<script setup lang="ts">
import TheNavBar from "@/components/layouts/TheNavBar.vue";
import TheSideBar from "@/components/layouts/TheSideBar.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@auth/stores/auth.store";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { loggedIn } = storeToRefs(authStore);

const router = useRouter();

const isCollapse = ref<boolean>(false);
const isMenuVisibleLocal = ref<boolean>(true);
const logoutPopup = ref<any>(null);

onMounted(async () => {
  document.title = "Trang quản trị";
  handleResize();
  window.addEventListener("resize", handleResize);
  await authStore.refresh();
  // if (!loggedIn.value) gotoLogin();
});

const handleResize = () => {
  if (window.matchMedia("(max-width: 768px)").matches) {
    isMenuVisibleLocal.value = false;
  } else {
    isMenuVisibleLocal.value = true;
  }
};

const onCollapse = (value: any) => {
  isCollapse.value = value;
};

const gotoLogin = () => {
  router.push({
    name: "LoginView",
  });
};
</script>

<style lang="scss">
@import "@/assets/styles/main.scss";
@import "@/assets/styles/page/client/_footerClient.scss";
</style>
