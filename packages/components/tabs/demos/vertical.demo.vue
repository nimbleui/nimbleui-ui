<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 居中
  
  标签居中展示。
</markdown>

<template>
  <YTabs v-model="active" vertical :type="'card'" :items="items" />
</template>

<script setup lang="ts">
import { reactive, h, ref } from "vue";

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
  {
    id: "2825",
    label: "测试33",
    children: "测试333",
  },
]);

const active = ref("8588");
</script>
