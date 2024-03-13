<!-- eslint-disable vue/multi-word-component-names -->

<markdown>
# 基础用法

最简单的用法
</markdown>

<template>
  <YFlex :gap="20" align="center">
    <YBadge :count="count">
      <div class="badge"></div>
    </YBadge>

    <YBadge dot>
      <div class="badge"></div>
    </YBadge>

    <YButtonGroup>
      <YButton @click="onSun(-1)">-</YButton>
      <YButton @click="onSun(1)">+</YButton>
    </YButtonGroup>
  </YFlex>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const count = ref(9);
const onSun = (num: number) => {
  count.value = count.value + num;
};
</script>

<style scoped>
.badge {
  width: 35px;
  height: 35px;
  border-radius: 3px;
  background-color: var(--y-color-info);
}
</style>
