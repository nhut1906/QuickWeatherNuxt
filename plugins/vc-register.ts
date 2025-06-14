import { defineNuxtPlugin } from '#app'
import VcRegister from '../components/commons/vc-register'

export default defineNuxtPlugin((nuxtApp) => {
  VcRegister.register(nuxtApp.vueApp)
})
