<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的使用方法。
</markdown>

<template>
  <YDatePicker />
</template>

<script setup lang="ts">
import { ref } from "vue";

const color = ref("#1677FF");

setTimeout(() => {
  color.value = "rgb(30, 255, 75)";
}, 10000);
</script>
