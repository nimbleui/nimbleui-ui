<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 提示类型
  
  包括成功、失败、警告。
</markdown>

<template>
  <div class="demo-margin">
    <YButton @click="success">success</YButton>
    <YButton @click="error">error</YButton>
    <YButton @click="warning">warning</YButton>
  </div>
</template>

<script setup lang="ts">
import { YMessage } from "yy-ui";

const success = () => {
  YMessage.success("这是一个成功的提示");
};

const error = () => {
  YMessage.error("这是一个失败的提示");
};

const warning = () => {
  YMessage.warning("这是一个警告的提示");
};
</script>
