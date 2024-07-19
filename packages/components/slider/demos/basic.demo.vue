<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  从堆叠到水平排列。
</markdown>

<template>
  <YSlider v-model="model" show-tooltip :step="0.1" :min="0" :max="2" />
</template>
<script setup lang="ts">
import { ref, reactive, h } from "vue";

const model = ref(1);

const marks = reactive({
  20: "20%",
  40: "40%",
});

const formatTooltip = (val: number) => {
  return h(
    "span",
    {
      style: "color: red",
    },
    `${val}%`
  );
};
</script>
