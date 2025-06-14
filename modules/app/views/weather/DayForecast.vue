<template>
  <section class="weather-detail">
    <div class="container">
      <div class="weather-detail-inner">
        <div class="weather-detail-content">
          <div class="weather-feature">
            <h1 class="weather-feature-title">
              Dự báo thời tiết {{ positionName }}
              {{ numberDay == 1 ? "ngày mai" : numberDay + " ngày tới" }}
            </h1>
            <div
              v-for="(item, index) in dataDaily"
              :key="index"
              class="weather-date text-dark border-bottom pb-3 mb-3"
            >
              <div class="weather-date-title">
                {{ index == 0 && numberDay != 1 ? "Hiện tại" : item.time }}
              </div>
              <div class="row">
                <div class="col-12 col-md-6">
                  <div class="weather-date-left">
                    <div class="d-flex flex-wrap align-items-center">
                      <div class="overview-current">
                        <img
                          :src="'/assets/images/weather/' + item.icon + '.png'"
                          :alt="item.description"
                        />
                      </div>
                      <div class="current-temperature">{{ item.day }}°</div>
                      <div class="overview-caption">
                        <p
                          class="overview-caption-item overview-caption-item-detail font-weight-bold"
                        >
                          {{ item.description }}
                        </p>
                        <p
                          class="overview-caption-item overview-caption-summary-detail"
                        >
                          Cảm giác như <span>{{ item.feels_like_day }}°</span>
                        </p>
                      </div>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="d-flex ms-2 me-auto">
                          <div class="icon">
                            <img
                              src="/assets/images/icon/temperature.svg"
                              :alt="'Nhiệt độ tại ' + positionName"
                            />
                          </div>
                          <span class="font-weight-bold"> Thấp/Cao </span>
                        </div>
                        <span> {{ item.minTemp }}°/ {{ item.maxTemp }}°</span>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="d-flex ms-2 me-auto">
                          <div class="icon">
                            <img
                              src="/assets/images/icon/humidity-xl.svg"
                              :alt="'Khả năng có mưa tại  ' + positionName"
                            />
                          </div>
                          <span class="font-weight-bold">
                            Khả năng có mưa
                          </span>
                        </div>
                        <span>{{ item.dataDailyRain }}%</span>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="d-flex ms-2 me-auto">
                          <div class="icon">
                            <i class="fal fa-cloud-drizzle"></i>
                          </div>
                          <span class="font-weight-bold"> Lượng mưa </span>
                        </div>
                        <span>{{ item.pop }} mm</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="weather-date-right">
                    <ul class="list-group list-group-flush">
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="d-flex ms-2 me-auto">
                          <div class="icon">
                            <img
                              src="/assets/images/icon/temperature.svg"
                              :alt="'Ngày/Đêm tại ' + positionName"
                            />
                          </div>
                          <span class="font-weight-bold"> Ngày/Đêm </span>
                        </div>
                        <span>{{ item.day }}°/{{ item.night }}°</span>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="d-flex ms-2 me-auto">
                          <div class="icon">
                            <img
                              src="/assets/images/icon/temperature.svg"
                              :alt="'Sáng/Tối tại ' + positionName"
                            />
                          </div>
                          <span class="font-weight-bold"> Sáng/Tối </span>
                        </div>
                        <span>{{ item.morning }}°/{{ item.evening }}°</span>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="d-flex ms-2 me-auto">
                          <div class="icon">
                            <img
                              src="/assets/images/icon/pressure.svg"
                              alt="pressure"
                            />
                          </div>
                          <span class="font-weight-bold"> Áp suất </span>
                        </div>
                        <span>{{ item.pressure }} hPa</span>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="d-flex ms-2 me-auto">
                          <div class="icon">
                            <img
                              src="/assets/images/icon/ph-wind.svg"
                              :alt="'Gió tại  ' + positionName"
                            />
                          </div>
                          <span class="font-weight-bold"> Gió </span>
                        </div>
                        <span> {{ item.wind_speed }} km/h </span>
                      </li>
                      <li
                        class="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div class="d-flex ms-2 me-auto">
                          <div class="icon">
                            <img
                              src="/assets/images/icon/dawn.svg"
                              alt="dawn"
                            />
                          </div>
                          <span class="font-weight-bold">
                            Bình minh/Hoàng hôn
                          </span>
                        </div>
                        <div class="d-flex ml-auto align-items-center">
                          <div class="weather-sun">
                            <p class="text-uppercase">
                              {{ item.sunrise }} / {{ item.sunset }}
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="numberDay == 1" class="weather-chart">
            <h1 class="weather-feature-title">
              Thời tiết {{ positionName }} ngày mai theo giờ
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
              Nhiệt độ và khả năng có mưa {{ positionName }}
              {{ numberDay == 1 ? "ngày mai" : numberDay + " ngày tới" }}
            </h2>
            <BaseChart
              :chartType="'line'"
              :width="'885'"
              :height="'700'"
              :chartOptions="chartOptionsTemperatureRain"
              :chartData="chartDataDailyTemperatureRainLocal"
            />
            <!-- <canvas
              id="line-chart-daily"
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
          <div class="weather-chart">
            <h2 class="title">
              Lượng mưa {{ positionName }}
              {{ numberDay == 1 ? "ngày mai" : numberDay + " ngày tới" }}
            </h2>
            <BaseChart
              :chartType="'bar'"
              :width="'885'"
              :height="'687'"
              :chartOptions="chartOptionsRainForecast"
              :chartData="chartDataDailyRainLocal"
            />
            <!-- <canvas
              id="rain-chart-daily"
              width="885"
              height="687"
              style="
                display: block;
                box-sizing: border-box;
                height: 550px;
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
import { onMounted, ref, toRefs } from "vue";
import RightCurrentWeather from "./RightCurrentWeather.vue";
import datetime from "@/utils/dateTime";
import number from "@/utils/number";

