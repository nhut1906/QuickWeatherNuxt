<template>
  <div
    class="card"
    :style="{
      border: `1px solid ${borderColor} !important`,
      background: 'white',
    }"
  >
    <div
      v-if="showTitle"
      class="card-header"
      :style="{ background: titleBgColor }"
    >
      <router-link :to="`/${addressCodeName}`" target="_blank" :style="{ color: colorTitle }"
        >Dự báo thời tiết {{ address }}</router-link
      >
    </div>
    <div class="card-body">
      <div class="current">
        <div class="temperature">
          <p title="" class="temp-current">
            <span title="Nhiệt độ hiện tại"> {{ todayWeather.temp }}°/ </span>
            <span title="Cảm thấy như"> {{ todayWeather.feels_like }}° </span>
          </p>
          <p class="temp-description">{{ todayWeather.description }}</p>
        </div>
        <div class="description">
          <img
            :src="'/assets/images/weather/' + todayWeather.icon + '.png'"
            :alt="todayWeather.description"
            style="height: auto"
          />
        </div>
      </div>
      <table id="weather-days">
        <tbody>
          <tr v-for="(item, index) in dataDaily" :key="index">
            <td v-html="item.time"></td>
            <td>
              <img
                :src="'/assets/images/weather/' + item.icon + '.png'"
                :alt="item.description"
              />
            </td>
            <td>
              <div class="temp">{{ item.min }}° | {{ item.max }}°</div>
              <div class="name">mây đen u ám</div>
            </td>
          </tr>
        </tbody>
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
  borderColor?: any;
  titleBgColor?: any;
  colorTitle?: any;
}>();
</script>

<style scoped>
body {
  font-size: 0.75em;
  font-family: Arial, Helvetica, Sans-Serif;
  margin: 0;
  padding: 0;
  color: #848484;
}
.card {
  width: auto;
  border: 1px solid #1c84ee;
  background: #fff;
}
.card-header {
  background: #1c84ee;
  padding: 5px 6px;
}
.card-header a {
  color: #ffffff;
  font-size: 110%;
  font-weight: 700;
  white-space: nowrap;
  text-decoration: none;
  font-size: 13.2px;
}
.current {
  display: flex;
  flex-wrap: wrap;
  text-align: -webkit-center;
  height: 80px;
  border-bottom: 1px solid #dddddd;
  padding-bottom: 5px;
}
.temperature {
  flex: 1 0 0%;
  align-self: center;
  text-align: center;
}
.temp-current span {
  font-size: 21.6px;
}
.temperature p {
  margin: 0;
  padding: 0;
  color: #848484;
}
.temp-description {
  font-size: 12px;
}
.temp-feel {
  margin: 0;
  padding: 0;
  color: #848484;
}
.description {
  flex: 1 0 0%;
  align-self: center;
  text-align: center;
}
.description img {
  width: 80px;
}
.description p {
  margin: 0;
  padding: 0;
  font-size: 110%;
  color: #848484;
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
  color: #848484;
  text-align: center;
  border-bottom: 1px solid #dddddd;
  vertical-align: middle;
  font-size: 0.75em;
}
.card-footer {
  text-align: right;
}
.logo {
  width: 60%;
  padding: 3px;
}
.card-body {
  padding: 0;
}
</style>
