<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 自定义选中的值
  
  使用 `checked-value` 和 `unchecked-value` 制定选中的值。
</markdown>

<template>
  <YSwitch v-model="checked" checked-value="打开" unchecked-value="关闭" @change="onChange" />
</template>

<script setup lang="ts">
import { YMessage } from "@nimble-ui/vue";
import { ref } from "vue";

const checked = ref("关闭");
const onChange = (val: string) => {
  YMessage({ message: val });
};
</script>
