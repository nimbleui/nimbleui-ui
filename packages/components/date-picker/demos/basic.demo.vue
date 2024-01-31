<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的使用方法。
</markdown>

<template>
  <YDatePicker :type="'dateRange'" :placeholder="['开始时间', '结束时间']" :disabled-date="disabledDate" />
</template>

<script setup lang="ts">
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 7);
const minDate = new Date();
minDate.setDate(minDate.getDate() - 7);
const disabledDate = (date: Date) => {
  const now = date.getTime();
  return maxDate.getTime() > now && minDate.getTime() < now;
};
</script>
