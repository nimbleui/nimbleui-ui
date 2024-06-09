<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的用法。
</markdown>

<template>
  <YForm @submit="onSubmit">
    <YFlex vertical :gap="12">
      <YFormItem required="账号不能为空" vertical label="账号">
        <YInput v-model="value.aa" allow-clear :bordered="false" name="name" placeholder="请输入" />
      </YFormItem>
      <YFormItem required="密码不能为空" vertical label="密码">
        <YInput v-model="value.bb" type="password" :bordered="false" name="password" placeholder="请输入" />
      </YFormItem>
      <YInput prefix="前缀" suffix="后缀" />
      <YButton :native-type="'submit'" :size="'large'" :type="'primary'" block>登录</YButton>
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
