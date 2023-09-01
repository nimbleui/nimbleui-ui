<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 手动关闭
  
  把 `duration` 设置为零不会自动关闭，要手动调用close方法
</markdown>

<template>
  <div class="demo-margin">
    <YButton @click="open">打开</YButton>
    <YButton @click="close">关闭</YButton>
  </div>
</template>

<script setup lang="ts">
import { YMessage } from "@nimble-ui/vue";

const open = () => {
  YMessage({
    message: "手动关闭",
    duration: 0,
    onClose() {
      console.log("关闭回调函数");
    },
  });
};

const close = () => {
  YMessage.closeAll();
};
</script>
