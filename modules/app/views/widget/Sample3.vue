<template>
  <div class="card" :style="{background: `linear-gradient(102deg, ${titleBgColor} 17.75%, ${borderColor} 84.8%)`}">
    <div class="card-body">
      <div class="current">
        <div class="current-day">{{ todayWeather.time }}</div>
        <div class="current-info">
          <div class="current-icon">
            <img
              :src="'/assets/images/weather/' + todayWeather.icon + '.png'"
              :alt="todayWeather.description"
              style="height: auto"
            />
          </div>
          <div class="temperature">
            <span class="temp-current" title="Nhiệt độ hiện tại">
              {{ todayWeather.temp }}°
            </span>
            <router-link :to="`/${addressCodeName}`" target="_blank" class="title"
              >Thời tiết {{ address }}</router-link
            >
            <span class="temp-feels" title="Cảm thấy như">
              Cảm thấy như {{ todayWeather.feels_like }}°C
            </span>
            <span class="temp-description">
              {{ todayWeather.description }}
            </span>
          </div>
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
}>();
</script>

<style scoped>
body {
  font-family: "Be Vietnam Pro", sans-serif;
  font-weight: 400;
  font-style: normal;
}
.card {
  border-radius: 12px;
  min-width: 200px;
  max-width: 450px;
}
.title {
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.current {
  padding: 20px 25px 28px 25px;
}
.current-day {
  color: #ffffffde;
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  padding-bottom: 10px;
}
.current-info {
  display: block;
  height: 90px;
  padding-bottom: 5px;
  padding-top: 10px;
}
.current-icon {
  float: left;
  text-align: left;
  width: 30%;
}
.current-icon img {
  padding-top: 10px;
  width: 100%;
  max-width: 130px;
  float: right;
}
.temperature {
  padding-left: 5%;
  float: left;
  width: 65%;
  padding-bottom: 10px;
}
.temp-current {
  display: block;
  font-size: 32px;
  color: #fff;
  font-weight: 900;
  padding-bottom: 10px
}
.title {
  display: block;
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-decoration: none;
  overflow: hidden;
}
.temp-feels,
.temp-description {
  display: block;
  color: #ffffff9e;
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  padding-top: 5px;
}
.temp-description {
  padding-top: 0px;
}
.card-body {
  padding: 0;
}
</style>
