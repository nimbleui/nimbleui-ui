<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 异步关闭
  
  可以通过属性 `beforeConfirm` 传入函数
</markdown>

<template>
  <YPopConfirm :before-confirm="onBeforeConfirm" title="标题" description="您确定要删除此任务吗?">
    <YButton plain :type="'error'">Delete</YButton>
  </YPopConfirm>
</template>

<script setup lang="ts">
import { YMessage } from "@nimble-ui/vue";

const onBeforeConfirm = async (done: (cancel?: boolean) => void) => {
  setTimeout(() => {
    done();
    YMessage("异步执行成功");
  }, 3000);
};
</script>
