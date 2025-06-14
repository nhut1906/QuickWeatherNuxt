<template>
  <vc-modal
    ref="modal"
    :title="modalTitle"
    :type="props.type"
    @close="close"
    :width="'100%'"
  >
    <template #content>
      <el-form
        ref="postForm"
        :model="post"
        :rules="rules"
        label-position="right"
        style="padding: 12px 16px"
        require-asterisk-position="right"
        :disabled="props.type == POPUP_TYPE.VIEW"
      >
        <vc-row :gutter="20">
          <vc-col :span="12">
            <vc-input-group required prop="title" label="Tiêu đề">
              <vc-input
                v-model="post.title"
                placeholder="Nhập tiêu đề bài đăng"
                maxlength="250"
              />
            </vc-input-group>
          </vc-col>

          <vc-col :span="12">
            <vc-input-group required prop="url_path" label="Đường dẫn bài đăng">
              <vc-input
                v-model="post.url_path"
                placeholder="Nhập đường dẫn bài đăng"
                maxlength="100"
              />
            </vc-input-group>
          </vc-col>
        </vc-row>
        <vc-row>
          <vc-col :span="24">
            <vc-input-group required prop="title" label="Danh mục bài đăng">
              <vc-select
                v-model="post.category_id"
                :items="dataGrid"
                fieldValue="category_id"
                fieldText="category_name"
              />
            </vc-input-group>
          </vc-col>
        </vc-row>

        <vc-row :gutter="20">
          <vc-col>
            <vc-input-group required label="Ảnh đại diện">
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
        <vc-row :gutter="20" v-if="props.type != POPUP_TYPE.CREATE">
          <vc-col :span="4">
            <el-image
              style="width: 100px; height: 100px"
              :src="getImageUrl(post.image_url)"
              fit="cover"
            >
              <template #error>
                <div class="image-slot">
                  <el-icon><icon-picture /></el-icon>
                </div>
              </template>
            </el-image>
          </vc-col>
        </vc-row>
        <vc-row :gutter="20">
          <vc-col :span="24">
            <ClientOnly>
              <vc-input-group label="Nội dung">
                <Ckeditor
                  :key="keyEditor"
                  v-model="content"
                  :type="props.type"
                />
              </vc-input-group>
            </ClientOnly>
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
        @click="onSave(postForm)"
        :loading="isLoading"
        :icon="'FolderChecked'"
      >
        {{ props.type == POPUP_TYPE.CREATE ? "Thêm mới" : "Chỉnh sửa" }}
      </vc-button>
    </template>
  </vc-modal>
  <vc-confirm ref="confirmDialog"></vc-confirm>
</template>

<script setup lang="ts">
/**
 * Dependencies injection library
 */
import { ref, reactive, onMounted, watch } from "vue";
import validate from "@/utils/validate_elp";
import usePostService from "@master/services/post.service";
import { POPUP_TYPE } from "@/commons/const";
import { useToastStore } from "@/stores/toast.store";
import type { FormInstance } from "element-plus";
import Ckeditor from "~/components/commons/ckeditor/Ckeditor.client.vue";
import { getImageUrl } from "@/utils/getPathImg";
import { useCategoryStore } from "@master/stores/category.store";
import { storeToRefs } from "pinia";
import slugify from "slugify";

/**
 * Variable define
 */
const postService = usePostService();
const keyEditor = ref(0);
const toastStore = useToastStore();
const rules = reactive({
  title: [
    {
      label: "Tiêu đề bài đăng",
      required: true,
      validator: validate.required,
      trigger: ["blur"],
    },
    {
      label: "Tiêu đề bài đăng",
      validator: validate.maxLengthRule,
      trigger: ["blur"],
      max: 255,
    },
  ],
  category_id: [
    {
      label: "Danh mục",
      required: true,
      validator: validate.required,
      trigger: ["change"],
    },
  ],

  url_path: [
    {
      label: "Đường dẫn bài đăng",
      required: true,
      validator: validate.required,
      trigger: ["blur"],
    },
    {
      label: "Đường dẫn bài đăng",
      validator: validate.maxLengthRule,
      trigger: ["blur"],
      max: 100,
    },
  ],
});

const props = defineProps<{
  type: POPUP_TYPE;
}>();

const store = useCategoryStore();
const { dataGrid } = storeToRefs(store);
const upload = ref<any>(null);
const content = ref<any>("");
const avatar_selected = ref<any>(null);
const postForm = ref<FormInstance>();
const isLoading = ref(false);
const confirmDialog = ref<any>(null);
const modal = ref<any>(null);
const modalTitle = ref<any>(null);
let callback = (value: any) => {
  return value;
};

const post = reactive({
  post_id: "",
  category_id: "",
  url_path: "",
  title: "",
  image_url: "",
  content: "",
});

/**
 * Life circle vue js
 */
// onMounted function
onMounted(async () => {
  await store.getList(true);
});

watch(
  () => post.title,
  (newVal: any) => {
    post.url_path = slugify(newVal?.toLowerCase() ?? "");
  }
);

/**
 * Function
 */
const onSave = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate(async (valid) => {
    if (!valid) return;

    if (props.type == POPUP_TYPE.CREATE && avatar_selected.value.length < 1) {
      toastStore.push({
        type: "error",
        message: "Vui lòng chọn ảnh đại diện",
      });
      return;
    }
    if (content.value === "" || !content.value) {
      toastStore.push({
        type: "error",
        message: "Vui lòng nhập nội dung",
      });
      return;
    }
    const formData = new FormData();
    formData.append("title", post.title ?? "");
    formData.append("category_id", post.category_id ?? "");
    formData.append("url_path", post.url_path ?? "");
    formData.append("content", content.value ?? "");

    if (avatar_selected.value && avatar_selected.value.length != 0) {
      avatar_selected.value.forEach((file: any) => {
        formData.append("upload", file.raw);
      });
    }
    isLoading.value = true;
    if (post.post_id) {
      await postService.update(post.post_id, formData).finally(() => {
        isLoading.value = false;
      });
    } else {
      await postService.create(formData).finally(() => {
        isLoading.value = false;
      });
    }
    callback(true);
    close();
  });
};

const open = async (title: any, item: any, _callback: any) => {
  let postInfo = {
    post_id: "",
    title: "",
    content: "",
  } as any;
  modalTitle.value = title;

  if (item) {
    postInfo = (await postService.detail(item)).data?.post;
  }
  callback = _callback;

  Object.assign(post, postInfo);
  content.value = post.content ?? "";
  modal.value.open();
  keyEditor.value++;
};

const close = () => {
  post.content = "";
  if (upload.value) {
    upload.value!.clearFiles();
  }
  if (postForm.value) {
    postForm.value.resetFields();
  }
  post.category_id = "";
  content.value = "";
  modal.value.close();
};

const handleFileChange = (file: any, fileList: any) => {
  avatar_selected.value = fileList;
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

.upload-demo {
  width: 100%;
}
</style>
