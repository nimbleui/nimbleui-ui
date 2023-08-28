<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
# 基础

按钮的 `type` 分别为 `default`、`tertiary`、`primary`、`info`、`success`、`warning` 和 `error`。
</markdown>

<template>
  <div class="flex">
    <YButton>Default</YButton>
    <YButton :type="'primary'">Primary</YButton>
    <YButton :type="'info'">Info</YButton>
    <YButton :type="'success'">Success</YButton>
    <YButton :type="'warning'">Warning</YButton>
    <YButton :type="'error'">Error</YButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const show = ref(true);
console.log(show.value);
</script>

<style scoped lang="scss">
.flex {
  display: flex;
}
</style>
