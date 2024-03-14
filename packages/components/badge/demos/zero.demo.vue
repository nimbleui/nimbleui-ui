<!-- eslint-disable vue/multi-word-component-names -->

<markdown>
# 是否显示 0

通过设置属性`show-zero`来显示。
</markdown>

<template>
  <YFlex :gap="20" align="center">
    <YBadge :count="count">
      <div class="badge"></div>
    </YBadge>
    <YBadge :count="count" show-zero>
      <div class="badge"></div>
    </YBadge>
  </YFlex>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const count = ref(0);
</script>

<style scoped>
.badge {
  width: 35px;
  height: 35px;
  border-radius: 3px;
  background-color: var(--y-color-info-9);
}
</style>
