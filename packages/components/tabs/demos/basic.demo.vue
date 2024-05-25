<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  默认选中第一项。
</markdown>

<template>
  <YTabs :items="items" type="bar" />
</template>

<script setup lang="ts">
import { TabItemType } from "@nimble-ui/vue";
import { reactive, h } from "vue";

const items = reactive<TabItemType[]>([
  {
    id: "2356",
    label: h("div", { class: "name", style: "color: red" }, "Tab 1"),
    children: "Tab 1",
  },
  {
    id: "8588",
    label: "Tab 2",
    children: "Tab 2",
    disabled: true,
  },
  {
    id: "536",
    label: "Tab 3",
    children: "Tab 3",
  },
]);
</script>
