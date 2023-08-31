<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 自定义显示时长
  
  自定义时长 10s，是以毫秒文单位
</markdown>

<template>
  <YButton @click="open">自定义时长</YButton>
</template>

<script setup lang="ts">
import { YMessage } from "@nimble-ui/vue";

const open = () => {
  YMessage({
    message: "自定义显示时长",
    duration: 10000,
  });
};
</script>
