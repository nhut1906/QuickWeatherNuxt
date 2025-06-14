<template>
  <div
    v-if="!isLoading"
    :style="{
      visibility: !pending ? 'visible' : 'hidden',
    }"
    class="container"
  >
    <div class="row pt-4">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Dự báo thời tiết trên trang web của bạn</h4>
            <p class="card-title-desc">
              Tạo mã tuỳ chỉnh cho website và copy <code>mã nhúng</code> thêm
              vào vị trí muốn hiển thị trên website của bạn.
            </p>
          </div>
          <div class="card-body p-4">
            <div class="row">
              <div class="col-lg-6">
                <div>
                  <el-form :label-position="'top'">
                    <div class="mb-3">
                      <vc-input-group
                        required
                        prop="address"
                        label="Địa điểm"
                        class="form-label"
                      >
                        <!-- <vc-input
                          class="text-input"
                          v-model="address"
                          placeholder="Nhập địa điểm..."
                          autocomplete="off"
                        /> -->
                        <el-autocomplete
                          v-model="address"
                          :fetch-suggestions="searchLocation"
                          :trigger-on-focus="false"
                          placeholder="Nhập tên địa điểm"
                          @select="handleSelect"
                        >
                          <template #loading>
                            <el-icon class="is-loading">
                              <svg class="circular" viewBox="0 0 20 20">
                                <g
                                  class="path2 loading-path"
                                  stroke-width="0"
                                  style="animation: none; stroke: none"
                                >
                                  <circle
                                    r="3.375"
                                    class="dot1"
                                    rx="0"
                                    ry="0"
                                  />
                                  <circle
                                    r="3.375"
                                    class="dot2"
                                    rx="0"
                                    ry="0"
                                  />
                                  <circle
                                    r="3.375"
                                    class="dot4"
                                    rx="0"
                                    ry="0"
                                  />
                                  <circle
                                    r="3.375"
                                    class="dot3"
                                    rx="0"
                                    ry="0"
                                  />
                                </g>
                              </svg>
                            </el-icon>
                          </template>
                        </el-autocomplete>
                      </vc-input-group>
                    </div>
                    <div class="mb-3">
                      <vc-input-group
                        required
                        prop="sampleWidget"
                        label="Chọn mẫu"
                        class="form-label"
                      >
                        <vc-select
                          v-model="sampleWidget"
                          :items="sampleWidgets"
                          fieldText="text"
                          fieldValue="value"
                          @change="changeSampleWidget"
                        />
                      </vc-input-group>
                    </div>
                    <div class="mb-3">
                      <vc-input-group
                        required
                        prop="numberDay"
                        label="Số ngày"
                        class="form-label"
                      >
                        <vc-select
                          v-model="numberDay"
                          :items="numberDays"
                          fieldText="text"
                          fieldValue="value"
                        />
                      </vc-input-group>
                    </div>
                    <div class="row">
                      <div class="mt-4 mt-md-0 col-lg-6">
                        <div
                          class="form-check form-switch form-switch-md mb-3"
                          dir="ltr"
                        >
                          <vc-checkbox
                            v-model="showTitle"
                            label="Hiện tiêu đề?"
                          />
                        </div>
                      </div>

                      <div class="mb-2 col-lg-6">
                        <vc-input-group
                          required
                          prop="colorTitle"
                          label="Màu tiêu đề"
                          class="form-label"
                        >
                          <el-color-picker v-model="colorTitle" />
                        </vc-input-group>
                      </div>

                      <div class="mb-2 col-lg-6">
                        <vc-input-group
                          required
                          prop="titleBgColor"
                          label="Màu nền tiêu đề"
                          class="form-label"
                        >
                          <el-color-picker v-model="titleBgColor" />
                        </vc-input-group>
                      </div>

                      <div class="mb-2 col-lg-6">
                        <vc-input-group
                          required
                          prop="textColor"
                          label="Màu văn bản"
                          class="form-label"
                        >
                          <el-color-picker v-model="textColor" />
                        </vc-input-group>
                      </div>

                      <div class="mb-2 col-lg-6">
                        <vc-input-group
                          required
                          prop="borderColor"
                          label="Màu viền"
                          class="form-label"
                        >
                          <el-color-picker v-model="borderColor" />
                        </vc-input-group>
                      </div>

                      <div class="mb-2 col-lg-6">
                        <vc-input-group
                          required
                          prop="lineColor"
                          label="Màu đường kẻ"
                          class="form-label"
                        >
                          <el-color-picker v-model="lineColor" />
                        </vc-input-group>
                      </div>
                    </div>
                    <div class="mt-4">
                      <vc-button type="primary" @click="createWidget()"
                        >Tạo Widget</vc-button
                      >
                    </div>
                  </el-form>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mt-3 mt-lg-0">
                  <div class="mb-3">
                    <vc-input-group
                      required
                      prop="lineWidth"
                      label="Chiều rộng"
                      class="form-label"
                    >
                      <el-slider
                        v-model="lineWidth"
                        :min="200"
                        :max="500"
                        show-input
                        @change="handleSliderChange"
                      />
                    </vc-input-group>
                  </div>
                </div>
                <div class="mt-4">
                  <div
                    class="widget-container page_speed_114818420"
                    style="display: flex; justify-content: center"
                  >
                    <EmbedView
                      :key="keyEmbed"
                      :Request="{
                        address: address,
                        addressCodeName: addressCodeName,
                        sampleWidget: sampleWidget,
                        numberDay: numberDay,
                        showTitle: showTitle,
                        colorTitle: colorTitle,
                        titleBgColor: titleBgColor,
                        textColor: textColor,
                        borderColor: borderColor,
                        lineColor: lineColor,
                        lineWidth: lineWidth,
                      }"
                    />
                  </div>
                </div>
                <div class="mt-4">
                  <vc-textarea :rows="4" v-model="codeWidget" />
                </div>
                <div class="mt-4">
                  <vc-button type="primary" @click="clickCopy"
                    >Copy mã</vc-button
                  >
                  <vc-button type="primary" @click="createWidget()"
                    >Reload Widget</vc-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row pt-4 pb-4">
      <div class="col-12">
        <div class="card">
          <article id="widget-page-content" class="post">
            <div class="post-content card-body">
              <div class="entry-content page_speed_1153978366">
                <p dir="ltr">
                  <span>Tại website </span
                  ><a href="/"><span>thoitiet365.org</span></a
                  ><span>
                    . Bạn thỏa sức tạo và tùy chỉnh đoạn code thời tiết html
                    theo ý thích của mình, để chèn </span
                  ><a
                    href="/widget"
                    target="_blank"
                    title="widget thời tiết"
                    rel="noopener"
                    ><span>widget thời tiết</span></a
                  ><span>
                    vào website, wordpress, hoặc trang blogspot của bạn. Bạn có
                    thể tham khảo hướng dẫn cách lấy đoạn code bên dưới.</span
                  >
                </p>
                <h2 dir="ltr">
                  <span
                    >HƯỚNG DẪN CÁCH CHÈN THÔNG TIN WIDGET THỜI TIẾT VÀO
                    WEBSITE</span
                  >
                </h2>
                <p dir="ltr">
                  <span
                    > Việc tạo và cài đặt hết sức đơn giản. Bạn chỉ việc chọn
                    địa điểm nơi bạn muốn xem tình hình dự báo thời tiết. Chọn
                    mẫu widget phù hợp và đẹp. Chọn số ngày dữ liệu dự báo thời
                    tiết bạn muốn xem. Sau đó tùy chỉnh màu sắc ( Chữ - Màu nền
                    - Viền ) sao cho phù hợp với tông màu website của bạn.</span
                  >
                </p>
                <p dir="ltr">
                  <span
                    > Tiếp theo là tùy chỉnh kích thước sao cho vừa với nơi bạn
                    muốn chèn vào web. Và nhấn nút "Tạo Widget"</span
                  >
                </p>
                <p dir="ltr">
                  <span
                    > Sau đó bạn copy đoạn code html thời tiết vừa mới tạo. Dán
                    vào vị trí bạn muốn hiển thị trên website. Thế là xong. Giờ
                    bạn chỉ việc F5 lại trang web và xem thành quả.</span
                  >
                </p>
                <p>
                  <span
                    id="docs-internal-guid-ef423f60-7fff-5981-6e15-e6cc9bd052e3"
                  ></span>
                </p>
                <p dir="ltr">
                  <span>
                    ( Đoạn code trên có thể thay thế cho plugin thời tiết đang
                    có ở wordpress. Bạn có thể tùy chỉnh xem thời tiết Việt Nam
                    trực tiếp trên web của mình )</span
                  >
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import EmbedView from "./EmbedView.vue";
import { CURRENT_POSITION_DEFAULT } from "@/commons/const";
import { useToastStore } from "@/stores/toast.store";
import useInformationService from "@master/services/information.service";
import { useRoute } from "vue-router";
import { useProvincesStore } from "@app/stores/provinces.store";
import { storeToRefs } from "pinia";

