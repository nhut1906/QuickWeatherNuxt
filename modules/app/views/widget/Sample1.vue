<template>
  <div class="card">
    <div class="card-body" style="padding: 0">
      <h3 v-if="showTitle" class="weather-main-title mt-2 ml-2">
        <router-link class="text-dark" :to="`/${addressCodeName}`">
          Thời tiết {{ address }}
        </router-link>
      </h3>
      <div class="weather-main-hero flex-wrap justify-content-center">
        <img
          :src="'/assets/images/weather/' + todayWeather.icon + '.png'"
          :alt="todayWeather.description"
        />
        <p class="temp">{{ todayWeather.temp }}°</p>
        <div class="desc text-center">
          <p>{{ todayWeather.description }}</p>
          <span
            >Cảm giác như <span>{{ todayWeather.feels_like }}°</span></span
          >
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
          <td>{{ item.min }}° {{ item.max }}°</td>
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
  dataDaily?: any;
}>();
</script>

<style scoped>
.cls-1 {
  fill: #003870;
}
.cls-1 {
  fill: none;
}
.cls-2 {
  fill: #959dad;
}
.cls-3 {
  opacity: 0.07;
}
.cls-4 {
  clip-path: url(#clip-path);
}
.cls-5 {
  fill: #fff;
}
.cls-1 {
  fill: none;
}
.cls-2 {
  fill: #959dad;
}
.cls-3 {
  opacity: 0.07;
}
.cls-4 {
  clip-path: url(#clip-path);
}
.cls-5 {
  fill: #fff;
}
.cls-1 {
  fill: none;
}
.cls-2 {
  fill: #959dad;
}
.cls-3 {
  opacity: 0.07;
}
.cls-4 {
  clip-path: url(#clip-path);
}
.cls-5 {
  fill: #fff;
}
.cls-1 {
  fill: none;
}
.cls-2 {
  fill: #959dad;
}
.cls-3 {
  opacity: 0.07;
}
.cls-4 {
  clip-path: url(#clip-path);
}
.cls-5 {
  fill: #fff;
}
.cls-1 {
  fill: none;
}
.cls-2 {
  fill: #959dad;
}
.cls-3 {
  opacity: 0.07;
}
.cls-4 {
  clip-path: url(#clip-path);
}
.cls-5 {
  fill: #fff;
}
body {
  font-size: 0.8em;
  height: auto;
  width: auto;
  overflow: auto;
  font-family: Lato, Arial, Helvetica, Sans-Serif;
  margin: 10px;
  color: #959dad;
}

.card {
  margin-bottom: 24px;
  box-shadow: 0 0.25rem 0.75rem rgb(18 38 63 / 8%);
  border: none !important;
  background: #fdffff;
}

.card-header {
  background: #ff0000;
  padding: 5px 6px;
}

.card-header a {
  color: #003870;
  font-size: 110%;
  font-weight: 700;
  white-space: nowrap;
  text-decoration: none;
}

.current {
  padding: 20px 10px 20px 20px;
}

.temperature {
  width: 50%;
  float: left;
}

.temp-current span {
  font-size: 400%;
  color: #003870;
  font-weight: 900;
}

.temperature p {
  margin: 0;
  padding: 0;
  color: #848484;
}

.temp-description {
  font-size: 100%;
}

.temp-feel {
  margin: 0;
  padding: 0;
  color: #959dad;
}

.description {
  width: 50%;
  float: left;
}

.description img {
  width: 100px;
  position: absolute;
}

.description p {
  margin: 0;
  padding: 0;
  font-size: 110%;
  color: #959dad;
}

#weather-days {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  border-collapse: collapse;
  font-size: 0.8em;
  font-family: Lato, Arial, Helvetica, Sans-Serif;
}

#weather-days img {
  width: 40px;
}

#weather-days td {
  color: #959dad;
  text-align: center;
}

#weather-days td svg {
  position: absolute;
  padding-top: 4px;
  margin-left: -8px;
}

.temperature a {
  font-size: 24px;
  text-decoration-line: none;
  font-weight: 600;
  color: #003870;
}

p.temp-description.dec2 {
  text-transform: capitalize;
}

.card-footer {
  text-align: right;
}

.logo {
  width: 60%;
  padding: 3px;
}
#weather-days tr td {
  vertical-align: middle;
  text-align: -webkit-center;
}
</style>
