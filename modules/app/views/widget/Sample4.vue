<template>
  <div
    class="card"
    :style="{
      background: `linear-gradient(102deg, ${titleBgColor} 17.75%, ${borderColor} 84.8%)`,
    }"
  >
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

      <table id="weather-days">
        <tr v-for="(item, index) in dataDaily" :key="index">
          <td>
            {{ item.time }}
          </td>
          <td>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <img
                src="/assets/images/icon/humidity-xl.svg"
                alt="humidity"
                style="width: 10px; padding-right: 5px"
              />
              <span>{{ item.humidity }} %</span>
            </div>
          </td>
          <td>
            <img
              :src="'/assets/images/weather/' + item.icon + '.png'"
              :alt="item.description"
            />
          </td>
          <td>
            <span>{{ item.min }}°</span> {{ item.max }}°</td>
        </tr>
      </table>
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
  border-radius: 12px;
  background: linear-gradient(102deg, #4f7ffa 17.75%, #335fd1 84.8%);
  min-width: 200px;
  max-width: 450px;
}
.card-body {
  padding: 0;
}
.title {
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.current {
  padding: 20px 25px 20px 25px;
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
  padding-bottom: 10px;
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
#weather-days {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  border-collapse: collapse;
}
#weather-days img {
  width: 40px;
}
#weather-days td {
  color: #e5eeff;
  text-align: center;
  opacity: 0.9;
  font-size: 13px;
}
#weather-days td span {
  font-size: 0.88em;
  opacity: 0.7;
}
#weather-days td svg {
  position: absolute;
  padding-top: 4px;
  margin-left: -8px;
  opacity: 1;
  color: #e5eeff !important;
}
#weather-days tr td {
  vertical-align: middle;
  text-align: -webkit-center;
  font-size: 13px;
  font-family: "Be Vietnam Pro", sans-serif;
}
</style>
