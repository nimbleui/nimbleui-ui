<!-- eslint-disable vue/multi-word-component-names -->

<markdown>
  # 滚动
  
  标签滚动。
</markdown>

<template>
  <YTabs v-model="active" :items="items" />
</template>

<script setup lang="ts">
import { reactive, h, ref } from "vue";

const items = reactive([
  {
    id: "2356",
    label: h("div", { class: "name" }, "Tab 1"),
    children: "Tab 1",
  },
  {
    id: "8588",
    label: "Tab 2",
    children: "Tab 2",
  },
  {
    id: "33",
    label: "Tab 3",
    children: "Tab 3",
  },
  {
    id: "365",
    label: "Tab 4",
    children: "Tab 4",
  },
  {
    id: "96",
    label: "Tab 5",
    children: "Tab 5",
  },
  {
    id: "896",
    label: "Tab 6",
    children: "Tab 6",
  },
  {
    id: "8944",
    label: "Tab 7",
    children: "Tab 7",
  },
]);

const active = ref("2356");
</script>