const informationService = useInformationService();
const route = useRoute();
const isLoading = ref<any>(true);
const toastStore = useToastStore();
const keyEmbed = ref<any>(0);
const address = ref<any>(null);
const sampleWidget = ref<any>(null);
const numberDay = ref<any>(null);
const showTitle = ref<any>(null);
const colorTitle = ref<any>(null);
const titleBgColor = ref<any>(null);
const textColor = ref<any>(null);
const borderColor = ref<any>(null);
const lineColor = ref<any>(null);
const lineWidth = ref<any>(null);
const codeWidget = ref<any>(null);
const sampleWidgets = ref<any>([
  {
    text: "Mẫu 1",
    value: 1,
  },
  {
    text: "Mẫu 2",
    value: 2,
  },
  {
    text: "Mẫu 3",
    value: 3,
  },
  {
    text: "Mẫu 4",
    value: 4,
  },
  {
    text: "Mẫu 5",
    value: 5,
  },
  {
    text: "Mẫu 6",
    value: 6,
  },
  {
    text: "Mẫu 7",
    value: 7,
  },
  {
    text: "Mẫu 8",
    value: 8,
  },
]);
const numberDays = ref<any>([
  {
    text: "3 ngày",
    value: 3,
  },
  {
    text: "5 ngày",
    value: 5,
  },
  {
    text: "7 ngày",
    value: 7,
  },
]);
const addressCodeName = ref<any>(null);
const provinceStore = useProvincesStore();
const { locations } = storeToRefs(provinceStore);

