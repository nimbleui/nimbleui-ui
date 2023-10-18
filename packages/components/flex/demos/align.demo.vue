<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的用法。
</markdown>

<template>
  <div style="margin-bottom: 10px">
    <YTabs v-model="justify" :items="justifyList" key-field="label"></YTabs>
  </div>
  <YFlex>
    <YButton type="primary">primary</YButton>
    <YButton type="primary">primary</YButton>
    <YButton type="primary">primary</YButton>
    <YButton type="primary">primary</YButton>
  </YFlex>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";

const justifyList = reactive([
  {
    label: "flex-start",
  },
  {
    label: "center",
  },
  {
    label: "space-between",
  },
  {
    label: "space-around",
  },
  {
    label: "space-evenly",
  },
]);
const justify = ref("flex-start");
</script>
