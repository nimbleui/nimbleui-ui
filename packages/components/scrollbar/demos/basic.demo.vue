<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  设置滚动条高度，若不设置则根据父容器高度自适应。
</markdown>

<template>
  <YScrollbar style="max-height: 120px">
    <p v-for="(item, index) in list" :key="index">{{ item }}</p>
  </YScrollbar>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const list = reactive(Array.from({ length: 40 }, (_, i) => i + 1));

setTimeout(() => {
  list.push(66, 93, 9, 25, 2, 2, 55);
}, 5000);
</script>
