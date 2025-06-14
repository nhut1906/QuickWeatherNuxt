import { defineNuxtPlugin, useRuntimeConfig, useRouter } from '#app'
import axios from 'axios'
import type {
  AxiosRequestHeaders,
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { useToastStore } from '@/stores/toast.store'
import type { APIResponse } from '@/interfaces/response.interface'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const router = useRouter()

  const apiClient = axios.create({
    baseURL: config.public.apiBase, // <-- Sử dụng runtime config
    headers: {
    "Content-Type": "application/json",
    },
  })

  const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (process.client) {
      const token = localStorage.getItem('auth.access_token')
      const headers = <AxiosRequestHeaders>{}
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
      config.headers = {
        ...config.headers,
        ...headers,
      }
    }
    return config
  }

  const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error)
  }

  const onResponse = (response: AxiosResponse): Promise<APIResponse<any>> => {
    return Promise.resolve(response.data)
  }

  const onResponseError = async (error: any): Promise<AxiosError> => {
    if (process.client) {
      const toastStore = useToastStore()
      const message = error?.response?.data?.message?.message ?? error?.response?.data?.message
    
      if (message) {
        toastStore.push({ type: 'error', message })
      }

      const status = error?.response?.status
      if (status === 403 || status === 401) {
        await router.push({ name: 'admin-login' })
      } else if (status === 404) {
        await router.push({ name: 'NotFound' })
      }
    }

    return Promise.resolve(error)
  }

  apiClient.interceptors.request.use(onRequest, onRequestError)
  apiClient.interceptors.response.use(onResponse, onResponseError)

  // Inject to Nuxt context, so you can use `useApiClient()`
  nuxtApp.provide('apiClient', apiClient)
})
