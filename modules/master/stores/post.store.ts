/**
 * Dependencies injection library
 */
import { defineStore } from "pinia";
import usePostService from "@master/services/post.service";
import dateTime from "@/utils/dateTime";

export const usePostStore = defineStore("usePostStore", {
  state: () => ({
    dataGrid: <any>[],
    formData: <any>{},
    pageConfig: <any>[],
    loading: <any>[],
    search: <any>[],
    goSort: <any>[],
  }),
  actions: {
    /**
     * Action
     */
    // Get list post
    async getList(isGetAll: any = false) {
      const postService = usePostService();
      this.loading = true;
      const config = isGetAll
        ? {
            sort: this.goSort,
            search: this.search,
            page: 1,
            size: Number.MAX_SAFE_INTEGER,
          }
        : { sort: this.goSort, search: this.search, ...this.pageConfig };
      await postService.getList(config).then((data: any) => {
        this.dataGrid = data?.data?.posts ?? [];
        this.pageConfig.page = data.data?.metadata?.page;
        this.pageConfig.size = data.data?.metadata?.size;
        this.pageConfig.total = data.data?.metadata?.totalRecords;
        this.dataGrid = this.dataGrid.map((item: any) => {
          if (item.created_at) {
            const formatted = dateTime.formatDateTimeNew(item.created_at);
            item.created_at = formatted;
          }
          return item;
        });
      });
      this.loading = false;
    },
  },
});
