<template>
  <v-menu bottom offset-y class="vc-menu" :close-on-content-click="true">
    <template v-slot:activator="{ props }">
      <v-btn class="vc-account text-none d-flex justify-content-start" color="primary" v-bind="props">
        <v-icon dark class="icon"> mdi-account </v-icon>
        <span class="name">&nbsp;&nbsp;&nbsp;{{ account?.full_name }}</span>
      </v-btn>
    </template>

    <v-list class="vc-list rounded-sm" density="compact">
      <v-list-item v-for="(item, index) in accountActions" :key="index" :to="item.path" active-color="primary"
        @click="callAction(item.text)">
        <v-list-item-avatar left>
          <v-icon :icon="item.icon"></v-icon>
        </v-list-item-avatar>
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item active-color="primary" @click="logout">
        <v-list-item-avatar left>
          <v-icon :icon="'mdi-logout'"></v-icon>
        </v-list-item-avatar>
        <v-list-item-title>Đăng xuất</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
  <vc-confirm ref="confirmDialog"></vc-confirm>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import accountActions from "@/commons/defines/accountAction";

const router = useRouter();
const confirmDialog = ref<any>(null);

const logout = () => {
  confirmDialog.value.confirm(
    'Đăng xuất',
    'Bạn có muốn đăng xuất?',
    (res: any) => {
      if (res) {
        localStorage.removeItem("userInfo")
        localStorage.removeItem("isLoggedIn")
        router.push({
          name: "LoginView",
        });
      }
    }
  );
}
const callAction = (text: string) => {
  if (text === 'EditPass') {
    //changePasswordModal.value.show();
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/commons/navbar.scss";
</style>
