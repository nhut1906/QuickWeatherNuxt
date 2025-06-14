import WidgetView from "@app/views/widget/WidgetView.vue";
import EmbedView from "@app/views/widget/EmbedView.vue";

// ========================== ROUTER =============================
export const ROUTER_WIDGET = [
  {
    path: "/widget",
    name: "WidgetView",
    component: WidgetView,
    meta: {
      layout: "Client",
    },
  },
  {
    path: "/widget/embed",
    name: "EmbedView",
    component: EmbedView,
    meta: {
      layout: "Default",
    },
  },
];
