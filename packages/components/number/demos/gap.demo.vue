<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 数字间的间隙
  
  使用属性`gap`修改数字间的间隙
</markdown>

<template>
  <YFlex :gap="10" align="center">
    <YNumber :count="count" :gap="8" />

    <YButtonGroup>
      <YButton @click="onSun(-1)">-</YButton>
      <YButton @click="onSun(1)">+</YButton>
    </YButtonGroup>
  </YFlex>
</template>

<script setup lang="ts">
import { ref } from "vue";

const count = ref(22);
const onSun = (num: number) => {
  count.value = count.value + num;
};
</script>
