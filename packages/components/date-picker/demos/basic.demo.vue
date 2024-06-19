<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的使用方法。
</markdown>

<template>
  <YDatePicker
    v-model="value"
    :type="'dateRange'"
    :placeholder="'开始时间'"
    placement="bottom-end"
    @confirm="onConfirm"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref<[number, number]>();
const onConfirm = (val: Date[]) => {
  console.log(val);
};
</script>
