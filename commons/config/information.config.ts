export const FUNC_NAME = "informations";
// ========================== ROUTER =============================
export const ROUTER_INFORMATION = [
  {
    path: "/admin/information",
    name: "InformationView",
    component: () => import("@master/views/information/InformationView.vue"),
    meta: {
      layout: "Admin",
    },
  },
];

// ========================== PATH API =============================
export const API = {
  DETAIL: `${FUNC_NAME}`,
  UPDATE: (id: string) => `${FUNC_NAME}/${id}`,
  UPDATE_SEO: (page_key: string) => `${FUNC_NAME}/update-seo/${page_key}`,
  ALL_SEO_META: `${FUNC_NAME}/seo-meta`,
  SEO_META: (routerName: string) => `${FUNC_NAME}/seo-meta/${routerName}`,
  LIST_SITE_SETTING: `/${FUNC_NAME}/get-setting`,
  CREATE_SITE_SETTING: `/${FUNC_NAME}/create-setting`,
  DETAIL_SITE_SETTING: (id: string) => `/${FUNC_NAME}/get-setting/${id}`,
  UPDATE_SITE_SETTING: (id: string) => `${FUNC_NAME}/update-setting/${id}`,
  DELETE_SITE_SETTING: (id: string) => `${FUNC_NAME}/delete-setting/${id}`,
  GENERATE_SITEMAPS: `${FUNC_NAME}/generate-sitemaps`,
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
    key: "key_name",
    title: "Key Name",
  },
  {
    key: "value",
    title: "Value",
  },
];

export default { tableConfig, colConfig };
