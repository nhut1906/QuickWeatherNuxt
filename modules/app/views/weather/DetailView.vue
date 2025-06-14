<template>
  <div>
    <main
      :style="{ visibility: !(pending || error) ? 'visible' : 'hidden' }"
      class="mb-3"
    >
      <vc-breadcrumb
        :breadcrumbItems="detailData?.breadcrumbItems"
      ></vc-breadcrumb>
      <section class="weather-menu">
        <div class="container">
          <div class="weather-menu-overlay">
            <ul class="weather-menu-inner">
              <li
                :class="`weather-menu-item ${
                  detailData?.isCurrent == true && 'active'
                }`"
              >
                <router-link
                  :to="`/${detailData?.currentRouter}`"
                  class="weather-menu-link"
                  >Hiện tại</router-link
                >
              </li>
              <li
                :class="`weather-menu-item ${
                  detailData?.isHourly == true && 'active'
                }`"
              >
                <router-link
                  :to="`/${detailData?.currentRouter}/theo-gio`"
                  class="weather-menu-link"
                  >Theo giờ</router-link
                >
              </li>
              <li
                :class="`weather-menu-item ${
                  detailData?.isOneDayForecast == true && 'active'
                }`"
              >
                <router-link
                  :to="`/${detailData?.currentRouter}/ngay-mai`"
                  class="weather-menu-link"
                  >Ngày mai</router-link
                >
              </li>
              <li
                :class="`weather-menu-item ${
                  detailData?.isTwoDayForecast == true && 'active'
                }`"
              >
                <router-link
                  :to="`/${detailData?.currentRouter}/2-ngay-toi`"
                  class="weather-menu-link"
                  >2 ngày tới</router-link
                >
              </li>
              <li
                :class="`weather-menu-item ${
                  detailData?.isFourDayForecast == true && 'active'
                }`"
              >
                <router-link
                  :to="`/${detailData?.currentRouter}/4-ngay-toi`"
                  class="weather-menu-link"
                  >4 ngày tới</router-link
                >
              </li>
              <li
                :class="`weather-menu-item ${
                  detailData?.isSixDayForecast == true && 'active'
                }`"
              >
                <router-link
                  :to="`/${detailData?.currentRouter}/6-ngay-toi`"
                  class="weather-menu-link"
                  >6 ngày tới</router-link
                >
              </li>
              <li
                :class="`weather-menu-item ${
                  detailData?.isEightDayForecast == true && 'active'
                }`"
              >
                <router-link
                  :to="`/${detailData?.currentRouter}/8-ngay-toi`"
                  class="weather-menu-link"
                  >8 ngày tới</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </section>
      <CurrentWeather
        v-if="detailData?.isCurrent"
        :key="detailData?.CurrentWeatherKey"
        :positionName="detailData?.positionName"
        :slugPositionName="detailData?.slugPositionName"
        :title="detailData?.title"
        :today="detailData?.today"
        :todayWeather="detailData?.todayWeather"
        :airQuanlity="detailData?.airQuanlity"
        :coordinates="detailData?.coordinates"
        :chartOptionsTemperatureRain="chartOptionsTemperatureRain"
        :chartOptionsRainForecast="chartOptionsRainForecast"
        :chartDataTemperatureRain="detailData?.chartDataTemperatureRain"
        :chartDataDailyTemperatureRain="
          detailData?.chartDataDailyTemperatureRain
        "
        :chartDataDailyRain="detailData?.chartDataDailyRain"
      />
      <HourlyWeather
        v-else-if="detailData?.isHourly"
        :key="detailData?.HourlyWeatherKey"
        :positionName="detailData?.positionName"
        :slugPositionName="detailData?.slugPositionName"
        :todayWeather="detailData?.todayWeather"
        :chartOptionsTemperatureRain="chartOptionsTemperatureRain"
        :chartDataTemperatureRain="detailData?.chartDataTemperatureRain"
        :currentWeatherHourly="detailData?.currentWeather.hourly"
      />
      <DayForecast
        v-else-if="detailData?.isDays"
        :key="detailData?.DayForecastKey"
        :positionName="detailData?.positionName"
        :slugPositionName="detailData?.slugPositionName"
        :todayWeather="detailData?.todayWeather"
        :chartOptionsTemperatureRain="chartOptionsTemperatureRain"
        :chartOptionsRainForecast="chartOptionsRainForecast"
        :chartDataTemperatureRain="detailData?.chartDataTemperatureRain"
        :chartDataDailyTemperatureRain="
          detailData?.chartDataDailyTemperatureRain
        "
        :chartDataDailyRain="detailData?.chartDataDailyRain"
        :currentWeatherDaily="detailData?.currentWeather.daily"
        :numberDay="detailData?.numberDay"
        :currentWeatherHourly="detailData?.currentWeather.hourly"
      />

      <section
        v-if="detailData && detailData?.data.length"
        class="weather-city"
      >
        <div class="container">
          <div class="title-main">
            <h3>Thời tiết {{ title }}</h3>
          </div>
          <ul class="weather-city-inner">
            <li v-for="(item, index) in detailData?.data" :key="index">
              <i class="fal fa-arrow-circle-right"></i>
              <router-link :to="`/${item.link}`">
                {{ item.ward ? item.ward : item.district }}
              </router-link>
            </li>
            <div class="w-100">
              <button class="button-primary showMore" type="button">
                <a href="javascript:void(0);"></a>
              </button>
            </div>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
/**
 * Dependencies injection library
 */
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import datetime from "@/utils/dateTime";
import number from "@/utils/number";
import useWeatherService from "@app/services/weather.service";
import { ElLoading } from "element-plus";
import CurrentWeather from "./CurrentWeather.vue";
import DayForecast from "./DayForecast.vue";
import HourlyWeather from "./HourlyWeather.vue";
import { useScriptStore } from "@/stores/script.store";
import { useProvincesStore } from "@app/stores/provinces.store";
import { storeToRefs } from "pinia";
import slugify from "slugify";
import useInformationService from "@master/services/information.service";

/**
 * Variable define
 */
const weatherService = useWeatherService();
const informationService = useInformationService();
const data = ref<any>([]);
const provinceStore = useProvincesStore();
const { locations } = storeToRefs(provinceStore);
const storeScript = useScriptStore();
const isCurrent = ref(false);
const isHourly = ref(false);
const isDays = ref(false);
const isOneDayForecast = ref(false);
const isTwoDayForecast = ref(false);
const isFourDayForecast = ref(false);
const isSixDayForecast = ref(false);
const isEightDayForecast = ref(false);
const route = useRoute();
const router = useRouter();
const breadcrumbItems = ref<any>([]);
const positionName = ref<any>(null);
const slugPositionName = ref<any>(null);
const title = ref<any>(null);
const today = ref<any>(null);
const todayWeather = ref<any>({});
const airQuanlity = ref<any>({});
const coordinates = ref<any>({});
const isLoading = ref<any>(false);
const currentWeather = ref<any>(null);
const numberDay = ref<any>(null);
const CurrentWeatherKey = ref(0);
const HourlyWeatherKey = ref(0);
const DayForecastKey = ref(0);
const currentRouter = ref<any>(null);

const chartOptionsTemperatureRain = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context: any) {
          let label = context.dataset.label || "";
          let value = context.raw;

          // Thêm đơn vị tương ứng
          if (label === "Nhiệt độ") {
            return `${label}: ${value}°C`;
          } else if (label === "Khả năng có mưa") {
            return `${label}: ${value}%`;
          }
          return `${label}: ${value}`;
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value: any, index: any, values: any) {
          return value + "°C"; // Mặc định cho nhiệt độ
        },
      },
    },
    y1: {
      position: "right",
      ticks: {
        callback: function (value: any, index: any, values: any) {
          return value + "%"; // Đơn vị cho khả năng có mưa
        },
      },
    },
  },
};
const chartOptionsRainForecast = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context: any) {
          let label = context.dataset.label || "";
          let value = context.raw;

          // Định dạng tooltip cho lượng mưa
          return `${label}: ${value} mm`;
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value: any) {
          return value + " mm";
        },
      },
      beginAtZero: true, // Đảm bảo trục Y bắt đầu từ 0
    },
  },
};

const chartDataTemperatureRain = ref<any>({
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

const chartDataDailyTemperatureRain = ref<any>({
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

const chartDataDailyRain = ref<any>({
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
 * Function
 */
onMounted(() => {
  scrollToTop();
});

const getData = (province_code: any, district_code: any) => {
  province_code = province_code;
  district_code = district_code;
  const province = locations.value.find(
    (p: any) => p.code_name == province_code
  );

  if (!province) {
    data.value = [];
    return;
  }

  if (district_code) {
    data.value = province.districts
      .filter((district: any) => district.code_name === district_code)
      .flatMap((district: any) =>
        district.wards
          .filter((ward: any) => ward.district_id === district.id)
          .map((ward: any) => ({
            ward: ward.full_name,
            district: district.full_name,
            province: province.full_name,
            link: `${province.code_name}/${district.code_name}/${ward.code_name}`,
          }))
      );
  } else {
    data.value = province.districts
      .filter((district: any) => district.province_id === province.id)
      .map((district: any) => ({
        ward: "",
        district: district.full_name,
        province: province.full_name,
        link: `${province.code_name}/${district.code_name}`,
      }));
  }
};
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const onInit = async () => {
  breadcrumbItems.value = [{ label: "Trang chủ", link: "/" }];

  let wardName = "";
  let districtName = "";
  let provinceName = "";

  // Tìm province trước
  const province = locations.value.find(
    (p: any) => p.code_name === route.params.WeatherByProvince
  );

  currentRouter.value = route.params.WeatherByProvince;

  if (!province) {
    router.push({ name: "NotFound" });
    return;
  }
  provinceName = province.full_name;
  title.value = "quận huyện " + provinceName;
  if (
    normalizeRouteName(route.name?.toString() ?? "") == "WeatherByWard" ||
    normalizeRouteName(route.name?.toString() ?? "") == "WeatherByDistrict"
  ) {
    breadcrumbItems.value.push({
      label: provinceName,
      link: `/${province.code_name}`,
    });
  } else {
    breadcrumbItems.value.push({
      label: provinceName,
    });
  }

  // Nếu có district
  if (route.params.WeatherByDistrict) {
    currentRouter.value =
      currentRouter.value + "/" + route.params.WeatherByDistrict;
    const district = (province.districts || []).find(
      (d: any) => d.code_name === route.params.WeatherByDistrict
    );

    if (!district) {
      router.push({ name: "NotFound" });
      return;
    }

    districtName = district.full_name;
    title.value = "xã phường " + districtName;
    if (normalizeRouteName(route.name?.toString() ?? "") == "WeatherByWard") {
      breadcrumbItems.value.push({
        label: districtName,
        link: `/${province.code_name}/${district.code_name}`,
      });
    } else {
      breadcrumbItems.value.push({
        label: districtName,
      });
    }

    // Nếu có ward
    if (route.params.WeatherByWard) {
      currentRouter.value =
        currentRouter.value + "/" + route.params.WeatherByWard;
      const ward = (district.wards || []).find(
        (w: any) => w.code_name === route.params.WeatherByWard
      );

      if (!ward) {
        router.push({ name: "NotFound" });
        return;
      }

      wardName = ward.full_name;
      positionName.value = `${wardName}, ${districtName}, ${provinceName}`;
      breadcrumbItems.value.push({
        label: wardName,
      });
    } else {
      positionName.value = `${districtName}, ${provinceName}`;
    }
  } else {
    positionName.value = `${provinceName}`;
  }

  slugPositionName.value = slugify(positionName.value.toLowerCase());

  today.value = datetime.formatDateToDDMMYYYY(new Date());

  coordinates.value = await weatherService.getCoordinates(positionName.value);
  if (!coordinates.value) {
    coordinates.value = await weatherService.getCoordinates(
      `${districtName}, ${provinceName}`
    );
  }
  if (!coordinates.value) {
    coordinates.value = await weatherService.getCoordinates(provinceName);
  }

  if (coordinates.value) {
    let res = (await weatherService.getCurrentWeather({
      lat: coordinates.value.lat,
      lon: coordinates.value.lon,
    })) as any;

    if (res?.status == "success") {
      currentWeather.value = res.data;

      todayWeather.value.pressure = currentWeather.value.current.pressure;

      todayWeather.value.temp = number.kelvinToCelsius(
        currentWeather.value.current.temp
      );

      todayWeather.value.feels_like = number.kelvinToCelsius(
        currentWeather.value.current.feels_like
      );

      todayWeather.value.description =
        currentWeather.value.current.weather[0].description;

      todayWeather.value.icon = currentWeather.value.current.weather[0].icon;

      todayWeather.value.humidity = currentWeather.value.current.humidity;

      todayWeather.value.visibility = (
        currentWeather.value.current.visibility / 1000
      ).toFixed(1);

      todayWeather.value.wind_speed = (
        currentWeather.value.current.wind_speed * 3.6
      ).toFixed(2);

      todayWeather.value.dew_point = number.kelvinToCelsius(
        currentWeather.value.current.dew_point
      );

      todayWeather.value.uvi = currentWeather.value.current.uvi;

      todayWeather.value.minTemp = number.kelvinToCelsius(
        currentWeather.value.daily[0].temp.min
      );

      todayWeather.value.maxTemp = number.kelvinToCelsius(
        currentWeather.value.daily[0].temp.max
      );

      todayWeather.value.day = `${number.kelvinToCelsius(
        currentWeather.value.daily[0].temp.day
      )}°/${number.kelvinToCelsius(currentWeather.value.daily[0].temp.max)}°`;

      todayWeather.value.night = `${number.kelvinToCelsius(
        currentWeather.value.daily[0].temp.night
      )}°/${number.kelvinToCelsius(currentWeather.value.daily[0].temp.min)}°`;

      todayWeather.value.morning = `${number.kelvinToCelsius(
        currentWeather.value.daily[0].temp.morn
      )}°/${number.kelvinToCelsius(currentWeather.value.daily[0].temp.day)}°`;

      todayWeather.value.evening = `${number.kelvinToCelsius(
        currentWeather.value.daily[0].temp.eve
      )}°/${number.kelvinToCelsius(currentWeather.value.daily[0].temp.night)}°`;

      todayWeather.value.sunrise = datetime.formatTimestampTo12Hour(
        currentWeather.value.current.sunrise
      );
      todayWeather.value.sunset = datetime.formatTimestampTo12Hour(
        currentWeather.value.current.sunset
      );

      todayWeather.value.hourly = groupByThreeHours(
        currentWeather.value.hourly
      );

      todayWeather.value.daily = currentWeather.value.daily
        .slice(0, 5)
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
          } = entry;
          return {
            time: number.formatDateWithDay(dt),
            max: number.kelvinToCelsius(temp.max),
            min: number.kelvinToCelsius(temp.min),
            description: weather[0].description,
            icon: weather[0].icon,
            humidity,
            wind_speed: (wind_speed * 3.6).toFixed(2),
            day: number.kelvinToCelsius(temp.day),
            night: number.kelvinToCelsius(temp.night),
            morning: number.kelvinToCelsius(temp.morn),
            evening: number.kelvinToCelsius(temp.eve),
            sunrise: datetime.formatTimestampTo12Hour(sunrise),
            sunset: datetime.formatTimestampTo12Hour(sunset),
            pressure,
          };
        });

      let labelsTemperatureRain = [];
      let chartDataTemperatureRain0 = [];
      let chartDataTemperatureRain1 = [];

      let labelsDailyTemperatureRain = [];
      let chartDataDailyTemperatureRain0 = [];
      let chartDataDailyTemperatureRain1 = [];

      let dataDailyRain = [];
      for (
        let i = 0;
        i < Math.min(11, currentWeather.value.hourly.length);
        i++
      ) {
        let chunk = currentWeather.value.hourly[i];

        labelsTemperatureRain.push(datetime.formatTimestampTo12Hour(chunk.dt));

        chartDataTemperatureRain0.push(number.kelvinToCelsius(chunk.temp));
        chartDataTemperatureRain1.push(chunk.pop * 100);
      }
      for (let i = 0; i < Math.min(8, currentWeather.value.daily.length); i++) {
        let chunk = currentWeather.value.daily[i];

        labelsDailyTemperatureRain.push(number.formatDateWithDay(chunk.dt));

        chartDataDailyTemperatureRain0.push(
          number.kelvinToCelsius(chunk.temp.day)
        );
        chartDataDailyTemperatureRain1.push(chunk.pop * 100);

        if (chunk.rain) {
          dataDailyRain.push(chunk.rain);
        } else {
          dataDailyRain.push(0);
        }
      }

      chartDataTemperatureRain.value = {
        labels: labelsTemperatureRain,
        datasets: [
          {
            label: "Nhiệt độ",
            data: chartDataTemperatureRain0,
            borderColor: "green",
            borderWidth: 2,
            fill: false,
          },
          {
            label: "Khả năng có mưa",
            data: chartDataTemperatureRain1,
            borderColor: "orange",
            borderWidth: 2,
            fill: false,
          },
        ],
      };

      chartDataDailyTemperatureRain.value = {
        labels: labelsDailyTemperatureRain,
        datasets: [
          {
            label: "Nhiệt độ",
            data: chartDataDailyTemperatureRain0,
            borderColor: "green",
            borderWidth: 2,
            fill: false,
          },
          {
            label: "Khả năng có mưa",
            data: chartDataDailyTemperatureRain1,
            borderColor: "orange",
            borderWidth: 2,
            fill: false,
          },
        ],
      };

      chartDataDailyRain.value = {
        labels: labelsDailyTemperatureRain,
        datasets: [
          {
            label: "Lượng mưa (mm)",
            data: dataDailyRain,
            borderColor: "blue",
            borderWidth: 2,
            fill: false,
          },
        ],
      };
    }

    res = (await weatherService.getAirQuality({
      lat: coordinates.value.lat,
      lon: coordinates.value.lon,
    })) as any;

    if (res?.status == "success") {
      airQuanlity.value = {
        ...res.data.list[0].components,
        ...getAirQualityInfo(res.data.list[0].main.aqi),
        aqi: res.data.list[0].main.aqi,
      };
    }
  } else {
    router.push({
      name: "NotFound",
    });
    return;
  }
};

const groupByThreeHours = (data: any) => {
  let groupedData = [];
  for (let i = 0; i < data.length; i += 3) {
    let chunk = data.slice(i, i + 3);
    let maxTemp = Math.max(...chunk.map((item: any) => item.temp));
    let minTemp = Math.min(...chunk.map((item: any) => item.temp));

    groupedData.push({
      icon: chunk[0].weather[0].icon,
      description: chunk[0].weather[0].description,
      time: datetime.formatTimestampTo12Hour(chunk[0].dt), // Lấy timestamp của giờ đầu tiên trong nhóm
      max: number.kelvinToCelsius(maxTemp),
      min: number.kelvinToCelsius(minTemp),
    });
  }
  return groupedData;
};

const getAirQualityInfo = (aqi: any) => {
  switch (aqi) {
    case 1:
      return {
        level: "Tốt",
        description:
          "Chất lượng không khí tốt, không có hoặc rất ít rủi ro cho sức khỏe.",
      };
    case 2:
      return {
        level: "Trung bình",
        description:
          "Chất lượng không khí chấp nhận được, nhưng một số người nhạy cảm có thể bị ảnh hưởng nhẹ.",
      };
    case 3:
      return {
        level: "Kém",
        description:
          "Nhóm nhạy cảm có thể bị ảnh hưởng sức khỏe. Những người bình thường ít chịu tác động đáng kể.",
      };
    case 4:
      return {
        level: "Xấu",
        description:
          "Chất lượng không khí kém, có thể gây ảnh hưởng sức khỏe đáng kể. Người nhạy cảm nên hạn chế ra ngoài.",
      };
    case 5:
      return {
        level: "Rất xấu",
        description:
          "Rất có hại cho sức khỏe. Cảnh báo nguy hại sức khỏe nghiêm trọng. Đa số mọi người đều bị ảnh hưởng.",
      };
    default:
      return {
        level: "Không xác định",
        description: "Dữ liệu không hợp lệ hoặc chưa có thông tin.",
      };
  }
};

const changeActive = async (type: any) => {
  await onInit();
  isCurrent.value = false;
  isHourly.value = false;
  isDays.value = false;
  isOneDayForecast.value = false;
  isTwoDayForecast.value = false;
  isFourDayForecast.value = false;
  isSixDayForecast.value = false;
  isEightDayForecast.value = false;
  if (type.includes("_Hourly")) {
    isHourly.value = true;
    HourlyWeatherKey.value++;
  } else if (type.includes("_Tomorrow")) {
    isDays.value = true;
    numberDay.value = 1;
    isOneDayForecast.value = true;
    DayForecastKey.value++;
  } else if (type.includes("_2Days")) {
    isDays.value = true;
    numberDay.value = 2;
    isTwoDayForecast.value = true;
    DayForecastKey.value++;
  } else if (type.includes("_4Days")) {
    isDays.value = true;
    numberDay.value = 4;
    isFourDayForecast.value = true;
    DayForecastKey.value++;
  } else if (type.includes("_6Days")) {
    isDays.value = true;
    numberDay.value = 6;
    isSixDayForecast.value = true;
    DayForecastKey.value++;
  } else if (type.includes("_8Days")) {
    isDays.value = true;
    numberDay.value = 8;
    isEightDayForecast.value = true;
    DayForecastKey.value++;
  } else {
    isCurrent.value = true;
    CurrentWeatherKey.value++;
  }
};
/**
 * Life circle vue js
 */
const {
  data: detailData,
  pending,
  error,
} = await useAsyncData("detailData", async () => {
  await provinceStore.getLocations();

  await onInit();

  let province = null;
  let district = null;
  if (
    normalizeRouteName(route.name?.toString() ?? "")
      ?.toString()
      ?.includes("WeatherByProvince")
  ) {
    province = route.params?.WeatherByProvince ?? null;
  } else if (
    normalizeRouteName(route.name?.toString() ?? "")
      ?.toString()
      ?.includes("WeatherByDistrict") ||
    normalizeRouteName(route.name?.toString() ?? "")
      ?.toString()
      ?.includes("WeatherByWard")
  ) {
    province = route.params?.WeatherByProvince ?? null;
    district = route.params?.WeatherByDistrict ?? null;
  }

  getData(province, district);

  await changeActive(normalizeRouteName(route.name?.toString() ?? ""));

  const meta = await informationService.seo_meta(
    normalizeRouteName(route.name?.toString() ?? "")
  );
  return {
    meta,
    positionName: positionName.value,
    slugPositionName: slugPositionName.value,
    title: title.value,
    today: today.value,
    todayWeather: todayWeather.value,
    airQuanlity: airQuanlity.value,
    coordinates: coordinates.value,
    chartDataTemperatureRain: chartDataTemperatureRain.value,
    chartDataDailyTemperatureRain: chartDataDailyTemperatureRain.value,
    chartDataDailyRain: chartDataDailyRain.value,
    currentWeather: currentWeather.value,
    numberDay: numberDay.value,
    isCurrent: isCurrent.value,
    CurrentWeatherKey: CurrentWeatherKey.value,
    isHourly: isHourly.value,
    HourlyWeatherKey: HourlyWeatherKey.value,
    isDays: isDays.value,
    DayForecastKey: DayForecastKey.value,
    isOneDayForecast: isOneDayForecast.value,
    isTwoDayForecast: isTwoDayForecast.value,
    isFourDayForecast: isFourDayForecast.value,
    isSixDayForecast: isSixDayForecast.value,
    isEightDayForecast: isEightDayForecast.value,
    currentRouter: currentRouter.value,
    breadcrumbItems: breadcrumbItems.value,
    data: data.value,
  };
});

if (detailData.value?.meta) {
  const meta = detailData.value?.meta;
  const title = meta?.data?.information?.title?.replace(
    /TITLE_WEATHER/g,
    detailData.value?.positionName
  );
  const description = meta?.data?.information?.description?.replace(
    /TITLE_WEATHER/g,
    detailData.value?.positionName
  );
  useHead({
    title: title,
    meta: [
      {
        name: "description",
        content: description,
      },
    ],
  });
}

function normalizeRouteName(name: string): string {
  const replacements: Record<string, string> = {
    "-theo-gio": "_Hourly",
    "-ngay-mai": "_Tomorrow",
    "-2-ngay-toi": "_2Days",
    "-4-ngay-toi": "_4Days",
    "-6-ngay-toi": "_6Days",
    "-8-ngay-toi": "_8Days",
  };

  for (const [suffix, replacement] of Object.entries(replacements)) {
    if (name.endsWith(suffix)) {
      name = name.replace(suffix, replacement);
      break;
    }
  }
  if (name.includes("WeatherByProvince-")) {
    name = name.split("WeatherByProvince-")[1];
  }

  if (name.includes("WeatherByDistrict-")) {
    name = name.split("WeatherByDistrict-")[1];
  }

  return name;
}
</script>

<style scoped></style>