/**
 * Variable define
 */
const props = defineProps<{
  positionName?: any;
  slugPositionName?: any;
  currentWeatherDaily?: any;
  todayWeather?: any;
  chartOptionsTemperatureRain?: any;
  chartOptionsRainForecast?: any;
  chartDataDailyTemperatureRain?: any;
  chartDataDailyRain?: any;
  numberDay?: any;
  currentWeatherHourly?: any;
}>();
const dataDaily = ref<any>([]);
const dataByDay = ref<any>({});

const chartDataDailyTemperatureRainLocal = ref<any>({
  labels: [],
  datasets: [
    {
      label: "Nhiệt độ",
      data: [],
      borderColor: "green",
      borderWidth: 2,
      fill: false,
    },
    {
      label: "Khả năng có mưa",
      data: [],
      borderColor: "orange",
      borderWidth: 2,
      fill: false,
    },
  ],
});

const chartDataDailyRainLocal = ref<any>({
  labels: [],
  datasets: [
    {
      label: "Lượng mưa (mm)",
      data: [],
      borderColor: "blue",
      borderWidth: 2,
      fill: false,
    },
  ],
});

/**
 * Life circle vue js
 */
onMounted(() => {
  if (props.numberDay == 1) {
    dataByDay.value = groupByDay(props.currentWeatherHourly);
  }

  chartDataDailyTemperatureRainLocal.value = {
    labels: props.chartDataDailyTemperatureRain.labels.slice(
      0,
      props.numberDay
    ),
    datasets: [
      {
        label: "Nhiệt độ",
        data: props.chartDataDailyTemperatureRain.datasets[0].data.slice(
          0,
          props.numberDay
        ),
        borderColor: "green",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Khả năng có mưa",
        data: props.chartDataDailyTemperatureRain.datasets[1].data.slice(
          0,
          props.numberDay
        ),
        borderColor: "orange",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  chartDataDailyRainLocal.value = {
    labels: props.chartDataDailyRain.labels.slice(0, props.numberDay),
    datasets: [
      {
        label: "Lượng mưa (mm)",
        data: props.chartDataDailyRain.datasets[0].data.slice(
          0,
          props.numberDay
        ),
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  dataDaily.value = props.currentWeatherDaily
    .slice(0, props.numberDay)
    .map((entry: any) => {
      const {
        dt,
        temp,
        weather,
        humidity,
        wind_speed,
        sunrise,
        sunset,
        pressure,
        pop,
        feels_like,
      } = entry;
      let dataDailyRain = 0;

      if (entry.rain) {
        dataDailyRain = entry.rain;
      }
      return {
        time: number.formatDateWithDay(dt),
        maxTemp: number.kelvinToCelsius(temp.max),
        minTemp: number.kelvinToCelsius(temp.min),
        description: weather[0].description,
        icon: weather[0].icon,
        humidity,
        wind_speed: (wind_speed * 3.6).toFixed(2),
        day: number.kelvinToCelsius(temp.day),
        feels_like_day: number.kelvinToCelsius(feels_like.day),
        night: number.kelvinToCelsius(temp.night),
        morning: number.kelvinToCelsius(temp.morn),
        evening: number.kelvinToCelsius(temp.eve),
        sunrise: datetime.formatTimestampTo12Hour(sunrise),
        sunset: datetime.formatTimestampTo12Hour(sunset),
        pressure,
        dataDailyRain,
        pop: pop * 100,
      };
    });
});

/**
 * Function
 */
const groupByDay = (data: any) => {
  let groupedData: Record<string, any[]> = {};

  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // ngày mai
  let timestamp = Math.floor(tomorrow.getTime() / 1000);
  const tomorrowKey = datetime.formatTimestampToDay(timestamp);

  data.forEach((item: any) => {
    let dateKey = datetime.formatTimestampToDay(item.dt); // Format theo 'T7 22/03'

    if (!groupedData[dateKey]) {
      groupedData[dateKey] = [];
    }

    if (dateKey == tomorrowKey) {
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
    }
  });

  return groupedData;
};
</script>

<style scoped></style>
