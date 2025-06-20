<template>
  <vc-modal ref="modal" :title="modalTitle" :type="props.type" @close="close">
    <template #content>
      <el-descriptions
        style="padding: 12px 16px"
        :column="1"
        border
        v-if="type == POPUP_TYPE.VIEW"
      >
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">Tên danh mục</div>
          </template>
          {{ category.category_name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">Ngày tạo</div>
          </template>
          {{ dateTime.formatDateTimeNew(category.created_at) }}
        </el-descriptions-item>
      </el-descriptions>
      <el-form
        ref="categoryForm"
        :model="category"
        :rules="rules"
        label-position="right"
        style="padding: 12px 16px"
        require-asterisk-position="right"
        v-else
      >
        <vc-row :gutter="20">
          <vc-col :span="12">
            <vc-input-group required prop="category_name" label="Tên danh mục">
              <vc-input
                v-model="category.category_name"
                placeholder="Nhập tên danh mục"
                maxlength="250"
              />
            </vc-input-group>
          </vc-col>
          <vc-col :span="12">
            <vc-input-group required prop="url_path" label="Đường dẫn danh mục">
              <vc-input
                v-model="category.url_path"
                placeholder="Nhập đường dẫn danh mục"
                maxlength="100"
              />
            </vc-input-group>
          </vc-col>
        </vc-row>
      </el-form>
    </template>

    <template #acttion>
      <vc-button
        v-if="props.type != POPUP_TYPE.VIEW"
        type="primary"
        class="ml-2"
        code="F00004"
        @click="onSave(categoryForm)"
        :loading="isLoading"
        :icon="'FolderChecked'"
      >
        {{ props.type == POPUP_TYPE.CREATE ? "Thêm mới" : "Chỉnh sửa" }}
      </vc-button>
    </template>
    <vc-confirm ref="confirmDialog"></vc-confirm>
  </vc-modal>
</template>

<script setup lang="ts">
/**
 * Dependencies injection library
 */
import { ref, reactive, watch } from "vue";
import validate from "@/utils/validate_elp";
import type { FormInstance } from "element-plus";
import useCategoryService from "@master/services/category.service";
import { POPUP_TYPE } from "@/commons/const";
import dateTime from "@/utils/dateTime";
import slugify from "slugify";

/**
 * Variable define
 */
const categoryService = useCategoryService();
const rules = reactive({
  category_name: [
    {
      label: "Tên danh mục",
      required: true,
      validator: validate.required,
      trigger: ["blur"],
    },
    {
      label: "Tên danh mục",
      validator: validate.maxLengthRule,
      trigger: ["blur"],
      max: 250,
    },
  ],
  url_path: [
    {
      label: "Đường dẫn danh mục",
      required: true,
      validator: validate.required,
      trigger: ["blur"],
    },
    {
      label: "Đường dẫn danh mục",
      validator: validate.maxLengthRule,
      trigger: ["blur"],
      max: 100,
    },
  ],
});

const props = defineProps<{
  type: POPUP_TYPE;
}>();

const categoryForm = ref<FormInstance>();
const isLoading = ref(false);
const confirmDialog = ref<any>(null);
const modal = ref<any>(null);
const modalTitle = ref<any>(null);
let callback = (value: any) => {
  return value;
};

const category = reactive({
  category_id: "",
  url_path: "",
  category_name: "",
  created_at: "",
});

/**
 * Life circle vue js
 */
watch(
  () => category.category_name,
  (newVal: any) => {
    category.url_path = slugify(newVal?.toLowerCase() ?? "");
  }
);

/**
 * Function
 */

const onSave = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate(async (valid) => {
    if (!valid) return;

    isLoading.value = true;
    if (category.category_id) {
      await categoryService.update(category).finally(() => {
        isLoading.value = false;
      });
    } else {
      await categoryService.create(category).finally(() => {
        isLoading.value = false;
      });
    }
    callback(true);
    close();
  });
};

const open = async (title: any, item: any, _callback: any) => {
  let categoryInfo = {
    category_id: "",
    category_name: null,
    created_at: null,
  };
  modalTitle.value = title;

  if (item)
    categoryInfo = (await categoryService.detail(item)).data.category as any;
  callback = _callback;
  Object.assign(category, categoryInfo);

  modal.value.open();
};

const close = () => {
  if (categoryForm.value) {
    categoryForm.value.resetFields();
  }
  modal.value.close();
};

defineExpose({
  open,
  close,
});
</script>
<style>
.el-form-item {
  display: block;
}
</style>
