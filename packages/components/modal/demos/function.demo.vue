<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 函数调用方式
  
  可以使用函数方式创建
</markdown>

<template>
  <div class="demo-margin">
    <YButton @click="open">Open Modal</YButton>
  </div>
</template>

<script setup lang="ts">
import { showModal } from "@nimble-ui/vue";
import { h } from "vue";

const open = async () => {
  const res = await showModal({
    content: () =>
      h(
        "div",
        {
          style: "width: 500px; height: 200px",
        },
        [h("span", "测试")]
      ),
  });
  console.log(res);
};
</script>
