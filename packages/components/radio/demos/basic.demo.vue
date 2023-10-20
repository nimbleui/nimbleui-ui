<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  创建第一个对话框
</markdown>

<template>
  <div class="demo-margin">
    <YRadio v-model="value" :value="1">测试</YRadio>
    <YRadio v-model="value" :value="2">测试1</YRadio>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref(1);
</script>
