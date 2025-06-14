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
            <div class="cell-item">Key Name</div>
          </template>
          {{ setting.key_name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">Value</div>
          </template>
          {{ setting.value }}
        </el-descriptions-item>
      </el-descriptions>
      <el-form
        ref="settingForm"
        :model="setting"
        :rules="rules"
        label-position="right"
        style="padding: 12px 16px"
        require-asterisk-position="right"
        v-else
      >
        <vc-row :gutter="20">
          <vc-col :span="12">
            <vc-input-group required prop="key_name" label="Key Name">
              <!-- <vc-input
                v-model="setting.key_name"
                placeholder="Nhập key name"
                maxlength="255"
              /> -->
              <vc-select
                v-model="setting.key_name"
                :items="keyNames"
                fieldText="key_name"
                fieldValue="key_name"
              ></vc-select>
            </vc-input-group>
          </vc-col>
          <vc-col :span="12">
            <vc-input-group required prop="value" label="Value">
              <vc-input
                v-model="setting.value"
                placeholder="Nhập value"
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
        @click="onSave(settingForm)"
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
import { ref, reactive } from "vue";
import validate from "@/utils/validate_elp";
import type { FormInstance } from "element-plus";
import useInformationService from "@master/services/information.service";
import { POPUP_TYPE } from "@/commons/const";

/**
 * Variable define
 */
const informationService = useInformationService();
const rules = reactive({
  key_name: [
    {
      label: "Key Name",
      required: true,
      validator: validate.requiredSelectRule,
      trigger: ["change"],
    },
  ],
  value: [
    {
      label: "Value",
      required: true,
      validator: validate.required,
      trigger: ["blur"],
    },
  ],
});

const keyNames = ref<any>([
  { key_name: "google_analytics_id" },
  { key_name: "google_tag_manager_id" },
  { key_name: "search_console_meta_tag" },
]);
const props = defineProps<{
  type: POPUP_TYPE;
}>();

const settingForm = ref<FormInstance>();
const isLoading = ref(false);
const confirmDialog = ref<any>(null);
const modal = ref<any>(null);
const modalTitle = ref<any>(null);
let callback = (value: any) => {
  return value;
};

const setting = reactive({
  id: "",
  key_name: "google_analytics_id",
  value: "",
});

/**
 * Function
 */

const onSave = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate(async (valid) => {
    if (!valid) return;

    isLoading.value = true;
    if (setting.id) {
      await informationService.updateSiteSetting(setting).finally(() => {
        isLoading.value = false;
      });
    } else {
      await informationService.createSiteSetting(setting).finally(() => {
        isLoading.value = false;
      });
    }
    callback(true);
    close();
  });
};

const open = async (title: any, item: any, _callback: any) => {
  let settingInfo = {
    id: "",
    key_name: null,
    value: null,
  };
  modalTitle.value = title;

  if (item)
    settingInfo = (await informationService.detailSiteSetting(item)).data
      .setting as any;
  callback = _callback;
  Object.assign(setting, settingInfo);

  modal.value.open();
};

const close = () => {
  if (settingForm.value) {
    settingForm.value.resetFields();
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
