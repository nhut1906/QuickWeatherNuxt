import { defineStore } from "pinia";
import useAuthService from "@auth/services/auth.service";

export const useAuthStore = defineStore("useAuthStore", {
  state: () => ({
    loggedIn: false,
    account: <any>{},
  }),
  actions: {
    async login(data: any): Promise<boolean> {
      const authService = useAuthService();
      const response = (await authService.signIn(data)) as any;

      // Login success
      if (response?.data?.access_token) {
        // saved token
        authService.updateLocalStorage(response?.data);

        // save cookies
        // authService.updateCookies(response?.data)

        // Update state
        this.loggedIn = true;

        // Get account info
        this.account = (await authService.getInfo())?.data?.user;
      }
      return this.loggedIn;
    },
    async refresh() {
      const authService = useAuthService();
      this.account = (await authService.getInfo())?.data?.user;
      if (this.account) this.loggedIn = true;
      return this.loggedIn;
    },
    logout() {
      const authService = useAuthService();
      authService.clearLocalStorage();
      this.account = {};
      this.loggedIn = false;
    },
    async setUserInfo(account: any) {
      this.account = account;
      this.loggedIn = account ? true : false;
    },
  },
});
