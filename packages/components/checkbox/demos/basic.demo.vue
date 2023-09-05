<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  通过 v-model 绑定复选框的勾选状态。
</markdown>

<template>
  <YCheckbox v-model="checked">复选框</YCheckbox>
</template>

<script setup lang="ts">
import { ref } from "vue";

const checked = ref(true);
</script>
