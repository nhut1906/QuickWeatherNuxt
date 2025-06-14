import { defineStore } from "pinia";

export const useScriptStore = defineStore("useScriptStore", {
  state: () => ({
    isLoadScript: <any>false,
  }),
  getters: {
    getItems(state) {
      return state.isLoadScript;
    },
  },
  actions: {
    loadScript() {        
        this.isLoadScript = !this.isLoadScript
    }
  },
});
