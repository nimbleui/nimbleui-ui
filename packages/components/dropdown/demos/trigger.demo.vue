<!-- eslint-disable vue/multi-word-component-names -->

<markdown>
  # 基础用法
  下拉菜单的基础用法。
</markdown>

<template>
  <YDropdown :trigger="'focus'" :options="options" @select="handleSelect">
    <YInput />
  </YDropdown>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { YMessage } from "@nimble-ui/vue";

interface Options {
  label: string;
  id: number;
}

const options = reactive<Options[]>([
  {
    label: "春眠不觉晓",
    id: 1,
  },
  {
    label: "处处闻啼鸟",
    id: 2,
  },
  {
    label: "夜来风雨声",
    id: 3,
  },
  {
    label: "花落知多少",
    id: 4,
  },
]);

const handleSelect = (item: Options) => {
  YMessage.info(item.label);
};
</script>
