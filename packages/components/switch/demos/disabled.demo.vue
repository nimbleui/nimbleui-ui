<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 禁用状态
  
  设置`disabled`属性，接受一个`Boolean`，设置`true`即可禁用。
</markdown>

<template>
  <YSwitch v-model="checked" disabled />
</template>

<script setup lang="ts">
import { ref } from "vue";

const checked = ref(true);
</script>
