<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  从堆叠到水平排列。
</markdown>

<template>
  <YSlider v-model="model" :step="20" :min="20" :max="200" />
</template>
<script setup lang="ts">
import { ref } from "vue";

const model = ref(40);
</script>
