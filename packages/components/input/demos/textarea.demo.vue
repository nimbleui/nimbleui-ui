<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的用法。
</markdown>

<template>
  <YForm @submit="onSubmit">
    <YFlex vertical :gap="12">
      <YFormItem :bordered="false" required="账号不能为空" vertical label="账号">
        <YInput
          v-model="value.aa"
          allow-clear
          clear-trigger="always"
          name="name"
          type="textarea"
          placeholder="请输入"
          :auto-size="{ maxRows: 6, minRows: 3 }"
        />
      </YFormItem>

      <YInput placeholder="请输入" />
    </YFlex>
  </YForm>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const value = reactive<any>({
  aa: 22,
});
const onSubmit = (data: any) => {
  console.log(data);
};
</script>
