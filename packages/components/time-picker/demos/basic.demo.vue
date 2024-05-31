<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  从堆叠到水平排列。
</markdown>

<template>
  <div class="demo-margin">
    <YTimePicker v-model="model" placeholder="选择时间" allow-clear format="mm:ss" @confirm="onConfirm" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const model = ref(Date.now());
const onConfirm = (data: { h?: number; m?: number; s?: number; value: string | number }) => {
  console.log(data);
};
</script>

<style lang="scss" scoped></style>
