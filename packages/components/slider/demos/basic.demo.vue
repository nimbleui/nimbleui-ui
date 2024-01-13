<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  从堆叠到水平排列。
</markdown>

<template>
  <YSlider v-model="model" :step="20" :min="20" :max="200" :marks="marks" :format-tooltip="formatTooltip" />
</template>
<script setup lang="ts">
import { ref, reactive, h } from "vue";

const model = ref([40, 80]);

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
