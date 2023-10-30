<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 条件触发
  
  可以判断是否需要弹出
</markdown>

<template>
  <YFlex vertical :gap="8">
    <div>
      <YPopConfirm :disabled="disabled" title="标题" description="您确定要删除此任务吗?" @confirm="onConfirm">
        <YButton plain :type="'error'">Delete</YButton>
      </YPopConfirm>
    </div>
    <YFlex align="center">
      是否禁止提示框：
      <YSwitch v-model="disabled" />
    </YFlex>
  </YFlex>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { YMessage } from "@nimble-ui/vue";

const disabled = ref(false);

const onConfirm = () => {
  YMessage("点击确认");
};
</script>
