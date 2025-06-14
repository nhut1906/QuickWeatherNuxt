export const FUNC_NAME = 'posts'
// ========================== ROUTER =============================
export const ROUTER_POST = [
  {
    path: '/admin/post',
    name: 'PostList',
    component: () => import('@master/views/post/ListView.vue'),
    meta: {
      layout: "Admin",
    },
  },
  {
    path: '/tin-tuc/:url_path',
    name: 'PostDetail',
    component: () => import('@app/views/category/DetailView.vue'),
    meta: {
      layout: "Client",
    },
  },
  {
    path: '/tin-tuc',
    name: 'AllNews',
    component: () => import('@app/views/category/ListView.vue'),
    meta: {
      layout: "Client",
    },
  },
  {
    path: '/danh-muc/:name',
    name: 'NewsByName',
    component: () => import('@app/views/category/ListView.vue'),
    meta: {
      layout: "Client",
    },
  },
]

// ========================== PATH API =============================
export const API = {
  POST: `/${FUNC_NAME}`,
  CREATE: `/${FUNC_NAME}`,
  DETAIL: (id: string) => `${FUNC_NAME}/${id}`,
  UPDATE: (id: string) => `${FUNC_NAME}/${id}`,
  DELETE: (id: string) => `${FUNC_NAME}/${id}`,
  POST_BY_URL_PATH: (url_path: string) => `${FUNC_NAME}/by-path/${url_path}`,
}

// ========================== CONFIG TABLE ==========================
export const tableConfig = {
  checkbox: false,
  action: true,
  index: true,
  showPaging: true,
  dbClick: false
}

export const colConfig = [
  {
    key: 'title',
    title: "Tiêu đề"
  },
  {
    key: 'created_at',
    title: "Ngày tạo"
  },
]

export default { tableConfig, colConfig }