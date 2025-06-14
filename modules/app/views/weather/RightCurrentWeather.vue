<template>
  <div class="weather-highlight-live">
    <div class="weather-main weather-main-sidebar h-auto w-100">
      <h3 class="weather-main-title">
        <router-link class="text-dark" :to="`/${slugPositionName}`">
          Thời tiết {{ positionName }}
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
      <div class="weather-main-desc">
        <div class="item">
          <div class="icon">
            <img src="/assets/images/icon/dawn.svg" alt="dawn" />
          </div>
          <h4>Bình minh/Hoàng hôn</h4>
          <div class="temp">
            <p class="text-uppercase">
              {{ todayWeather.sunrise }} / {{ todayWeather.sunset }}
            </p>
          </div>
        </div>
        <div class="item">
          <div class="icon">
            <img
              src="/assets/images/icon/temperature.svg"
              :alt="'Nhiệt độ tại ' + positionName"
            />
          </div>
          <h4>Thấp/Cao</h4>
          <div class="temp">
            <p>{{ todayWeather.minTemp }}°/</p>
            <p>{{ todayWeather.maxTemp }}°</p>
          </div>
        </div>
        <div class="item">
          <div class="icon">
            <img
              src="/assets/images/icon/humidity-xl.svg"
              :alt="'Độ ẩm tại  ' + positionName"
            />
          </div>
          <h4>Độ ẩm</h4>
          <div class="temp">
            <p>{{ todayWeather.humidity }}%</p>
          </div>
        </div>
        <div class="item">
          <div class="icon">
            <img src="/assets/images/icon/pressure.svg" alt="pressure" />
          </div>
          <h4>Áp suất</h4>
          <div class="temp">
            <p>{{ todayWeather.pressure }} hPa</p>
          </div>
        </div>
        <div class="item">
          <div class="icon">
            <img
              src="/assets/images/icon/clarity-eye-line.svg"
              :alt="'Tầm nhìn tại  ' + positionName"
            />
          </div>
          <h4>Tầm nhìn</h4>
          <div class="temp">
            <p>{{ todayWeather.visibility }} km</p>
          </div>
        </div>
        <div class="item">
          <div class="icon">
            <img
              src="/assets/images/icon/ph-wind.svg"
              :alt="'Gió tại  ' + positionName"
            />
          </div>
          <h4>Gió</h4>
          <div class="temp">
            <p>{{ todayWeather.wind_speed }} km/h</p>
          </div>
        </div>
        <div class="item">
          <div class="icon">
            <img
              src="/assets/images/icon/line-md-paint.svg"
              :alt="'Điểm ngưng tại  ' + positionName"
            />
          </div>
          <h4>Điểm ngưng</h4>
          <div class="temp">
            <p>{{ todayWeather.dew_point }}°</p>
            <p></p>
          </div>
        </div>
        <div class="item">
          <div class="icon">
            <img
              src="/assets/images/icon/carbon-uv.svg"
              :alt="'Tia UV tại ' + positionName"
            />
          </div>
          <h4>UV</h4>
          <div class="temp">
            <p>{{ todayWeather.uvi }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="sunrise-sunset mt-20">
      <h3 class="title">Bình minh / Hoàng hôn</h3>
      <div class="sunrise-sunset-time text-uppercase">
        <div class="item">{{ todayWeather.sunrise }}</div>
        <div class="item">{{ todayWeather.sunset }}</div>
      </div>
    </div>
    <h3 class="new-cate-title">Bản đồ thời tiết Windy {{ positionName }}</h3>
    <div class="fluctuating">
      <iframe
        width="100%"
        height="100%"
        src="https://embed.windy.com/embed2.html?lat=10.16667&amp;lon=106.5&amp;detailLat=10.16667&amp;detailLon=106.5&amp;width=100%25&amp;height=450&amp;zoom=8&amp;level=surface&amp;overlay=wind&amp;product=ecmwf&amp;menu=&amp;message=true&amp;marker=true&amp;calendar=now&amp;pressure=true&amp;type=map&amp;location=coordinates&amp;detail=&amp;metricWind=default&amp;metricTemp=%C2%B0C&amp;radarRange=-1"
        frameborder="0"
      >
      </iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import slugify from "slugify";
import { onMounted, ref } from "vue";
/**
 * Dependencies injection library
 */

/**
 * Variable define
 */
const props = defineProps<{
  positionName?: any;
  todayWeather?: any;
  slugPositionName?: any;
}>();

/**
 * Life circle vue js
 */

/**
 * Function
 */
</script>

<style scoped></style>
