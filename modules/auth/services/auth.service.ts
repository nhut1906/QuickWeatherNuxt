/* /services/auth.service.ts */
import { useNuxtApp } from "#app";
import { useToastStore } from "@/stores/toast.store";
import { API } from "@/commons/config/auth.config";
import { COOKIE_KEY } from "@/commons/const";

import type {
  AuthChangePassword,
  AuthRequestLogin,
  AuthResponse,
} from "@auth/interfaces/auth.interface";
import type { APIResponse } from "@/interfaces/response.interface";

const useAuthService = () => {
  /* Lấy api client được inject bởi Nuxt 3 */
  const { $apiClient } = useNuxtApp();

  /* Helper lấy toast – chỉ tồn tại ở client */
  const getToast = () => (import.meta.client ? useToastStore() : null);

  /* Helper: đang SSR? */
  const isClient = import.meta.client;

  return {
    /* ───────────────  AUTH  ─────────────── */
    async signIn(data: AuthRequestLogin): Promise<APIResponse<AuthResponse>> {
      return await $apiClient.post(API.SIGN_IN, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    async getInfo(): Promise<APIResponse<any>> {
      return await $apiClient.get(API.GET_INFO);
    },

    async changePassword(data: AuthChangePassword): Promise<APIResponse<any>> {
      const response = await $apiClient.put(API.CHANGE_PASSWORD, data);
      getToast()?.fromApiResponse(response);
      return response;
    },

    /* ─────────────── STORAGE / COOKIES (client-only) ─────────────── */
    clearLocalStorage() {
      if (!isClient) return;
      localStorage.removeItem(COOKIE_KEY.ACCESS_TOKEN);
      localStorage.removeItem(COOKIE_KEY.REFRESH_TOKEN);
    },

    updateLocalStorage(data: AuthResponse) {
      if (!isClient) return;
      localStorage.setItem(COOKIE_KEY.ACCESS_TOKEN, data.access_token);
      localStorage.setItem(COOKIE_KEY.REFRESH_TOKEN, data.refresh_token);
    },

    updateCookies(data: AuthResponse) {
      if (!isClient) return;
      document.cookie = `${COOKIE_KEY.ACCESS_TOKEN}=${data.access_token}; path=/;`;
      document.cookie += `${COOKIE_KEY.REFRESH_TOKEN}=${data.refresh_token}; path=/;`;
    },

    clearCookies() {
      if (!isClient) return;
      document.cookie = "";
    },
  };
};

export default useAuthService;
