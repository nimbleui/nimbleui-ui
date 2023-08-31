<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  使用 type、plain、round 和 circle 来定义按钮的样式。
  </markdown>

<template>
  <YButton :loading="loading" @click="handleClick">点我</YButton>
</template>

<script setup lang="ts">
import { ref } from "vue";

const loading = ref(false);

const handleClick = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>
