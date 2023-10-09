<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的用法。
</markdown>

<template>
  <YTabs v-model="active" :items="items" type="card" />
</template>

<script setup lang="ts">
import { reactive, h, ref } from "vue";

const items = reactive([
  {
    id: "2356",
    label: h("div", { class: "name" }, "测试1"),
  },
  {
    id: "8588",
    label: "测试289898989",
  },
]);

const active = ref("8588");
</script>
