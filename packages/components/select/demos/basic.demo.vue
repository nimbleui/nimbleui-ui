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
]);
</script>
