<template>
  <div class="vc-page page-post-list">
    <!-- breadcrumb block-->
    <vc-row :gutter="20">
      <vc-col :md="12" class="align-center">
        <el-breadcrumb :separator-icon="'ArrowRight'">
          <el-breadcrumb-item :to="{ path: '/' }"
            >Quản trị hệ thống</el-breadcrumb-item
          >
          <el-breadcrumb-item> Quản lí thông tin </el-breadcrumb-item>
        </el-breadcrumb>
      </vc-col>
    </vc-row>
    <vc-card class="mt-4 mb-4">
      <el-form
        ref="postForm"
        label-position="right"
        style="padding: 12px 16px"
        require-asterisk-position="right"
      >
        <vc-button type="primary" :icon="'Plus'" @click="onUpdateSiteMap"
          >Cập nhật sitemap</vc-button
        >
        <hr />
        <h1 style="font-size: 20px; font-weight: bold; padding-bottom: 20px">
          Site Setting
        </h1>
        <!-- header block-->
        <vc-button type="primary" :icon="'Plus'" @click="onAddNew"
          >Thêm mới</vc-button
        >
        <!-- detail block-->
        <vc-table
          class="mt-4 mb-4"
          :datas="dataGrid"
          :tableConfig="tableConfig"
          :colConfigs="colConfig"
          :page="pageConfig"
          :loading="loading"
          @dbClick="onEdit"
          @pageChanged="onPageChanged"
        >
          <template #action="{ data }">
            <div class="d-flex flex-center">
              <vc-button
                type="warning"
                size="small"
                class="btn-acttion"
                @click="onView(data)"
                :icon="'View'"
              ></vc-button>
              <vc-button
                type="primary"
                size="small"
                class="btn-acttion"
                @click="onEdit(data)"
                :icon="'Edit'"
              ></vc-button>
              <vc-button
                type="danger"
                size="small"
                class="btn-acttion"
                @click="onDeleteItem(data)"
                :icon="'Delete'"
              ></vc-button>
            </div>
          </template>
        </vc-table>
        <hr />
        <h1 style="font-size: 20px; font-weight: bold; padding-bottom: 20px">
          Seo Meta
        </h1>
        <vc-row :gutter="20">
          <vc-col :span="12">
            <vc-input-group required label="Trang">
              <vc-select
                v-model="page"
                :items="pages"
                fieldText="page_name"
                fieldValue="page_key"
                @update:modelValue="changePage"
              ></vc-select>
            </vc-input-group>
          </vc-col>
          <vc-col :span="12">
            <vc-input-group required label="Từ thay thế:" class="custom">
              <label>CATEGORY_NAME : Tên danh mục</label>
              <label>NEWs_TITLE : Tiêu đề tin tức</label>
              <label>TITLE_WEATHER : Tiêu đề thời tiết</label>
            </vc-input-group>
          </vc-col>
        </vc-row>
        <vc-row :gutter="20">
          <vc-col :span="12">
            <vc-input-group required label="Title">
              <vc-input v-model="title" :rows="4" type="textarea" />
            </vc-input-group>
          </vc-col>
          <vc-col :span="12">
            <vc-input-group required label="Description">
              <vc-input v-model="description" :rows="4" type="textarea" />
            </vc-input-group>
          </vc-col>
        </vc-row>
        <vc-button
          type="primary"
          class="ml-2"
          @click="onSaveSeo()"
          :loading="isLoading"
          :icon="'FolderChecked'"
        >
          Save
        </vc-button>

        <hr />
        <h1 style="font-size: 20px; font-weight: bold; padding-bottom: 20px">
          Logo & Footer
        </h1>
        <vc-row :gutter="20">
          <vc-col :span="24">
            <vc-input-group required label="Logo">
              <el-upload
                ref="upload"
                class="upload-demo"
                :on-change="handleFileChange"
                drag
                :auto-upload="false"
              >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                  Thả tập tin ở đây hoặc <em>bấm vào để tải lên</em>
                </div>
              </el-upload>
            </vc-input-group>
          </vc-col>
        </vc-row>

        <vc-row :gutter="20">
          <vc-col :span="24">
            <vc-input-group label="Ảnh hiện tại">
              <el-image :src="getImageUrl(current_logo_path)" />
            </vc-input-group>
          </vc-col>
        </vc-row>
        <hr />
        <vc-row :gutter="20">
          <vc-col :span="24">
            <vc-input-group
              required
              prop="footer_content"
              label="Nội dung footer"
            >
              <vc-input v-model="footer_content" :rows="10" type="textarea" />
            </vc-input-group>
          </vc-col>
        </vc-row>
        <vc-row :gutter="20">
          <vc-col :span="24">
            <vc-input-group label="Xem trước">
              <div style="width: 100%" v-html="footer_content"></div>
            </vc-input-group>
          </vc-col>
        </vc-row>
      </el-form>

      <vc-button
        type="primary"
        class="ml-2"
        @click="onSave()"
        :loading="isLoading"
        :icon="'FolderChecked'"
      >
        Chỉnh sửa
      </vc-button>
    </vc-card>
    <vc-confirm ref="confirmDialog"></vc-confirm>
    <detail-modal ref="detailRef" :type="popupType"></detail-modal>
  </div>
