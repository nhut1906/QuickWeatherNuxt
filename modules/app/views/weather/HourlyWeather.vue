<template>
  <section class="weather-detail">
    <div class="container">
      <div class="weather-detail-inner">
        <div class="weather-detail-content">
          <div class="weather-feature">
            <h1 class="weather-feature-title">
              Thời tiết {{ positionName }} theo giờ
            </h1>
            <div class="weather-feature-list hourly-weather mt-3">
              <div v-for="(items, date, index) in dataByDay" :key="date">
                <template v-for="(item, itemIndex) in items" :key="itemIndex">
                  <div class="weather-feature-item">
                    <div
                      v-if="index !== 0 && itemIndex === 0"
                      class="font-weight-bold mt-3"
                    >
                      {{ date }}
                    </div>
                    <div
                      class="weather-feature-sumary"
                      data-toggle="collapse"
                      :data-target="`#collapse${index}${itemIndex}`"
                      aria-expanded="false"
                      :aria-controls="`collapse${index}${itemIndex}`"
                    >
                      <div class="h4 mb-0">
                        {{ item.time }}
                      </div>
                      <p>
                        <span>{{ item.temp }}°C</span>
                      </p>
                      <img
                        class="image"
                        :src="'/assets/images/weather/' + item.icon + '.png'"
                        :alt="item.description"
                      />
                      <p class="desc">{{ item.description }}</p>
                      <div class="humidity">
                        <img
                          src="/assets/images/icon/humidity-xl.svg"
                          alt="humidity"
                        />
                        <span>{{ item.humidity }} %</span>
                      </div>
                      <div class="windy">
                        <img src="/assets/images/icon/ph-wind.svg" alt="wind" />
                        <span>{{ item.wind_speed }} km/h</span>
                      </div>
                      <i class="fal fa-angle-down"></i>
                    </div>
                    <div
                      class="collapse w-100"
                      :id="`collapse${index}${itemIndex}`"
                    >
                      <div class="weather-feature-content">
                        <div class="item">
                          <div class="icon">
                            <img
                              src="/assets/images/icon/pressure.svg"
                              alt="pressure"
                            />
                          </div>
                          <div class="content">
                            <div class="h5">Áp suất</div>
                            <p>{{ item.pressure }} hPa</p>
                          </div>
                        </div>
                        <div class="item">
                          <div class="icon">
                            <img
                              src="/assets/images/icon/clarity-eye-line.svg"
                              :alt="'Tầm nhìn tại  ' + positionName"
                            />
                          </div>
                          <div class="content">
                            <div class="h5">Tầm nhìn</div>
                            <p>{{ item.visibility }} km</p>
                          </div>
                        </div>
                        <div class="item">
                          <div class="icon">
                            <img
                              src="/assets/images/icon/carbon-uv.svg"
                              :alt="'Tia UV tại ' + positionName"
                            />
                          </div>
                          <div class="content">
                            <div class="h5">UV</div>
                            <span>{{ item.uvi }}</span>
                          </div>
                        </div>
                        <div class="item">
                          <div class="icon">
                            <img
                              src="/assets/images/icon/line-md-paint.svg"
                              :alt="'Điểm ngưng tại  ' + positionName"
                            />
                          </div>
                          <div class="content">
                            <div class="h5">Điểm ngưng</div>
                            <p>{{ todayWeather.dew_point }}°</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div class="weather-chart mb-20">
            <h2 class="title">
              Nhiệt độ và khả năng có mưa {{ positionName }} trong 12h tới
            </h2>
            <BaseChart
              :chartType="'line'"
              :width="'885'"
              :height="'700'"
              :chartOptions="chartOptionsTemperatureRain"
              :chartData="chartDataTemperatureRain"
            />
            <!-- <canvas
              id="line-chart-timely"
              width="885"
              height="700"
              style="
                display: block;
                box-sizing: border-box;
                height: 560px;
                width: 708px;
              "
            ></canvas> -->
          </div>
        </div>
        <RightCurrentWeather
          :positionName="positionName"
          :slugPositionName="slugPositionName"
          :todayWeather="todayWeather"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * Dependencies injection library
 */
import BaseChart from "@/components/BaseChart.vue";
import datetime from "@/utils/dateTime";
import number from "@/utils/number";
import RightCurrentWeather from "./RightCurrentWeather.vue";
import { onMounted, ref } from "vue";

/**
 * Variable define
 */
const props = defineProps<{
  positionName?: any;
  slugPositionName?: any;
  todayWeather?: any;
  chartOptionsTemperatureRain?: any;
  chartDataTemperatureRain?: any;
  currentWeatherHourly?: any;
}>();

const dataByDay = ref<any>({});
/**
 * Life circle vue js
 */
onMounted(() => {
  dataByDay.value = groupByDay(props.currentWeatherHourly);
});
/**
 * Function
 */
const groupByDay = (data: any) => {
  let groupedData: Record<string, any[]> = {};

  data.forEach((item: any) => {
    let dateKey = datetime.formatTimestampToDay(item.dt); // Format theo 'T7 22/03'

    if (!groupedData[dateKey]) {
      groupedData[dateKey] = [];
    }

    groupedData[dateKey].push({
      icon: item.weather[0].icon,
      description: item.weather[0].description,
      time: datetime.formatTimestampTo12Hour(item.dt), // Giữ giờ định dạng 12h
      temp: number.kelvinToCelsius(item.temp),
      humidity: item.humidity,
      uvi: item.uvi,
      pressure: item.pressure,
      visibility: (item.visibility / 1000).toFixed(1),
      wind_speed: (item.wind_speed * 3.6).toFixed(2),
    });
  });

  return groupedData;
};
</script>

<style scoped></style>
