<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  从顶部出现，3s 后自动消失。
</markdown>

<template>
  <div class="demo-margin">
    <YButton @click="open">显示 message</YButton>
    <YButton @click="openVN">VNode</YButton>
  </div>
</template>

<script setup lang="ts">
import { h } from "vue";
import { YMessage } from "@nimble-ui/vue";

const open = () => {
  YMessage("这是个Message");
};

const openVN = () => {
  YMessage(h("p", null, [h("span", { style: "color: red" }, "这个是用VNode创建")]));
};
</script>
