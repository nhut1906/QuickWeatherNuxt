<template>
  <div
    class="card"
    :style="{
      background: `linear-gradient(102deg,  ${titleBgColor} 17.75%, ${borderColor} 84.8%)`,
      height: '40px',
    }"
  >
    <div class="card-body marquee">
      <div class="js-marquee-wrapper marquee-content">
        <div class="js-marquee" style="margin-right: 50px; float: left">
          <div class="title child">
            <router-link :to="`/${addressCodeName}`" target="_blank"
              >Thời tiết {{ address }}</router-link
            >
          </div>
          <div class="current-info child">
            <div class="ngay">
              <span>Bây giờ</span>
            </div>
            <div class="current-icon">
              <img
                :src="'/assets/images/weather/' + todayWeather.icon + '.png'"
                :alt="todayWeather.description"
                style="height: auto"
              />
            </div>
            <div class="temperature">
              <span class="temp-current" title="Nhiệt độ hiện tại">
                {{ todayWeather.temp }}°</span
              ><span class="temp-description">{{
                todayWeather.description
              }}</span>
            </div>
          </div>
          <div
            v-for="(item, index) in dataDaily"
            :key="index"
            class="current-info days child"
          >
            <div class="ngay">
              <span>{{ item.time }}</span>
            </div>
            <div class="current-icon">
              <img
                :src="'/assets/images/weather/' + item.icon + '.png'"
                :alt="item.description"
                style="height: auto"
              />
            </div>
            <div class="temperature">
              <span class="temp-min" title="Nhiệt độ thấp">{{ item.min }}°</span
              ><span class="temp-max" title="Nhiệt độ cao">{{ item.max }}°</span
              ><span class="temp-description">{{ item.description }}</span>
            </div>
          </div>
        </div>
        <div class="js-marquee" style="margin-right: 50px; float: left">
          <div class="title child">
            <router-link :to="`/${addressCodeName}`" target="_blank"
              >Thời tiết {{ address }}</router-link
            >
          </div>
          <div class="current-info child">
            <div class="ngay">
              <span>Bây giờ</span>
            </div>
            <div class="current-icon">
              <img
                :src="'/assets/images/weather/' + todayWeather.icon + '.png'"
                :alt="todayWeather.description"
                style="height: auto"
              />
            </div>
            <div class="temperature">
              <span class="temp-current" title="Nhiệt độ hiện tại">
                {{ todayWeather.temp }}°</span
              ><span class="temp-description">{{
                todayWeather.description
              }}</span>
            </div>
          </div>
          <div
            v-for="(item, index) in dataDaily"
            :key="index"
            class="current-info days child"
          >
            <div class="ngay">
              <span>{{ item.time }}</span>
            </div>
            <div class="current-icon">
              <img
                :src="'/assets/images/weather/' + item.icon + '.png'"
                :alt="item.description"
                style="height: auto"
              />
            </div>
            <div class="temperature">
              <span class="temp-min" title="Nhiệt độ thấp">{{ item.min }}°</span
              ><span class="temp-max" title="Nhiệt độ cao">{{ item.max }}°</span
              ><span class="temp-description">{{ item.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadScript } from "@/utils/script";
import { onMounted } from "vue";

onMounted(() => {
  loadScript("/assets/js/jquery.min.js");
  loadScript("/assets/js/jquery.marquee.min.js");
});

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
.ngay {
  float: left;
  color: #ffffffde;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  height: 40px;
  width: auto;
  line-height: 40px;
  padding: 0 15px;
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
  display: flex;
  justify-content: center;
  padding-left: 10px;
  float: left;
}
.temp-current {
  display: block;
  font-size: 22px;
  color: #fff;
  font-weight: 700;
  line-height: 40px;
}
.temp-min,
.temp-max {
  display: block;
  font-size: 13px;
  color: #ffffffde;
  line-height: 40px;
}
.temp-min {
  font-size: 11px;
  opacity: 0.9;
  font-weight: 300;
  padding-right: 5px;
}
.temp-max {
  font-weight: 400;
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
}
.temp-description::first-letter {
  text-transform: capitalize;
}
.marquee {
  display: inline-block;
  position: relative;

  height: 40px;
  width: 2300px;
  white-space: nowrap;
}
.days {
  margin-left: 50px;
}
.card-body {
  padding: 0;
}
</style>
