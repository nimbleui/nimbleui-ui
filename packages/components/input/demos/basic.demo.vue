<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的用法。
</markdown>

<template>
  <YForm @submit="onSubmit">
    <YFlex vertical :gap="12">
      <YFormItem required="账号不能为空" vertical label="账号">
        <YInput :bordered="false" name="name" placeholder="请输入" />
      </YFormItem>
      <YFormItem required="密码不能为空" vertical label="密码">
        <YInput type="password" :bordered="false" name="password" placeholder="请输入" />
      </YFormItem>
      <YButton :native-type="'submit'" :size="'large'" :type="'primary'" block>登录</YButton>
    </YFlex>
  </YForm>
</template>

<script setup lang="ts">
const onSubmit = (data: any) => {
  console.log(data);
};
</script>
