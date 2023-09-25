<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  典型的页面布局。
</markdown>

<template>
  <YScrollbar trigger="hover" style="max-height: 120px">
    <p v-for="(item, index) in list" :key="index">{{ item }}</p>
  </YScrollbar>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const list = reactive(Array.from({ length: 40 }, (_, i) => i + 1));
</script>
