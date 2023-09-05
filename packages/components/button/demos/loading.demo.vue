<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 加载中
  
  按钮添加加载状态。
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
