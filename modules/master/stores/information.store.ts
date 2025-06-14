/**
 * Dependencies injection library
 */
import { defineStore } from "pinia";
import useInformationService from "@master/services/information.service";

export const useInformationStore = defineStore("useInformationStore", {
  state: () => ({
    dataGrid: <any>[],
    formData: <any>{},
    pageConfig: <any>[],
    loading: <any>[],
  }),
  actions: {
    /**
     * Action
     */
    // Get list information
    async getList(isGetAll: any = false) {
      const informationService = useInformationService();
      this.loading = true;
      const config = isGetAll
        ? { page: 1, size: Number.MAX_SAFE_INTEGER }
        : { ...this.pageConfig };
      await informationService.getListSiteSetting(config).then((data: any) => {
        this.dataGrid = data.data?.siteSettings ?? [];
        this.pageConfig.page = data.data?.metadata?.page;
        this.pageConfig.size = data.data?.metadata?.size;
        this.pageConfig.total = data.data?.metadata.totalRecords;
        this.loading = false;
      });
    },
  },
});
