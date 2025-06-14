<template>
  <div>
    <header
      :style="{ visibility: !(pending || error) ? 'visible' : 'hidden' }"
      class="header"
    >
      <div class="container">
        <div class="header-inner">
          <router-link to="/" class="logo d-inline-block mr-3">
            <img :src="getImageUrl(current_logo_path)" alt="Thoitiet365.org" />
          </router-link>
          <div class="search">
            <div class="search-form search-location">
              <el-autocomplete
                ref="autocompleteRef"
                v-model="searchQuery"
                :fetch-suggestions="searchLocation"
                :trigger-on-focus="false"
                class="inline-input w-50"
                placeholder="Nhập tên địa điểm"
                @select="handleSelect"
              >
                <template #loading>
                  <el-icon class="is-loading">
                    <svg class="circular" viewBox="0 0 20 20">
                      <g
                        class="path2 loading-path"
                        stroke-width="0"
                        style="animation: none; stroke: none"
                      >
                        <circle r="3.375" class="dot1" rx="0" ry="0" />
                        <circle r="3.375" class="dot2" rx="0" ry="0" />
                        <circle r="3.375" class="dot4" rx="0" ry="0" />
                        <circle r="3.375" class="dot3" rx="0" ry="0" />
                      </g>
                    </svg>
                  </el-icon>
                </template>
              </el-autocomplete>
            </div>
            <div class="search-dropdown">
              <div class="dropdown dropdown-custom">
                <button
                  class="dropdown-btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  @click="clickDropdownMenuRegions"
                >
                  Tỉnh/Thành phố
                </button>
                <div
                  class="dropdown-menu c-dropdown-menu shadow"
                  aria-labelledby="dropdownMenuButton"
                >
                  <div class="submenu-wrap">
                    <div
                      v-for="region in regions"
                      :key="region.name"
                      class="divide"
                    >
                      <div class="dropdown-header">{{ region.name }}</div>
                      <router-link
                        v-for="(province, index) in region.provinces"
                        :key="index"
                        class="dropdown-item"
                        :to="`/${province.code_name}`"
                      >
                        {{ province.name }}
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dropdown dropdown-custom">
                <button
                  class="dropdown-btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Tin tức
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <router-link
                    v-for="(item, index) in dataGrid"
                    :key="index"
                    class="dropdown-item"
                    :to="`/danh-muc/${item.url_path}`"
                  >
                    {{ item.category_name }}
                  </router-link>
                </div>
              </div>

              <div class="dropdown dropdown-custom" style="margin-left: 50px">
                <router-link to="/widget"> Widget </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
/**
 * Dependencies injection library
 */
import { ref, watch } from "vue";
import { useCategoryStore } from "@master/stores/category.store";
import { useProvincesStore } from "@app/stores/provinces.store";
import { storeToRefs } from "pinia";
import { getImageUrl } from "@/utils/getPathImg";
import useInformationService from "@master/services/information.service";
import { useRouter, useRoute } from "vue-router";
import slugify from "slugify";

/**
 * Variable define
 */
const informationService = useInformationService();
const router = useRouter();
const route = useRoute();
const provinceStore = useProvincesStore();
const { locations } = storeToRefs(provinceStore);
const store = useCategoryStore();
const { dataGrid } = storeToRefs(store);
const current_logo_path = ref<any>(null);
const searchQuery = ref<any>(null);
const autocompleteRef = ref<any>(null);
const regions = ref<any>([]);

/**
 * Life circle vue js
 */
const { data, pending, error } = await useAsyncData(
  "theHeaderData",
  async () => {
    await store.getList(true);

    const res = (await informationService.detail()) as any;

    if (res?.status == "success") {
      current_logo_path.value = res.data.information.logo_path;
    }
  }
);

/**
 * Function
 */
let timeout: ReturnType<typeof setTimeout>;
const searchLocation = async (keyword: string, cb: any) => {
  await provinceStore.getLocations();

  setTimeout(() => {
    keyword = keyword?.toLowerCase();
    const results = [] as any;

    for (const province of locations.value) {
      for (const district of province.districts) {
        // Tìm trong danh sách xã/phường
        for (const ward of district.wards) {
          if (ward.name.toLowerCase().includes(keyword)) {
            results.push({
              code_name: `${ward.code_name}, ${district.code_name}, ${province.code_name}`,
              value: `${ward.full_name}, ${district.full_name}, ${province.full_name}`,
            });
          }
        }

        // Tìm trong tên huyện/thành phố
        if (district.name.toLowerCase().includes(keyword)) {
          results.push({
            code_name: `${district.code_name}, ${province.code_name}`,
            value: `${district.full_name}, ${province.full_name}`,
          });
        }
      }

      // Tìm theo tỉnh
      if (province.name.toLowerCase().includes(keyword)) {
        results.push({
          code_name: `${province.code_name}`,
          value: `${province.full_name}`,
        });
      }
    }

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(results);
    }, 2000 * Math.random());
  }, 1000);
};

const handleSelect = (item: Record<string, any>) => {
  searchQuery.value = "";
  autocompleteRef.value?.blur();

  const parts = item.code_name.split(",").map((p: any) => p.trim());

  if (parts.length === 3) {
    router.push({
      path: `/${parts[2]}/${parts[1]}/${parts[0]}`
    })
  } else if (parts.length === 2) {
    router.push({
      path: `/${parts[1]}/${parts[0]}`
    })
  } else if (parts.length === 1) {
    router.push({
      path: `/${parts[0]}`
    })
  }
};

const clickDropdownMenuRegions = async () => {
  await provinceStore.getLocations();
  regions.value = locations.value.reduce((acc: any, curr: any) => {
    const region = curr.administrative_region_name;
    const province = {
      name: curr.name,
      code_name: curr.code_name,
      slug: curr.administrative_region_name,
    };

    const existingRegion = acc.find((r: any) => r.name === region);
    if (existingRegion) {
      existingRegion.provinces.push(province);
    } else {
      acc.push({
        name: region,
        provinces: [province],
      });
    }

    return acc;
  }, []);
};

watch(
  () => route.fullPath, // Theo dõi đường dẫn của route
  (newRoute, oldRoute) => {
    searchQuery.value = "";
  }
);
</script>

<style>
.search-location .el-autocomplete {
  width: 455px !important;
}
@media screen and (max-width: 575px) {
  .search-location .el-autocomplete {
    width: 397px !important;
  }
}
.circular {
  display: inline;
  height: 30px;
  width: 30px;
  animation: loading-rotate 2s linear infinite;
}
.path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--el-color-primary);
  stroke-linecap: round;
}
.loading-path .dot1 {
  transform: translate(3.75px, 3.75px);
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
}
.loading-path .dot2 {
  transform: translate(calc(100% - 3.75px), 3.75px);
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
  animation-delay: 0.4s;
}
.loading-path .dot3 {
  transform: translate(3.75px, calc(100% - 3.75px));
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
  animation-delay: 1.2s;
}
.loading-path .dot4 {
  transform: translate(calc(100% - 3.75px), calc(100% - 3.75px));
  fill: var(--el-color-primary);
  animation: custom-spin-move 1s infinite linear alternate;
  opacity: 0.3;
  animation-delay: 0.8s;
}
@keyframes loading-rotate {
  to {
    transform: rotate(360deg);
  }
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
@keyframes custom-spin-move {
  to {
    opacity: 1;
  }
}
</style>
