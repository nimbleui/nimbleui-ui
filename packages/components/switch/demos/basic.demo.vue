<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的用法。
</markdown>

<template>
  <YSwitch v-model="checked" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const checked = ref(true);
</script>
