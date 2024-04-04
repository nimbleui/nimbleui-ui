<!-- eslint-disable vue/multi-word-component-names -->

<markdown>
  # 基础用法
  下拉菜单的基础用法。
</markdown>

<template>
  <YDropdown :trigger="'hover'" :options="numList" @select="handleSelect">
    <YButton :type="'primary'">Dropdown List</YButton>
  </YDropdown>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { YMessage } from "@nimble-ui/vue";

interface Options {
  label: string;
  id: number;
}

const type = ref(1);
const numList = computed(() => {
  const start = !type.value ? 15 : type.value == 1 ? 12 : 12;
  const end = !type.value ? 90 : type.value == 1 ? 30 : 36;
  return Array.from({ length: end - start + 1 }, (v, k) => ({ label: k + start }));
});

const handleSelect = (item: Options) => {
  YMessage.info(String(item.label));
};
</script>
