export const FUNC_NAME = "categories";
// ========================== ROUTER =============================
export const ROUTER_CATEGORY = [
  {
    path: "/admin/category",
    name: "CategoryList",
    component: () => import("@master/views/category/ListView.vue"),
    meta: {
      layout: "Admin",
    },
  },
];

// ========================== PATH API =============================
export const API = {
  CATEGORY: `/${FUNC_NAME}`,
  CREATE: `/${FUNC_NAME}`,
  DETAIL: (id: string) => `${FUNC_NAME}/${id}`,
  UPDATE: (id: string) => `${FUNC_NAME}/${id}`,
  DELETE: (id: string) => `${FUNC_NAME}/${id}`,
  CATEGORY_BY_URL_PATH: (url_path: string) =>
    `${FUNC_NAME}/by-path/${url_path}`,
};

// ========================== CONFIG TABLE ==========================
export const tableConfig = {
  checkbox: false,
  action: true,
  showPaging: true,
  dbClick: false,
  index: true,
};

export const colConfig = [
  {
    key: "category_name",
    title: "Tên danh mục",
  },
  {
    key: "created_at",
    title: "Ngày tạo",
  },
];

export default { tableConfig, colConfig };
