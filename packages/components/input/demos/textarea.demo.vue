<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 多文本框
  
  设置属性type为textarea。
</markdown>

<template>
  <YForm @submit="onSubmit">
    <YFlex vertical :gap="12">
      <YInput type="textarea" auto-size placeholder="请输入" />
      <YFormItem :bordered="false" required="账号不能为空" label="账号">
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
    </YFlex>
  </YForm>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const value = reactive<any>({
  aa: "",
});
const onSubmit = (data: any) => {
  console.log(data);
};
</script>
