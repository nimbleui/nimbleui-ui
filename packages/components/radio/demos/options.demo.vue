<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的用法
</markdown>

<template>
  <YRadioGroup v-model="value" :details="data" label-position="start" :options="options" @change="onChange" />
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { RadioProps } from "@nimble-ui/vue";

const value = ref(1);
const data = ref({ a: 1, b: 2 });
const options = reactive<RadioProps[]>([
  {
    value: 1,
    label: () => "测试1",
    hide: (details) => {
      return details != 1;
    },
  },
  {
    value: 2,
    label: () => "测试2",
  },
  {
    value: 3,
    label: () => "测试3",
  },
]);
const onChange = (val: number) => {
  console.log(val);
};
</script>
