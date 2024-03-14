<!-- eslint-disable vue/multi-word-component-names -->

<markdown>
# 自定义位置偏移

设置状态点的位置偏移，格式为 `[left, top]`，表示状态点距默认位置左侧、上方的偏移量。
</markdown>

<template>
  <YFlex :gap="20" align="center">
    <YBadge :count="count" :offset="offset">
      <div class="badge"></div>
    </YBadge>
  </YFlex>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const count = ref(9);
const offset = ref<[number, number]>([10, 10]);
</script>

<style scoped>
.badge {
  width: 35px;
  height: 35px;
  border-radius: 3px;
  background-color: var(--y-color-info-9);
}
</style>
