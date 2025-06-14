import type { APIResponse } from "@/interfaces/response.interface";
import { API } from "@/commons/config/information.config";

const useInformationService = () => {
  const { $apiClient } = useNuxtApp();

  const toast = () => {
    if (process.client) {
      return useToastStore();
    }
    return null;
  };

  return {
    async getListSiteSetting(params?: unknown): Promise<APIResponse<any[]>> {
      return $apiClient.get(API.LIST_SITE_SETTING, { params });
    },

    async detailSiteSetting(setting_id: string): Promise<APIResponse<any>> {
      return $apiClient.get(API.DETAIL_SITE_SETTING(setting_id));
    },

    async createSiteSetting(data: any): Promise<APIResponse<any>> {
      const response = await $apiClient.post(API.CREATE_SITE_SETTING, data);
      toast()?.fromApiResponse(response);
      return response;
    },

    async updateSiteSetting(data: any): Promise<APIResponse<any>> {
      const response = await $apiClient.put(
        API.UPDATE_SITE_SETTING(data.id),
        data
      );
      toast()?.fromApiResponse(response);
      return response;
    },

    async deleteSiteSetting(data: any): Promise<APIResponse<any>> {
      const response = await $apiClient.delete(
        API.DELETE_SITE_SETTING(data.id)
      );
      toast()?.fromApiResponse(response);
      return response;
    },

    async detail(): Promise<APIResponse<any>> {
      return $apiClient.get(API.DETAIL);
    },

    async update(information_id: any, data: any): Promise<APIResponse<any>> {
      const response = await $apiClient.put(API.UPDATE(information_id), data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast()?.fromApiResponse(response);
      return response;
    },

    async updateSeo(page_key: any, data: any): Promise<APIResponse<any>> {
      const response = await $apiClient.put(API.UPDATE_SEO(page_key), data);
      toast()?.fromApiResponse(response);
      return response;
    },

    async seo_meta(routerName: any): Promise<APIResponse<any>> {
      return $apiClient.get(API.SEO_META(routerName));
    },

    async all_seo_meta(): Promise<APIResponse<any>> {
      return $apiClient.get(API.ALL_SEO_META);
    },

    async generateSitemaps(): Promise<APIResponse<any>> {
      const response = await $apiClient.get(API.GENERATE_SITEMAPS);
      toast()?.fromApiResponse(response);
      return response;
    },
  };
};

export default useInformationService;
