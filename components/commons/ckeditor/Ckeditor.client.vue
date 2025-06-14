<template>
  <div style="width: 100%">
    <div ref="editorContainer"></div>
  </div>
</template>

<script>

export default {
  name: "CkEditor",
  props: {
    modelValue: null,
    type: null,
  },
  emits: ["update:modelValue"],
  mounted() {
    // Dynamically import CKEditor only on client
    import("@ckeditor/ckeditor5-build-classic").then(({ default: ClassicEditor }) => {
      ClassicEditor.create(this.$refs.editorContainer, {
        ckfinder: {
          uploadUrl: `${import.meta.env.VITE_API_URL}/posts/upload`,
        },
      })
        .then((editor) => {
          this.editor = editor;
          this.editor.setData(this.modelValue);

          editor.model.document.on("change:data", () => {
            setTimeout(() => {
              this.$emit("update:modelValue", editor.getData());
            }, 100);
          });
        })
        .catch((error) => {
          console.error("Lỗi khi khởi tạo CKEditor:", error);
        });
    });
  },
  beforeUnmount() {
    if (this.editor) {
      this.editor
        .destroy()
        .catch((error) => console.error("Lỗi khi hủy CKEditor:", error));
    }
  },
  watch: {
    modelValue(newValue) {
      if (this.editor) {
        if (newValue === "") {
          this.editor.setData("");
        }
      }
    },
  },
};
</script>
