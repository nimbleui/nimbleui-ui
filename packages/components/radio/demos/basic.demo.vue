<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的用法
</markdown>

<template>
  <YRadioGroup v-model="value">
    <YRadio :value="1">测试</YRadio>
    <YRadio :value="2">测试1</YRadio>
  </YRadioGroup>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref(1);
</script>
