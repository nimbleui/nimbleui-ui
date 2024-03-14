<!-- eslint-disable vue/multi-word-component-names -->

<markdown>
# 最大值

通过设置属性`max`来控制
</markdown>

<template>
  <YFlex :gap="20" align="center">
    <YBadge :count="count" :max="15">
      <div class="badge"></div>
    </YBadge>

    <YBadge :count="count" :max="15">
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
  const value = count.value + num;
  count.value = value > 16 ? 16 : value;
};
</script>

<style scoped>
.badge {
  width: 35px;
  height: 35px;
  border-radius: 3px;
  background-color: var(--y-color-info-9);
}
</style>