</template>

<script setup lang="ts">
/**
 * Dependencies injection library
 */
import { getImageUrl } from "@/utils/getPathImg";
import { onMounted, ref } from "vue";
import { useToastStore } from "@/stores/toast.store";
import useInformationService from "@master/services/information.service";
import { POPUP_TYPE } from "@/commons/const";
import { storeToRefs } from "pinia";
import { useInformationStore } from "@master/stores/information.store";
import { colConfig, tableConfig } from "@/commons/config/information.config";
import DetailModal from "./SiteSettingView.vue";

/**
 * Variable define
 */
const informationService = useInformationService();
const store = useInformationStore();
const { dataGrid, pageConfig, loading } = storeToRefs(store);
const popupType = ref<any>(null);
const detailRef = ref<any>(null);
const toastStore = useToastStore();
const page = ref<any>("Home");
const pages = ref<any>([]);
const footer_content = ref<any>(null);
const logo_selected = ref<any>(null);
const information_id = ref<any>(null);
const current_logo_path = ref<any>(null);
const upload = ref<any>(null);
const title = ref<any>(null);
const description = ref<any>(null);
const isLoading = ref<any>(false);
const confirmDialog = ref<any>(null);

/**
 * Life circle vue js
 */
onMounted(async () => {
  await setSeoData();
  await onInit();
  await onSearch();
});

/**
 * Function
 */
const changePage = async () => {
  await setSeoData();
};

const setSeoData = async () => {
  const meta = await informationService.seo_meta(page.value);
  if (meta) {
    title.value = meta?.data?.information?.title;
    description.value = meta?.data?.information?.description;
  }
};

const onInit = async () => {
  pages.value = (await informationService.all_seo_meta())?.data?.seometas ?? [];

  const res = (await informationService.detail()) as any;

  if (res?.status == "success") {
    footer_content.value = res.data.information.footer_content;
    information_id.value = res.data.information.information_id;
    current_logo_path.value = res.data.information.logo_path;
  }
};

const handleFileChange = (file: any, fileList: any) => {
  logo_selected.value = fileList;
};
const onSave = async () => {
  if (footer_content.value === "" || !footer_content.value) {
    toastStore.push({
      type: "error",
      message: "Vui lòng nhập nội dung footer",
    });
    return;
  }
  const formData = new FormData();
  formData.append("footer_content", footer_content.value ?? "");

  if (logo_selected.value && logo_selected.value.length != 0) {
    logo_selected.value.forEach((file: any) => {
      formData.append("logoFile", file.raw);
    });
  }

  isLoading.value = true;

  await informationService
    .update(information_id.value, formData)
    .finally(() => {
      isLoading.value = false;
    });

  await onInit();
  if (upload.value) {
    upload.value!.clearFiles();
  }
};
const onSaveSeo = async () => {
  if (title.value === "" || !title.value) {
    toastStore.push({
      type: "error",
      message: "Vui lòng nhập nội dung title",
    });
    return;
  }
  if (description.value === "" || !description.value) {
    toastStore.push({
      type: "error",
      message: "Vui lòng nhập nội dung description",
    });
    return;
  }

  isLoading.value = true;

  await informationService
    .updateSeo(page.value, {
      title: title.value,
      description: description.value,
    })
    .finally(() => {
      isLoading.value = false;
    });

  await setSeoData();
};

// onSearch
const onSearch = async () => {
  await store.getList();
};

// onPageChanged
const onPageChanged = async (page: any) => {
  pageConfig.value = { ...page };
  await onSearch();
};

// onAddNew
const onAddNew = () => {
  popupType.value = POPUP_TYPE.CREATE;
  detailRef.value.open("Thêm mới", null, async (res: any) => {
    if (res) await onSearch();
  });
};

// onEdit
const onEdit = (item: any) => {
  popupType.value = POPUP_TYPE.EDIT;
  detailRef.value.open("Chỉnh sửa", item.id, async (res: any) => {
    if (res) await onSearch();
  });
};

// onView
const onView = (item: any) => {
  popupType.value = POPUP_TYPE.VIEW;
  detailRef.value.open("Chi tiết", item.id);
};

// onDeleteItem
const onDeleteItem = (item: any) => {
  confirmDialog.value.confirm(
    "Xác nhận xóa",
    "Bạn muốn xóa dữ liệu?",
    async (res: any) => {
      if (res) {
        await informationService.deleteSiteSetting(item);
        await onSearch();
      }
    }
  );
};

const onUpdateSiteMap = async () => {
  await informationService.generateSitemaps();
};
</script>

<style>
.custom .el-form-item__content {
  display: grid;
}

.el-form-item {
  display: block;
}
</style>
