<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 文字和图标
  
  带有文字和图标。
</markdown>

<template>
  <YSwitch v-model="checked" size="large">
    <template #checked>开启</template>
    <template #unchecked>关闭</template>
  </YSwitch>
</template>

<script setup lang="ts">
import { ref } from "vue";

const checked = ref(true);
</script>
