<!-- eslint-disable vue/multi-word-component-names -->

<markdown>
  # 滚动
  
  标签滚动。
</markdown>

<template>
  <YFlex vertical :gap="20">
    <YTabs v-model="active" :items="items" />

    <div style="height: 200px">
      <YTabs v-model="active" tab-position="left" :items="items" />
    </div>
  </YFlex>
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
  {
    id: "852",
    label: "Tab 8",
    children: "Tab 8",
  },
  {
    id: "424",
    label: "Tab 9",
    children: "Tab 9",
  },
  {
    id: "8585412",
    label: "Tab 10",
    children: "Tab 10",
  },
  {
    id: "2201",
    label: "Tab 11",
    children: "Tab 11",
  },
  {
    id: "1044",
    label: "Tab 12",
    children: "Tab 12",
  },
  {
    id: "3244",
    label: "Tab 13",
    children: "Tab 13",
  },
  {
    id: "9235",
    label: "Tab 14",
    children: "Tab 41",
  },
]);

const active = ref("2356");
</script>
