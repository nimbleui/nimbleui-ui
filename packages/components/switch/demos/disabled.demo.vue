<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 禁用状态
  
  设置disabled属性，接受一个Boolean，设置true即可禁用。
</markdown>

<template>
  <YSwitch v-model="checked" disabled />
</template>

<script setup lang="ts">
import { ref } from "vue";

const checked = ref(true);
</script>
