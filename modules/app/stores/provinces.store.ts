/**
 * Dependencies injection library
 */
import { defineStore } from "pinia";
import useProvincesService from "@app/services/provinces.service";

export const useProvincesStore = defineStore("useProvincesStore", {
  state: () => ({
    locations: <any>[],
    provinces: <any>[],
    district_by_province_code: <any>[],
    ward_by_district_code: <any>{},
    province_profile: <any>"",
    loading: <any>null,
  }),
  actions: {
    /**
     * Action
     */
    // Get list province
    async getProvinces() {
      this.loading = true;
      if (this.provinces.length == 0) {
        await this.getLocations();
        this.provinces = this.locations.map((province: any) => ({
          name: province.name,
          code_name: province.code_name,
        }));
      }
      this.loading = false;
    },
    async getLocations() {
      const provincesService = useProvincesService();
      this.loading = true;
      if (this.locations.length == 0) {
        await provincesService.getLocations().then((data: any) => {
          this.locations = data.data ?? [];
        });
      }
      this.loading = false;
    },
  },
});
