<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  从堆叠到水平排列。
</markdown>

<template>
  <div class="demo-margin">
    <YSelect v-model="model" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const model = ref(1);
const options = reactive([
  {
    id: 1,
    label: "测试1",
  },
  {
    id: 2,
    label: "测试2",
  },
  {
    id: 3,
    label: "测试3",
  },
  {
    id: 4,
    label: "测试4",
  },
  {
    id: 5,
    label: "测试4",
  },
  {
    id: 6,
    label: "测试4",
  },
  {
    id: 7,
    label: "测试4",
  },
  {
    id: 8,
    label: "测试4",
  },
  {
    id: 9,
    label: "测试4",
  },
  {
    id: 10,
    label: "测试4",
  },
  {
    id: 11,
    label: "测试4",
  },
  {
    id: 12,
    label: "测试4",
  },
  {
    id: 13,
    label: "测试4",
  },
  {
    id: 14,
    label: "测试4",
  },
]);
</script>
