<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 加载状态
  
  设置`loading`属性，接受一个`Boolean`，设置true即加载中状态。
</markdown>

<template>
  <YSwitch v-model="checked" loading />
</template>

<script setup lang="ts">
import { ref } from "vue";

const checked = ref(true);
</script>
