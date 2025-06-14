<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  script: [
    { src: '/assets/js/jquery.min.js' },
    { src: '/assets/js/bootstrap.js' },
    { src: '/assets/js/site.js' },
  ],
  link: [
    { rel: 'stylesheet', href: '/assets/css/bootstrap.css' },
    { rel: 'stylesheet', href: '/assets/css/style.css' },
    { rel: 'stylesheet', href: '/assets/css/calendar-style-css.css' },
    { rel: 'stylesheet', href: '/assets/css/fontawesome.css' },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.png",
    },
  ]
});
</script>