onMounted(async () => {
  isLoading.value = true;
  showTitle.value = true;
  sampleWidget.value = 1;
  numberDay.value = 5;
  colorTitle.value = "#003870";
  titleBgColor.value = "#ff0000";
  textColor.value = "#959dad";
  borderColor.value = "#ff0000";
  lineColor.value = "#dddddd";
  lineWidth.value = 325;
  isLoading.value = false;
  loadCodeWidget();
});

const { data: metaData, pending } = await useAsyncData("metaData", async () => {
  const meta = await informationService.seo_meta("WidgetView");

  return { meta };
});

if (metaData) {
  const meta = metaData.value?.meta;
  const title = meta?.data?.information?.title;
  const description = meta?.data?.information?.description;

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

const changeSampleWidget = (value: any) => {
  if (value == 1) {
    colorTitle.value = "#003870";
    titleBgColor.value = "#ff0000";
    textColor.value = "#959dad";
    borderColor.value = "#ff0000";
    lineColor.value = "#dddddd";
  } else if (value == 2) {
    colorTitle.value = "#ffffff";
    titleBgColor.value = "#1c84ee";
    textColor.value = "#848484";
    borderColor.value = "#1c84ee";
    lineColor.value = "#dddddd";
  } else if (value == 3) {
    colorTitle.value = "#ffffff";
    titleBgColor.value = "#4f7ffa";
    textColor.value = "#e5eeff";
    borderColor.value = "#335fd1";
    lineColor.value = "#e5eeff";
  } else if (value == 4) {
    colorTitle.value = "#ffffff";
    titleBgColor.value = "#4f7ffa";
    textColor.value = "#e5eeff";
    borderColor.value = "#335fd1";
    lineColor.value = "#e5eeff";
  } else if (value == 5) {
    colorTitle.value = "#ffffff";
    titleBgColor.value = "#4f7ffa";
    textColor.value = "#e5eeff";
    borderColor.value = "#335fd1";
    lineColor.value = "#e5eeff";
  } else if (value == 6) {
    colorTitle.value = "#ffffff";
    titleBgColor.value = "#4f7ffa";
    textColor.value = "#e5eeff";
    borderColor.value = "#335fd1";
    lineColor.value = "#e5eeff";
  } else if (value == 7) {
    colorTitle.value = "#ffffff";
    titleBgColor.value = "#0b8429";
    textColor.value = "#e5eeff";
    borderColor.value = "#085502";
    lineColor.value = "#e5eeff";
  } else if (value == 8) {
    colorTitle.value = "#ffffff";
    titleBgColor.value = "#0b8429";
    textColor.value = "#e5eeff";
    borderColor.value = "#085502";
    lineColor.value = "#e5eeff";
  }
};

let timeout = ref<any>(null);

const handleSliderChange = (value: any) => {
  if (timeout.value) clearTimeout(timeout.value);
  const element = document.getElementById("demo-widget");
  if (element) {
    element.style.width = `${lineWidth.value}px`;
  }
};

const createWidget = () => {
  keyEmbed.value++;
  loadCodeWidget();
};

const loadCodeWidget = () => {
  const encode = (value: any) => encodeURIComponent(value); // Hàm mã hóa URL

  codeWidget.value = `<!--Begin thoitiet365.org widget --><iframe src="${
    import.meta.env.VITE_APP_URL
  }/widget/embed?address=${encode(
    address.value ?? CURRENT_POSITION_DEFAULT.name
  )}&addressCodeName=${encode(
    addressCodeName.value ?? CURRENT_POSITION_DEFAULT.code_name
  )}&sampleWidget=${sampleWidget.value}&numberDay=${
    numberDay.value
  }&showTitle=${showTitle.value}&colorTitle=${encode(
    colorTitle.value
  )}&titleBgColor=${encode(titleBgColor.value)}&textColor=${encode(
    textColor.value
  )}&borderColor=${encode(borderColor.value)}&lineColor=${encode(
    lineColor.value
  )}&lineWidth=${
    lineWidth.value
  }" id="widgeturl" width="100%" height="450px" scrolling="no" frameborder="0" allowtransparency="true" style="border:none;overflow:hidden;"></iframe><!-- End thoitiet365.org widget -->`;
};

const clickCopy = () => {
  navigator.clipboard.writeText(codeWidget.value).then(() =>
    toastStore.push({
      type: "Success",
      message: "Copy thành công",
    })
  );
};

const searchLocation = async (keyword: string, cb: any) => {
  await provinceStore.getLocations();

  setTimeout(() => {
    keyword = keyword?.toLowerCase();
    const results = [] as any;

    for (const province of locations.value) {
      for (const district of province.districts) {
        // Tìm trong danh sách xã/phường
        for (const ward of district.wards) {
          if (ward.name.toLowerCase().includes(keyword)) {
            results.push({
              code_name: `${ward.code_name}, ${district.code_name}, ${province.code_name}`,
              name: `${ward.name}, ${district.name}, ${province.name}`,
              value: `${ward.full_name}, ${district.full_name}, ${province.full_name}`,
            });
          }
        }

        // Tìm trong tên huyện/thành phố
        if (district.name.toLowerCase().includes(keyword)) {
          results.push({
            code_name: `${district.code_name}, ${province.code_name}`,
            name: `${district.name}, ${province.name}`,
            value: `${district.full_name}, ${province.full_name}`,
          });
        }
      }

      // Tìm theo tỉnh
      if (province.name.toLowerCase().includes(keyword)) {
        results.push({
          code_name: `${province.code_name}`,
          name: `${province.name}`,
          value: `${province.full_name}`,
        });
      }
    }

    clearTimeout(timeout.value);
    timeout.value = setTimeout(() => {
      cb(results);
    }, 2000 * Math.random());
  }, 1000);
};

const handleSelect = (item: Record<string, any>) => {
  addressCodeName.value = item.code_name;
  address.value = item.name;
};
</script>
