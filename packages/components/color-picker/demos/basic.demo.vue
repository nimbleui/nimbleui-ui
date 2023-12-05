<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的使用方法。
</markdown>

<template>
  <YColorPicker v-model="checked"></YColorPicker>
</template>

<script setup lang="ts">
import { ref } from "vue";

const checked = ref(true);
</script>
