<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 修改样式、类名
  
  使用属性`number-class`、`number-style`修改数字间的间隙
</markdown>

<template>
  <YFlex :gap="10" align="center">
    <YNumber :count="count" number-class="number" :gap="8" />

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

<style lang="scss">
.number {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 38px;
  border: 1px solid #1d92ff;
  border-radius: 2px;
  box-sizing: border-box;
  font-size: 28px;
  line-height: 38px;
}
</style>
