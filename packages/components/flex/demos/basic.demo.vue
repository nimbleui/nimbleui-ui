<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  最简单的用法。
</markdown>

<template>
  <div style="margin-bottom: 10px">
    垂直：<YSwitch v-model="vertical">
      <template #checked>是</template>
      <template #unchecked>否</template>
    </YSwitch>
  </div>
  <YFlex :vertical="vertical" @click="onClick">
    <div
      v-for="(item, index) in list"
      :key="index"
      :style="{
        width: '25%',
        height: '50px',
        backgroundColor: index % 2 ? 'var(--y-color-primary)' : 'var(--y-color-primary-6)',
      }"
    >
      {{ item }}
    </div>
  </YFlex>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";

const list = reactive(Array.from({ length: 4 }));
const vertical = ref(false);
const onClick = () => {
  console.log(222);
};
</script>
