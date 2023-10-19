<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 设置间隙
  
  使用 gap 设置元素之间的间距
</markdown>

<template>
  <YFlex :items="items" />
</template>
<script setup lang="ts">
import { reactive, h } from "vue";
import { FlexItems } from "@nimble-ui/vue";

const items = reactive<FlexItems>([
  {
    name: 1,
    children() {
      return h("div", "测试1");
    },
    style: {
      backgroundColor: "red",
      flex: 1,
    },
  },
  {
    name: 2,
    children: "测试2",
    style: {
      flex: 1,
    },
  },
]);
</script>
