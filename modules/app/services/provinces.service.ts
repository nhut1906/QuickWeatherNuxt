import type { APIResponse } from '@/interfaces/response.interface'
import { API } from '@/commons/config/provinces.config'

const useProvincesService = () => {
  const { $apiClient } = useNuxtApp()

  const getToast = () => {
    if (process.client) {
      // nếu bạn cần toast trong tương lai, giữ lại
      return null
    }
    return null
  }

  return {
    // Get all locations
    async getLocations(): Promise<APIResponse<any>> {
      return await $apiClient.get(API.LOCATIONS)
    },

    // Get all provinces
    async getProvinces(): Promise<APIResponse<any>> {
      return await $apiClient.get(API.PROVINCES)
    },

    // Get districts by province code
    async getDistrictByProvinceCode(province_code: string): Promise<APIResponse<any>> {
      return await $apiClient.get(API.DISTRICTS_BY_PROVINCE_CODE, {
        params: { province_code }
      })
    },

    // Get wards by district code
    async getWardByDistrictCode(district_code: string): Promise<APIResponse<any>> {
      return await $apiClient.get(API.WARDS_BY_DISTRICT_CODE, {
        params: { district_code }
      })
    },

    // Get province profile by province name
    async getProfileProvince(province_name: string): Promise<APIResponse<any>> {
      return await $apiClient.get(API.PROFILE_PROVINCE, {
        params: { province_name }
      })
    }
  }
}

export default useProvincesService
