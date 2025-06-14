import { defineStore } from 'pinia'
import useCategoryService from '@master/services/category.service'
import dateTime from '@/utils/dateTime'

export const useCategoryStore = defineStore('useCategoryStore', {
  state: () => ({
    dataGrid: [] as any[],
    dataTree: [] as any[],
    formData: {} as any,
    pageConfig: {
      page: 1,
      size: 10,
      total: 0
    },
    loading: false,
    search: {} as any
  }),
  actions: {
    // Get list category
    async getList(isGetAll: boolean = false) {
      this.loading = true
      const categoryService = useCategoryService()

      const config = isGetAll
        ? { search: this.search, page: 1, size: Number.MAX_SAFE_INTEGER }
        : { search: this.search, ...this.pageConfig }

      try {
        const data = await categoryService.getList(config)

        this.dataGrid = (data.data?.categories ?? []).map((item: any) => {
          if (item.created_at) {
            item.created_at = dateTime.formatDateTimeNew(item.created_at)
          }
          return item
        })

        this.pageConfig.page = data.data?.metadata?.page ?? 1
        this.pageConfig.size = data.data?.metadata?.size ?? 10
        this.pageConfig.total = data.data?.metadata?.totalRecords ?? 0
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        this.loading = false
      }
    }
  }
})
