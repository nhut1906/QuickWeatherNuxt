<template>
  <div
    id="demo-widget"
    :style="{
      width: `${lineWidth}px`,
      visibility: !isLoading ? 'visible' : 'hidden',
    }"
  >
    <Sample1
      v-if="sampleWidget == 1"
      :showTitle="showTitle"
      :address="address"
      :addressCodeName="addressCodeName"
      :todayWeather="todayWeather"
      :dataDaily="dataDaily"
    />
    <Sample2
      v-else-if="sampleWidget == 2"
      :showTitle="showTitle"
      :address="address"
      :addressCodeName="addressCodeName"
      :todayWeather="todayWeather"
      :dataDaily="dataDaily"
      :titleBgColor="titleBgColor"
      :borderColor="borderColor"
      :colorTitle="colorTitle"
    />
    <Sample3
      v-else-if="sampleWidget == 3"
      :showTitle="showTitle"
      :address="address"
      :addressCodeName="addressCodeName"
      :todayWeather="todayWeather"
      :titleBgColor="titleBgColor"
      :borderColor="borderColor"
    />
    <Sample4
      v-else-if="sampleWidget == 4"
      :showTitle="showTitle"
      :address="address"
      :addressCodeName="addressCodeName"
      :todayWeather="todayWeather"
      :titleBgColor="titleBgColor"
      :borderColor="borderColor"
      :dataDaily="dataDaily"
    />
    <Sample5
      v-else-if="sampleWidget == 5"
      :showTitle="showTitle"
      :address="address"
      :addressCodeName="addressCodeName"
      :todayWeather="todayWeather"
      :titleBgColor="titleBgColor"
      :borderColor="borderColor"
      :dataDaily="dataDaily"
    />
    <Sample6
      v-else-if="sampleWidget == 6"
      :showTitle="showTitle"
      :address="address"
      :addressCodeName="addressCodeName"
      :todayWeather="todayWeather"
      :titleBgColor="titleBgColor"
      :borderColor="borderColor"
      :dataDaily="dataDaily"
    />
    <Sample7
      v-else-if="sampleWidget == 7"
      :showTitle="showTitle"
      :address="address"
      :addressCodeName="addressCodeName"
      :todayWeather="todayWeather"
      :titleBgColor="titleBgColor"
      :borderColor="borderColor"
    />
    <Sample8
      v-else-if="sampleWidget == 8"
      :showTitle="showTitle"
      :address="address"
      :addressCodeName="addressCodeName"
      :todayWeather="todayWeather"
      :titleBgColor="titleBgColor"
      :borderColor="borderColor"
      :dataDaily="dataDaily"
    />
  </div>
</template>

<script setup lang="ts">
import { ElLoading } from "element-plus";
import { onMounted, ref, toRefs } from "vue";
import useWeatherService from "@app/services/weather.service";
import datetime from "@/utils/dateTime";
import number from "@/utils/number";
import { useRouter, useRoute } from "vue-router";
import { CURRENT_POSITION_DEFAULT } from "@/commons/const";
import Sample1 from "./Sample1.vue";
import Sample2 from "./Sample2.vue";
import Sample3 from "./Sample3.vue";
import Sample4 from "./Sample4.vue";
import Sample5 from "./Sample5.vue";
import Sample6 from "./Sample6.vue";
import Sample7 from "./Sample7.vue";
import Sample8 from "./Sample8.vue";

const weatherService = useWeatherService();
const router = useRouter();
const route = useRoute();
const props = defineProps<{
  Request?: any;
}>();

const { Request } = toRefs(props);

const isLoading = ref<any>(true);
const address = ref<any>(null);
const addressCodeName = ref<any>(null);
const sampleWidget = ref<any>(null);
const numberDay = ref<any>(null);
const showTitle = ref<any>(null);
const colorTitle = ref<any>(null);
const titleBgColor = ref<any>(null);
const textColor = ref<any>(null);
const borderColor = ref<any>(null);
const lineColor = ref<any>(null);
const lineWidth = ref<any>(null);
const dataDaily = ref<any>([]);
const todayWeather = ref<any>({});
const coordinates = ref<any>(null);

onMounted(async () => {
  address.value =
    Request.value?.address ??
    route.query.address ??
    CURRENT_POSITION_DEFAULT.name;
  addressCodeName.value =
    Request.value?.addressCodeName ??
    route.query.addressCodeName ??
    CURRENT_POSITION_DEFAULT.code_name;
  sampleWidget.value =
    Request.value?.sampleWidget ?? route.query.sampleWidget ?? 1;
  numberDay.value = Request.value?.numberDay ?? route.query.numberDay ?? 5;
  showTitle.value = Request.value?.showTitle ?? route.query.showTitle ?? true;
  colorTitle.value =
    Request.value?.colorTitle ?? route.query.colorTitle ?? "#003870";
  titleBgColor.value =
    Request.value?.titleBgColor ?? route.query.titleBgColor ?? "#ff0000";
  textColor.value =
    Request.value?.textColor ?? route.query.textColor ?? "#959dad";
  borderColor.value =
    Request.value?.borderColor ?? route.query.borderColor ?? "#ff0000";
  lineColor.value =
    Request.value?.lineColor ?? route.query.lineColor ?? "#dddddd";
  lineWidth.value = Request.value?.lineWidth ?? route.query.lineWidth;

  await onInit();
});

const onInit = async () => {
  isLoading.value = true;

  coordinates.value = await weatherService.getCoordinates(address.value);
  if (!coordinates.value) {
    coordinates.value = await weatherService.getCoordinates(
      address.value.substring(address.value.indexOf(",") + 1).trim()
    );
  }
  if (!coordinates.value) {
    const firstComma = address.value.indexOf(",");
    const secondComma = address.value.indexOf(",", firstComma + 1);
    coordinates.value = await weatherService.getCoordinates(
      address.value.substring(secondComma + 1).trim()
    );
  }
  if (coordinates.value) {
    let res = (await weatherService.getCurrentWeather({
      lat: coordinates.value.lat,
      lon: coordinates.value.lon,
    })) as any;

    if (res?.status == "success") {
      const currentWeather = res.data;

      todayWeather.value.time = number.formatDateWithDay(
        currentWeather.current.dt,
        sampleWidget.value
      );

      todayWeather.value.temp = number.kelvinToCelsius(
        currentWeather.current.temp
      );

      todayWeather.value.feels_like = number.kelvinToCelsius(
        currentWeather.current.feels_like
      );

      todayWeather.value.description =
        currentWeather.current.weather[0].description;

      todayWeather.value.icon = currentWeather.current.weather[0].icon;

      dataDaily.value = currentWeather.daily
        .slice(1, numberDay.value + 1)
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
            time: number.formatDateWithDay(dt, sampleWidget.value),
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
    }
  } else {
    router.push({
      name: "NotFound",
    });
    isLoading.value = false;
    return;
  }

  isLoading.value = false;
};
</script>
