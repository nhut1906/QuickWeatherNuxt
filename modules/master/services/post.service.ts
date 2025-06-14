import type { APIResponse } from "@/interfaces/response.interface";
import { API } from "@/commons/config/post.config";

const usePostService = () => {
  const { $apiClient } = useNuxtApp();

  const getToast = () => {
    if (process.client) {
      return useToastStore();
    }
    return null;
  };

  return {
    // Get list post
    async getList(params?: unknown): Promise<APIResponse<any[]>> {
      return await $apiClient.get(API.POST, { params });
    },

    // Get detail by ID
    async detail(id: string): Promise<APIResponse<any>> {
      return await $apiClient.get(API.DETAIL(id));
    },

    // Get detail by URL path
    async getDetailByUrlPath(url_path: string): Promise<APIResponse<any>> {
      return await $apiClient.get(API.POST_BY_URL_PATH(url_path));
    },

    // Create post
    async create(data: any): Promise<APIResponse<any>> {
      const response = await $apiClient.post(API.CREATE, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      getToast()?.fromApiResponse(response);
      return response;
    },

    // Update post
    async update(id: string, data: any): Promise<APIResponse<any>> {
      const response = await $apiClient.put(API.UPDATE(id), data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      getToast()?.fromApiResponse(response);
      return response;
    },

    // Delete post
    async delete(post_id: string): Promise<APIResponse<any>> {
      const response = await $apiClient.delete(API.DELETE(post_id));
      getToast()?.fromApiResponse(response);
      return response;
    },
  };
};

export default usePostService;
