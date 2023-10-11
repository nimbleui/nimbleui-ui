<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 触发方式
  
  可以使用 trigger='hover' 触发标签页的改变。
</markdown>

<template>
  <YTabs v-model="active" :items="items" trigger="hover" type="bar" />
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
]);

const active = ref("8588");
</script>
