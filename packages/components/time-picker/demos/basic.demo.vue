<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  从堆叠到水平排列。
</markdown>

<template>
  <div class="demo-margin">
    <YTimePicker v-model="model" format="hh:mm:ss" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const model = ref(Date.now());
</script>

<style lang="scss" scoped></style>
