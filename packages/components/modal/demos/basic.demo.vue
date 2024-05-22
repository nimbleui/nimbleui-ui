<!-- eslint-disable vue/multi-word-component-names -->
<markdown>
  # 基础用法
  
  创建第一个对话框
</markdown>

<template>
  <div class="demo-margin">
    <YButton @click="open">Open Modal</YButton>
    <YModal v-model="show">
      <div style="width: 500px; height: 200px"></div>
    </YModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const show = ref(false);
const open = () => {
  show.value = true;
};
</script>
