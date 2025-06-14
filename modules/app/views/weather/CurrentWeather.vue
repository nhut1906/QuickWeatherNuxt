<template>
  <div>
    <section class="weather-general today-page">
      <div class="container">
        <div class="weather-general-inner">
          <div class="weather-main">
            <h1 class="weather-main-title">
              <router-link
                class="text-dark"
                :to="`/${slugPositionName}`"
              >
                Thời tiết {{ positionName }}
              </router-link>
            </h1>
            <p>Hôm nay ngày {{ today }}</p>
            <div class="weather-main-hero">
              <img
                :src="'/assets/images/weather/' + todayWeather.icon + '.png'"
                :alt="todayWeather.description"
              />
              <p class="temp">{{ todayWeather.temp }}°</p>
              <div class="desc">
                <p>{{ todayWeather.description }}</p>
                <span
                  >Cảm giác như
                  <span>{{ todayWeather.feels_like }}°</span></span
                >
              </div>
            </div>
            <div class="weather-main-desc">
              <div class="item">
                <img
                  src="/assets/images/icon/temperature.svg"
                  :alt="'Nhiệt độ tại ' + positionName"
                />
                <div class="item-title">Thấp/Cao</div>
                <div class="temp">
                  <p>{{ todayWeather.minTemp }}°/</p>
                  <p>{{ todayWeather.maxTemp }}°</p>
                </div>
              </div>
              <div class="item">
                <img
                  src="/assets/images/icon/humidity-xl.svg"
                  :alt="'Độ ẩm tại  ' + positionName"
                />
                <div class="item-title">Độ ẩm</div>
                <div class="temp">
                  <p>{{ todayWeather.humidity }} %</p>
                </div>
              </div>
              <div class="item">
                <img
                  src="/assets/images/icon/clarity-eye-line.svg"
                  :alt="'Tầm nhìn tại  ' + positionName"
                />
                <div class="item-title">Tầm nhìn</div>
                <div class="temp">
                  <p>{{ todayWeather.visibility }} km</p>
                </div>
              </div>
              <div class="item">
                <img
                  src="/assets/images/icon/ph-wind.svg"
                  :alt="'Gió tại  ' + positionName"
                />
                <div class="item-title">Gió</div>
                <div class="temp">
                  <p>{{ todayWeather.wind_speed }} km/h</p>
                </div>
              </div>
              <div class="item">
                <img
                  src="/assets/images/icon/line-md-paint.svg"
                  :alt="'Điểm ngưng tại  ' + positionName"
                />
                <div class="item-title">Điểm ngưng</div>
                <div class="temp">
                  <p>{{ todayWeather.dew_point }} °</p>
                </div>
              </div>
              <div class="item">
                <img
                  src="/assets/images/icon/carbon-uv.svg"
                  :alt="'Tia UV tại ' + positionName"
                />
                <div class="item-title">UV</div>
                <div class="temp">
                  <p>{{ todayWeather.uvi }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="weather-day">
            <h2 class="weather-main-title">Nhiệt độ {{ positionName }}</h2>
            <div class="weather-day-temp">
              <div class="temp-item">
                <div class="h4">Ngày</div>
                <img
                  src="/assets/images/icon/temp-1.png"
                  :alt="'Nhiệt độ ban ngày tại  ' + positionName"
                />
                <div>
                  <span> {{ todayWeather.day }} </span>
                </div>
              </div>
              <div class="temp-item">
                <div class="h4">Đêm</div>
                <img
                  src="/assets/images/icon/temp-2.png"
                  :alt="'Nhiệt độ ban đêm tại  ' + positionName"
                />
                <div>
                  <span> {{ todayWeather.night }} </span>
                </div>
              </div>
              <div class="temp-item">
                <div class="h4">Sáng</div>
                <img
                  src="/assets/images/icon/temp-3.png"
                  :alt="'Nhiệt độ sáng tại' + positionName"
                />
                <div>
                  <span> {{ todayWeather.morning }} </span>
                </div>
              </div>
              <div class="temp-item">
                <div class="h4">Tối</div>
                <img
                  src="/assets/images/icon/temp-4.png"
                  :alt="'Nhiệt độ đêm tại ' + positionName"
                />
                <div>
                  <span> {{ todayWeather.evening }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="weather-detail">
      <div class="container">
        <div class="weather-detail-inner">
          <div class="weather-detail-content">
            <div class="weather-time">
              <h2 class="weather-time-title">
                Thời tiết {{ positionName }} theo giờ
              </h2>
              <div class="weather-time-list">
                <div
                  v-for="(item, index) in todayWeather.hourly"
                  :key="index"
                  class="weather-time-item"
                >
                  <div class="title text-uppercase">{{ item.time }}</div>
                  <p class="temp">
                    <span> {{ item.min }}° </span> /
                    <span> {{ item.max }}° </span>
                  </p>
                  <img
                    :src="'/assets/images/weather/' + item.icon + '.png'"
                    alt="weather"
                  />
                  <p class="humidity">
                    <img
                      src="/assets/images/icon/dewpoint.svg"
                      alt="dewpoint"
                    />
                    <span>{{ item.humidity }} %</span>
                  </p>
                  <p class="desc">{{ item.description }}</p>
                </div>
              </div>
              <div class="weather-time-actions">
                <button
                  type="button"
                  class="action-arrow arrow-left text-white"
                >
                  <i class="fal fa-chevron-left"></i>
                </button>
                <button
                  type="button"
                  class="action-arrow arrow-right text-white"
                >
                  <i class="fal fa-chevron-right"></i>
                </button>
              </div>
            </div>
            <div class="weather-feature mt-20">
              <h2 class="weather-feature-title">
                Dự báo thời tiết {{ positionName }} những ngày tới
              </h2>
              <div class="weather-feature-list">
                <div
                  v-for="(item, index) in todayWeather.daily"
                  :key="index"
                  class="weather-feature-item"
                >
                  <div
                    class="weather-feature-sumary"
                    data-toggle="collapse"
                    :data-target="`#collapse${index + 1}`"
                    aria-expanded="false"
                    :aria-controls="`collapse${index + 1}`"
                  >
                    <div class="h4 mb-0">
                      {{ index == 0 ? "Hiện tại" : item.time }}
                    </div>
                    <p>
                      <span>{{ item.min }}°</span> /
                      <span>{{ item.max }}°</span>
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
                  <div class="collapse w-100" :id="`collapse${index + 1}`">
                    <div class="weather-feature-content">
                      <div class="item">
                        <div class="icon">
                          <img
                            src="/assets/images/icon/temperature.svg"
                            alt="temperature"
                          />
                        </div>
                        <div class="content">
                          <div class="h5">Ngày/đêm</div>
                          <p>{{ item.day }}°/{{ item.night }}°</p>
                        </div>
                      </div>
                      <div class="item">
                        <div class="icon">
                          <img
                            src="/assets/images/icon/temperature.svg"
                            alt="temperature"
                          />
                        </div>
                        <div class="content">
                          <div class="h5">Sáng/tối</div>
                          <p>{{ item.morning }}°/{{ item.evening }}°</p>
                        </div>
                      </div>
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
                          <img src="/assets/images/icon/dawn.svg" alt="dawn" />
                        </div>
                        <div class="content">
                          <div class="h5">Mặt trời mọc lặn</div>
                          <p class="text-uppercase">
                            {{ item.sunrise }} / {{ item.sunset }}
                          </p>
                        </div>
                      </div>
                      <div class="item">
                        <div class="icon">
                          <img
                            src="/assets/images/icon/ph-wind.svg"
                            alt="wind"
                          />
                        </div>
                        <div class="content">
                          <div class="h5">Gió</div>
                          <span>{{ item.wind_speed }} km/h</span>
                        </div>
                      </div>
                      <div class="item">
                        <div class="icon">
                          <img
                            src="/assets/images/icon/dewpoint.svg"
                            alt="dewpoint"
                          />
                        </div>
                        <div class="content">
                          <div class="h5">Độ ẩm</div>
                          <p>{{ item.humidity }}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="weather-chart mb-20">
              <h2 class="title">
                Nhiệt độ và khả năng có mưa {{ positionName }} trong 12h tới
              </h2>
              <BaseChart
                :chartType="'line'"
                :width="'450'"
                :height="'356'"
                :chartOptions="chartOptionsTemperatureRain"
                :chartData="chartDataTemperatureRain"
              />
            </div>
            <div class="weather-chart mb-20">
              <h2 class="title">
                Nhiệt độ và khả năng có mưa {{ positionName }} những ngày tới
              </h2>
              <BaseChart
                :chartType="'line'"
                :width="'450'"
                :height="'356'"
                :chartOptions="chartOptionsTemperatureRain"
                :chartData="chartDataDailyTemperatureRain"
              />
            </div>
            <div class="weather-chart">
              <h2 class="title">Lượng mưa {{ positionName }} những ngày tới</h2>
              <BaseChart
                :chartType="'bar'"
                :width="'450'"
                :height="'350'"
                :chartOptions="chartOptionsRainForecast"
                :chartData="chartDataDailyRain"
              />
            </div>
          </div>
          <div class="weather-highlight-live">
            <NewsSideBar />
            <div class="air-quality mt-20">
              <div class="title-main">
                <h3>Chất lượng không khí</h3>
              </div>
              <div :class="`air-quality-content air-${airQuanlity.aqi}`">
                <p class="title">{{ airQuanlity.level }}</p>
                <p class="desc">
                  {{ airQuanlity.description }}
                </p>
              </div>
              <div class="air-quality-list">
                <div class="air-quality-item">
                  <div class="title">CO</div>
                  <p>{{ airQuanlity.co }}</p>
                </div>
                <div class="air-quality-item">
                  <div class="title">NH<sub>3</sub></div>
                  <p>{{ airQuanlity.nh3 }}</p>
                </div>
                <div class="air-quality-item">
                  <div class="title">NO</div>
                  <p>{{ airQuanlity.no }}</p>
                </div>
                <div class="air-quality-item">
                  <div class="title">NO<sub>2</sub></div>
                  <p>{{ airQuanlity.no2 }}</p>
                </div>
              </div>
              <div class="air-quality-list">
                <div class="air-quality-item">
                  <div class="title">O<sub>3</sub></div>
                  <p>{{ airQuanlity.o3 }}</p>
                </div>
                <div class="air-quality-item">
                  <div class="title">PM<sub>10</sub></div>
                  <p>{{ airQuanlity.pm10 }}</p>
                </div>
                <div class="air-quality-item">
                  <div class="title" h5>PM<sub>2.5</sub></div>
                  <p>{{ airQuanlity.pm2_5 }}</p>
                </div>
                <div class="air-quality-item">
                  <div class="title">SO<sub>2</sub></div>
                  <p>{{ airQuanlity.so2 }}</p>
                </div>
              </div>
            </div>
            <div class="sunrise-sunset mt-4">
              <h3 class="title">Bình minh / Hoàng hôn</h3>
              <div class="sunrise-sunset-time text-uppercase">
                <div class="item">{{ todayWeather.sunrise }}</div>
                <div class="item">{{ todayWeather.sunset }}</div>
              </div>
            </div>
            <h3 class="new-cate-title">
              Bản đồ thời tiết Windy {{ positionName }}
            </h3>
            <div class="fluctuating">
              <iframe
                width="100%"
                height="100%"
                :src="`https://embed.windy.com/embed2.html?lat=${coordinates.lat}&amp;lon=${coordinates.lon}&amp;detailLat=${coordinates.lat}&amp;detailLon=${coordinates.lon}&amp;width=100%25&amp;height=450&amp;zoom=8&amp;level=surface&amp;overlay=wind&amp;product=ecmwf&amp;menu=&amp;message=true&amp;marker=true&amp;calendar=now&amp;pressure=true&amp;type=map&amp;location=coordinates&amp;detail=&amp;metricWind=default&amp;metricTemp=%C2%B0C&amp;radarRange=-1`"
                frameborder="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * Dependencies injection library
 */
import NewsSideBar from "@/components/NewsSideBar.vue";
import BaseChart from "@/components/BaseChart.vue";

/**
 * Variable define
 */
const props = defineProps<{
  positionName?: any;
  slugPositionName?: any;
  title?: any;
  today?: any;
  todayWeather?: any;
  airQuanlity?: any;
  coordinates?: any;
  chartOptionsTemperatureRain?: any;
  chartOptionsRainForecast?: any;
  chartDataTemperatureRain?: any;
  chartDataDailyTemperatureRain?: any;
  chartDataDailyRain?: any;
}>();


/**
 * Life circle vue js
 */

/**
 * Function
 */
</script>

<style scoped></style>
