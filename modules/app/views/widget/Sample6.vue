<template>
  <div
    class="card"
    :style="{
      background: `linear-gradient(102deg,  ${titleBgColor} 17.75%, ${borderColor} 84.8%)`,
    }"
  >
    <div class="card-body">
      <div class="current-info">
        <div class="title">
          <router-link :to="`/${addressCodeName}`" target="_blank">{{ address }}</router-link>
        </div>
        <div class="current-icon">
          <img
            :src="'/assets/images/weather/' + todayWeather.icon + '.png'"
            :alt="todayWeather.description"
            style="height: auto"
          />
        </div>
        <div class="temperature">
          <span class="temp-current" title="Nhiệt độ hiện tại"
            >{{ todayWeather.temp }}°</span
          ><span class="temp-description">{{ todayWeather.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  showTitle?: any;
  address?: any;
  addressCodeName?: any;
  todayWeather?: any;
  titleBgColor?: any;
  borderColor?: any;
  dataDaily?: any;
}>();
</script>

<style scoped>
body {
  font-family: "Be Vietnam Pro", sans-serif;
  font-weight: 400;
  font-style: normal;
}
.card {
  background: linear-gradient(102deg, #4f7ffa 17.75%, #335fd1 84.8%);
  height: 40px;
  overflow: hidden;
  text-align: center;
}
.card-body {
  white-space: nowrap;
  text-align: left;
  font-size: 0;
  letter-spacing: 0;
  word-spacing: 0;
  height: 40px;
  position: relative;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  min-width: 350px;
}
.title {
  padding: 0 20px;
  float: left;
}
.title a {
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration: none;
  height: 40px;
  line-height: 40px;
}
.current-info {
  height: 40px;
  float: left;
}
.current-icon {
  float: left;
  width: 32px;
  line-height: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
}
.current-icon img {
  max-width: 100%;
  margin-top: auto;
  margin-bottom: auto;
}
.temperature {
  display: inline-block;
  padding-left: 10px;
  float: left;
  overflow: hidden;
}
.temp-current {
  font-size: 22px;
  color: #fff;
  font-weight: 700;
  line-height: 40px;
}
.temp-feels {
  display: block;
  color: #ffffff9e;
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  padding-top: 5px;
}
.temp-description {
  color: #fff;
  font-size: 14px;
  padding-left: 15px;
  line-height: 40px;
  opacity: 0.9;
  text-transform: capitalize;
}
.temp-description::first-letter {
  text-transform: capitalize;
}
.card-body {
  padding: 0;
}
</style>
