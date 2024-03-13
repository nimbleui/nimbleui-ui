<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  简单使用
</markdown>

<template>
  <YFlex :gap="10" align="center">
    <YNumber :count="count" :max="15" />

    <YButtonGroup>
      <YButton @click="onSun(-1)">-</YButton>
      <YButton @click="onSun(1)">+</YButton>
    </YButtonGroup>
  </YFlex>
</template>

<script setup lang="ts">
import { ref } from "vue";

const count = ref(8);
const onSun = (num: number) => {
  count.value = count.value > 16 ? 16 : count.value + num;
};
</script>
