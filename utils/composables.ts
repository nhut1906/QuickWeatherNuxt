import { computed, ref } from "vue";
import { useProvincesStore } from "@app/stores/provinces.store";
import { storeToRefs } from "pinia";

export function useLocationSearch() {
  const locationStore = useProvincesStore();
  const searchQuery = ref("");

  const { locations } = storeToRefs(locationStore);

  const filteredLocations = computed(() => {
    if (!searchQuery.value) return [];

    const searchTerm = searchQuery.value.toLowerCase();
    const results = [] as any;

    locations.value.forEach((province: any) => {
        console.log(province);
        
      province.wards.forEach((ward: any) => {
        if (ward.name.toLowerCase().includes(searchTerm)) {
          results.push({
            label: `${ward.name}, ${province.name}`,
            type: ward.type,
            id: ward.id,
          });
        }
      });

      if (province.name.toLowerCase().includes(searchTerm)) {
        results.push({
          label: `${province.name}`,
          type: province.type,
          id: province.id,
        });
      }
    });

    return results;
  });

  return { searchQuery, filteredLocations };
}
