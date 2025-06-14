import type { APIResponse } from '@/interfaces/response.interface'
import { API } from '@/commons/config/category.config'

const useCategoryService = () => {
  const { $apiClient } = useNuxtApp()

  const getToast = () => {
    if (process.client) {
      return useToastStore()
    }
    return null
  }

  return {
    // Get list category
    async getList(params?: unknown): Promise<APIResponse<any[]>> {
      return await $apiClient.get(API.CATEGORY, { params })
    },

    // Get detail by URL path
    async getDetailByUrlPath(url_path: string): Promise<APIResponse<any>> {
      return await $apiClient.get(API.CATEGORY_BY_URL_PATH(url_path))
    },

    // Get detail by ID
    async detail(category_id: string): Promise<APIResponse<any>> {
      return await $apiClient.get(API.DETAIL(category_id))
    },

    // Create category
    async create(data: any): Promise<APIResponse<any>> {
      const response = await $apiClient.post(API.CREATE, data)
      getToast()?.fromApiResponse(response)
      return response
    },

    // Update category
    async update(data: any): Promise<APIResponse<any>> {
      const response = await $apiClient.put(API.UPDATE(data.category_id), data)
      getToast()?.fromApiResponse(response)
      return response
    },

    // Delete category
    async delete(data: any): Promise<APIResponse<any>> {
      const response = await $apiClient.delete(API.DELETE(data.category_id))
      getToast()?.fromApiResponse(response)
      return response
    }
  }
}

export default useCategoryService
