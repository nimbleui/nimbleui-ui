<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 触发方式
  
  通过 ```trigger``` 属性设置滚动条的时机。
</markdown>

<template>
  <YScrollbar trigger="hover" style="max-height: 120px">
    <p v-for="(item, index) in list" :key="index">{{ item }}</p>
  </YScrollbar>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const list = reactive(Array.from({ length: 40 }, (_, i) => i + 1));
</script>
