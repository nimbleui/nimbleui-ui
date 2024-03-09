<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 页签的基本样式
  
  可以通过改变type属性，可选line、card、radio、bar
</markdown>

<template>
  <YTabs v-model="active" :items="items" type="card" />
</template>

<script setup lang="ts">
import { reactive, h, ref } from "vue";

const items = reactive([
  {
    id: "2356",
    label: h("div", { class: "name" }, "Tab1"),
    children: "Tab1",
  },
  {
    id: "8588",
    label: "Tab2",
    children: "Tab2",
  },
  {
    id: "85855",
    label: "Tab3",
    children: "Tab3",
  },
]);

const active = ref("8588");
</script>
