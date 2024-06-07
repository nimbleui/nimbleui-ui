<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 输入框禁用
  
  设置属性disabled为true。
</markdown>

<template>
  <YForm @submit="onSubmit">
    <YFlex :gap="8" vertical>
      <YInput v-model="value" disabled placeholder="请输入" />
      <YInput v-model="value" disabled placeholder="请输入" prefix="前缀" />
    </YFlex>
  </YForm>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref(1222);
const onSubmit = (data: any) => {
  console.log(data);
};
</script>
