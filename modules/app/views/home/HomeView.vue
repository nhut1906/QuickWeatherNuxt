<template>
  <div v-if="pending || error || pendingPostList" style="height: 100vh"></div>
  <div
    v-else
    :style="{
      visibility: !(pending || error || pendingPostList) ? 'visible' : 'hidden'
    }"
  >
    <main>
      <section class="weather-general">
        <div class="container">
          <div class="weather-general-inner">
            <div class="weather-main">
              <div class="feature-location mb-3">
                <router-link
                  class="d-flex"
                  :to="`/${CURRENT_POSITION_DEFAULT.code_name}`"
                >
                  <h1 class="weather-main-title">Dự báo thời tiết</h1>
                  <h2 class="weather-main-title">
                    &nbsp;{{ CURRENT_POSITION_DEFAULT.name }}
                  </h2>
                </router-link>
              </div>
              <div class="weather-main-hero">
                <img
                  :src="
                    '/assets/images/weather/' +
                    data?.defaultTodayWeather.icon +
                    '.png'
                  "
                  :alt="data?.defaultTodayWeather.description"
                />
                <p class="temp">{{ data?.defaultTodayWeather.temp }}°</p>
                <div class="desc">
                  <p>{{ data?.defaultTodayWeather.description }}</p>
                  <span
                    >Cảm giác như
                    <span
                      >{{ data?.defaultTodayWeather.feels_like }}°</span
                    ></span
                  >
                </div>
              </div>
              <div class="weather-main-desc">
                <div class="item">
                  <img
                    src="/assets/images/icon/temperature.svg"
                    alt="Nhiệt độ tại Hà Nội"
                  />
                  <div class="item-title">Thấp/Cao</div>
                  <div class="temp">
                    <p>{{ data?.defaultTodayWeather.minTemp }}°/</p>
                    <p>{{ data?.defaultTodayWeather.maxTemp }}°</p>
                  </div>
                </div>
                <div class="item">
                  <img
                    src="/assets/images/icon/humidity-xl.svg"
                    alt="Độ ẩm tại Hà Nội"
                  />
                  <div class="item-title">Độ ẩm</div>
                  <div class="temp">
                    <p>{{ data?.defaultTodayWeather.humidity }} %</p>
                  </div>
                </div>
                <div class="item">
                  <img
                    src="/assets/images/icon/clarity-eye-line.svg"
                    alt="Tầm nhìn tại Hà Nội"
                  />
                  <div class="item-title">Tầm nhìn</div>
                  <div class="temp">
                    <p>{{ data?.defaultTodayWeather.visibility }} km</p>
                  </div>
                </div>
                <div class="item">
                  <img
                    src="/assets/images/icon/ph-wind.svg"
                    alt="Gió tại Hà Nội"
                  />
                  <div class="item-title">Gió</div>
                  <div class="temp">
                    <p>{{ data?.defaultTodayWeather.wind_speed }} km/h</p>
                  </div>
                </div>
                <div class="item">
                  <img
                    src="/assets/images/icon/line-md-paint.svg"
                    alt="Điểm ngưng tại Hà Nội"
                  />
                  <div class="item-title">Điểm ngưng</div>
                  <div class="temp">
                    <p>{{ data?.defaultTodayWeather.dew_point }} °</p>
                  </div>
                </div>
                <div class="item">
                  <img
                    src="/assets/images/icon/carbon-uv.svg"
                    alt="Tia UV tại Hà Nội"
                  />
                  <div class="item-title">UV</div>
                  <div class="temp">
                    <p>{{ data?.defaultTodayWeather.uvi }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="weather-sub">
              <div class="title">Hiện tại</div>
              <img
                :src="
                  '/assets/images/weather/' +
                  data?.defaultTodayWeather.icon +
                  '.png'
                "
                :alt="data?.defaultTodayWeather.description"
              />
              <div class="desc">
                <div class="humidity">
                  <img src="/assets/images/icon/dewpoint.svg" alt="Độ ẩm" />
                  <span>{{ data?.defaultTodayWeather.humidity }} %</span>
                </div>
                <p>{{ data?.defaultTodayWeather.description }}</p>
                <div class="temp">
                  <p>{{ data?.defaultTodayWeather.minTemp }}°&nbsp;/&nbsp;</p>
                  <p>{{ data?.defaultTodayWeather.maxTemp }}°</p>
                </div>
              </div>
            </div>
            <div class="weather-sub">
              <div class="title">{{ data?.defaultTomorrowWeather.date }}</div>
              <img
                :src="
                  '/assets/images/weather/' +
                  data?.defaultTomorrowWeather.icon +
                  '.png'
                "
                :alt="data?.defaultTomorrowWeather.description"
              />
              <div class="desc">
                <div class="humidity">
                  <img src="/assets/images/icon/dewpoint.svg" alt="Độ ẩm" />
                  <span>{{ data?.defaultTomorrowWeather.humidity }} %</span>
                </div>
                <p>{{ data?.defaultTomorrowWeather.description }}</p>
                <div class="temp">
                  <p>
                    {{ data?.defaultTomorrowWeather.minTemp }}°&nbsp;/&nbsp;
                  </p>
                  <p>{{ data?.defaultTomorrowWeather.maxTemp }}°</p>
                </div>
              </div>
            </div>
            <div class="weather-sub">
              <div class="title">
                {{ data?.defaultAfterTomorrowWeather.date }}
              </div>
              <img
                :src="
                  '/assets/images/weather/' +
                  data?.defaultAfterTomorrowWeather.icon +
                  '.png'
                "
                :alt="data?.defaultAfterTomorrowWeather.description"
              />
              <div class="desc">
                <div class="humidity">
                  <img src="/assets/images/icon/dewpoint.svg" alt="Độ ẩm" />
                  <span
                    >{{ data?.defaultAfterTomorrowWeather.humidity }} %</span
                  >
                </div>
                <p>{{ data?.defaultAfterTomorrowWeather.description }}</p>
                <div class="temp">
                  <p>
                    {{
                      data?.defaultAfterTomorrowWeather.minTemp
                    }}°&nbsp;/&nbsp;
                  </p>
                  <p>{{ data?.defaultAfterTomorrowWeather.maxTemp }}°</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="weather-highlight">
        <div class="container">
          <div class="weather-highlight-inner">
            <div class="weather-highlight-list">
              <div class="title-main w-100">
                <h2>Thời tiết nổi bật</h2>
              </div>
              <router-link
                v-for="(item, index) in data?.featuredWeather"
                :key="index"
                :to="`/${item.link}`"
                class="weather-sub"
              >
                <h3 class="title">{{ item.title }}</h3>
                <img
                  :src="'/assets/images/weather/' + item.icon + '.png'"
                  :alt="item.description"
                />
                <div class="desc">
                  <div class="humidity">
                    <img
                      src="/assets/images/icon/dewpoint.svg"
                      alt="humidity"
                    />
                    <span>{{ item.humidity }}%</span>
                  </div>
                  <p>
                    {{ item.description }}
                  </p>
                  <div class="temp">
                    <p>{{ item.minTemp }}°/</p>
                    <p>{{ item.maxTemp }}°</p>
                  </div>
                </div>
              </router-link>
            </div>
            <div class="weather-highlight-live">
              <div class="title-main">
                <h2>Bản đồ thời tiết Windy</h2>
              </div>
              <div class="fluctuating">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://embed.windy.com/embed2.html?lat=21.116671&lon=105.883331&detailLat=21.116671&detailLon=105.883331&width=100%25&height=550&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=default&metricTemp=%C2%B0C&radarRange=-1"
                  frameborder="0"
                ></iframe>
              </div>
              <div class="calendar-box">
                <div class="title-main">
                  <h3>Lịch</h3>
                </div>
                <div id="calendar-container" class="calendar-container"></div>
              </div>
            </div>
          </div>
        </div>
        <img class="weather-highlight-bg" :src="`/assets/images/icon/banner-bot.png`" alt="Thời tiết"
        />
      </section>
      <section class="weather-city">
        <div class="container">
          <div class="title-main">
            <h2>Thời tiết {{ data?.provinces.length }} tỉnh thành</h2>
          </div>
          <ul class="weather-city-inner">
            <li v-for="(city, index) in data?.provinces" :key="index">
              <i class="fal fa-arrow-circle-right"></i>
              <router-link :to="`/${city.code_name}`">
                {{ city.name }}
              </router-link>
            </li>
            <div>
              <button class="button-primary showMore" type="button">
                <a href="javascript:void(0);"></a>
              </button>
            </div>
          </ul>
        </div>
      </section>
      <section
        v-if="postList?.posts && postList?.posts.length > 0"
        class="new-highlight"
      >
        <div class="container">
          <div class="title-main">
            <h3>Tin tức nổi bật</h3>
          </div>
          <div class="new-highlight-inner">
            <CardPost
              v-for="(item, index) in postList?.posts"
              :key="index"
              :data="item"
            />
          </div>
          <button class="button-primary">
            <router-link :to="`/danh-muc/${categoryGrid[0]?.url_path}`">
              Xem thêm
            </router-link>
          </button>
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
import useWeatherService from "@app/services/weather.service";
import CardPost from "@/components/CardPost.vue";
import { CURRENT_POSITION_DEFAULT, FEATURED_PROVINCED } from "@/commons/const";
import number from "@/utils/number";
import { ElLoading } from "element-plus";
import { useProvincesStore } from "@app/stores/provinces.store";
import { usePostStore } from "@master/stores/post.store";
import { storeToRefs } from "pinia";
import { useScriptStore } from "@/stores/script.store";
import useInformationService from "@master/services/information.service";
import { useCategoryStore } from "@master/stores/category.store";

/**
 * Variable define
 */
const weatherService = useWeatherService();
const informationService = useInformationService();
const storeScript = useScriptStore();
const provincesStore = useProvincesStore();
const postsStore = usePostStore();
const { provinces } = storeToRefs(provincesStore);
const { dataGrid, goSort, pageConfig } = storeToRefs(postsStore);
const defaultTodayWeather = ref<any>({});
const defaultTomorrowWeather = ref<any>({});
const defaultAfterTomorrowWeather = ref<any>({});
const featuredWeather = ref<any>({});
const isLoading = ref<any>(true);
const store = useCategoryStore();
const { dataGrid: categoryGrid } = storeToRefs(store);

/**
 * Life circle vue js
 */

const { data, pending, error } = await useAsyncData("homeData", async () => {
  isLoading.value = true;
  await provincesStore.getProvinces();

  let coordinates = await weatherService.getCoordinates(
    CURRENT_POSITION_DEFAULT.name
  );
  if (coordinates) {
    const res = (await weatherService.getCurrentWeather({
      lat: coordinates.lat,
      lon: coordinates.lon,
    })) as any;

    if (res?.status == "success") {
      const currentWeather = res.data;

      defaultTodayWeather.value.temp = number.kelvinToCelsius(
        currentWeather.current.temp
      );

      defaultTodayWeather.value.feels_like = number.kelvinToCelsius(
        currentWeather.current.feels_like
      );

      defaultTodayWeather.value.description =
        currentWeather.current.weather[0].description;

      defaultTodayWeather.value.icon = currentWeather.current.weather[0].icon;

      defaultTodayWeather.value.humidity = currentWeather.current.humidity;

      defaultTodayWeather.value.visibility = (
        currentWeather.current.visibility / 1000
      ).toFixed(1);

      defaultTodayWeather.value.wind_speed = (
        currentWeather.current.wind_speed * 3.6
      ).toFixed(2);

      defaultTodayWeather.value.dew_point = number.kelvinToCelsius(
        currentWeather.current.dew_point
      );

      defaultTodayWeather.value.uvi = currentWeather.current.uvi;

      defaultTodayWeather.value.minTemp = number.kelvinToCelsius(
        currentWeather.daily[0].temp.min
      );

      defaultTodayWeather.value.maxTemp = number.kelvinToCelsius(
        currentWeather.daily[0].temp.max
      );

      defaultTomorrowWeather.value.humidity = currentWeather.daily[1].humidity;

      defaultTomorrowWeather.value.description =
        currentWeather.daily[1].weather[0].description;

      defaultTomorrowWeather.value.icon =
        currentWeather.daily[1].weather[0].icon;

      defaultTomorrowWeather.value.minTemp = number.kelvinToCelsius(
        currentWeather.daily[1].temp.min
      );

      defaultTomorrowWeather.value.date = number.formatDateWithDay(
        currentWeather.daily[1].dt
      );

      defaultTomorrowWeather.value.maxTemp = number.kelvinToCelsius(
        currentWeather.daily[1].temp.max
      );

      defaultAfterTomorrowWeather.value.humidity =
        currentWeather.daily[2].humidity;

      defaultAfterTomorrowWeather.value.description =
        currentWeather.daily[2].weather[0].description;

      defaultAfterTomorrowWeather.value.icon =
        currentWeather.daily[2].weather[0].icon;

      defaultAfterTomorrowWeather.value.minTemp = number.kelvinToCelsius(
        currentWeather.daily[2].temp.min
      );

      defaultAfterTomorrowWeather.value.maxTemp = number.kelvinToCelsius(
        currentWeather.daily[2].temp.max
      );

      defaultAfterTomorrowWeather.value.date = number.formatDateWithDay(
        currentWeather.daily[2].dt
      );
    }
  }

  const weatherResults = await Promise.all(
    FEATURED_PROVINCED.map(async (province) => {
      const coordinates = await weatherService.getCoordinates(province.name);
      if (!coordinates) return null;

      const res = (await weatherService.getCurrentWeather({
        lat: coordinates.lat,
        lon: coordinates.lon,
      })) as any;

      if (res?.status !== "success") return null;

      const currentWeather = res.data;

      return {
        name: province.name,
        code_name: province.code_name,
        weather: {
          link: province.code_name,
          title: province.name,
          description: currentWeather.current.weather[0].description,
          humidity: currentWeather.current.humidity,
          minTemp: number.kelvinToCelsius(currentWeather.daily[0].temp.min),
          maxTemp: number.kelvinToCelsius(currentWeather.daily[0].temp.max),
          icon: currentWeather.current.weather[0].icon,
        },
      };
    })
  );

  // Gán vào featuredWeather
  weatherResults.forEach((item: any) => {
    if (item) {
      featuredWeather.value[item.name] = item.weather;
    }
  });

  goSort.value = "updated_at.desc";
  pageConfig.value.page = 1;
  pageConfig.value.size = 4;

  goSort.value = null;

  storeScript.loadScript();

  const meta = await informationService.seo_meta("Home");

  return {
    defaultTodayWeather: defaultTodayWeather.value,
    defaultTomorrowWeather: defaultTomorrowWeather.value,
    defaultAfterTomorrowWeather: defaultAfterTomorrowWeather.value,
    featuredWeather: featuredWeather.value,
    posts: dataGrid.value,
    provinces: provinces.value,
    title: meta?.data?.information?.title,
    description: meta?.data?.information?.description,
  };
});

if (data.value) {
  useHead({
    title: data.value?.title,
    meta: [
      {
        name: "description",
        content: data.value?.description,
      },
    ],
  });
}

const { data: postList, pending: pendingPostList } = await useAsyncData(
  "postList",
  async () => {
    await postsStore.getList();

    return {
      posts: dataGrid.value,
    };
  }
);

/**
 * Function
 */
</script>

<style scoped></style>
