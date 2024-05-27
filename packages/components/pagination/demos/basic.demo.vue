<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  简单使用
</markdown>

<template>
  <YPagination v-model="current" :total="400" size="small" @change="onChange">
    <template #total="{ total }">共 {{ total }} 条</template>
  </YPagination>
</template>

<script setup lang="ts">
import { ref } from "vue";

const current = ref(10);
const onChange = (page: number, pageSize: number) => {
  console.log("page", page);
  console.log("pageSize", pageSize);
};
</script>
