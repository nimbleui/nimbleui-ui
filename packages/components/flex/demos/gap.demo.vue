<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 设置间隙
  
  使用 gap 设置元素之间的间距
</markdown>

<template>
  <div style="margin-bottom: 10px"></div>
  <YFlex :vertical="vertical">
    <YButton type="primary">primary</YButton>
    <YButton type="primary">primary</YButton>
    <YButton type="primary">primary</YButton>
  </YFlex>
</template>
<script setup lang="ts">
import { ref } from "vue";

const vertical = ref(false);
</script>
