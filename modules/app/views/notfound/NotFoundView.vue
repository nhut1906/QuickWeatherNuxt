<template>
  <section class="new-content">
    <div class="container">
      <div class="new-content-inner">
        <div class="new-content-wrap" style="width: 100%">
          <div class="new-content-detail">
            <h1 class="title text-center">Trang không tồn tại!</h1>
            <div class="entry-content text-center">
              <img
                src="/assets/images/404.jpeg"
                style="width: 500px"
                class="img-fluid"
              />
              <router-link to="/" class="button-back-home"
                >Trở về trang chủ</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";

onMounted(() => {
  document.title = "Not Found";
});
</script>
