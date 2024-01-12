<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  从堆叠到水平排列。
</markdown>

<template>
  <YSlider v-model="model" :step="20" :min="20" :max="200" :marks="marks" />
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";

const model = ref(40);

const marks = reactive({
  20: "0%",
  40: "40%",
});
</script>
