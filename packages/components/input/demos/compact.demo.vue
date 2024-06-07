<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 组合布局
  
  组合布局。
</markdown>

<template>
  <YForm @submit="onSubmit">
    <YFlex :gap="8" vertical>
      <YSpace compact>
        <YInput v-model="value" style="flex: 1" placeholder="请输入" prefix="前缀" />
        <YInput v-model="value" style="flex: 1" placeholder="请输入" />
        <YButton>搜索</YButton>
      </YSpace>

      <YSpace compact>
        <YInput v-model="value" style="flex: 1" placeholder="请输入" />
        <YButton :type="'primary'">搜索</YButton>
      </YSpace>

      <YInput v-model="value" placeholder="请输入" prefix="前缀" />
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
