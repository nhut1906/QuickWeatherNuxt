import { ROUTER_CATEGORY } from '@/commons/config/category.config'
import { ROUTER_POST } from '@/commons/config/post.config'
import { ROUTER_INFORMATION } from '@/commons/config/information.config'

export default [
  ...ROUTER_CATEGORY,
  ...ROUTER_POST,
  ...ROUTER_INFORMATION,
]
