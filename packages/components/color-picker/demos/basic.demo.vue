<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的使用方法。
</markdown>

<template>
  <YColorPicker v-model="color" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const color = ref("#1677FF");

setTimeout(() => {
  color.value = "rgb(30, 255, 75)";
}, 3000);
</script>
