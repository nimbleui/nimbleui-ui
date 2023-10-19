<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  创建第一个对话框
</markdown>

<template>
  <div class="demo-margin">
    <YRadio :value="value">测试</YRadio>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref(false);
</script>
