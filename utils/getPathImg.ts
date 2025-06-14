export const getImageUrl = (url: string) => {
  const serverUrl = useRuntimeConfig().public.VITE_SERVER_URL
  return `${serverUrl}${url}`
}
