import type { APIResponse } from '@/interfaces/response.interface'
import { API } from '@/commons/config/weather.config'

const useWeatherService = () => {
  const { $apiClient } = useNuxtApp()

  const getToast = () => {
    if (process.client) {
      return null // giữ chỗ nếu cần toast
    }
    return null
  }

  return {
    async getCurrentWeather(params?: unknown): Promise<APIResponse<any>> {
      return await $apiClient.get(API.CURRENT_WEATHER, { params })
    },

    async getWeatherHourly(params?: unknown): Promise<APIResponse<any>> {
      return await $apiClient.get(API.WEATHER_HOURLY, { params })
    },

    async getWeatherDaily(params?: unknown): Promise<APIResponse<any>> {
      return await $apiClient.get(API.WEATHER_DAILY, { params })
    },

    async getWeatherSummary(params?: unknown): Promise<APIResponse<any>> {
      return await $apiClient.get(API.WEATHER_SUMMARY, { params })
    },

    async getAirQuality(params?: unknown): Promise<APIResponse<any>> {
      return await $apiClient.get(API.AIR_QUANLITY, { params })
    },

    async getCoordinates(name?: string): Promise<{ lat: number; lon: number } | null> {
      if (!name) return null

      try {
        const res = await $apiClient.get(API.COORDINATES, {
          params: { name }
        })

        if (!res.data || res.data.length === 0) return null

        return {
          lat: res.data[0].lat,
          lon: res.data[0].lon
        }
      } catch (error) {
        return null
      }
    }
  }
}

export default useWeatherService
