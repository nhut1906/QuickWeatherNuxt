<template>
  <vc-side-bar-left>
    <div class="container-profile mb-8">
      <div class="headline">
        <h2>Thông tin</h2>
      </div>
      <div class="profile-content">
        <vc-card class="box-card">
          <vc-row :gutter="12" class="box-card-row">
            <vc-col :span="24" :md="{ span: 3 }" class="box-card-row-col d-flex-box">
              <vc-icon class="box-card-row-col-icon icon-size-custom" type="Avatar">
              </vc-icon>
            </vc-col>
            <vc-col :span="24" :md="{ span: 8 }" class="box-card-row-col">
              <label> Họ và tên</label>
              <h2>{{ account?.display_name }}</h2>
            </vc-col>
          </vc-row>
          <vc-row :gutter="12" class="box-card-row">
            <vc-col :span="24" :md="{ span: 8 }" class="box-card-row-col">
              <small>Địa chỉ email</small>
              <h4>{{ account?.email }}</h4>
            </vc-col>
          </vc-row>
        </vc-card>
      </div>
    </div>
  </vc-side-bar-left>
</template>

<script setup lang="ts">
import { useAuthStore } from '@auth/stores/auth.store'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { account } = storeToRefs(authStore)

</script>

<style lang="scss" scoped>
@import '@/assets/styles/page/account/accountProfile.scss';
</style>
