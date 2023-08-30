<!-- eslint-disable vue/multi-word-component-names -->

<markdown>
  # 基础用法
  下拉菜单的基础用法。
</markdown>

<template>
  <YDropdown :trigger="'hover'" :options="options" @select="handleSelect">
    <YButton :type="'primary'">Dropdown List</YButton>
  </YDropdown>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { YMessage } from "yy-ui";

interface Options {
  label: string;
  id: number;
}

const options = reactive<Options[]>([
  {
    label: "label 1",
    id: 1,
  },
  {
    label: "label 2",
    id: 2,
  },
  {
    label: "label 3",
    id: 3,
  },
]);

const handleSelect = (item: Options) => {
  YMessage.info(item.label);
};
</script>
