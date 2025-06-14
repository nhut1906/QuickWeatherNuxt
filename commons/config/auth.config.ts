import LoginView from '@auth/views/LoginView.vue'
export const FUNC_NAME = 'auth'

// ========================== ROUTER =============================
export const ROUTER_AUTH = [
  {
    path: '/admin/login',
    name: 'LoginView',
    component: LoginView,
  }
]

// ========================== PATH API =============================
export const API = {
  SIGN_IN: `${FUNC_NAME}/login`,
  GET_INFO: `${FUNC_NAME}/infoLogin`,
  REFRESH_TOKEN: `${FUNC_NAME}/refresh-token`,
  CHANGE_PASSWORD: `${FUNC_NAME}/change-password`,
}
