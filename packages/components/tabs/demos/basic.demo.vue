<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  默认选中第一项。
</markdown>

<template>
  <YTabs :items="items" />
</template>

<script setup lang="ts">
import { reactive, h } from "vue";

const items = reactive([
  {
    id: "2356",
    label: h("div", { class: "name" }, "测试1"),
    children: "测试1",
  },
  {
    id: "8588",
    label: "测试289898989",
    children: "测试289898989",
  },
]);
</script>
