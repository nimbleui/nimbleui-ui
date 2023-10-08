<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的用法。
</markdown>

<template>
  <YTabs :items="items"></YTabs>
</template>

<script setup lang="ts">
import { reactive, h } from "vue";

const items = reactive([
  {
    id: 0,
    label: () => h("div", { class: "name" }, "测试1"),
  },
  {
    id: 1,
    label: "测试2",
  },
]);
</script>
