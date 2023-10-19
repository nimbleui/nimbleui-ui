<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 对齐方式
  
  设置对齐方式。
</markdown>

<template>
  <div style="margin-bottom: 10px">
    <p>选择justify :</p>
    <YTabs v-model="justify" :items="justifyList" key-field="label" />
  </div>
  <div style="margin-bottom: 10px">
    <p>选择align :</p>
    <YTabs v-model="align" :items="alignList" key-field="label" />
  </div>
  <YFlex :align="align" :justify="justify" style="height: 200px; border: 1px solid var(--y-color-primary)">
    <YButton type="primary">primary</YButton>
    <YButton type="primary">primary</YButton>
    <YButton type="primary">primary</YButton>
    <YButton type="primary">primary</YButton>
  </YFlex>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { FlexAlign, FlexJustify } from "@nimble-ui/vue";

const justifyList = reactive<{ label: FlexJustify }[]>([
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

const alignList = reactive<{ label: FlexAlign }[]>([
  {
    label: "flex-start",
  },
  {
    label: "center",
  },
  {
    label: "flex-end",
  },
]);

const justify = ref<FlexJustify>("flex-start");
const align = ref<FlexAlign>("flex-start");
</script>
